import { Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../../theme/ThemeToggle';
import Avatar from '../../ui/Avatar';
import IconButton from '../../ui/IconButton';

function RightNav() {
    return (
        <>
            <NavLink to="/profil">
                <Avatar
                    src="https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="mr-1"
                    size="sm"
                />
            </NavLink>
            <div className="relative">
                <IconButton icon={<Bell className="size-5" />} />
                <div className="absolute right-0.5 top-0.5 flex size-3 items-center justify-center rounded-full bg-red-600"></div>
            </div>

            <ThemeToggle />
        </>
    );
}
export default RightNav;
