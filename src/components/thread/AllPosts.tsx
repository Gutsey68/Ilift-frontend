import { Earth, Heart, MessageCircle, Send } from 'lucide-react';
import data from '../../../seeds.json';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import Avatar from '../ui/Avatar';

// Récupérer les utilisateurs et les posts
const { users, posts } = data;

// Fonction pour trouver l'utilisateur correspondant à un post
function getUserById(userId: number) {
  return users.find(user => user.id === userId);
}

function AllPosts() {
  return (
    <>
      {posts.map((post, index) => {
        const user = getUserById(post.userId);
        return (
          <div key={index} className="mt-4 flex flex-col gap-4 rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2 shadow-sm">
            <div className="flex gap-4 px-4 pt-4">
              <Avatar alt="" size="sm" src={user?.profilePhoto || ''} />
              <div className="flex flex-col">
                <h1 className="font-semibold text-neutral-12">{user?.pseudo}</h1>
                <div className="flex items-center gap-1 text-xs text-neutral-11">
                  <p>{formatRelativeTime(post.createdAt)} • </p>
                  <Earth size={14} />
                </div>
              </div>
            </div>
            <div className="mx-auto flex w-3/4 flex-col">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-neutral-11">{post.content}</p>
            </div>
            {post.photo && <img className="mx-auto w-3/4 rounded-lg" src={post.photo} alt={post.title} />}
            <div className="px-4">
              <div className="mx-auto flex w-3/4 items-center gap-1 border-b border-gray-600 pb-2 text-xs text-neutral-11">
                <Heart size={14} />
                <p>57</p>
              </div>
              <div className="mx-auto flex w-3/4 justify-between pb-4 pt-2">
                <button className="flex items-center gap-2 text-neutral-12 hover:text-green-9">
                  <Heart size={16} />
                  Like
                </button>
                <button className="flex items-center gap-2 text-neutral-12 hover:text-green-9">
                  <MessageCircle size={16} />
                  Comment
                </button>
                <button className="flex items-center gap-2 text-neutral-12 hover:text-green-9">
                  <Send size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AllPosts;
