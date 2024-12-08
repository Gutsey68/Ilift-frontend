import { Bell } from 'lucide-react';
import IconButton from '../../ui/IconButton';

function NotificationBell() {
  return (
    <div className="relative cursor-pointer max-sm:mr-3">
      <IconButton icon={<Bell className="size-5" />} />
      <div className="absolute left-[18px] top-0 flex size-5 items-center justify-center rounded-full border-2 border-neutral-1 bg-red-600">
        <span className="text-xs text-white">9</span>
      </div>
    </div>
  );
}

export default NotificationBell;
