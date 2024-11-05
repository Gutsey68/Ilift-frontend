import { Image } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import IconButton from '../ui/IconButton';

function InputPost() {
  const userDetails = useAuthStore(state => state.userDetails);

  return (
    <Card size="md" className="flex gap-4">
      <div className="mt-0.5">
        <Avatar alt="" size="sm" src={userDetails?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
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
