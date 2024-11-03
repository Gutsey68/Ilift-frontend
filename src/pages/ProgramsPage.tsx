import { Link } from 'react-router-dom';

function ProgramsPage() {
  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <h1 className="text-3xl">Mes programmes</h1>
      <hr className="border-neutral-6" />
      <Link to={`/programmes/${1}`}>
        <div className="group cursor-pointer">
          <h2 className="font-semibold group-hover:text-green-9">PPL / Upperlower</h2>
          <p className="text-sm text-neutral-10">Programme 5 jours</p>
        </div>
      </Link>
      <hr className="border-neutral-6" />
    </div>
  );
}
export default ProgramsPage;
