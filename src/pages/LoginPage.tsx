import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Card from '../components/ui/Card';

function LoginPage() {
  return (
    <div className="flex items-center justify-center">
      <Card size="lg" className="my-10 flex w-96 flex-col ">
        <h1 className="text-2xl font-semibold">Connexion</h1>
        <p className="mb-6 mt-2 text-sm text-neutral-10">Entrez votre email et votre mot de passe ci-dessous pour vous connecter à votre compte.</p>
        <LoginForm />
        <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-10">
          <Link to="/inscription" className="group">
            <button className="group">
              Vous n'avez pas encore de compte ? <span className="underline group-hover:text-green-9">S'inscrire</span>
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
export default LoginPage;
