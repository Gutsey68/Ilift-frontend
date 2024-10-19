import { Bell } from 'lucide-react';
import ThemeToggle from '../theme/ThemeToggle';
import Avatar from '../ui/Avatar';
import IconButton from '../ui/IconButton';

function RightNav() {
    return (
        <>
            <Avatar
                src="https://www.seyzeriat.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgauthier.d365b7d6.png&w=640&q=75"
                alt=""
                className="mr-2"
                size="sm"
            />
            <IconButton icon={<Bell className="size-5" />} />
            <ThemeToggle />
        </>
    );
}
export default RightNav;
