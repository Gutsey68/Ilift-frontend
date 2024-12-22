import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../../hooks/useAuth';
import { registerShema } from '../../lib/shemas';
import Button from '../ui/Button';
import FormField from './FormField';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<z.infer<typeof registerShema>>({
    resolver: zodResolver(registerShema)
  });
  const { registerMutation } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof registerShema>) => {
    setSuccessMessage(null);
    try {
      await registerMutation.mutateAsync({
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      reset();
      setSuccessMessage('Inscription réussie ! Vous pouvez vous connecter');
    } catch {
      setError('root', { type: 'manual', message: 'Erreur lors de la création de compte' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {registerMutation.isError && (
        <p className="text-red-600" onClick={() => registerMutation.reset()}>
          {registerMutation.error?.message}
        </p>
      )}
      {registerMutation.isSuccess && (
        <p className="text-green-9" onClick={() => registerMutation.reset()}>
          {successMessage}
        </p>
      )}
      <FormField
        disabled={isSubmitting || registerMutation.status === 'pending'}
        label="Pseudo"
        name="pseudo"
        type="text"
        register={register}
        errors={errors}
        placeholder="darkSasuke"
      />
      <FormField
        disabled={isSubmitting || registerMutation.status === 'pending'}
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
        placeholder="dark.s@email.com"
      />
      <FormField
        disabled={isSubmitting || registerMutation.status === 'pending'}
        label="Mot de passe"
        name="password"
        type="password"
        register={register}
        errors={errors}
      />
      <FormField
        disabled={isSubmitting || registerMutation.status === 'pending'}
        label="Confirmer le mot de passe"
        name="confirmPassword"
        type="password"
        register={register}
        errors={errors}
      />
      <Link to="/mentions-legales" className="py-2 text-xs text-neutral-10">
        En vous inscrivant, vous acceptez nos <span className="underline">conditions d'utilisation</span> et notre{' '}
        <span className="underline">politique de confidentialité</span>.
      </Link>
      <hr className="border-neutral-6" />
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || registerMutation.status === 'pending'}>
        {isSubmitting || registerMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : "S'inscrire"}
      </Button>
    </form>
  );
}

export default RegisterForm;
