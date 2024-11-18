"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ver/Page.module.css";
import NavBar from "@/components/navbar";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (edad <= 0) {
      setError("La edad debe ser un número positivo.");
      return;
    }

    try {
      const response = await fetch("/api/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, edad, cedula }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      const data = await response.json();
      // console.log(data.message);
      router.push("/");

      // Limpiar el formulario
      setNombre("");
      setApellido("");
      setEdad("");
      setCedula("");
      setError(""); // Resetea el error en caso de éxito
    } catch (error) {
      setError(error.message); // Aquí es donde se usa setError
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Registrar Datos</h1>
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
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.containerinputs}>
              <div className={styles.label}>
                <label htmlFor="nombre"> Nombre:</label>
              </div>
              <div className={styles.containerinputs}>
                <input
                  className={styles.input}
                  type="text"
                  id="nombre"
                  placeholder="Ingrese su nombre..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.containerinputs}>
              <label htmlFor="apellido">Apellido:</label>
              <div className="flex">
                <input
                  className={styles.input}
                  placeholder="Ingrese su apellido..."
                  type="text" //
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.containerinputs}>
              <label htmlFor="edad">Edad: </label>

              <div>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Ingrese su edad..."
                  id="edad"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.containerinputs}>
              <label htmlFor="cedula">Cédula: </label>
              <div>
                <input
                  className={styles.input}
                  placeholder="Ingrese su cédula..."
                  type="number"
                  id="cedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className={styles.button} type="submit">
              Registrar
            </button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Registrar;
