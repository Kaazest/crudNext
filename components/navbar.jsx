import Link from "next/link";
import styles from "@/components/Navbar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/registrar">Registrar</Link>
      {/* <Link href="/eliminar">Eliminar</Link> */}
      <Link href="/ver">Ver</Link>
    </nav>
  );
}
