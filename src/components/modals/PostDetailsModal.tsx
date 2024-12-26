import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Earth, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
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
  const queryClient = useQueryClient();

  const { mutate: toggleValidPost, isPending } = useMutation({
    mutationFn: async () => {
      const newIsValid = !post.isValid;

      const response = await updatePost(post.id, { isValid: newIsValid });

      return response.data;
    },
    onSuccess: updatedPost => {
      queryClient.setQueryData(['postsAdmin'], (oldData: { pages: { data: PostType[] }[] }) => {
        if (!oldData?.pages) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: { data: PostType[] }) => ({
            ...page,
            data: page.data.map((p: PostType) => (p.id === updatedPost.id ? updatedPost : p))
          }))
        };
      });

      queryClient.invalidateQueries({ queryKey: ['postsAdmin'] });
      onClose();
    }
  });

  const handleToggleValid = () => {
    try {
      toggleValidPost();
      toast.success(`Post ${post.isValid ? 'in' : ''}validé avec succès`);
    } catch {
      toast.error('Une erreur est survenue lors de la modification du statut du post');
    }
  };

  return (
    <Modal onClose={onClose}>
      <Card size="xs" className="flex flex-col gap-4">
        <div className="flex items-center gap-4 p-4">
          <Avatar alt="" size="lg" src={post.author.profilePhoto ?? ''} />
          <div>
            <h3 className="text-lg font-semibold">{post.author.pseudo}</h3>
            <div className="flex items-center gap-1 text-xs text-neutral-11">
              <p>{new Date(post.createdAt).toLocaleDateString('fr-FR')} • </p>
              <Earth size={14} />
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
        <div className="flex justify-end gap-4 border-t border-neutral-6 p-4">
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleToggleValid} disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin" size={20} /> : post.isValid ? 'Invalider' : 'Valider'}{' '}
          </Button>{' '}
        </div>{' '}
      </Card>{' '}
    </Modal>
  );
};

export default PostDetailsModal;
