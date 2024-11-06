import { Pool } from "pg";

const pool = new Pool({
  user: "aaron",
  host: "localhost",
  database: "crud_db",
  password: "123456",
  port: 5432,
});

// Función para conectar a la base de datos
export async function dbConnect() {
  try {
    await pool.connect();
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
}

// Exportar el pool para usarlo en otras partes de la aplicación
export { pool };
