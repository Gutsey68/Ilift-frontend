import { Circle } from 'lucide-react';

function Spinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-1">
      <Circle size={60} className="animate-spin" />
    </div>
  );
}
export default Spinner;
