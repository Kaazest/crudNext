import { pool } from "@/app/lib/dbConnect";

export async function DELETE(req, { params }) {
  const { cedula } = params;

  try {
    const result = await pool.query(
      "DELETE FROM usuario WHERE cedula = $1 RETURNING *",
      [cedula]
    );

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Usuario eliminado exitosamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return new Response(
      JSON.stringify({
        message: "Error al eliminar el usuario",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
