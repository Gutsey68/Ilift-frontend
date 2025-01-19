import { Spacing } from '../ui/Spacing';

/**
 * Composant de placeholder pour le fil de publications
 * Affiche plusieurs blocs de chargement simulant les posts
 * Adaptatif selon la taille d'écran
 *
 * @component
 * @returns {JSX.Element} Animation de chargement des publications
 */
function PostsThreadSkeleton() {
  return (
    <>
      <div className="mb-10 flex w-11/12 animate-pulse flex-col max-lg:m-auto lg:w-2/4">
        <div className="mb-6 h-32 rounded-lg bg-neutral-4"></div>
        <div className="h-64 rounded-lg bg-neutral-4"></div>
        <div className="mt-4 h-64 rounded-lg bg-neutral-4"></div>
      </div>
      <Spacing size="lg" />
    </>
  );
}
export default PostsThreadSkeleton;
