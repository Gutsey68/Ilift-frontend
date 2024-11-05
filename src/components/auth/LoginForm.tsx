import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../../hooks/useAuth';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

const loginSchema = z.object({
  pseudo: z.string().min(1, 'Le pseudo est requis'),
  password: z.string().min(3, 'Le mot de passe doit comporter au moins 3 caractères')
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  });
  const { loginMutation } = useAuth();
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      localStorage.setItem('token', response.token);
      setAuthenticated(true);

      navigate('/tableau-de-bord');
    } catch {
      setError('root', { type: 'manual', message: 'Erreur lors de la connexion' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Connexion</h2>
      {loginMutation.isError && (
        <p className="text-red-600" onClick={() => loginMutation.reset()}>
          {loginMutation.error?.message}
        </p>
      )}
      <label htmlFor="pseudo" className="mt-1 text-sm">
        Pseudo
      </label>
      <Input {...register('pseudo')} type="text" name="pseudo" placeholder="Pseudo" />
      {errors.pseudo && <p className="mb-1 text-sm text-red-600">{errors.pseudo.message?.toString()}</p>}
      <label htmlFor="password" className="mt-1 text-sm">
        Mot de passe
      </label>
      <Input {...register('password')} type="password" name="password" placeholder="Mot de passe" />
      {errors.password && <p className="mb-1 text-sm text-red-600">{errors.password.message?.toString()}</p>}
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || loginMutation.status === 'pending'}>
        {isSubmitting || loginMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : 'Se connecter'}
      </Button>
    </form>
  );
}

export default LoginForm;
