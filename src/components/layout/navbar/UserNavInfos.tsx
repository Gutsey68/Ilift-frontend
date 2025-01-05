import { useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AuthContext } from '../../../context/AuthContext';
import RightNavSkeleton from '../../skeletons/RightNavSkeleton';
import Avatar from '../../ui/Avatar';
import NotificationBell from './NotificationBell';
import SearchNav from './SearchNav';
import UserAvatarModal from './UserAvatarModal';

function UserNavInfos() {
  const { userPending, userError, user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const rect = avatarRef.current?.getBoundingClientRect();
    if (rect) {
      setShowModal(true);
    }
  };

  if (userPending) {
    return <RightNavSkeleton />;
  }

  if (userError) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="sm:hidden">
        <SearchNav />
      </div>
      <NotificationBell />
      <div ref={avatarRef} onClick={handleClick} className="cursor-pointer">
        <Avatar src={user?.profilePhoto || '/uploads.profil.webp'} alt="" size="sm" />
      </div>
      {showModal && createPortal(<UserAvatarModal closeModal={() => setShowModal(false)} avatarRef={avatarRef} />, document.body)}
    </div>
  );
}
export default UserNavInfos;
