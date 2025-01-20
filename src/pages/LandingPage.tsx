import FeaturesSection from '../components/landing/FeaturesSection';
import HeroSection from '../components/landing/HeroSection';
import SceenMobile from '../components/landing/SceenMobile';
import ScreenShotHero from '../components/landing/ScreenShotHero';
import { Spacing } from '../components/ui/Spacing';

/**
 * Page d'accueil de l'application ILift
 * Fonctionnalités :
 * - Affichage de la section héro
 * - Présentation des fonctionnalités
 * - Affichage des captures d'écran
 * - Affichage de la version mobile
 *
 * @component
 * @returns {JSX.Element} Page d'accueil de l'application ILift
 */
function LandingPage() {
  return (
    <>
      <Spacing size="md" />
      <HeroSection />
      <Spacing size="sm" />
      <ScreenShotHero />
      <Spacing size="xl" />
      <FeaturesSection />
      <Spacing size="xl" />
      <SceenMobile />
      <Spacing size="md" />
    </>
  );
}

export default LandingPage;
