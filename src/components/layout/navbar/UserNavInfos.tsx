import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import ProfilPicture from '../../../assets/images/profil.png';
import { AuthContext } from '../../../context/AuthContext';
import RightNavSkeleton from '../../skeletons/RightNavSkeleton';
import Avatar from '../../ui/Avatar';
import NotificationBell from './NotificationBell';
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
      <NotificationBell />
      <div onClick={() => setShowModal(true)} className="cursor-pointer">
        <Avatar src={user?.profilePhoto || ProfilPicture} alt="" size="sm" />
      </div>
      {showModal && createPortal(<UserAvatarModal closeModal={() => setShowModal(false)} />, document.body)}
    </div>
  );
}
export default UserNavInfos;
