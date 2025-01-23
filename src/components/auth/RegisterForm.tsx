import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import {z} from "zod";
import useAuth from "../../hooks/useAuth";
import {registerSchema} from "../../validators/auth.validation";
import Button from "../ui/Button";
import FormField from "./FormField";

/**
 * Formulaire d'inscription avec validation complète
 * Fonctionnalités :
 * - Validation des champs avec Zod
 * - Vérification de la correspondance des mots de passe
 * - Gestion des états de chargement
 * - Messages d'erreur contextuels
 * - Notifications de succès/échec
 * - Lien vers les mentions légales
 *
 * @component
 * @returns {JSX.Element} Formulaire d'inscription
 */
function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });
  const { registerMutation } = useAuth();
  const navigate = useNavigate();

  /**
   * Gère la soumission du formulaire d'inscription
   * @param {z.infer<typeof registerSchema>} data - Données du formulaire validées
   */
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await registerMutation.mutateAsync({
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      navigate("/connexion");
      toast.success("Inscription réussie ! Vous pouvez vous connecter");
    } catch {
      toast.error("Erreur lors de la création de compte");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormField
        disabled={isSubmitting || registerMutation.status === "pending"}
        label="Pseudo"
        name="pseudo"
        type="text"
        register={register}
        errors={errors}
        placeholder="darkSasuke"
      />
      <FormField
        disabled={isSubmitting || registerMutation.status === "pending"}
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
        placeholder="dark.s@email.com"
      />
      <FormField
        disabled={isSubmitting || registerMutation.status === "pending"}
        label="Mot de passe"
        name="password"
        type="password"
        register={register}
        errors={errors}
      />
      <FormField
        disabled={isSubmitting || registerMutation.status === "pending"}
        label="Confirmer le mot de passe"
        name="confirmPassword"
        type="password"
        register={register}
        errors={errors}
      />
      <Link to="/mentions-legales" className="py-2 text-xs text-neutral-10">
        En vous inscrivant, vous acceptez nos{" "}
        <span className="underline">conditions d'utilisation</span> et notre{" "}
        <span className="underline">politique de confidentialité</span>.
      </Link>
      <hr className="border-neutral-6" />
      <Button
        type="submit"
        className="mt-2 w-full"
        isPending={isSubmitting || registerMutation.status === "pending"}
        disabled={isSubmitting || registerMutation.status === "pending"}
      >
        S'inscrire
      </Button>
    </form>
  );
}

export default RegisterForm;
