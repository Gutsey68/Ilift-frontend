import { Earth, Heart, MessageCircle, Send } from 'lucide-react';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { PostType } from '../../types/postsType';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

type AllPostsProps = { posts: PostType[] };

function AllPosts({ posts }: AllPostsProps) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return null;
  }

  return (
    <>
      {posts.map((post: PostType) => {
        const user = post.author;
        return (
          <Card size="xs" key={post.id} className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4 px-2 pt-4">
              <Avatar alt="" size="sm" src={user.profilePhoto ?? ''} />
              <div className="flex flex-col">
                <h1 className="font-semibold text-neutral-12">{user?.pseudo}</h1>
                <div className="flex items-center gap-1 text-xs text-neutral-11">
                  <p>{formatRelativeTime(post.createdAt)} • </p>
                  <Earth size={14} />
                </div>
              </div>
            </div>
            <div className="mx-auto flex w-11/12 flex-col sm:w-3/4">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-neutral-11 max-sm:text-sm">{post.content}</p>
            </div>
            {post.photo && <img className="mx-auto w-11/12 rounded-lg sm:w-3/4" src={post.photo} alt={post.title} />}
            <div className="px-4">
              <div className="mx-auto flex w-11/12 items-center gap-1 border-b border-gray-600 pb-2 text-xs text-neutral-11 sm:w-3/4">
                <Heart size={14} />
                <p>{post._count?.likes}</p>
              </div>
              <div className="mx-auto flex w-11/12 justify-between pb-4 pt-2 sm:w-3/4">
                <button className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                  <Heart size={16} />
                  <span className="max-sm:text-xs">J'aime</span>
                </button>
                <button className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                  <MessageCircle size={16} />
                  <span className="max-sm:text-xs">Commenter</span>
                </button>
                <button className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                  <Send size={16} />
                  <span className="max-sm:text-xs">Partager</span>
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default AllPosts;
