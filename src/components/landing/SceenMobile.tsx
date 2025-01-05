import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Button from '../ui/Button';

function SceenMobile() {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className="z-20 m-auto flex max-w-5xl items-center max-md:flex-col">
      <div className="md:w-1/2">
        <h2 className="text-5xl font-bold tracking-wider">
          Partagez vos <span className="text-green-9">séances</span> et vos <span className="text-green-9">progrès</span>
        </h2>
        <p className="my-6 text-lg text-neutral-11">Publiez des posts pour partager vos séances d'entraînement, vos progrès et interagir avec la communauté.</p>
        <Link to="/inscription">
          <Button>Commencez maintenant</Button>
        </Link>
      </div>
      <div className="max-sm:mt-10 md:w-1/2">
        <img src={isDark ? '/uploads/mobileDark.webp' : '/uploads/mobileLight.webp'} className="w-[500px] rounded-t-lg" alt="" />
      </div>
    </div>
  );
}
export default SceenMobile;
