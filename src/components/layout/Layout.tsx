import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-neutral-1">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
