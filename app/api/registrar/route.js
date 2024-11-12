import { pool } from "@/app/lib/dbConnect";
export async function GET(request) {
  // Manejar la solicitud GET para debug
  return new Response(JSON.stringify({ message: "GET request received" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function POST(req) {
  const { nombre, apellido, edad, cedula } = await req.json();

  // Validación simple de datos
  if (!nombre || !apellido || !edad || !cedula) {
    return new Response(
      JSON.stringify({
        message: "Todos los campos son requeridos",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const result = await pool.query(
      "INSERT INTO usuario(nombre, apellido, edad, cedula) VALUES($1, $2, $3, $4) RETURNING *",
      [nombre, apellido, edad, cedula]
    );

    return new Response(
      JSON.stringify({
        message: "Usuario registrado exitosamente",
        user: result.rows[0],
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return new Response(
      JSON.stringify({
        message: "Error al registrar el usuario",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}