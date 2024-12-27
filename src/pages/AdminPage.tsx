import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PostsTable from '../components/tables/PostsTable';
import UsersTable from '../components/tables/UsersTable';
import { Spacing } from '../components/ui/Spacing';
import { AuthContext } from '../context/AuthContext';

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users');

  if (user?.roleId !== 'role2') {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="mx-auto mb-auto flex w-full max-w-6xl flex-col gap-4">
        <h1 className="mb-4 text-2xl font-bold">Administration</h1>
        <div className="mb-6">
          <div className="border-b border-neutral-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users' ? 'border-green-9 text-green-11' : 'border-transparent text-neutral-11 hover:border-neutral-7 hover:text-neutral-12'
                } border-b-2 px-1 py-4 text-sm font-medium`}
              >
                Utilisateurs
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`${
                  activeTab === 'posts' ? 'border-green-9 text-green-11' : 'border-transparent text-neutral-11 hover:border-neutral-7 hover:text-neutral-12'
                } border-b-2 px-1 py-4 text-sm font-medium`}
              >
                Publications
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'users' && <UsersTable />}
        {activeTab === 'posts' && <PostsTable />}
      </div>
      <Spacing />
    </>
  );
};

export default AdminPage;
