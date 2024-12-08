import { formatRelativeTime } from '../../../lib/formatRelativeTime';
import { NotificationType } from '../../../types/notificationType';
import Avatar from '../../ui/Avatar';

type NotificationItemProps = {
  notification: NotificationType;
};

const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <div
      className={`flex items-center gap-3
     p-2`}
    >
      <Avatar size="sm" src={notification.userAvatar} alt={`Avatar de ${notification.userId}`} />
      <div>
        <p className="text-sm text-neutral-11">{notification.content}</p>
        <span className="text-xs text-neutral-10">{formatRelativeTime(notification.createdAt.toISOString())}</span>
      </div>
    </div>
  );
};

export default NotificationItem;
