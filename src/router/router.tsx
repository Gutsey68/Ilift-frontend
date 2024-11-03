import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ActivitiesPage from '../pages/ActivitiesPage';
import ActivityDetailPage from '../pages/ActivityDetailPage';
import AuthPage from '../pages/AuthPage';
import ExerciceDetailPage from '../pages/ExerciceDetailPage';
import ExercicesPage from '../pages/ExercicesPage';
import PageError from '../pages/PageError';
import ProfilPage from '../pages/ProfilPage';
import ProgramDetailPage from '../pages/ProgramDetailPage';
import ProgramsPage from '../pages/ProgramsPage';
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
        children: [
          {
            path: '',
            element: <ActivitiesPage />
          },
          {
            path: ':id',
            element: <ActivityDetailPage />
          }
        ]
      },
      {
        path: 'programmes',
        children: [
          {
            path: '',
            element: <ProgramsPage />
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                element: <ProgramDetailPage />
              },
              {
                path: 'exercices',
                children: [
                  {
                    path: '',
                    element: <ExercicesPage />
                  },
                  {
                    path: ':id',
                    element: <ExerciceDetailPage />
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]);
