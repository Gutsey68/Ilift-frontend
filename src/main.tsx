import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import About from './pages/About';
import AuthPage from './pages/AuthPage';
import PageError from './pages/PageError';
import Thread from './pages/Thread';
import './styles/global.css';

const router = createBrowserRouter([
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
                path: 'à-propos',
                element: <About />
            }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
