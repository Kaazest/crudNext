import { pool } from "@/app/lib/dbConnect";

export async function PUT(req, { params }) {
  try {
    const cedula = new URL(req.url).pathname.split("/").pop();
    const { nombre, apellido, edad } = await req.json(); // Obtener los datos del cuerpo de la solicitud

    // Validar que se reciban los datos necesarios
    if (
      !nombre ||
      !apellido ||
      !edad ||
      nombre.trim().length === 0 ||
      apellido.trim().length === 0 ||
      edad < 1
    ) {
      return new Response(
        JSON.stringify({ error: "Faltan datos para actualizar" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Actualizar el usuario en la base de datos
    const result = await pool.query(
      "UPDATE usuario SET nombre = $1, apellido = $2, edad = $3 WHERE cedula = $4",
      [nombre, apellido, edad, cedula]
    );

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ error: "No se encontró el usuario" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Datos actualizados correctamente" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al actualizar datos:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
