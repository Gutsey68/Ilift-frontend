import ThreadSkeleton from '../components/skeletons/ThreadSkeleton';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import { useAuthStore } from '../stores/useAuthStore';

function Thread() {
  const currentUser = useAuthStore(state => state.currentUser);

  if (!currentUser) {
    return <ThreadSkeleton />;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-1/4 flex-col">{currentUser && <ProfilCard usersData={currentUser} />}</div>
      <div className="mb-10 flex w-2/4 flex-col">
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
