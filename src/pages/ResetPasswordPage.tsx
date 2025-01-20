import ResetPasswordForm from '../components/auth/ResetPasswordForm';

/**
 * Page de réinitialisation de mot de passe
 * Fonctionnalités :
 * - Formulaire de réinitialisation de mot de passe
 *
 * @component
 * @returns {JSX.Element} Page de réinitialisation de mot de passe
 */
function ResetPasswordPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center p-4">
      <div className="w-full rounded-lg border border-neutral-6 bg-neutral-1 p-6 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-neutral-12">Réinitialisation du mot de passe</h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
