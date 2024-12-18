import { Earth, Heart, LoaderCircle, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { PostType } from '../../types/postsType';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import CommentsModal from './CommentsModal';

type AllPostsProps = {
  posts: PostType[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

function AllPosts({ posts, fetchNextPage, hasNextPage, isFetchingNextPage }: AllPostsProps) {
  const [showModal, setShowModal] = useState(false);

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

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
                <p className="font-semibold text-neutral-12">{user?.pseudo}</p>
                <div className="flex items-center gap-1 text-xs text-neutral-11">
                  <p>{formatRelativeTime(post.createdAt)} • </p>
                  <Earth size={14} />
                </div>
              </div>
            </div>
            <div className="mx-auto flex w-11/12 flex-col sm:w-3/4">
              <p className="text-neutral-11 max-sm:text-sm">{post.content}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag.tag.id}>{tag.tag.name}</Badge>
                  ))}
                </div>
              )}
            </div>
            {post.photo && <img className="mx-auto w-11/12 rounded-lg sm:w-3/4" src={post.photo} alt={`Photo de ${post.author.pseudo}`} />}
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
                <button onClick={() => setShowModal(true)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
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
      {showModal && createPortal(<CommentsModal closeModal={() => setShowModal(false)} />, document.body)}
      {isFetchingNextPage && <LoaderCircle className="m-auto mt-4 w-fit animate-spin text-neutral-11" size={30} />}
    </>
  );
}

export default AllPosts;
