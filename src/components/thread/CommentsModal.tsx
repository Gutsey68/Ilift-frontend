import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { AuthContext } from '../../context/AuthContext';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { createComment, deleteComment, getCommentsOfAPost } from '../../services/commentsService';
import { CommentType } from '../../types/commentsType';
import { createCommentSchema } from '../../validators/posts.validation';
import FormField from '../auth/FormField';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import CommentsSkeletons from '../skeletons/CommentsSkeletons';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant CommentsModal
 * @typedef {object} CommentsModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 * @property {string} postId - Identifiant du post dont on affiche les commentaires
 */
type CommentsModalProps = {
  closeModal: () => void;
  postId: string;
};

/**
 * Type des données du formulaire de commentaire
 */
type CommentFormData = z.infer<typeof createCommentSchema>;

/**
 * Modal d'affichage et gestion des commentaires d'un post
 * Fonctionnalités :
 * - Affichage des commentaires existants
 * - Ajout de nouveaux commentaires
 * - Suppression de ses propres commentaires
 * - Validation des données avec Zod
 * - États de chargement
 * - Retours visuels des actions
 *
 * @component
 * @param {CommentsModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de gestion des commentaires
 */
function CommentsModal({ closeModal, postId }: CommentsModalProps) {
  const { user } = useContext(AuthContext);
  const [commentToDelete, setCommentToDelete] = useState<{ postsId: string; usersId: string } | null>(null);
  const queryClient = useQueryClient();

  /**
   * Configuration du formulaire avec validation Zod
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentFormData>({
    resolver: zodResolver(createCommentSchema)
  });

  /**
   * Requête et mutations pour la gestion des commentaires
   */
  const { data: commentsData, isPending } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsOfAPost(postId)
  });

  const createCommentMutation = useMutation({
    mutationFn: (data: CommentFormData) => createComment(postId, data.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['likedPosts'] });
      reset();
      toast.success('Commentaire ajouté avec succès');
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'ajout du commentaire");
    }
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['likedPosts'] });
      setCommentToDelete(null);
      toast.success('Commentaire supprimé avec succès');
    },
    onError: () => {
      toast.error('Une erreur est survenue lors de la suppression du commentaire');
    }
  });

  /**
   * Gestionnaires d'événements
   */
  const onSubmit = handleSubmit((data: CommentFormData) => {
    createCommentMutation.mutate(data);
  });

  const handleDeleteComment = (postsId: string, usersId: string) => {
    setCommentToDelete({ postsId, usersId });
  };

  const deleteCommentHandler = () => {
    if (commentToDelete) {
      deleteCommentMutation.mutate(commentToDelete.postsId);
    }
  };

  const comments = commentsData?.data;

  return (
    <>
      <Modal onClose={closeModal}>
        <Card size="md" className="relative flex flex-col gap-4">
          <div className="relative flex w-full justify-center">
            <h2 className="text-xl font-semibold">Commentaires</h2>
            <X onClick={closeModal} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
          </div>
          <hr className="border-neutral-6" />
          {isPending ? (
            <CommentsSkeletons />
          ) : (
            comments.map((comment: CommentType) => (
              <>
                <div key={comment.postsId} className="flex flex-col items-start justify-between gap-2">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" src={comment.users.profilePhoto} alt="" />
                      <div className="flex flex-col">
                        <p className="font-semibold">{comment.users.pseudo}</p>
                        <p className="text-xs text-neutral-10">{formatRelativeTime(comment.createdAt)}</p>
                      </div>
                    </div>
                    {comment.isMyComment && (
                      <Trash
                        size={20}
                        onClick={() => handleDeleteComment(comment.postsId, comment.usersId)}
                        className="cursor-pointer text-red-11 hover:text-red-300"
                      />
                    )}
                  </div>
                  <p className="ml-12 mt-2 text-sm text-neutral-11">{comment.content}</p>
                </div>
                <hr className="border-neutral-6" />
              </>
            ))
          )}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div>
                <Avatar size="sm" src={user?.profilePhoto} alt="" />
              </div>
              <div className="flex w-full flex-col gap-2">
                <FormField
                  label="Commentaire"
                  name="content"
                  type="text"
                  register={register}
                  errors={errors as Record<string, { message?: string }>}
                  disabled={createCommentMutation.isPending}
                  placeholder="Ajouter un commentaire..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={closeModal} variant="secondary">
                Annuler
              </Button>
              <Button
                disabled={createCommentMutation.isPending}
                isPending={createCommentMutation.isPending}
                className="disabled:cursor-not-allowed disabled:opacity-50"
              >
                Commenter
              </Button>
            </div>
          </form>
        </Card>
      </Modal>

      {commentToDelete && (
        <ConfirmDeleteModal
          title="Supprimer le commentaire"
          message="Êtes-vous sûr de vouloir supprimer ce commentaire ?"
          onClose={() => setCommentToDelete(null)}
          onConfirm={deleteCommentHandler}
          isLoading={deleteCommentMutation.isPending}
        />
      )}
    </>
  );
}

export default CommentsModal;
