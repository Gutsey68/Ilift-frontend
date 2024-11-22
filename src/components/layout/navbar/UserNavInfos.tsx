import { Bell } from 'lucide-react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ProfilPicture from '../../../assets/images/profil.png';
import { AuthContext } from '../../../context/AuthContext';
import RightNavSkeleton from '../../skeletons/RightNavSkeleton';
import Avatar from '../../ui/Avatar';
import IconButton from '../../ui/IconButton';
import LogoutButton from './LogoutButton';

function UserNavInfos() {
  const { userPending, userError, user } = useContext(AuthContext);

  if (userPending) {
    return <RightNavSkeleton />;
  }

  if (userError) {
    return null;
  }

  return (
    <>
      <NavLink className="max-sm:hidden" to={`/profil/${user?.id}`}>
        <Avatar src={user?.profilePhoto || ProfilPicture} alt="" className="mr-1" size="sm" />
      </NavLink>
      <div className="relative cursor-pointer max-sm:mr-3">
        <IconButton icon={<Bell className="size-5" />} />
        <div className="absolute left-[18px] top-0 flex size-5 items-center justify-center rounded-full border-2 border-neutral-1 bg-red-600">
          <span className="text-xs text-white">9</span>
        </div>
      </div>
      <LogoutButton />
    </>
  );
}
export default UserNavInfos;
