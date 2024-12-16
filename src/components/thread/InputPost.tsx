import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import ProfilPicture from '../../assets/images/profil.png';
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
            <Avatar alt="" size="sm" src={import.meta.env.BASE_URL + user?.profilePhoto || ProfilPicture} />
          </div>
          <p className="my-2 w-full border-b border-neutral-6 pb-1 text-neutral-10">Ecrire un post...</p>
        </Card>
      </div>
      {showModal && createPortal(<PostForm closeModal={() => setShowModal(false)} />, document.body)}
    </>
  );
}

export default InputPost;
