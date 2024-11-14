import { pool } from "../../lib/dbConnect";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1; // Convertir a número
  const limit = parseInt(searchParams.get("limit")) || 10; // Convertir a número
  const offset = (page - 1) * limit;
  const query = parseInt(searchParams.get("query"));

  try {
    if (query) {
      const usersResult = await pool.query(
        "SELECT * FROM usuario WHERE cedula = $1 LIMIT $2 OFFSET $3",
        [query, limit, offset]
      );

      const users = usersResult.rows;

      const itemsResult = usersResult;
      const items = itemsResult.rows;
      const totalResult = await pool.query(
        "SELECT COUNT(*) AS total FROM usuario WHERE cedula = $1",
        [query]
      );
      const total = totalResult.rows[0].total;
      return new Response(
        JSON.stringify({
          users,
          items,
          total,
          totalPages: Math.ceil(total / limit),
        })
      );
    } else {
      const allUsers = await pool.query("SELECT * FROM usuario");
      const listUsers = allUsers.rows;

      const usersResult = await pool.query(
        "SELECT * FROM usuario LIMIT $1 OFFSET $2",
        [limit, offset]
      );
      const users = usersResult.rows;

      const itemsResult = usersResult;
      const items = itemsResult.rows;
      const totalResult = await pool.query(
        "SELECT COUNT(*) AS total FROM usuario"
      );
      const total = totalResult.rows[0].total;
      return new Response(
        JSON.stringify({
          users,
          items,
          listUsers,
          total,
          totalPages: Math.ceil(total / limit),
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
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
