import { Search } from 'lucide-react';
import { useState } from 'react';
import IconButton from '../../ui/IconButton';
import SearchModal from './SearchModal';

export default function SearchNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative inline-block">
        <div onClick={openModal}>
          <IconButton icon={<Search className="size-5" />} aria-label="Rechercher des utilisateurs" />
        </div>
      </div>
      {isModalOpen && <SearchModal closeModal={closeModal} />}
    </>
  );
}
