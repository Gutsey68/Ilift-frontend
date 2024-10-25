import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ActivitiesPage from '../pages/ActivitiesPage';
import AuthPage from '../pages/AuthPage';
import PageError from '../pages/PageError';
import ProfilPage from '../pages/ProfilPage';
import Thread from '../pages/Thread';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <PageError />,
    children: [
      {
        path: 'tableau-de-bord',
        element: <Thread />
      },
      {
        path: '',
        element: <AuthPage />
      },
      {
        path: 'profil/:id',
        element: <ProfilPage />
      },
      {
        path: 'activités',
        element: <ActivitiesPage />
      }
    ]
  }
]);
