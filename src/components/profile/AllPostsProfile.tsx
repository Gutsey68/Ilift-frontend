import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Earth, Heart, MessageCircle, Repeat } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { like, unLike } from '../../services/likesService';
import { sharePost, unsharePost } from '../../services/sharesService';
import { PostType } from '../../types/postsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import ConfirmShareModal from '../modals/ConfirmShareModal';
import CommentsModal from '../thread/CommentsModal';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

type CommonPost = {
  id: string;
  photo?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  doILike?: boolean;
  isShared?: boolean;
  sharedAt?: string;
  sharedBy?: string;
  sharedByUser?: {
    id: string;
    pseudo: string;
  };
  tags: Array<{
    postId: string;
    tagId: string;
    tag: {
      id: string;
      name: string;
    };
  }>;
  _count?: {
    likes: number;
    comments: number;
  };
  author: {
    id: string;
    pseudo: string;
    profilePhoto?: string;
  };
};

type AllPostsProps = {
  posts: (PostType | CommonPost)[];
};

function AllPosts({ posts }: AllPostsProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [postToShare, setPostToShare] = useState<CommonPost | null>(null);
  const [postToUnshare, setPostToUnshare] = useState<CommonPost | null>(null);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const likeMutation = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', id] });
      queryClient.invalidateQueries({ queryKey: ['likedPosts', id] });
      queryClient.invalidateQueries({ queryKey: ['sharedPosts', id] });
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: (id: string) => unLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', id] });
      queryClient.invalidateQueries({ queryKey: ['likedPosts', id] });
      queryClient.invalidateQueries({ queryKey: ['sharedPosts', id] });
    }
  });

  const shareMutation = useMutation({
    mutationFn: (id: string) => sharePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', id] });
      queryClient.invalidateQueries({ queryKey: ['sharedPosts', id] });
    }
  });

  const unshareMutation = useMutation({
    mutationFn: (id: string) => unsharePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', id] });
      queryClient.invalidateQueries({ queryKey: ['sharedPosts', id] });
    }
  });

  const handleLike = (post: CommonPost) => {
    if (post.doILike) {
      unlikeMutation.mutate(post.id);
    } else {
      likeMutation.mutate(post.id);
    }
  };

  const handleShareClick = (post: CommonPost) => {
    if (post.isShared && post.sharedBy === id) {
      setPostToUnshare(post);
    } else {
      setPostToShare(post);
    }
  };

  const handleConfirmShare = () => {
    if (postToShare) {
      try {
        shareMutation.mutate(postToShare.id);
        setPostToShare(null);
        toast.success('La publication a bien été republiée');
      } catch {
        toast.error('Une erreur est survenue lors de la republication');
      }
    }
  };

  const handleConfirmUnshare = () => {
    if (postToUnshare) {
      try {
        unshareMutation.mutate(postToUnshare.id);
        setPostToUnshare(null);
        toast.success('La republication a bien été supprimée');
      } catch {
        toast.error('Une erreur est survenue lors de la suppression de la republication');
      }
    }
  };

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="p-4 text-center text-neutral-11">Aucune publication à afficher</div>;
  }

  return (
    <>
      {posts?.map(post => {
        const commonPost = post as CommonPost;
        const user = commonPost.author;

        if (!user) return null;

        return (
          <div key={commonPost.id} className="border-t border-neutral-6 p-4">
            <div className="flex flex-col gap-4 sm:w-4/5">
              {commonPost.isShared && (
                <>
                  <div className="flex flex-col gap-1 px-4 pt-4 text-neutral-11">
                    <div className="flex items-center gap-2 text-sm ">
                      <Repeat size={16} />
                      <span>{commonPost.sharedBy === id ? 'Vous avez' : `${commonPost.sharedByUser?.pseudo} a`} republié</span>
                    </div>
                    <div className="ml-7 flex items-center gap-1 text-xs text-neutral-10">
                      <p>{commonPost.sharedAt ? formatRelativeTime(commonPost.sharedAt) : ''} • </p>
                      <Earth size={14} />
                    </div>
                  </div>
                  <hr className="border-neutral-6" />
                </>
              )}
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
                  <button onClick={() => handleLike(commonPost)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                    <Heart size={16} />
                    {commonPost.doILike ? <span className="max-sm:text-xs">Je n'aime plus</span> : <span className="max-sm:text-xs">J'aime</span>}
                  </button>
                  <button onClick={() => setSelectedPostId(post.id)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                    <MessageCircle size={16} />
                    <span className="max-sm:text-xs">Commenter</span>
                  </button>
                  <button onClick={() => handleShareClick(commonPost)} className="xs:gap-2 flex items-center gap-1 hover:text-green-9">
                    <Repeat size={16} />
                    <span className="max-sm:text-xs">{commonPost.isShared && commonPost.sharedBy === id ? 'Ne plus republier' : 'Republier'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {selectedPostId && <CommentsModal postId={selectedPostId} closeModal={() => setSelectedPostId(null)} />}
      {postToShare && <ConfirmShareModal onClose={() => setPostToShare(null)} onConfirm={handleConfirmShare} isLoading={shareMutation.isPending} />}
      {postToUnshare && (
        <ConfirmDeleteModal
          onClose={() => setPostToUnshare(null)}
          onConfirm={handleConfirmUnshare}
          isLoading={unshareMutation.isPending}
          title="Supprimer la republication"
          message="Voulez-vous vraiment supprimer cette republication ?"
        />
      )}
    </>
  );
}

export default AllPosts;
