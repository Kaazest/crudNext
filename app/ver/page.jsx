"use client";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import styles from "@/app/ver/Page.module.css";
import NavBar from "@/components/navbar";
import { useRouter, useSearchParams } from "next/navigation";
import ItemsPage from "@/components/Pagination";

export default function HomePage() {
  const [data, setData] = useState({ items: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    edad: "",
  });
  const users = data.users || [];
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/eliminar/${item.cedula}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar los datos");
      }

      // Actualiza el estado local
      const updatedData = users.filter((user) => user.cedula !== item.cedula);
      setData(updatedData);
    } catch (error) {
      console.error("Error al eliminar datos:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/ver?page=${page}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const result = await response.json();
        //console.log(result);
        setData({ items: result.users || [] });
        const aux = result.listUsers.length;
        //console.log(aux);
        setTotalPages(aux);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setFormValues({
      nombre: item.nombre,
      apellido: item.apellido,
      edad: item.edad,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/actualizar/${selectedItem.cedula}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos");
      }

      // Actualiza el estado local
      const updatedData = users.map((item) =>
        item.cedula === selectedItem.cedula ? { ...item, ...formValues } : item
      );
      setData(updatedData);
      closeModal();
    } catch (error) {
      console.error("Error al actualizar datos:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Datos</h1>
        <NavBar />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Cedula</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.cedula}>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.edad}</td>
                <td>{item.cedula}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => openModal(item)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.button3}
                    onClick={() => handleDelete(item)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedItem && (
            <div className={styles.modal1}>
              <form onSubmit={handleSubmit}>
                <div className={styles.modalcontent}>
                  <div className={styles.modalcontent2}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      className={styles.input}
                      id="nombre"
                      name="nombre"
                      value={formValues.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.modalcontent2}>
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                      className={styles.input}
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={formValues.apellido}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.modalcontent2}>
                    <label htmlFor="edad">Edad:</label>
                    <input
                      className={styles.input}
                      id="edad"
                      name="edad"
                      type="number"
                      value={formValues.edad}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <button className={styles.button} type="submit">
                      Actualizar
                    </button>
                    <button
                      className={styles.button2}
                      type="button"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Modal>
        <ItemsPage usuarios={data.items} paginas={totalPages} />
      </div>
    </>
  );
}
