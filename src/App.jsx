import { useEffect, useState, useCallback } from "react";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";
import { usersApi } from "./api/users";
// import usePreloadNextPage from "./hooks/usePreloadNextPage";

// Implementación simple de debounce
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  // const [preloadedPages, setPreloadedPages] = useState(new Set());
  // const endOfListRef = useRef(null);

   // Función de búsqueda con debounce
  const handleSearch = useCallback(
    debounce(async (term) => {
      if (term.trim() === "") {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        const results = await usersApi.searchUsers(term);
        setSearchResults(results.data || []);
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  // Cargar usuarios iniciales
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersApi.getAll(page);
        setUsers(data.data || []);
        setTotalPages(data.totalPages || 1);
        setPage(data.page || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  // Manejar cambios en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setIsSearching(true);
      handleSearch(searchTerm);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchTerm, handleSearch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar usuarios por nombre o email..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isSearching && (
          <div className="absolute right-3 top-3">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {loading ? (
        <Spinner />
      ) : (
        <UserList users={searchTerm.trim() !== "" ? searchResults : users} />
      )}
        <Pagination 
        page={page} 
        totalPages={totalPages} 
        setPage={setPage} 
        isLoading={loading}
        />
    </div>
  );
}

export default App;