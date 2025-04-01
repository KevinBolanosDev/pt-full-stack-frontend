import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";
import { usersApi } from "./api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersApi.getAll(page);
        console.log("Usuarios recibidos: ", data);
        setUsers(data.data); // Se actualiza y trae los usuarios
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  return (
    <div>
      <h1 className="text-3xl text-center my-5">Lista de Usuarios</h1>
      {loading ? <Spinner /> : <UserList users={users} />}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default App;