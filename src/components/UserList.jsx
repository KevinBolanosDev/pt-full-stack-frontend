import React from "react";

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-600 my-4">No hay usuarios disponibles.</p>;
  }

  return (
    <div className="container mx-auto overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table">
        <thead className="bg-sky-950 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha de Registro</th>
          </tr>
        </thead>
        <tbody className="bg-gray-400 divide-y divide-gray-200">
          {users.map((user) => (
            <tr 
              key={user.id}
              className="hover:bg-gray-300 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-sky-950">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-black">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {user.created_at 
                  ? new Date(user.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : "Fecha no disponible"
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;