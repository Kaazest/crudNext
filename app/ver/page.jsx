"use client";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    edad: "",
  });
  const users = data.users || [];

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
      const updatedData = users.filter((user) =>
        user.cedula === item.cedula ? { ...item, ...formValues } : item
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ver");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const result = await response.json();
        setData(result);
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
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <h1>Datos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Cedula</th>
            <th>###</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.cedula}>
              <td>{item.nombre}</td>
              <td>{item.apellido}</td>
              <td>{item.edad}</td>
              <td>{item.cedula}</td>
              <td>
                <button onClick={() => openModal(item)}>Editar</button>
                <button onClick={() => handleDelete(item)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedItem && (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  id="nombre"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="apellido">Apellido:</label>
                <input
                  id="apellido"
                  name="apellido"
                  value={formValues.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="edad">Edad:</label>
                <input
                  id="edad"
                  name="edad"
                  type="number"
                  value={formValues.edad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <button type="submit">Actualizar</button>
                <button type="button" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
