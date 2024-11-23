type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};
function Badge({ children, ...props }: BadgeProps) {
  return (
    <div {...props} className="w-fit rounded-xl bg-green-3 px-1.5 text-sm text-green-11">
      {children}
    </div>
  );
}
export default Badge;
