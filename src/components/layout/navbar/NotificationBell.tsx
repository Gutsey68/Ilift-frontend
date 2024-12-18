import { Bell } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '../../ui/IconButton';
import NotificationModal from './NotificationModal';

function NotificationBell() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)} className="group relative cursor-pointer">
        <IconButton icon={<Bell className="size-5 group-hover:text-green-9" />} />
        <div className="absolute left-[18px] top-0 flex size-5 items-center justify-center rounded-full border-2 border-neutral-1 bg-red-600">
          <span className="text-xs text-white">9</span>
        </div>
      </div>
      {showModal && createPortal(<NotificationModal closeModal={() => setShowModal(false)} />, document.body)}
    </>
  );
}

export default NotificationBell;
