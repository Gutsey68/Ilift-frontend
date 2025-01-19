/**
 * Composant de placeholder pour la navigation droite
 * Affiche deux cercles animés simulant :
 * - Icône de notification
 * - Avatar utilisateur
 *
 * @component
 * @returns {JSX.Element} Animation de chargement de la navigation droite
 */
function RightNavSkeleton() {
  return (
    <>
      <div className="size-10 animate-pulse rounded-full bg-neutral-4"></div>
      <div className="size-10 animate-pulse rounded-full bg-neutral-4"></div>
    </>
  );
}
export default RightNavSkeleton;
