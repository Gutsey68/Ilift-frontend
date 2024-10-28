import StatItem from './StatItem';

function UserStats() {
  return (
    <div className="flex h-fit w-full items-center justify-center gap-2">
      <StatItem label="Abonnés" value={458} border="border-r border-neutral-6" />
      <StatItem label="Abonnements" value={365} />
      <StatItem label="Activités" value={23} border="border-l border-neutral-6" />
    </div>
  );
}

export default UserStats;
