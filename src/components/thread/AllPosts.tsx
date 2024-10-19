import { profilsSuggeres } from '../../pages/Home';
import Avatar from '../ui/Avatar';

function AllPosts() {
    return (
        <>
            {profilsSuggeres.map((profil, index) => (
                <div key={index} className="mt-4 flex flex-col gap-4 rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2">
                    <div className="flex gap-4 px-4 pt-4">
                        <Avatar alt="" size="sm" src={profil.avatar} />
                        <div className="flex flex-col">
                            <h1 className="text-sm font-semibold text-neutral-12">{profil.nom}</h1>
                            <p className="text-xs text-neutral-11">@{profil.nomUtilisateur}</p>
                        </div>
                    </div>
                    <img className="h-auto w-full" src={profil.avatar} alt="" />
                    <div className="px-4">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        <div className="flex gap-4 py-4">
                            <button className="text-neutral-12 hover:text-neutral-11">Like</button>
                            <button className="text-neutral-12 hover:text-neutral-11">Comment</button>
                            <button className="text-neutral-12 hover:text-neutral-11">Share</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
export default AllPosts;
