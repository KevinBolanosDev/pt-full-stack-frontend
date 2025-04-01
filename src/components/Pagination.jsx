import React from "react";

function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center gap-5 items-center my-4 text-xl">
      <button className="bg-sky-900 rounded h-8 w-25 cursor-pointer" onClick={() => setPage(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <span> Página {page} de {totalPages} </span>
      <button className="bg-sky-900 rounded h-8 w-25 cursor-pointer" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;