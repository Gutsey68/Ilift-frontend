import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import { Spacing } from '../components/ui/Spacing';

export default function PageError() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col justify-between bg-neutral-1">
      <Header />
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-green-9">404</h1>
          <p className="mt-4 text-2xl font-medium text-neutral-12">Oops! Cette page n'existe pas</p>
          <p className="mb-4 mt-2 text-lg text-neutral-11">La page que vous recherchez n'existe pas ou a été déplacée.</p>
          <Button onClick={() => navigate('/')}>Revenir à l'accueil</Button>
        </div>
      </div>
      <Spacing />
      <Footer />
    </main>
  );
}
