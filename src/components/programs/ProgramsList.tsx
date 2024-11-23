import { Link } from 'react-router-dom';
import { ProgramType } from '../../types/programsType';

type ProgramsListProps = {
  programs: ProgramType[];
};

function ProgramsList({ programs }: ProgramsListProps) {
  return (
    <div>
      {programs.map(program => (
        <div key={program.id}>
          <hr className=" border-neutral-6" />
          <Link to={`/programmes/${program.id}`}>
            <div className="group mb-4 cursor-pointer">
              <h2 className="mt-3 font-semibold group-hover:text-green-9">{program.name}</h2>
              <p className="text-sm text-neutral-10">{program.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default ProgramsList;
