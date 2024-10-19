import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';

export const profilsSuggeres = [
    {
        nom: 'John Doe',
        nomUtilisateur: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=150&auto=format&fit=crop',
        abonnes: 458,
        abonnements: 365
    },
    {
        nom: 'Jane Smith',
        nomUtilisateur: 'janesmith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
        abonnes: 1024,
        abonnements: 512
    },
    {
        nom: 'Alex Johnson',
        nomUtilisateur: 'alexj',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop',
        abonnes: 789,
        abonnements: 421
    }
];

function Home() {
    return (
        <div className="mx-auto flex max-h-screen min-h-screen w-full max-w-6xl">
            <div className="flex w-1/4 flex-col px-4">
                <ProfilCard />
            </div>
            <div className="flex max-h-screen w-2/4 flex-col overflow-hidden">
                <div className="no-scrollbar mb-10 flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
                    <InputPost />
                    <AllPosts />
                </div>
            </div>
            <div className="flex w-1/4 flex-col px-4">
                <SuggestedProfils />
            </div>
        </div>
    );
}

export default Home;
