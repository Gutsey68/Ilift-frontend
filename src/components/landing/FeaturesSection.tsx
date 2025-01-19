import { Activity, Dumbbell, Share2, Users } from 'lucide-react';
import Card from '../ui/Card';

/**
 * Section présentant les principales fonctionnalités de l'application
 * Affiche trois cartes mettant en avant :
 * - Le suivi des séances
 * - Le partage social
 * - La communauté
 * Utilise des icônes et une mise en page responsive
 * @component
 * @returns {JSX.Element} Section des fonctionnalités avec cartes
 */
function FeaturesSection() {
  return (
    <section id="features" className="z-10 mx-auto max-w-6xl">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Ce que{' '}
        <span className="text-green-9">
          <Dumbbell size={34} className="inline-block pr-1" />
          Ilift
        </span>{' '}
        vous offre
      </h2>
      <div className="flex gap-4 max-sm:flex-col">
        <Card className="flex-1" size="md">
          <Activity className="mb-2 text-green-11" />
          <h3 className="mb-1 text-lg font-semibold">Suivi des séances</h3>
          <p className="text-sm text-neutral-10">Enregistrez facilement vos exercices, séries, répétitions et poids pour chaque séance.</p>
        </Card>
        <Card className="flex-1" size="md">
          <Share2 className="mb-2 text-green-11" />
          <h3 className="mb-1 text-lg font-semibold">Partage social</h3>
          <p className="text-sm text-neutral-10">Publiez vos efforts et inspirez la communauté avec vos progrès.</p>
        </Card>
        <Card className="flex-1" size="md">
          <Users className="mb-2 text-green-11" />
          <h3 className="mb-1 text-lg font-semibold">Communauté active</h3>
          <p className="text-sm text-neutral-10">Connectez-vous avec d'autres passionnés, échangez des conseils et motivez-vous mutuellement.</p>
        </Card>
      </div>
    </section>
  );
}
export default FeaturesSection;
