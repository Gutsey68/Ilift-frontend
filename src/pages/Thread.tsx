import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';

function Thread() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-6xl gap-6">
            <div className="flex w-1/4 flex-col">
                <ProfilCard />
            </div>
            <div className="no-scrollbar mb-10 flex w-2/4 flex-col">
                <InputPost />
                <AllPosts />
            </div>
            <div className="flex w-1/4 flex-col">
                <SuggestedProfils />
            </div>
        </div>
    );
}

export default Thread;
