import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import MobileBottomNav from './navbar/MobileBottomNav';

/**
 * Composant de mise en page principal de l'application
 * Fonctionnalités :
 * - Structure générale de l'application
 * - En-tête fixe
 * - Contenu principal dynamique (Outlet)
 * - Pied de page
 * - Navigation mobile en bas d'écran
 * - Gestion responsive du padding
 *
 * @component
 * @returns {JSX.Element} Structure complète de l'application
 */
export default function Layout() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-neutral-1 max-lg:px-4">
      <Header />
      <Outlet />
      <Footer />
      <MobileBottomNav />
    </main>
  );
}
