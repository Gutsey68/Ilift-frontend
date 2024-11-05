import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useValidation from '../../hooks/useValidation';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

function RegisterForm() {
  const { inputState, error, touched, changeHandler, registerSubmitValidation } = useValidation();
  const { registerMutation } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerSubmitValidation(e);

    setSuccessMessage(null);

    registerMutation.mutate(
      {
        pseudo: inputState.pseudo,
        email: inputState.email,
        password: inputState.password
      },
      {
        onSuccess: () => {
          setSuccessMessage('Inscription réussie !');
        },
        onError: error => {
          console.log(error.message);
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Inscription</h2>
      {registerMutation.isError && (
        <p className="text-red-600" onClick={() => registerMutation.reset()}>
          {registerMutation.error?.message}
        </p>
      )}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <p className="mb-4 text-sm text-neutral-11">Entre tes informations pour créer un compte</p>
      <label htmlFor="pseudo" className="mt-1 text-sm">
        Pseudo
      </label>
      <Input onChange={changeHandler} value={inputState.pseudo} type="text" name="pseudo" placeholder="Pseudo" />
      <label htmlFor="email" className="mt-1 text-sm">
        Email
      </label>
      <Input onChange={changeHandler} value={inputState.email} type="email" name="email" placeholder="Email" />
      {touched.email && error.email && <p className="mb-1 text-sm text-red-600">Email invalide</p>}
      <label htmlFor="password" className="mt-1 text-sm">
        Password
      </label>
      <Input onChange={changeHandler} value={inputState.password} type="password" name="password" placeholder="Mot de passe" />
      {touched.password && error.password && <p className="mb-1 text-sm text-red-600">Mot de passe invalide</p>}
      <label htmlFor="confirmPassword" className="mt-1 text-sm">
        Confirmer le mot de passe
      </label>
      <Input onChange={changeHandler} value={inputState.confirmPassword} type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" />
      {touched.confirmPassword && error.confirmPassword && <p className="mb-1 text-sm text-red-600">Les mots de passe ne correspondent pas</p>}
      <Button type="submit" className="mt-2 w-full" disabled={registerMutation.status === 'pending'}>
        {registerMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : "S'inscrire"}
      </Button>
    </form>
  );
}

export default RegisterForm;
