import { Search } from 'lucide-react';
import { useState } from 'react';
import IconButton from '../../ui/IconButton';
import SearchModal from './SearchModal';

/**
 * Composant de recherche avec modal
 * Fonctionnalités :
 * - Bouton de recherche avec icône
 * - Ouverture/fermeture du modal de recherche
 * - Intégration avec le système d'icônes
 * - Accessibilité (aria-label)
 *
 * @component
 * @returns {JSX.Element} Bouton de recherche avec gestion du modal
 */
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
