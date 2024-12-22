import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { postShema } from '../../lib/shemas';
import { updatePost } from '../../services/postsService';
import { PostType } from '../../types/postsType';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { Textarea } from '../ui/Textarea';

type EditPostModalProps = {
  post: PostType;
  closeModal: () => void;
};

export default function EditPostModal({ post, closeModal }: EditPostModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<z.infer<typeof postShema>>({
    resolver: zodResolver(postShema),
    defaultValues: {
      content: post.content
    }
  });

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (content: string) => updatePost(post.id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      closeModal();
    }
  });

  const onSubmit = async (data: z.infer<typeof postShema>) => {
    try {
      await editMutation.mutateAsync(data.content);
    } catch {
      setError('root', {
        type: 'manual',
        message: 'Erreur lors de la modification du post'
      });
    }
  };

  return (
    <Modal onClose={closeModal}>
      <Card className="relative" size="md">
        <p className="text-2xl font-semibold">Modifier le post</p>
        <X onClick={closeModal} className="absolute right-4 top-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        {editMutation.isError && <p className="text-red-600">{editMutation.error?.message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
          <div>
            <Textarea disabled={editMutation.isPending || isSubmitting} {...register('content')} />
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={closeModal} className="border border-neutral-8 bg-neutral-1 text-neutral-11 hover:bg-neutral-2">
              Annuler
            </Button>
            <Button type="submit" disabled={editMutation.isPending || isSubmitting}>
              {editMutation.isPending ? <LoaderCircle className="animate-spin" size={20} /> : 'Modifier'}
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}
