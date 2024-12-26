import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Earth } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { updatePost } from '../../services/postsService';
import { PostType } from '../../types/postsType';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type PostDetailsModalProps = {
  post: PostType;
  onClose: () => void;
};

const PostDetailsModal = ({ post, onClose }: PostDetailsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationFn: async () => {
      return await updatePost(post.id, new FormData());
    },
    onSuccess: () => {
      toast.success('Post mis à jour avec succès');
      queryClient.invalidateQueries({ queryKey: ['postsAdmin'] });
      onClose();
    },
    onError: () => {
      toast.error('Erreur lors de la mise à jour du post');
    }
  });

  const handleUnvalidate = async () => {
    setIsLoading(true);
    try {
      await updatePostMutation.mutateAsync();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Card size="xs" className="flex flex-col gap-4">
        <div className="flex justify-between px-2 pt-4">
          <div className="flex gap-4">
            <Avatar alt="" size="sm" src={post.author.profilePhoto ?? ''} />
            <div className="flex flex-col">
              <p className="font-semibold text-neutral-12">{post.author?.pseudo}</p>
              <div className="flex items-center gap-1 text-xs text-neutral-11">
                <p>{formatRelativeTime(post.createdAt)} • </p>
                <Earth size={14} />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-11/12 flex-col sm:w-3/4">
          <p className="text-neutral-11">{post.content}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag.tag.id}>{tag.tag.name}</Badge>
              ))}
            </div>
          )}
        </div>
        {post.photo && <img className="mx-auto w-11/12 rounded-lg sm:w-3/4" src={post.photo} alt="" />}
        <div className="flex justify-end gap-4 p-4">
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleUnvalidate}>
            {isLoading ? 'Chargement...' : 'Invalider'}
            Invalider
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default PostDetailsModal;
