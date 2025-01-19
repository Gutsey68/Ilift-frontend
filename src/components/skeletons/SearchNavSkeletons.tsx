/**
 * Composant de placeholder pour les résultats de recherche
 * Affiche 5 éléments de chargement simulant :
 * - Avatar
 * - Nom d'utilisateur
 * Avec animation pulse
 *
 * @component
 * @returns {JSX.Element} Animation de chargement des résultats de recherche
 */
function SearchNavSkeletons() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-8 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/2 rounded bg-neutral-4"></div>
      </div>
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-8 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/2 rounded bg-neutral-4"></div>
      </div>
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-8 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/2 rounded bg-neutral-4"></div>
      </div>
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-8 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/2 rounded bg-neutral-4"></div>
      </div>
      <div className="flex w-full animate-pulse items-center gap-2">
        <div className="size-8 rounded-full bg-neutral-4"></div>
        <div className="h-5 w-1/2 rounded bg-neutral-4"></div>
      </div>
    </div>
  );
}
export default SearchNavSkeletons;
