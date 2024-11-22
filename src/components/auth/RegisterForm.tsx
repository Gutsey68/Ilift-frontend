import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const onSubmit = (data: z.infer<typeof registerShema>) => {
    setSuccessMessage(null);

    registerMutation.mutate(
      {
        pseudo: data.pseudo,
        email: data.email,
        password: data.password
      },
      {
        onSuccess: () => {
          setSuccessMessage('Inscription réussie ! Vous pouvez vous connecter');
          reset();
        },
        onError: error => {
          setError('root', { type: 'manual', message: error.message });
        }
      }
    );
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
      <FormField label="Pseudo" name="pseudo" type="text" register={register} errors={errors} placeholder="darkSasuke" />
      <FormField label="Email" name="email" type="email" register={register} errors={errors} placeholder="dark.s@email.com" />
      <FormField label="Mot de passe" name="password" type="password" register={register} errors={errors} />
      <FormField label="Confirmer le mot de passe" name="confirmPassword" type="password" register={register} errors={errors} />
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || registerMutation.status === 'pending'}>
        {isSubmitting || registerMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : "S'inscrire"}
      </Button>
    </form>
  );
}

export default RegisterForm;
