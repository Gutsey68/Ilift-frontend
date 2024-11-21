import { Link } from 'react-router-dom';
import ScreenShot from '../assets/images/show-develop-menu-in-menu-bar.webp';
import BlurBackground from '../components/ui/BackgroundBlur';
import Button from '../components/ui/Button';
import { Spacing } from '../components/ui/Spacing';

function LandingPage() {
  return (
    <>
      <Spacing size="md" />
      <div className="mx-auto max-w-6xl">
        <section className="flex w-full gap-6">
          <div className="m-auto flex-col items-center text-pretty text-center">
            <h1 className="text-5xl font-bold tracking-wider">Trackez vos séances, </h1>
            <p className="text-5xl font-bold tracking-wider text-green-9">partagez votre progression.</p>
            <p className="mt-6 text-neutral-11">Rejoignez notre communauté de sportifs,</p>
            <p className="mb-6 text-neutral-11">et profitez d'une plateforme dédiée pour suivre vos performances et inspirer les autres.</p>
            <div className=" flex justify-center gap-2">
              <Link className="z-10" to="/connexion">
                <Button className="w-fit">Je m'inscris</Button>
              </Link>
              <Button className="z-10 w-fit border border-neutral-8 bg-neutral-1 text-neutral-11 shadow-sm hover:bg-neutral-2">En savoir plus</Button>
            </div>
          </div>
        </section>
      </div>
      <Spacing size="sm" />
      <div className="relative m-auto flex justify-center">
        <div className="image-container relative z-10 m-auto w-3/4">
          <img src={ScreenShot} alt="" />
        </div>
        <div className="background-overlay"></div>
      </div>

      <BlurBackground />
      <Spacing size="md" />
    </>
  );
}
export default LandingPage;
