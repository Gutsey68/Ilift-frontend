import { Pencil } from 'lucide-react';
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
          <div className="group flex items-center justify-between gap-8">
            <Link className="w-full" to={`/programmes/${program.id}`}>
              <div className="group mb-4 cursor-pointer">
                <h2 className="mt-3 font-semibold group-hover:text-green-9">{program.name}</h2>
                <p className="text-sm text-neutral-10 max-sm:text-xs">{program.description}</p>
              </div>
            </Link>{' '}
            <Pencil className="ml-2 inline-block cursor-pointer opacity-0 hover:text-green-11 group-hover:opacity-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProgramsList;
