import { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import NotAuthenticatedRoute from '../components/auth/NotAuthenticatedRoute';
import PrivateRoute from '../components/auth/PrivateRoute';
import ErrorBoundary from '../components/error/ErrorBoundary';
import ErrorBoundaryWithLayout from '../components/error/ErrorBoundaryWithLayout';
import Layout from '../components/layout/Layout';
import { ProgramProvider } from '../context/ProgramContext';

/**
 * Import des composants de pages en mode lazy pour optimiser le chargement
 */
const AboutPage = lazy(() => import('../pages/AboutPage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const ExerciceDetailPage = lazy(() => import('../pages/ExerciceDetailPage'));
const ExercicesPage = lazy(() => import('../pages/ExercicesPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const LegalPage = lazy(() => import('../pages/LegalPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const Page404 = lazy(() => import('../pages/Page404'));
const ParametresPage = lazy(() => import('../pages/ParametresPage'));
const ProfilPage = lazy(() => import('../pages/ProfilePage'));
const ProgramDetailPage = lazy(() => import('../pages/ProgramDetailPage'));
const ProgramsPage = lazy(() => import('../pages/ProgramsPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));
const Thread = lazy(() => import('../pages/Thread'));

/**
 * Configuration du routeur principal de l'application
 * Structure hiérarchique des routes avec leurs protections et leurs composants associés
 *
 * Routes principales :
 * - / : Page d'accueil (accessible uniquement aux utilisateurs non authentifiés)
 * - /mentions-legales : Mentions légales (accès public)
 * - /a-propos : À propos (accès public)
 * - /parametres/:id : Paramètres utilisateur (protégée)
 * - /programmes/* : Section programmes avec sous-routes (protégée)
 * - /profil/:id : Profil utilisateur (protégée)
 * - /accueil : Fil d'actualité (protégée)
 * - /connexion : Page de connexion (non-authentifiés)
 * - /inscription : Page d'inscription (non-authentifiés)
 * - /mot-de-passe-oublie : Récupération de mot de passe (non-authentifiés)
 * - /reset-password : Réinitialisation de mot de passe (non-authentifiés)
 * - /admin : Interface d'administration (protégée)
 *
 * @type {ReturnType<typeof createBrowserRouter>}
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '',
        element: <NotAuthenticatedRoute />,
        children: [
          {
            path: '',
            element: <LandingPage />
          }
        ]
      },
      {
        path: '/mentions-legales',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <LegalPage />
          }
        ]
      },
      {
        path: '/a-propos',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <AboutPage />
          }
        ]
      },
      {
        path: 'parametres/:id',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ParametresPage />
          }
        ]
      },
      {
        path: 'programmes',
        element: (
          <ProgramProvider>
            <PrivateRoute />
          </ProgramProvider>
        ),
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <ProgramsPage />
              </ErrorBoundary>
            )
          },
          {
            path: ':id',
            element: <PrivateRoute />,
            children: [
              {
                path: '',
                element: (
                  <ErrorBoundary>
                    <ProgramDetailPage />
                  </ErrorBoundary>
                )
              },
              {
                path: 'exercices',
                element: <PrivateRoute />,
                children: [
                  {
                    path: '',
                    element: (
                      <ErrorBoundary>
                        <ExercicesPage />
                      </ErrorBoundary>
                    )
                  },
                  {
                    path: ':id',
                    element: (
                      <ErrorBoundary>
                        <ExerciceDetailPage />
                      </ErrorBoundary>
                    )
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'profil/:id',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: (
          <ErrorBoundaryWithLayout>
            <ProfilPage />
          </ErrorBoundaryWithLayout>
        )
      }
    ]
  },
  {
    path: 'accueil',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: (
          <ErrorBoundaryWithLayout>
            <Thread />
          </ErrorBoundaryWithLayout>
        )
      }
    ]
  },
  {
    path: 'connexion',
    element: <NotAuthenticatedRoute />,
    children: [
      {
        path: '',
        element: <LoginPage />
      }
    ]
  },
  {
    path: 'inscription',
    element: <NotAuthenticatedRoute />,
    children: [
      {
        path: '',
        element: <RegisterPage />
      }
    ]
  },
  {
    path: 'mot-de-passe-oublie',
    element: <NotAuthenticatedRoute />,
    children: [
      {
        path: '',
        element: <ForgotPasswordPage />
      }
    ]
  },
  {
    path: 'reset-password',
    element: <NotAuthenticatedRoute />,
    children: [
      {
        path: '',
        element: <ResetPasswordPage />
      }
    ]
  },
  {
    path: 'admin',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <AdminPage />
              </ErrorBoundary>
            )
          }
        ]
      }
    ]
  }
]);
