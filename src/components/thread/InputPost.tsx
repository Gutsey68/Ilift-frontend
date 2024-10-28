import { Image } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import IconButton from '../ui/IconButton';

function InputPost() {
  return (
    <Card size="md" className="flex gap-4">
      <div className="mt-0.5">
        <Avatar
          alt=""
          size="sm"
          src="https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="flex w-full flex-col justify-center">
        <div className="w-full border-b border-neutral-6">
          <textarea placeholder="Ecrire un post..." className="mt-2 w-full bg-transparent focus:outline-none" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <IconButton icon={<Image className="-ml-2 size-5" />} />
          <Button>Poster</Button>
        </div>
      </div>
    </Card>
  );
}
export default InputPost;
