import { useEffect, useState } from 'react';
import { NotificationType } from '../../../types/notificationType';
import NotificationItem from './NotificationItem';

type NotificationModalProps = {
  closeModal: () => void;
  bellRef: React.RefObject<HTMLDivElement>;
};

function NotificationModal({ closeModal, bellRef }: NotificationModalProps) {
  const [position, setPosition] = useState({ top: 0, right: 0 });

  const updatePosition = () => {
    const rect = bellRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        right: window.innerWidth - rect.right - 13
      });
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  const notifications: NotificationType[] = [
    {
      id: '1',
      userId: 'fit_mom',
      userAvatar:
        'https://images.unsplash.com/photo-1645810809381-97f6fd2f7d10?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      type: 'comment',
      content: 'fit_mom a commenté votre post.',
      isRead: false,
      createdAt: new Date()
    },
    {
      id: '2',
      userId: 'tech_lifter',
      userAvatar:
        'https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D',
      type: 'like',
      content: 'tech_lifter a aimé votre post.',
      isRead: true,
      createdAt: new Date()
    }
  ];

  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 bg-transparent">
      <div
        onClick={e => e.stopPropagation()}
        className="fixed z-40 flex max-w-96 flex-col gap-2 rounded-md border border-neutral-6 bg-neutral-1 shadow-lg"
        style={{
          top: position.top,
          right: position.right
        }}
      >
        <p className="mx-3 mt-2 text-neutral-11">Notifications</p>
        <hr className="border-neutral-6" />
        <div className="m-2">
          {notifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
