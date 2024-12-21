import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { forgotPasswordSchema } from '../../lib/shemas';
import Button from '../ui/Button';
import FormField from './FormField';

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
    //..
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormField disabled={isSubmitting} label="Email" name="email" type="email" register={register} errors={errors} placeholder="dark.s@email.com" />
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Chargement...' : 'Réinitialiser le mot de passe'}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
