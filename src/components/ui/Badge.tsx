type BadgeProps = {
  children: React.ReactNode;
};
function Badge({ children }: BadgeProps) {
  return <div className="w-fit rounded-xl bg-green-3 px-1.5 text-sm text-green-11">{children}</div>;
}
export default Badge;
