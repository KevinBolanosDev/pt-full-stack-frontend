import React from "react";

function Pagination({ page, totalPages, setPage, isLoading }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => !isLoading && setPage(page - 1)}
        disabled={page === 1 || isLoading}
        className={`px-4 py-2 bg-sky-900 cursor-pointer rounded-md ${page === 1 || isLoading ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-sky-800 text-white'}`}
      >
        Anterior
      </button>
      
      <span className="text-white">
        Página {page} de {totalPages}
      </span>
      
      <button
        onClick={() => !isLoading && setPage(page + 1)}
        disabled={page === totalPages || isLoading}
        className={`px-4 py-2 bg-sky-900 cursor-pointer rounded-md ${page === totalPages || isLoading ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-sky-800 text-white'}`}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;