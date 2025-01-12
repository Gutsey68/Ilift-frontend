import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import PostForm from './PostForm';

function InputPost() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)}>
        <Card size="md" className="flex cursor-pointer gap-4">
          <div>
            <Avatar alt="" size="sm" src={user?.profilePhoto || '/uploads/profil.webp'} />
          </div>
          <p className="my-2 w-full border-b border-neutral-6 pb-1 text-neutral-10">Ecrire un post...</p>
        </Card>
      </div>
      {showModal && <PostForm closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default InputPost;
