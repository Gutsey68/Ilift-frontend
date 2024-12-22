import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { createComment, deleteComment, getCommentsOfAPost } from '../../services/commentsService';
import { CommentType } from '../../types/commentsType';
import CommentsSkeletons from '../skeletons/CommentsSkeletons';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

type CommentsModalProps = {
  closeModal: () => void;
  postId: string;
};

function CommentsModal({ closeModal, postId }: CommentsModalProps) {
  const { user } = useContext(AuthContext);
  const [newComment, setNewComment] = useState('');
  const [commentToDelete, setCommentToDelete] = useState<{ postsId: string; usersId: string } | null>(null);
  const queryClient = useQueryClient();

  const { data: commentsData, isPending } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsOfAPost(postId)
  });

  const createCommentMutation = useMutation({
    mutationFn: () => createComment(postId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setNewComment('');
    }
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setCommentToDelete(null);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      createCommentMutation.mutate();
    }
  };

  const handleDeleteComment = (postsId: string, usersId: string) => {
    setCommentToDelete({ postsId, usersId });
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
                      <Trash onClick={() => handleDeleteComment(comment.postsId, comment.usersId)} className="cursor-pointer text-red-600 hover:text-red-300" />
                    )}
                  </div>
                  <p className="ml-12 mt-2 text-sm text-neutral-11">{comment.content}</p>
                </div>
                <hr className="border-neutral-6" />
              </>
            ))
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div>
                <Avatar size="sm" src={user?.profilePhoto} alt="" />
              </div>
              <Input
                placeholder="Ajouter un commentaire..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                disabled={createCommentMutation.isPending}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="rounded-md bg-neutral-4 px-4 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-5">
                Annuler
              </button>
              <button
                type="submit"
                disabled={createCommentMutation.isPending || !newComment.trim()}
                className="rounded-md bg-green-9 px-4 py-2 text-sm font-medium text-neutral-1 hover:bg-green-8 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {createCommentMutation.isPending ? 'En cours...' : 'Commenter'}
              </button>
            </div>
          </form>
        </Card>
      </Modal>

      {commentToDelete && (
        <ConfirmDeleteModal
          title="Supprimer le commentaire"
          message="Êtes-vous sûr de vouloir supprimer ce commentaire ?"
          onClose={() => setCommentToDelete(null)}
          onConfirm={() => deleteCommentMutation.mutate(commentToDelete?.postsId)}
          isLoading={deleteCommentMutation.isPending}
        />
      )}
    </>
  );
}

export default CommentsModal;
