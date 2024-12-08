import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../../hooks/useAuth';
import { loginSchema } from '../../lib/shemas';
import Button from '../ui/Button';
import FormField from './FormField';

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
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await loginMutation.mutateAsync(data);
      navigate('/accueil');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('root', { type: 'manual', message: 'Erreur lors de la connexion' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {loginMutation.isError && (
        <p className="text-red-600" onClick={() => loginMutation.reset()}>
          {loginMutation.error?.message}
        </p>
      )}
      <FormField label="Pseudo" name="pseudo" type="text" register={register} errors={errors} placeholder="darkSasuke" />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className={`mt-1 text-sm ${errors.password && 'text-red-600'}`}>
            Mot de passe
          </label>
          <Link className="" to="/mot-de-passe-oublie">
            <p className="text-xs text-neutral-10 underline hover:text-green-9">Mot de passe oublié ?</p>
          </Link>
        </div>
        <FormField label="" name="password" type="password" register={register} errors={errors} />
      </div>
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || loginMutation.status === 'pending'}>
        {isSubmitting || loginMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : 'Se connecter'}
      </Button>
    </form>
  );
}

export default LoginForm;
