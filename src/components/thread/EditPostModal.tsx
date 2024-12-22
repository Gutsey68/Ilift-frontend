import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { postShema } from '../../lib/shemas';
import { updatePost } from '../../services/postsService';
import { PostType } from '../../types/postsType';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { Textarea } from '../ui/Textarea';

type EditPostModalProps = {
  post: PostType;
  closeModal: () => void;
};

export default function EditPostModal({ post, closeModal }: EditPostModalProps) {
  const [tags, setTags] = useState<string[]>(post.tags?.map(tag => tag.tag.name) || []);
  const [currentTag, setCurrentTag] = useState('');
  const [preview, setPreview] = useState<string | null>(post.photo || null);

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
    mutationFn: (formData: FormData) => updatePost(post.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      closeModal();
    }
  });

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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

  const onSubmit = async (data: z.infer<typeof postShema>) => {
    try {
      const formData = new FormData();
      formData.append('content', data.content);

      if (tags && tags.length > 0) {
        const filteredTags = tags.filter(tag => tag.trim() !== '');
        if (filteredTags.length > 0) {
          formData.append('tags', JSON.stringify(filteredTags));
        }
      }

      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append('photo', fileInput.files[0]);
      }

      await editMutation.mutateAsync(formData);
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

          <div className="flex flex-col gap-2">
            <label className="text-sm">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge onClick={() => handleRemoveTag(tag)} className="cursor-pointer hover:bg-red-950 hover:text-red-300" key={tag}>
                  {tag}
                  <X size={13} className="ml-1 inline-block" />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                disabled={editMutation.isPending || isSubmitting}
                type="text"
                value={currentTag}
                onChange={e => setCurrentTag(e.target.value)}
                className="rounded-md border border-neutral-7 bg-neutral-3 px-3 py-1 text-sm"
                placeholder="Ajouter un tag"
              />
              <Button type="button" onClick={handleAddTag} className="px-3 py-1 text-sm">
                Ajouter
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input disabled={editMutation.isPending || isSubmitting} type="file" id="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Aperçu" className="size-32 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -right-2 -top-2 rounded-full bg-neutral-12 p-1 text-neutral-1 hover:bg-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label htmlFor="file" className="my-2 flex cursor-pointer items-center gap-2 text-neutral-11 hover:text-green-11">
                <Image />
                <span>Ajouter une photo</span>
              </label>
            )}
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
