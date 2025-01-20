import { TagType } from '@/types/tagType';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

/**
 * Props du composant Trends
 * @typedef {object} TrendsProps
 * @property {TagType[]} tags - Liste des tags tendances
 */
type TrendsProps = {
  tags: TagType[];
};

/**
 * Composant d'affichage des tendances
 * Fonctionnalités :
 * - Affichage des tags tendances sous forme de badges
 * - Mise en page stylisée avec un conteneur Card
 *
 * @component
 * @param {TrendsProps} props - Les propriétés du composant
 * @returns {JSX.Element} Liste des tendances
 */
function Trends({ tags }: TrendsProps) {
  return (
    <Card size="md" className="flex w-full flex-col gap-4">
      <div className="w-full border-b border-neutral-6 px-2 pb-2">
        <h2 className="font-semibold">Tendances</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge key={tag.id}>{tag.name}</Badge>
        ))}
      </div>
    </Card>
  );
}

export default Trends;
