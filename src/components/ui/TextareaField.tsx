import { TriangleAlert } from 'lucide-react';
import { Textarea } from './Textarea';

/**
 * Props pour le composant TextareaField
 * @property label - Libellé du champ
 * @property name - Nom du champ pour le formulaire
 * @property register - Fonction d'enregistrement React Hook Form
 * @property errors - Objets des erreurs du formulaire
 * @property placeholder - Texte indicatif optionnel
 * @property disabled - État désactivé optionnel
 */
type TextareaFieldProps = {
  label: string;
  name: string;
  register: any;
  errors: { [key: string]: { message?: string } };
  placeholder?: string;
  disabled?: boolean;
};

/**
 * Champ textarea avec gestion des erreurs et du style
 * Utilise React Hook Form pour la gestion du formulaire
 */
function TextareaField({ label, name, register, errors, placeholder, disabled }: TextareaFieldProps) {
  return (
    <>
      <label htmlFor={name} className={`mt-1 text-sm ${errors[name] && 'text-red-11'}`}>
        {label}
      </label>
      <div className="relative">
        <Textarea disabled={disabled} {...register(name)} name={name} placeholder={placeholder} />
        {errors[name] && <TriangleAlert size={20} className="absolute right-3.5 top-2 text-red-11" />}
      </div>
      {errors[name] && <p className="mb-1 text-sm text-red-11">{errors[name].message?.toString()}</p>}
    </>
  );
}

export default TextareaField;
