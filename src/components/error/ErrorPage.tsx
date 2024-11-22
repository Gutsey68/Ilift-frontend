import Button from '../ui/Button';
import { Spacing } from '../ui/Spacing';

function ErrorPage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Spacing />
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-2xl">Oops, une erreur s'est produite</p>
        <p className="text-neutral-11">Un problème est survenu. Veuillez essayer de recharger la page.</p>
        <Button onClick={handleRefresh}>Recharger la page</Button>
      </div>
      <Spacing />
    </>
  );
}
export default ErrorPage;
