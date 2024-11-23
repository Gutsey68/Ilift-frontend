import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { Spacing } from '../components/ui/Spacing';

function ForgotPasswordPage() {
  return (
    <>
      <Spacing size="sm" />
      <div className="flex items-center justify-center">
        <div className="my-10 flex w-96 flex-col ">
          <h1 className="text-2xl font-semibold">Mot de passe oublié</h1>
          <p className="mb-4 mt-2 text-sm text-neutral-10">
            Renseignez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
          <ForgotPasswordForm />
          <Link className="mt-4 text-center text-sm text-neutral-10" to="/connexion">
            <button className="group">
              <span className="underline group-hover:text-green-9">Retour à la connexion</span>
            </button>
          </Link>
        </div>
      </div>
      <Spacing />
      <Spacing size="sm" />
    </>
  );
}
export default ForgotPasswordPage;
