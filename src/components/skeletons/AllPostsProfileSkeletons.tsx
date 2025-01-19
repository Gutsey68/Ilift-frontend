import { Spacing } from '../ui/Spacing';

/**
 * Composant de placeholder animé pour les posts du profil
 * Affiche des blocs de chargement pour les publications
 * avec espacement et adaptation responsive
 * @component
 * @returns {JSX.Element} Animation de chargement des posts
 */
function AllPostsProfileSkeletons() {
  return (
    <>
      <div className="mb-10 flex w-11/12 animate-pulse flex-col p-8 max-sm:m-auto sm:w-2/4">
        <div className="mb-6 h-32 rounded-lg bg-neutral-4"></div>
        <div className="h-64 rounded-lg bg-neutral-4"></div>
      </div>
      <Spacing size="lg" />
    </>
  );
}
export default AllPostsProfileSkeletons;
