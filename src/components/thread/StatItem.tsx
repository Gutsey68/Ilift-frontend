function StatItem({ label, value, border }: { label: string; value: number; border?: string }) {
  return (
    <div className={`flex w-1/3 flex-col items-center justify-center gap-1 ${border}`}>
      <p className="text-xs text-neutral-11">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default StatItem;
