import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { postShema } from '../../lib/shemas';
import FormField from '../auth/FormField';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Textarea } from '../ui/Textarea';

type PostFormProps = {
  closeModal: () => void;
};

export default function PostForm({ closeModal }: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<z.infer<typeof postShema>>({
    resolver: zodResolver(postShema)
  });

  const onSubmit = (data: z.infer<typeof postShema>) => {
    // .
    console.log(data);
  };

  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 flex items-center justify-center bg-transparent/80">
      <div onClick={e => e.stopPropagation()} className="relative mb-[10vh] w-1/3">
        <Card className="p-10" size="md">
          <p className="text-2xl font-semibold">Nouveau post</p>
          <p className="mb-4 text-sm text-neutral-10">Que voulez-vous partager ?</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField label="Titre" name="titre" type="text" register={register} errors={errors} />
            <label htmlFor={'content'} className={`mt-1 text-sm ${errors.content && 'text-red-600'}`}>
              Contenu
              <span className="pl-1 text-red-600">*</span>
            </label>
            <Textarea name="content" />
            <div className="flex items-center gap-2">
              <input type="file" id="file" className="hidden" />
              <label htmlFor="file" className="my-2 flex cursor-pointer items-center gap-2 text-neutral-11 hover:text-green-11">
                <Image />
                <span>Ajouter une photo</span>
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={closeModal} className="w-fit border border-neutral-8 bg-neutral-1 text-neutral-11 shadow-sm hover:bg-neutral-2">
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-fit">
                Poster
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
