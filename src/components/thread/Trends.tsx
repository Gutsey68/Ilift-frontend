import Badge from '../ui/Badge';
import Card from '../ui/Card';

function Trends() {
  return (
    <Card size="md" className="sticky top-[444px] flex flex-col gap-4">
      <div className="w-full border-b border-neutral-6 px-2 pb-2">
        <h2 className="font-semibold">Tendances</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>Leg day</Badge>
        <Badge>Pump</Badge>
        <Badge>🍗</Badge>
        <Badge>Gainz</Badge>
        <Badge>Repos</Badge>
      </div>
    </Card>
  );
}
export default Trends;
