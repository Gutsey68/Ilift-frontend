import useEscapeKeydown from '../../../hooks/useEscapeKeydown';
import useFloatingModal from '../../../hooks/useFloatingModal';
import { NotificationType } from '../../../types/notificationType';
import NotificationItem from './NotificationItem';

type NotificationModalProps = {
  closeModal: () => void;
  bellRef: React.RefObject<HTMLDivElement>;
  notifications?: NotificationType[];
  isLoading: boolean;
};

function NotificationModal({ closeModal, bellRef, notifications = [], isLoading }: NotificationModalProps) {
  useEscapeKeydown(closeModal);
  const position = useFloatingModal(bellRef, closeModal);

  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 bg-transparent">
      <div
        onClick={e => e.stopPropagation()}
        className="fixed z-40 flex max-w-96 flex-col gap-1 rounded-md border border-neutral-6 bg-neutral-1 shadow-lg"
        style={{ top: position.top, right: position.right }}
      >
        <p className="mx-3 mb-1 mt-2 text-neutral-11">Notifications</p>
        <hr className="border-neutral-6" />
        <div className="mx-1 mb-1">
          {isLoading ? (
            <p className="text-sm text-neutral-11">Chargement...</p>
          ) : notifications.length === 0 ? (
            <p
              className="m-2 text-sm text-neutral-11
            "
            >
              Aucune notification
            </p>
          ) : (
            notifications.map(notification => <NotificationItem key={notification.id} notification={notification} onClose={closeModal} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
