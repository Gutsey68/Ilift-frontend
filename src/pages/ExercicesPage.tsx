import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function ExercicesPage() {
  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Exercices</h1>
          <p className="mt-1 text-neutral-11">Push</p>
        </div>
        <Button>Ajouter un exercice</Button>
      </div>
      <hr className="border-neutral-6" />
      <Link to={`/programmes/${1}/exercices/${1}`}>
        <div className="group cursor-pointer">
          <h2 className="font-semibold group-hover:text-green-9">Développé décliné avec haltères</h2>
        </div>
      </Link>
      <hr className="border-neutral-6" />
      <div className="group cursor-pointer">
        <h2 className="font-semibold group-hover:text-green-9">Développé assis à la machine</h2>
      </div>
      <hr className="border-neutral-6" />
      <div className="group cursor-pointer">
        <h2 className="font-semibold group-hover:text-green-9">Ecarté poulis vis à vis haut de pec</h2>
      </div>
    </div>
  );
}
export default ExercicesPage;
