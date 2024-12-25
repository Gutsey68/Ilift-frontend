import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminPage = () => {
  const { user } = useContext(AuthContext);

  if (user?.roleId !== 'role2') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto mb-auto flex w-full max-w-6xl flex-col gap-4">
      <h1 className="mb-6 text-2xl font-bold">Administration</h1>
      <p>Page admin</p>
    </div>
  );
};

export default AdminPage;
