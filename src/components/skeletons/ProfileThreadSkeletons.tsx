/**
 * Composant de placeholder pour le fil d'actualité du profil
 * Affiche un bloc de chargement animé pour la section principale
 * Masqué sur mobile
 * @component
 * @returns {JSX.Element} Animation de chargement du fil d'actualité
 */
function ProfileThreadSkeleton() {
  return (
    <div className="flex animate-pulse flex-col max-sm:hidden">
      <div className="h-96 rounded-lg bg-neutral-4"></div>
    </div>
  );
}
export default ProfileThreadSkeleton;
