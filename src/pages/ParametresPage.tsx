import { Camera, Pencil } from 'lucide-react';
import { useContext } from 'react';
import ProfilPicture from '../assets/images/profil.png';
import Avatar from '../components/ui/Avatar';
import { Spacing } from '../components/ui/Spacing';
import { AuthContext } from '../context/AuthContext';

function ParametresPage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="m-auto flex w-full max-w-6xl flex-col gap-4 text-neutral-11">
        <h1 className="text-3xl font-bold tracking-wider text-neutral-12">Mon profil</h1>
        <hr className="border-neutral-6" />
        <p>Photo actuelle</p>
        <div className="relative flex w-fit flex-col items-center lg:ml-24">
          <Avatar src={user?.profilePhoto || ProfilPicture} alt="" size="xl" />
          <button className="absolute bottom-10 right-1 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-1 bg-neutral-10 shadow-md hover:bg-neutral-9">
            <Camera size={20} className="text-neutral-1" />
          </button>
          <button className="pt-4 text-green-11 hover:underline">Supprimer</button>
        </div>
        <hr className="border-neutral-6" />
        <p className="group cursor-pointer">
          Lieu{' '}
          <span className="ml-4 text-neutral-12 group-hover:text-green-11">
            {user?.city?.name}
            <Pencil size={16} className="ml-2 inline-block opacity-0 group-hover:opacity-100" />
          </span>{' '}
        </p>
        <hr className="border-neutral-6" />
        <p className="group cursor-pointer">
          Bio{' '}
          <span className="ml-4 text-neutral-12 group-hover:text-green-11">
            {user?.bio}
            <Pencil size={16} className="ml-2 inline-block opacity-0 group-hover:opacity-100" />
          </span>{' '}
        </p>
      </div>
      <Spacing />
    </>
  );
}
export default ParametresPage;
