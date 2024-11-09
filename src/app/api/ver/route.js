import { pool } from "../../lib/dbConnect";

export async function GET(req) {
  try {
    const result = await pool.query("SELECT * FROM usuarios");

    return new Response(
      JSON.stringify({
        users: result.rows,
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
