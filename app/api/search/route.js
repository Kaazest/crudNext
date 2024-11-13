import { pool } from "../../lib/dbConnect";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1; // Convertir a número

  try {
    const allUsers = await pool.query(
      "SELECT * FROM usuario WHERE cedula = $1",
      [cedula]
    );
    const listUsers = allUsers.rows;
    const total = totalResult.rows[0].total;
    return new Response(
      JSON.stringify({
        users,
        listUsers,
        total,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error al recuperar los usuarios:", error);
    return new Response(
      JSON.stringify({
        message: "Error al recuperar los usuarios",
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
