import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, LoaderCircle, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { deletePost, updatePost } from '../../services/postsService';
import { PostType } from '../../types/postsType';
import { updatePostSchema } from '../../validators/posts.validation';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import { CommonPost } from '../profile/AllPostsProfile';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { Textarea } from '../ui/Textarea';

type EditPostModalProps = {
  post: PostType | CommonPost;
  closeModal: () => void;
};

export default function EditPostModal({ post, closeModal }: EditPostModalProps) {
  const [tags, setTags] = useState<string[]>(post.tags?.map(tag => tag.tag.name) || []);
  const [currentTag, setCurrentTag] = useState('');
  const [preview, setPreview] = useState<string | null>(post.photo || null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof updatePostSchema>>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      content: post.content
    }
  });

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (formData: FormData) => updatePost(post.id, formData)
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId)
  });

  const onDeleteHandler = async (postId: string) => {
    try {
      await deleteMutation.mutateAsync(postId);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      toast.success('Post supprimé avec succès');
      closeModal();
    } catch {
      toast.error('Une erreur est survenue lors de la suppression du post');
    }
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = async (data: z.infer<typeof updatePostSchema>) => {
    try {
      const formData = new FormData();

      if (data.content) {
        formData.append('content', data.content);
      }

      if (tags && tags.length > 0) {
        formData.append('tags', JSON.stringify(tags));
      } else if (post.tags && post.tags.length > 0) {
        formData.append('removeTags', 'true');
      }

      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append('photo', fileInput.files[0]);
      }

      if (preview === null && post.photo) {
        formData.append('removePhoto', 'true');
      }

      await editMutation.mutateAsync(formData as FormData);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      closeModal();
      toast.success('Post modifié avec succès');
    } catch {
      toast.error('Une erreur est survenue lors de la modification du post');
    }
  };

  return (
    <>
      <Modal onClose={closeModal}>
        <Card className="relative" size="md">
          <div className="border-b border-neutral-6 p-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">Modifier le post</p>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setShowDeleteModal(true)} className="text-red-11 hover:text-red-10">
                  <Trash2 size={20} />
                </button>
                <X onClick={closeModal} className="cursor-pointer text-neutral-11 hover:text-neutral-12" />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6">
            {preview && (
              <div className="relative mx-auto">
                <img src={preview} alt="Aperçu" className="h-[200px] rounded-lg object-contain" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -right-2 -top-2 rounded-full bg-neutral-12 p-1.5 text-neutral-1 shadow-sm transition-colors hover:bg-red-9"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="content" className={`text-sm ${errors.content ? 'text-red-11' : 'text-neutral-11'}`}>
                Contenu
                <span className="ml-1 text-red-11">*</span>
              </label>
              <Textarea disabled={editMutation.isPending || isSubmitting} {...register('content')} className="min-h-[120px]" />
              {errors.content && <p className="text-sm text-red-11">{errors.content.message}</p>}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-neutral-11">Tags</label>
                <div className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={e => setCurrentTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-40 rounded-md border border-neutral-7 bg-neutral-3 px-3 py-1.5 text-sm"
                    placeholder="Ajouter un tag"
                    disabled={editMutation.isPending || isSubmitting}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleAddTag}
                    size="sm"
                    disabled={!currentTag}
                    isPending={editMutation.isPending || isSubmitting}
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <div
                      key={tag}
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveTag(tag);
                      }}
                    >
                      <Badge className="cursor-pointer transition-colors hover:bg-red-3 hover:text-red-11">
                        {tag}
                        <X size={14} className="ml-0.5 inline-block" />
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-neutral-6 pt-4">
              <label
                htmlFor="file"
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-11 transition-colors hover:text-green-11"
              >
                <Image size={18} />
                <span>Ajouter une photo</span>
              </label>
              <input type="file" id="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={closeModal} disabled={editMutation.isPending || isSubmitting}>
                  Annuler
                </Button>
                <Button type="submit" isPending={editMutation.isPending || isSubmitting}>
                  {editMutation.isPending ? <LoaderCircle className="animate-spin" size={20} /> : 'Modifier'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </Modal>
      {showDeleteModal && (
        <ConfirmDeleteModal
          title="Supprimer le post"
          message="Êtes-vous sûr de vouloir supprimer ce post ?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => onDeleteHandler(post.id)}
          isLoading={deleteMutation.isPending}
        />
      )}
    </>
  );
}
