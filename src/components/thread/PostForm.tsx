import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { postShema } from '../../lib/shemas';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { Textarea } from '../ui/Textarea';

type PostFormProps = {
  closeModal: () => void;
};

export default function PostForm({ closeModal }: PostFormProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof postShema>>({
    resolver: zodResolver(postShema)
  });

  const onSubmit = (data: z.infer<typeof postShema>) => {
    // .
    console.log(data);
  };

  return (
    <Modal onClose={closeModal}>
      <Card className="p-4 sm:p-10" size="md">
        <p className="text-2xl font-semibold">Nouveau post</p>
        <p className="mb-4 text-sm text-neutral-10">Que voulez-vous partager ?</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label htmlFor={'content'} className={`mt-1 text-sm ${errors.content && 'text-red-600'}`}>
            Contenu
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
    </Modal>
  );
}
