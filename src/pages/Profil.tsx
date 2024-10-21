import SuggestedProfils from '../components/thread/SuggestedProfils';
import Avatar from '../components/ui/Avatar';

function Profil() {
    return (
        <div className="mx-auto flex h-80 min-h-screen w-full max-w-6xl gap-6">
            <div className="relative flex w-2/3 flex-col rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2">
                <img
                    className="h-56 w-full rounded-t-lg object-cover"
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                />
                <div className="flex size-[165px] items-center justify-center rounded-full bg-neutral-1">
                    <Avatar
                        src="https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="mr-1"
                        size="xl"
                    />
                </div>
            </div>
            <div className="w-1/3">
                <SuggestedProfils />
            </div>
        </div>
    );
}
export default Profil;
