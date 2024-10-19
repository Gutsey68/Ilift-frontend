import { profilsSuggeres } from '../../pages/Home';
import Avatar from '../ui/Avatar';

function AllPosts() {
    return (
        <>
            {profilsSuggeres.map((profil, index) => (
                <div key={index} className="mt-4 flex flex-col gap-4 rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2 p-4">
                    <div className="flex gap-4">
                        <Avatar alt="" size="sm" src={profil.avatar} />
                        <div className="flex flex-col">
                            <h1 className="text-sm font-semibold text-neutral-12">{profil.nom}</h1>
                            <p className="text-xs text-neutral-11">@{profil.nomUtilisateur}</p>
                        </div>
                    </div>
                    <img className="h-80 object-cover" src={profil.avatar} alt="" />
                    <p className="m-2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente harum quasi, tenetur suscipit fuga facilis enim dolor beatae odit
                        quidem nam, eaque voluptates ullam quae ducimus? Dicta magnam omnis incidunt odit ad, suscipit consequatur ea assumenda at, officia
                        eligendi aut.
                    </p>
                </div>
            ))}
        </>
    );
}
export default AllPosts;
