import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
    return (
        <main className="flex flex-col justify-between min-h-screen bg-neutral-1 gradient">
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
}
