/**
 * Composant de placeholder pour la section des tags
 * Affiche un bloc de chargement animé
 * Masqué sur mobile (max-sm:hidden)
 *
 * @component
 * @returns {JSX.Element} Animation de chargement de la section tags
 */
function TagsThreadSkeleton() {
  return (
    <div className="flex animate-pulse flex-col max-sm:hidden">
      <div className="h-52 rounded-lg bg-neutral-4"></div>
    </div>
  );
}
export default TagsThreadSkeleton;
