"use client";
import { useState } from 'react';

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (edad <= 0) {
      setError("La edad debe ser un número positivo.");
      return;
    }
    
    try {
      const response = await fetch('/api/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, edad, cedula }),
      });
      
      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      const data = await response.json();
      console.log(data.message);

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
    <form onSubmit={handleSubmit}>
              <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text" //
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            id="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Registrar;