import { Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import forgetPhoto from '../assets/images/forgotPhoto.jpg';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

function ForgotPasswordPage() {
  return (
    <main className="flex h-screen justify-center bg-neutral-1 max-lg:px-4">
      <div className="flex items-center justify-center lg:w-1/2">
        <div className="my-10 flex w-96 flex-col ">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Mot de passe oublié</h1>
            <p className="mb-4 mt-2 text-sm text-neutral-10">
              Renseignez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>
          <ForgotPasswordForm />
          <Link className="mt-4 text-center text-sm text-neutral-10" to="/connexion">
            <button className="group">
              <span className="underline group-hover:text-green-9">Retour à la connexion</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-1/2 max-lg:hidden">
        <img className="size-full bg-neutral-1 object-cover" src={forgetPhoto} alt="" />
      </div>
      <Link to="/">
        <Dumbbell size={36} className="absolute left-8 top-8 text-green-9" />
      </Link>
    </main>
  );
}
export default ForgotPasswordPage;
