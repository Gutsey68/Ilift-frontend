import { X } from 'lucide-react';
import Card from '../ui/Card';

type PostFormProps = {
  closeModal: () => void;
};

export default function PostForm({ closeModal }: PostFormProps) {
  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 flex items-center justify-center bg-transparent/80">
      <div onClick={e => e.stopPropagation()} className="relative mb-[10vh]">
        <Card className="p-10" size="md">
          <p>Toto</p>
          <X onClick={closeModal} className="absolute right-1 top-1 size-7 cursor-pointer text-red-600" />
        </Card>
      </div>
    </div>
  );
}
