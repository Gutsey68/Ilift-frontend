import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import Avatar from '../ui/Avatar';
import { Input } from '../ui/Input';

type Comment = {
  id: string;
  content: string;
  author: {
    pseudo: string;
    profilePhoto: string;
  };
  createdAt: Date;
};

type CommentsModalProps = {
  closeModal: () => void;
};

const dummyComments: Comment[] = [
  {
    id: '1',
    content: 'Super post !',
    author: {
      pseudo: 'User1',
      profilePhoto:
        'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGd5bXxlbnwwfHwwfHx8MA%3D%3D'
    },
    createdAt: new Date()
  },
  {
    id: '2',
    content: 'Merci pour le partage.',
    author: {
      pseudo: 'User2',
      profilePhoto:
        'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGd5bXxlbnwwfHwwfHx8MA%3D%3D'
    },
    createdAt: new Date()
  }
];

function CommentsModal({ closeModal }: CommentsModalProps) {
  const [comments] = useState(dummyComments);
  const { user } = useContext(AuthContext);

  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 flex items-center justify-center bg-transparent/80">
      <div onClick={e => e.stopPropagation()} className="relative mb-[60vh] w-full max-sm:px-4 sm:w-1/3">
        <div className="flex flex-col gap-4 rounded-md border border-neutral-6 bg-neutral-1 p-4 shadow-lg lg:right-32">
          {comments.map(comment => (
            <div key={comment.id} className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Avatar size="sm" src={comment.author.profilePhoto} alt="" />
                <div>
                  <p className="font-semibold">{comment.author.pseudo}</p>
                  <p className="text-sm text-neutral-11">{comment.content}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-11">{formatRelativeTime(comment.createdAt.toISOString())}</p>
            </div>
          ))}
          <hr className="border-neutral-6" />
          <div className="flex items-center gap-4">
            <div>
              <Avatar size="sm" src={user?.profilePhoto} alt="" />
            </div>
            <Input placeholder="Ajouter un commentaire..." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsModal;
