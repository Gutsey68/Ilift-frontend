import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

const schema = z
  .object({
    pseudo: z.string().min(1, 'Le pseudo est requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(3, 'Le mot de passe doit comporter au moins 3 caractères'),
    confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  });

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });
  const { registerMutation } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = (data: z.infer<typeof schema>) => {
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
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <label htmlFor="pseudo" className="mt-1 text-sm">
        Pseudo
      </label>
      <div className="relative">
        <Input {...register('pseudo')} type="text" name="pseudo" placeholder="Pseudo" />
        {errors.pseudo && <TriangleAlert size={20} className="absolute right-3.5 top-2 text-red-600" />}
      </div>
      {errors.pseudo && <p className="mb-1 text-sm text-red-600">{errors.pseudo.message?.toString()}</p>}
      <label htmlFor="email" className="mt-1 text-sm">
        Email
      </label>
      <div className="relative">
        <Input {...register('email')} type="email" name="email" placeholder="Email" />
        {errors.email && <TriangleAlert size={20} className="absolute right-3.5 top-2 text-red-600" />}
      </div>
      {errors.email && <p className="mb-1 text-sm text-red-600">{errors.email.message?.toString()}</p>}
      <label htmlFor="password" className="mt-1 text-sm">
        Password
      </label>
      <div className="relative">
        <Input {...register('password')} type="password" name="password" placeholder="Mot de passe" />
        {errors.password && <TriangleAlert size={20} className="absolute right-3.5 top-2 text-red-600" />}
      </div>
      {errors.password && <p className="mb-1 text-sm text-red-600">{errors.password.message?.toString()}</p>}
      <label htmlFor="confirmPassword" className="mt-1 text-sm">
        Confirmer le mot de passe
      </label>
      <div className="relative">
        <Input {...register('confirmPassword')} type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" />{' '}
        {errors.confirmPassword && <TriangleAlert size={20} className="absolute right-3.5 top-2 text-red-600" />}
      </div>
      {errors.confirmPassword && <p className="mb-1 text-sm text-red-600">{errors.confirmPassword.message?.toString()}</p>}
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || registerMutation.status === 'pending'}>
        {isSubmitting || registerMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : "S'inscrire"}
      </Button>
    </form>
  );
}

export default RegisterForm;
