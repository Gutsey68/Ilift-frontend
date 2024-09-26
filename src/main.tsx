import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import About from './pages/About';
import Home from './pages/Home';
import PageError from './pages/PageError';
import './styles/global.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <PageError />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
