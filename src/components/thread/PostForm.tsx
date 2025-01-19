import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { createPostHandler } from '../../services/postsService';
import { ExerciseResult } from '../../types/exerciceResultsType';
import { createPostSchema } from '../../validators/posts.validation';
import ResultsSection from '../profile/ResultsSection';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { Textarea } from '../ui/Textarea';

type PostFormProps = {
  closeModal: () => void;
  selectedResults: ExerciseResult[];
};

export default function PostForm({ closeModal, selectedResults = [] }: PostFormProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema)
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: createPostHandler
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = async (data: z.infer<typeof createPostSchema>) => {
    try {
      const formData = new FormData();
      formData.append('content', data.content);

      if (tags && tags.length > 0) {
        const filteredTags = tags.filter(tag => tag.trim() !== '');
        if (filteredTags.length > 0) {
          formData.append('tags', JSON.stringify(filteredTags));
        }
      }

      if (selectedResults.length > 0) {
        formData.append('exerciseResults', JSON.stringify(selectedResults.map(r => r.id)));
      }

      const fileInput = document.getElementById('file') as HTMLInputElement;

      if (fileInput?.files?.[0]) {
        formData.append('photo', fileInput.files[0]);
      }

      await postMutation.mutateAsync(formData);
      toast.success('Post créé avec succès');

      setTags([]);
      setPreview(null);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['tags'] });

      closeModal();
    } catch {
      toast.error('Erreur lors de la création du post');
    }
  };

  return (
    <Modal onClose={closeModal}>
      <Card className="relative" size="md">
        <div className="border-b border-neutral-6 p-4">
          <p className="text-2xl font-semibold">Nouveau post</p>
          <p className="mt-1 text-sm text-neutral-10">Que voulez-vous partager ?</p>
          <X onClick={closeModal} className="absolute right-4 top-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6">
          {selectedResults.length > 0 && (
            <ResultsSection
              exercicesResultsPosts={selectedResults.map(result => ({
                exercicesResults: result
              }))}
            />
          )}
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
            <Textarea disabled={postMutation.status === 'pending' || isSubmitting} {...register('content')} className="min-h-[120px]" />
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
                  disabled={postMutation.status === 'pending' || isSubmitting}
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleAddTag}
                  size="sm"
                  disabled={!currentTag}
                  isPending={postMutation.status === 'pending' || isSubmitting}
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
              <Button disabled={postMutation.status === 'pending' || isSubmitting} variant="secondary" onClick={closeModal}>
                Annuler
              </Button>
              <Button isPending={postMutation.status === 'pending' || isSubmitting} type="submit">
                Poster
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Modal>
  );
}
