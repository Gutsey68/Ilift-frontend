import {zodResolver} from "@hookform/resolvers/zod";
import {LoaderCircle} from "lucide-react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useNavigate, useSearchParams} from "react-router-dom";
import {z} from "zod";
import useAuth from "../../hooks/useAuth";
import {updatePasswordSchema} from "../../validators/auth.validation";
import Button from "../ui/Button";
import FormField from "./FormField";

/**
 * Formulaire de réinitialisation de mot de passe
 * Fonctionnalités :
 * - Validation des champs avec Zod
 * - Vérification du token dans l'URL
 * - Vérification de la correspondance des mots de passe
 * - Redirection après succès
 * - Gestion des états de chargement
 * - Messages d'erreur contextuels
 *
 * @component
 * @returns {JSX.Element} Formulaire de réinitialisation de mot de passe
 */
function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { resetPasswordMutation } = useAuth();

  /**
   * Gère la soumission du formulaire
   * Vérifie la présence du token et met à jour le mot de passe
   * @param {z.infer<typeof updatePasswordSchema>} data - Données du formulaire validées
   */
  const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    if (!token) {
      toast.error("Token manquant");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Mot de passe mis à jour avec succès");
      navigate("/connexion");
    } catch {
      toast.error("Erreur lors de la réinitialisation du mot de passe");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input type="hidden" {...register("token")} value={token || ""} />
      <FormField
        disabled={isSubmitting || resetPasswordMutation.status === "pending"}
        label="Nouveau mot de passe"
        name="newPassword"
        type="password"
        register={register}
        errors={errors}
      />
      <FormField
        disabled={isSubmitting || resetPasswordMutation.status === "pending"}
        label="Confirmer le mot de passe"
        name="confirmPassword"
        type="password"
        register={register}
        errors={errors}
      />
      <Button
        type="submit"
        className="mt-2 w-full"
        disabled={isSubmitting || resetPasswordMutation.status === "pending"}
      >
        {isSubmitting || resetPasswordMutation.status === "pending" ? (
          <LoaderCircle className="animate-spin" size={20} />
        ) : (
          "Mettre à jour le mot de passe"
        )}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
