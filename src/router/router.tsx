import { createBrowserRouter } from 'react-router-dom';
import NorAuthenticatedRoute from '../components/auth/NotAuthenticatedRoute';
import PrivateRoute from '../components/auth/PrivateRoute';
import Layout from '../components/layout/Layout';
import ExerciceDetailPage from '../pages/ExerciceDetailPage';
import ExercicesPage from '../pages/ExercicesPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import ProfilPage from '../pages/ProfilePage.tsx';
import ProgramDetailPage from '../pages/ProgramDetailPage';
import ProgramsPage from '../pages/ProgramsPage';
import RegisterPage from '../pages/RegisterPage';
import Thread from '../pages/Thread';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Page404 />,
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
        path: 'accueil',
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
        path: 'programmes',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ProgramsPage />
          },
          {
            path: ':id',
            element: <PrivateRoute />,
            children: [
              {
                path: '',
                element: <ProgramDetailPage />
              },
              {
                path: 'exercices',
                element: <PrivateRoute />,
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
