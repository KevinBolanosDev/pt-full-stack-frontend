import React, { useState } from "react";
import { usersApi } from "../api/users";

const UserList = ({ users, setUsers }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        setIsDeleting(true);
        await usersApi.deleteUsers(id);
        // Update local state to remove the deleted user
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('No se pudo eliminar el usuario');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-600 my-4">No hay usuarios disponibles.</p>;
  }

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-4">
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-950">
            <tr className="text-white">
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
              <th scope="col" className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th scope="col" className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Salario</th>
              <th scope="col" className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-gray-600 divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-400 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{user.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
                </td>
                <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{user.email}</div>
                </td>
                <td className="hidden sm:table-cell px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-200">
                    {new Intl.NumberFormat('es-ES', { 
                      style: 'currency', 
                      currency: 'USD' 
                    }).format(user.salario)}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {user.created_at 
                    ? new Date(user.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : "Fecha no disponible"
                  }
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <img 
                    src="/delete.png"
                    alt="Eliminar usuario"
                    className={`inline-block w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity ${isDeleting ? 'opacity-50' : ''}`}
                    onClick={() => !isDeleting && handleDelete(user.id)}
                    style={{ cursor: isDeleting ? 'not-allowed' : 'pointer' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;