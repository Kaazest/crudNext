"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/components/Pagination.module.css";

const ItemsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchItems = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ver?page=${page}`);
      if (!res.ok) {
        throw new Error(`Error en la respuesta de la API: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      setItems(data.items || []);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error al obtener los items:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(page);
  }, [fetchItems, page]);

  const handlePageChange = (pageNumber) => {
    router.push(`/ver?page=${pageNumber}`);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <ul className={styles.pagination}>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Math.max(currentPage - 1, 1));
            }}
          >
            &laquo; Anterior
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i + 1}
            className={i + 1 === currentPage ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i + 1);
            }}
          >
            <a href="#">{i + 1}</a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Math.min(currentPage + 1, totalPages));
            }}
          >
            Siguiente &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ItemsPage;

