import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import Card from '../components/ui/Card';

function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center">
      <Card size="lg" className="my-10 flex w-96 flex-col ">
        <h1 className="text-2xl font-semibold">Mot de passe oublié</h1>
        <Link className="mb-4 mt-2 text-sm text-neutral-10" to="/connexion">
          <button className="group">
            Vous avez déjà un compte ? <span className="underline group-hover:text-green-9">Se connecter</span>
          </button>
        </Link>
        <ForgotPasswordForm />
      </Card>
    </div>
  );
}
export default ForgotPasswordPage;
