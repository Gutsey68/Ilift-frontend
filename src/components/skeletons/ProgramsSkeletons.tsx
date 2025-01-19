/**
 * Composant de placeholder pour la liste des programmes
 * Affiche 4 éléments de chargement simulant :
 * - Titre du programme
 * - Description
 * Avec séparateurs et animation pulse
 *
 * @component
 * @returns {JSX.Element} Animation de chargement des programmes
 */
function ProgramsSkeletons() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div key={index}>
          <hr className="mb-4 border-neutral-6" />
          <div className="animate-pulse">
            <div className="mb-2 h-5 w-1/6 rounded-full bg-neutral-4"></div>
            <div className="h-4 w-1/3 rounded-full bg-neutral-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProgramsSkeletons;
