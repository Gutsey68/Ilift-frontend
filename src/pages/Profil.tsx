import ProfileCard from '../components/profile/ProfileCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';

function Profil() {
    return (
        <div className="mx-auto flex w-full max-w-6xl gap-6">
            <div className="flex w-2/3 flex-col rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2">
                <ProfileCard />
            </div>
            <div className="w-1/3">
                <SuggestedProfils />
            </div>
        </div>
    );
}
export default Profil;
