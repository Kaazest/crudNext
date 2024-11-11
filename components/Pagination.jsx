"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/components/Pagination.module.css";

const ItemsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/ver?page=${page}`);

        // Verifica si la respuesta es exitosa
        if (!res.ok) {
          throw new Error(
            `Error en la respuesta de la API: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();
        setItems(data.items || []);
        setTotalPages(data.totalPages || 0);
        // // Verifica que data.items sea un array
        // if (Array.isArray(data.items)) {
        //   setItems(data.items);
        // } else {
        //   setItems([]); // Si no es un array, asegúrate de que items sea un array vacío
        // }

        // Asegúrate de que totalPages sea un número
        // setTotalPages(
        //   typeof data.totalPages === "number" ? data.totalPages : 0
        // );
      } catch (error) {
        console.error("Error al obtener los items:", error);
        setItems([]); // Si hay un error, asegurarte de que items sea un array vacío
      } finally {
        setLoading(false); // Asegúrate de que loading se establezca a false al final
      }
    };

    if (page) {
      fetchItems();
    }
  }, [page]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <ul className={styles.pagination}>
        <li>
          <a
            href="#"
            onClick={() => router.push(`/ver?page=${Math.max(page - 1, 1)}`)}
          >
            &laquo; Anterior
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={i + 1 === page ? "active" : ""}>
            <a href="#" onClick={() => router.push(`/ver?page=${i + 1}`)}>
              {i + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={() =>
              router.push(`/ver?page=${Math.min(page + 1, totalPages)}`)
            }
          >
            Siguiente &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ItemsPage;
