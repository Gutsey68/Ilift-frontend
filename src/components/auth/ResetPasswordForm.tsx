import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../../hooks/useAuth';
import { resetPasswordSchema } from '../../lib/shemas';
import Button from '../ui/Button';
import FormField from './FormField';

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const { resetPasswordMutation } = useAuth();

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    if (!token) {
      toast.error('Token manquant');
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        newPassword: data.newPassword
      });
      toast.success('Mot de passe mis à jour avec succès');
      navigate('/connexion');
    } catch {
      toast.error('Erreur lors de la réinitialisation du mot de passe');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormField
        disabled={isSubmitting || resetPasswordMutation.status === 'pending'}
        label="Nouveau mot de passe"
        name="newPassword"
        type="password"
        register={register}
        errors={errors}
      />
      <FormField
        disabled={isSubmitting || resetPasswordMutation.status === 'pending'}
        label="Confirmer le mot de passe"
        name="confirmPassword"
        type="password"
        register={register}
        errors={errors}
      />
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting || resetPasswordMutation.status === 'pending'}>
        {isSubmitting || resetPasswordMutation.status === 'pending' ? <LoaderCircle className="animate-spin" size={20} /> : 'Mettre à jour le mot de passe'}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
