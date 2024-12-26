import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PostsTable from '../components/PostsTable';
import UsersTable from '../components/UsersTable';
import { AuthContext } from '../context/AuthContext';

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users');

  if (user?.roleId !== 'role2') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto mb-auto flex w-full max-w-6xl flex-col gap-4">
      <h1 className="mb-6 text-2xl font-bold">Administration</h1>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } border-b-2 px-1 py-4 text-sm font-medium`}
            >
              Utilisateurs
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`${
                activeTab === 'posts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } border-b-2 px-1 py-4 text-sm font-medium`}
            >
              Publications
            </button>
          </nav>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        {activeTab === 'users' && <UsersTable />}
        {activeTab === 'posts' && <PostsTable />}
      </div>
    </div>
  );
};

export default AdminPage;
