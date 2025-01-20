import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import PostForm from './PostForm';

/**
 * Composant de zone de saisie pour créer un nouveau post
 * Fonctionnalités :
 * - Affichage d'un champ de saisie factice
 * - Ouverture du formulaire complet dans un modal
 * - Affichage de l'avatar de l'utilisateur
 * - Style interactif au survol
 *
 * @component
 * @returns {JSX.Element} Zone de saisie pour créer un post
 */
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
      {showModal && <PostForm selectedResults={[]} closeModal={() => setShowModal(false)} />}
    </>
  );
}

export default InputPost;
