/**
 * Props du composant StatItem
 * @typedef {object} StatItemProps
 * @property {string} label - Le label de la statistique
 * @property {number} value - La valeur de la statistique
 * @property {string} [border] - Classe CSS pour la bordure
 * @property {() => void} [onClick] - Fonction appelée au clic sur l'élément
 */
type StatItemProps = {
  label: string;
  value: number;
  border?: string;
  onClick?: () => void;
};

/**
 * Composant d'affichage d'une statistique utilisateur
 * Fonctionnalités :
 * - Affichage du label et de la valeur
 * - Option de bordure personnalisée
 * - Option de clic interactif
 *
 * @component
 * @param {StatItemProps} props - Les propriétés du composant
 * @returns {JSX.Element} Élément de statistique utilisateur
 */
function StatItem({ label, value, border, onClick }: StatItemProps) {
  return (
    <div onClick={onClick} className={`flex w-1/3 flex-col items-center justify-center gap-1 ${border} ${onClick ? 'cursor-pointer hover:text-green-11' : ''}`}>
      <p className="text-xs text-neutral-11">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default StatItem;
