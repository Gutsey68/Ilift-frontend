import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import BlurBackground from '../ui/BackgroundBlur';

/**
 * Composant affichant une capture d'écran de l'application dans la section héros
 * Adapte l'image en fonction du thème (clair/sombre)
 * @component
 * @returns {JSX.Element} Section avec capture d'écran et effet de flou
 */
function ScreenShotHero() {
  const { isDark } = useContext(ThemeContext);

  return (
    <>
      <div className="relative m-auto flex w-full justify-center">
        <div className="image-container relative z-10 m-auto w-3/4 max-sm:w-10/12">
          <img src={isDark ? '/uploads/screendark.webp' : '/uploads/ScreenLight.webp'} className="w-full rounded-t-lg border border-green-3" alt="" />
        </div>
        <div className="background-overlay border-t border-neutral-6 bg-neutral-1"></div>
      </div>
      <BlurBackground />
    </>
  );
}
export default ScreenShotHero;
