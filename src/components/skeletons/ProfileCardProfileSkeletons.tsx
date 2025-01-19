/**
 * Composant de placeholder pour la carte de profil
 * Simule le chargement des informations utilisateur :
 * - Avatar
 * - Nom et description
 * - Statistiques et métriques
 *
 * @component
 * @returns {JSX.Element} Animation de chargement de la carte de profil
 */
function ProfileCardProfileSkeletons() {
  return (
    <div className="flex animate-pulse items-center gap-4 border-b border-neutral-6 p-6 shadow-sm">
      <div className="size-24 rounded-full bg-neutral-4"></div>
      <div className="flex flex-col gap-2">
        <div className="h-6 w-32 rounded-xl bg-neutral-4"></div>
        <div className="h-4 w-48 rounded-lg bg-neutral-4"></div>
        <div className="mt-2 flex gap-6">
          <div className="h-4 w-24 rounded-lg bg-neutral-4"></div>
          <div className="h-4 w-24 rounded-lg bg-neutral-4"></div>
        </div>
        <div className="mt-2 flex gap-6">
          <div className="h-4 w-24 rounded-lg bg-neutral-4"></div>
          <div className="h-4 w-24 rounded-lg bg-neutral-4"></div>
          <div className="h-4 w-24 rounded-lg bg-neutral-4"></div>
        </div>
      </div>
    </div>
  );
}
export default ProfileCardProfileSkeletons;
