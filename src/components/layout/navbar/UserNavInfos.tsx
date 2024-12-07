import { Bell } from 'lucide-react';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProfilPicture from '../../../assets/images/profil.png';
import { AuthContext } from '../../../context/AuthContext';
import RightNavSkeleton from '../../skeletons/RightNavSkeleton';
import ThemeSwitch from '../../theme/ThemeSwitch';
import Avatar from '../../ui/Avatar';
import IconButton from '../../ui/IconButton';
import LogoutButton from './LogoutButton';

function UserNavInfos() {
  const { userPending, userError, user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  if (userPending) {
    return <RightNavSkeleton />;
  }

  if (userError) {
    return null;
  }

  return (
    <>
      <div className="relative" onMouseEnter={() => setShowModal(true)} onMouseLeave={() => setShowModal(false)}>
        <NavLink to={`/profil/${user?.id}`}>
          <Avatar src={user?.profilePhoto || ProfilPicture} alt="" className="mr-1" size="sm" />
        </NavLink>
        {showModal && (
          <div
            className="absolute top-8 mt-2 rounded-md border border-neutral-6 bg-neutral-1 p-3 shadow-md"
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
          >
            <ThemeSwitch />
            <LogoutButton />
          </div>
        )}
      </div>
      <div className="relative cursor-pointer max-sm:mr-3">
        <IconButton icon={<Bell className="size-5" />} />
        <div className="absolute left-[18px] top-0 flex size-5 items-center justify-center rounded-full border-2 border-neutral-1 bg-red-600">
          <span className="text-xs text-white">9</span>
        </div>
      </div>
    </>
  );
}
export default UserNavInfos;
