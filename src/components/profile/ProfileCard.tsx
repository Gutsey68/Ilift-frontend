import { CalendarDays, Camera, MapPin } from 'lucide-react';
import Avatar from '../ui/Avatar';

function ProfileCard() {
    return (
        <div className="flex items-center gap-4 border-b border-neutral-6 p-4">
            <div className="relative">
                <Avatar
                    src="https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="mr-1"
                    size="xl"
                />
                <div className="absolute bottom-3 right-1 flex size-8 cursor-pointer items-center justify-center rounded-full bg-neutral-11 shadow-md">
                    <Camera strokeWidth={3} size={22} className="text-neutral-4" />
                </div>
            </div>
            <div className="">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-neutral-11">Just a regular guy.</p>
                <div className="mt-2 flex items-center gap-6 text-sm text-neutral-10">
                    <p>
                        <MapPin size={16} className="mr-1 inline-block" />
                        Strasbourg, France.
                    </p>
                    <p>
                        <CalendarDays size={16} className="mr-1 inline-block" />A rejoint Ilift en octobre 2022
                    </p>
                </div>
                <div className="mt-2 flex items-center gap-6 text-sm text-neutral-10">
                    <p className="flex items-center gap-1">
                        <span className="text-lg font-semibold text-green-9">143</span>
                        abonnements
                    </p>
                    <p className="flex items-center gap-1">
                        <span className="text-lg font-semibold text-green-9">143</span>
                        abonnés
                    </p>
                    <p className="flex items-center gap-1">
                        <span className="text-lg font-semibold text-green-9">22</span>
                        activités
                    </p>
                </div>
            </div>
        </div>
    );
}
export default ProfileCard;
