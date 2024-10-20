import usersData from '../../../seeds.json';
import Avatar from '../ui/Avatar';

function SuggestedProfils() {
    return (
        <section className="sticky top-[80px] flex flex-col gap-4 rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1  to-neutral-2 p-4">
            <div className="w-full border-b border-neutral-6 px-2 pb-2">
                <h2 className="font-semibold text-neutral-12">Profils suggérés</h2>
            </div>
            {usersData.users.map((user, index) => (
                <div key={index} className="flex items-center gap-4">
                    <Avatar alt="" size="sm" src={user.profilePhoto} />
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-neutral-12">{user.pseudo}</h1>
                        <p className="text-xs text-neutral-11">@{user.bio}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}
export default SuggestedProfils;
