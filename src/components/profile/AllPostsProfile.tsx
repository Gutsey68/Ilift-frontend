import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Earth, Heart, MessageCircle, Repeat } from 'lucide-react';
import { useState } from 'react';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { like, unLike } from '../../services/likesService';
import { PostType } from '../../types/postsType';
import CommentsModal from '../thread/CommentsModal';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

type AllPostsProps = { posts: PostType[] };

function AllPosts({ posts }: AllPostsProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  if (!Array.isArray(posts) || posts.length === 0) {
    return null;
  }

  const likeMutation = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: (id: string) => unLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    }
  });

  const handleLike = (posts: PostType) => {
    if (posts.doILike) {
      unlikeMutation.mutate(posts.id);
    }

    if (!posts.doILike) {
      likeMutation.mutate(posts.id);
    }
  };

  return (
    <>
      {posts.map((post: PostType) => {
        const user = post.author;
        return (
          <div key={post.id} className="border-t border-neutral-6 p-4">
            <div className="flex flex-col gap-4 sm:w-4/5">
              <div className="flex gap-4 px-4 pt-4">
                <Avatar src={user.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${user.pseudo}`} size="sm" />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-neutral-12">{user?.pseudo}</h1>
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
              <div>
                <div className="mx-auto flex w-11/12 items-center gap-4 border-b border-neutral-6 pb-2 text-xs text-neutral-11 sm:w-3/4">
                  <div className="flex items-center gap-1">
                    <Heart size={14} />
                    <p>{post._count?.likes}</p>
                  </div>
                  <div onClick={() => setSelectedPostId(post.id)} className="flex cursor-pointer items-center gap-1 hover:text-green-11">
                    <MessageCircle size={14} />
                    <p>{post._count?.comments} commentaires</p>
                  </div>
                </div>
                <div className="mx-auto flex w-11/12 justify-between pb-4 pt-2 sm:w-3/4">
                  <button onClick={() => handleLike(post)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                    <Heart size={16} />
                    {post.doILike ? <span className="max-sm:text-xs">Je n'aime plus</span> : <span className="max-sm:text-xs">J'aime</span>}
                  </button>
                  <button onClick={() => setSelectedPostId(post.id)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                    <MessageCircle size={16} />
                    <span className="max-sm:text-xs">Commenter</span>
                  </button>
                  <button className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                    <Repeat size={16} />
                    <span className="max-sm:text-xs">Republier</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {selectedPostId && <CommentsModal postId={selectedPostId} closeModal={() => setSelectedPostId(null)} />}
    </>
  );
}

export default AllPosts;
