import { useContext } from 'react';
import ScreenDark from '../../assets/images/screendark.png';
import ScreenLight from '../../assets/images/ScreenLight.png';
import { ThemeContext } from '../../context/ThemeContext';
import BlurBackground from '../ui/BackgroundBlur';

function ScreenShotHero() {
  const { isDark } = useContext(ThemeContext);

  return (
    <>
      <div className="relative m-auto flex w-full justify-center">
        <div className="image-container relative z-10 m-auto w-3/4 max-sm:w-10/12">
          {isDark ? <img src={ScreenDark} className="w-full" alt="" /> : <img src={ScreenLight} className="w-full" alt="" />}
        </div>
        <div className="background-overlay border-t border-neutral-6 bg-neutral-1"></div>
      </div>
      <BlurBackground />
    </>
  );
}
export default ScreenShotHero;
