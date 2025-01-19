import { LoaderCircle } from 'lucide-react';

/**
 * Composant d'indicateur de chargement
 * Affiche une animation de chargement centrée sur l'écran
 */
function Spinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-1 text-neutral-11">
      <LoaderCircle size={60} className="animate-spin" />
    </div>
  );
}
export default Spinner;
