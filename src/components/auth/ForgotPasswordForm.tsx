import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalide')
});

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log('Email:', data.email);
    // ...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Mot de passe oublié</h2>
      <p className="mb-4 text-sm text-neutral-11">Entrez votre email ci-dessous pour réinitialiser votre mot de passe.</p>
      <label htmlFor="email" className="text-sm">
        Email
      </label>
      <Input {...register('email')} type="email" name="email" placeholder="Email" />
      {errors.email && <p className="mb-1 text-sm text-red-600">{errors.email.message}</p>}
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Chargement...' : 'Réinitialiser le mot de passe'}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
