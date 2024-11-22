import Card from '../ui/Card';

function Trends() {
  return (
    <Card size="md" className="sticky top-[80px] flex flex-col gap-4">
      <div className="w-full border-b border-neutral-6 px-2 pb-2">
        <h2 className="font-semibold">Tendances</h2>
      </div>
    </Card>
  );
}
export default Trends;
