import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import MobileBottomNav from './navbar/MobileBottomNav';

export default function Layout() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-neutral-1 max-md:px-4">
      <Header />
      <Outlet />
      <Footer />
      <MobileBottomNav />
    </main>
  );
}
