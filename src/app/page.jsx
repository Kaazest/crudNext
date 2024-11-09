// app/page.jsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "50px",
      }}
    >
      <h1>Selecciona una opción</h1>
      <Link href="/registrar">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Registrar Datos
        </button>
      </Link>
      {/* <Link href="/editar">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Editar Datos
        </button>
      </Link>
      <Link href="/eliminar">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Eliminar Datos
        </button>
      </Link> */}
      <Link href="/ver">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Ver Datos
        </button>
      </Link>
    </div>
  );
}
