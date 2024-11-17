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
    return <p className="text-center text-red-600">{userError.message}</p>;
  }
  return (
    <>
      <NavLink to={`/profil/${user?.id}`}>
        <Avatar src={user?.profilePhoto || ProfilPicture} alt="" className="mr-1" size="sm" />
      </NavLink>
      <div className="relative">
        <IconButton icon={<Bell className="size-5" />} />
        <div className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-red-600">
          <span className="text-xs text-white">8</span>
        </div>
      </div>
      <LogoutButton />
    </>
  );
}
export default UserNavInfos;
