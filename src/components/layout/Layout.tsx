import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
    return (
        <main className="gradient flex min-h-screen flex-col bg-neutral-1">
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
}
