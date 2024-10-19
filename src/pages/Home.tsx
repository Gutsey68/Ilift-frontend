import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';

export const profilsSuggeres = [
    {
        nom: 'John Doe',
        nomUtilisateur: 'johndoe',
        avatar: 'https://plus.unsplash.com/premium_photo-1663036312913-620738b33f69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHByb2ZpbCUyMGd5bXxlbnwwfHwwfHx8MA%3D%3D',
        abonnes: 458,
        abonnements: 365
    },
    {
        nom: 'Jane Smith',
        nomUtilisateur: 'janesmith',
        avatar: 'https://plus.unsplash.com/premium_photo-1663099378438-e12bc1291e2c?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        abonnes: 1024,
        abonnements: 512
    },
    {
        nom: 'Alex Johnson',
        nomUtilisateur: 'alexj',
        avatar: 'https://plus.unsplash.com/premium_photo-1664478116490-1ffba1f22fdd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHByb2ZpbCUyMGd5bXxlbnwwfHwwfHx8MA%3D%3D',
        abonnes: 789,
        abonnements: 421
    }
];

function Home() {
    return (
        <div className="mx-auto flex max-h-screen min-h-screen w-full max-w-6xl gap-2">
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
