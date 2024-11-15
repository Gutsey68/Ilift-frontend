import { createBrowserRouter } from 'react-router-dom';
import NorAuthenticatedRoute from '../components/auth/NotAuthenticatedRoute';
import PrivateRoute from '../components/auth/PrivateRoute';
import Layout from '../components/layout/Layout';
import ActivitiesPage from '../pages/ActivitiesPage';
import ActivityDetailPage from '../pages/ActivityDetailPage';
import ExerciceDetailPage from '../pages/ExerciceDetailPage';
import ExercicesPage from '../pages/ExercicesPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import PageError from '../pages/PageError';
import ProfilPage from '../pages/ProfilPage';
import ProgramDetailPage from '../pages/ProgramDetailPage';
import ProgramsPage from '../pages/ProgramsPage';
import RegisterPage from '../pages/RegisterPage';
import Thread from '../pages/Thread';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <PageError />,
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: 'connexion',
        element: <NorAuthenticatedRoute />,
        children: [
          {
            path: '',
            element: <LoginPage />
          }
        ]
      },
      {
        path: 'inscription',
        element: <NorAuthenticatedRoute />,
        children: [
          {
            path: '',
            element: <RegisterPage />
          }
        ]
      },
      {
        path: 'mot-de-passe-oublie',
        element: <NorAuthenticatedRoute />,
        children: [
          {
            path: '',
            element: <ForgotPasswordPage />
          }
        ]
      },
      {
        path: 'tableau-de-bord',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <Thread />
          }
        ]
      },
      {
        path: 'profil/:id',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ProfilPage />
          }
        ]
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
