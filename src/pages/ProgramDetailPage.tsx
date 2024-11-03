import { Link, useParams } from 'react-router-dom';

function ProgramDetailPage() {
  const { id } = useParams();
  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <h1 className="text-3xl">Séances</h1>
      <p>PPL / Upperlower</p>
      <hr className="border-neutral-6" />
      <Link to={`/programmes/${1}/exercices`}>
        <div className="group cursor-pointer">
          <h2 className="font-semibold group-hover:text-green-9">Push</h2>
        </div>
      </Link>
      <div className="group cursor-pointer">
        <h2 className="font-semibold group-hover:text-green-9">Pull</h2>
      </div>
      <div className="group cursor-pointer">
        <h2 className="font-semibold group-hover:text-green-9">Legs</h2>
      </div>
      <div className="group cursor-pointer">
        <h2 className="font-semibold group-hover:text-green-9">Upper</h2>
      </div>
      <div className="group cursor-pointer">
        <h2 className="font-semibold group-hover:text-green-9">Lower</h2>
      </div>
    </div>
  );
}
export default ProgramDetailPage;
