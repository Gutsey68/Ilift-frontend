import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { getUserNotifications, markAllNotificationsAsRead } from '../../../services/notificationsService';
import IconButton from '../../ui/IconButton';
import NotificationModal from './NotificationModal';

function NotificationBell() {
  const [showModal, setShowModal] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => {
      if (!user?.id) {
        throw new Error("L'id de l'utilisateur n'est pas défini");
      }
      return getUserNotifications(user.id);
    },
    refetchInterval: 30000,
    enabled: !!user
  });

  const { mutate: markAllAsRead } = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const notifications = data?.notifications;

  const unreadCount = data?.unreadCount ?? 0;
  const displayCount = unreadCount > 9 ? '9+' : unreadCount;

  const handleClick = () => {
    const rect = bellRef.current?.getBoundingClientRect();
    if (rect) {
      setShowModal(true);
      markAllAsRead();
    }
  };

  return (
    <>
      <div ref={bellRef} onClick={handleClick} className="group relative cursor-pointer">
        <IconButton icon={<Bell className="size-5 group-hover:text-green-9" />} />
        {unreadCount > 0 && (
          <div className="absolute left-[18px] top-0 flex size-5 items-center justify-center rounded-full border-2 border-neutral-1 bg-red-9">
            <span className="text-xs text-white">{displayCount}</span>
          </div>
        )}
      </div>
      {showModal && <NotificationModal closeModal={() => setShowModal(false)} bellRef={bellRef} notifications={notifications} isLoading={isLoading} />}
    </>
  );
}

export default NotificationBell;
