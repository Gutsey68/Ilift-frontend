import { Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import loginPhoto from '../assets/images/loginPhoto.jpg';
import LoginForm from '../components/auth/LoginForm';

function LoginPage() {
  return (
    <main className="flex h-screen justify-center bg-neutral-1 max-lg:px-4">
      <section className="flex items-center justify-center lg:w-1/2">
        <div className="my-10 flex w-96 flex-col ">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Connexion</h1>
            <p className="mb-6 mt-2 text-sm text-neutral-10">Entrez vos informations pour vous connecter.</p>
          </div>
          <LoginForm />
          <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-10">
            <Link to="/inscription" className="group">
              <button className="group">
                Vous n'avez pas encore de compte ? <span className="underline group-hover:text-green-9">S'inscrire</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
      <div className="w-1/2 max-lg:hidden">
        <img src={loginPhoto} className="size-full bg-neutral-1 object-cover" alt="" />
      </div>
      <Link to="/">
        <Dumbbell size={36} className="absolute left-8 top-8 text-green-9" />
      </Link>
    </main>
  );
}
export default LoginPage;
