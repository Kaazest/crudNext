import Link from "next/link";
export default function NavBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/registrar">Registrar</Link>
      {/* <Link href="/eliminar">Eliminar</Link> */}
      <Link href="/ver">Ver</Link>
    </nav>
  );
}
