import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Earth } from 'lucide-react';
import toast from 'react-hot-toast';
import { updatePost } from '../../services/postsService';
import { PostType } from '../../types/postsType';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant PostDetailsModal
 * @typedef {object} PostDetailsModalProps
 * @property {PostType} post - Le post à afficher dans le modal
 * @property {() => void} onClose - Fonction de fermeture du modal
 */
type PostDetailsModalProps = {
  post: PostType;
  onClose: () => void;
};

/**
 * Modal affichant les détails d'un post avec options d'administration
 * Fonctionnalités :
 * - Affichage du contenu complet du post
 * - Informations sur l'auteur
 * - Tags associés
 * - Photo du post si présente
 * - Validation/invalidation du post
 *
 * @component
 * @param {PostDetailsModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal avec les détails du post
 */
const PostDetailsModal = ({ post, onClose }: PostDetailsModalProps) => {
  const queryClient = useQueryClient();

  /**
   * Mutation pour basculer l'état de validation d'un post
   * Met à jour le cache optimistiquement
   */
  const { mutate: toggleValidPost, isPending } = useMutation({
    mutationFn: async () => {
      const newIsValid = !post.isValid;

      const response = await updatePost(post.id, { isValid: newIsValid });

      return response.data;
    },
    onSuccess: updatedPost => {
      // Mise à jour optimiste du cache
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

  /**
   * Gère le basculement de la validation avec retour visuel
   */
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
      <Card size="xs" className="flex flex-col gap-2">
        <div className="flex items-center gap-3 p-4">
          <Avatar alt={`Avatar de ${post.author.pseudo}`} size="sm" src={post.author.profilePhoto || '/uploads/profil.png'} />
          <div>
            <h3 className="text-lg font-semibold">{post.author.pseudo}</h3>
            <div className="flex items-center gap-1 text-xs text-neutral-11">
              <p>{new Date(post.createdAt).toLocaleDateString('fr-FR')} • </p>
              <Earth size={14} />
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-11/12 flex-col px-1 sm:w-3/4">
          <p className="text-neutral-11">{post.content}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag.tag.id}>{tag.tag.name}</Badge>
              ))}
            </div>
          )}
        </div>
        {post.photo && <img className="mx-auto w-11/12 rounded-lg px-1 sm:w-3/4" src={post.photo} alt="" />}
        <div className="mt-2 flex justify-end gap-4 border-t border-neutral-6 p-4">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button isPending={isPending} variant={post.isValid ? 'destructive' : 'default'} onClick={handleToggleValid} disabled={isPending}>
            {post.isValid ? 'Invalider' : 'Valider'}
          </Button>{' '}
        </div>{' '}
      </Card>{' '}
    </Modal>
  );
};

export default PostDetailsModal;
