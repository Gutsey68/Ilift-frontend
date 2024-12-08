import { Bell } from 'lucide-react';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import ProfilPicture from '../../../assets/images/profil.png';
import { AuthContext } from '../../../context/AuthContext';
import RightNavSkeleton from '../../skeletons/RightNavSkeleton';
import Avatar from '../../ui/Avatar';
import IconButton from '../../ui/IconButton';
import UserAvatarModal from './UserAvatarModal';

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
    <div className="flex items-center gap-4">
      <div className="relative cursor-pointer">
        <IconButton icon={<Bell className="size-5" />} />
        <div className="absolute left-[18px] top-0 flex size-5 items-center justify-center rounded-full border-2 border-neutral-1 bg-red-600">
          <span className="text-xs text-white">9</span>
        </div>
      </div>
      <div onClick={() => setShowModal(true)} className="cursor-pointer">
        <Avatar src={user?.profilePhoto || ProfilPicture} alt="" size="sm" />
      </div>
      {showModal && createPortal(<UserAvatarModal closeModal={() => setShowModal(false)} />, document.body)}
    </div>
  );
}
export default UserNavInfos;
