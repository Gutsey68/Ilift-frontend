import { Link } from 'react-router-dom';
import Button from '../ui/Button';

/**
 * Section héros principale de la landing page
 * Affiche le message principal et les boutons d'appel à l'action
 * - Bouton d'inscription
 * - Bouton "En savoir plus" avec ancre vers les fonctionnalités
 * @component
 * @returns {JSX.Element} Section héros avec titre et CTA
 */
function HeroSection() {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="flex w-full gap-6">
        <div className="m-auto flex-col items-center text-pretty text-center">
          <h1 className="text-5xl font-bold tracking-wider">Trackez vos séances, </h1>
          <p className="text-5xl font-bold tracking-wider text-green-9">partagez votre progression.</p>
          <p className="mt-6 text-neutral-11">Rejoignez notre communauté de sportifs,</p>
          <p className="mb-6 text-neutral-11">et profitez d'une plateforme dédiée pour suivre vos performances et inspirer les autres.</p>
          <div className=" flex justify-center gap-2">
            <Link className="z-10" to="/inscription">
              <Button className="w-fit">Je m'inscris</Button>
            </Link>
            <a className="z-10" href="#features">
              <Button variant="outline" className="w-fit">
                En savoir plus
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HeroSection;
