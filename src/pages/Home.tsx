import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';

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
