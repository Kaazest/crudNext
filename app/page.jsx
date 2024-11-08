// app/page.jsx
import NavBar from "@/components/navbar";
import Link from "next/link";
import styles from "@/app/Page.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <h1>Formulario</h1>
        <NavBar />
      </div>
      <div className={styles.container2}>
        <h1>Selecciona una opción</h1>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonGroup}>
            <div className={styles.buttonsContainer}>
              <Link href="/registrar">
                <button className={styles.button}>Registrar Datos</button>
              </Link>

              <Link href="/ver">
                <button className={styles.button2}>Gestionar Datos</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
