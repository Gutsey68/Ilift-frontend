import { Link } from 'react-router-dom';
import { ProgramType } from '../../types/programsType';

type ProgramsListProps = {
  programs: ProgramType[];
};

function ProgramsList({ programs }: ProgramsListProps) {
  return (
    <>
      {programs.map(program => (
        <>
          <hr className="border-neutral-6" />
          <Link key={program.id} to={`/programmes/${program.id}`}>
            <div className="group cursor-pointer">
              <h2 className="font-semibold group-hover:text-green-9">{program.name}</h2>
              <p className="text-sm text-neutral-10">{program.description}</p>
            </div>
          </Link>
        </>
      ))}
    </>
  );
}
export default ProgramsList;
