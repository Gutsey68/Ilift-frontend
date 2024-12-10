import { NotificationType } from '../../../types/notificationType';
import NotificationItem from './NotificationItem';

type NotificationModalProps = {
  closeModal: () => void;
};

function NotificationModal({ closeModal }: NotificationModalProps) {
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
    <div onClick={closeModal} className="fixed inset-0 z-30 flex items-center justify-center bg-transparent">
      <div onClick={e => e.stopPropagation()} className="relative mb-[10vh] w-full max-sm:px-4 sm:w-1/3"></div>
      <div className="absolute top-12 flex max-w-96 flex-col gap-2 rounded-md border border-neutral-6 bg-neutral-1 shadow-lg md:right-16 lg:right-48">
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
