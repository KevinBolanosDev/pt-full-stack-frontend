import { useEffect } from 'react';

export const usePreloadNextPage = (currentPage, totalPages, fetchUsers, searchTerm) => {
  useEffect(() => {
    // Solo precargar si hay una página siguiente
      if (currentPage >= totalPages) return;

      const timer = setTimeout(() => {
          console.log(`Precargando página ${currentPage + 1}`);
          fetchUsers(currentPage + 1, searchTerm, true);
        }, 1000);
        {

      return () => clearTimeout(timer);
    }
  }, [currentPage, totalPages, fetchUsers, searchTerm]);
};