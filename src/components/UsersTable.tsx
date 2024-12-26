import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive';
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com', roleId: 'role1', status: 'active' },
  { id: 2, name: 'Marie Martin', email: 'marie@example.com', roleId: 'role2', status: 'active' },
  { id: 3, name: 'Pierre Durant', email: 'pierre@example.com', roleId: 'role1', status: 'inactive' },
  { id: 4, name: 'Sophie Bernard', email: 'sophie@example.com', roleId: 'role1', status: 'active' }
];

const UsersTable = () => {
  const [users] = useState<User[]>(MOCK_USERS);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rôle</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{user.id}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{user.name}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.roleId}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button className="mr-4 text-indigo-600 hover:text-indigo-900">Éditer</button>
                <button className="text-red-600 hover:text-red-900">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
