"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/components/Pagination.module.css";

const ItemsPage = ({ usuarios, paginas }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(paginas / itemsPerPage);

  //console.log("############");
  //console.log(usuarios); //Para debug

  //if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <ul className={styles.pagination}>
        <li>
          <a
            href="javascript:void(0)"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/ver?page=${Math.max(page - 1, 1)}`);
            }}
          >
            &laquo; Anterior
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={i + 1 === page ? "active" : ""}>
            <a
              href="javascript:void(0)"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/ver?page=${i + 1}`);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            href="javascript:void(0)"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/ver?page=${Math.min(page + 1, totalPages)}`);
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