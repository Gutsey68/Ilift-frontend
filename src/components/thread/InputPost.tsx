import { Image } from 'lucide-react';
import { useContext } from 'react';
import ProfilPicture from '../../assets/images/profil.png';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import IconButton from '../ui/IconButton';

function InputPost() {
  const { user } = useContext(AuthContext);

  return (
    <Card size="md" className="flex gap-4">
      <div className="mt-0.5">
        <Avatar alt="" size="sm" src={user?.profilePhoto || ProfilPicture} />
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
