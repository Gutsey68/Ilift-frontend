import Button from '../components/ui/Button';

function LandingPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="m-auto flex-col items-center text-pretty text-center">
        {' '}
        <h1 className="text-5xl font-bold tracking-wider">Trackez vos séances, </h1>
        <p className="text-5xl font-bold tracking-wider text-green-9">partagez votre progression.</p>
        <p className="mt-6 text-neutral-10">Rejoignez notre communauté de sportifs,</p>
        <p className="mb-6 text-neutral-10">et profitez d'une plateforme dédiée pour suivre vos performances et inspirer les autres.</p>
        <div className="flex justify-center gap-2">
          <Button className="w-fit">Je m'inscris</Button>
          <Button className="w-fit border border-neutral-6 bg-neutral-1 text-neutral-11 shadow-sm hover:bg-neutral-2">En savoir plus</Button>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
