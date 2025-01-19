import { TriangleAlert } from 'lucide-react';
import { Input } from '../ui/Input';

/**
 * Props du composant FormField
 * @typedef {object} FormFieldProps
 * @property {string} label - Libellé du champ
 * @property {string} name - Nom du champ pour le formulaire
 * @property {string} type - Type de l'input HTML
 * @property {any} register - Fonction d'enregistrement de React Hook Form
 * @property {{ [key: string]: { message?: string } }} errors - Objet d'erreurs de React Hook Form
 * @property {string} [placeholder] - Texte de placeholder
 * @property {boolean} [disabled] - État désactivé du champ
 */
type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  register: any;
  errors: { [key: string]: { message?: string } };
  placeholder?: string;
  disabled?: boolean;
};

/**
 * Composant de champ de formulaire avec gestion des erreurs et styles
 * Fonctionnalités :
 * - Intégration avec React Hook Form
 * - Affichage des erreurs de validation
 * - Styles d'état (erreur, désactivé)
 * - Icône d'erreur
 *
 * @component
 * @param {FormFieldProps} props - Les propriétés du composant
 * @returns {JSX.Element} Champ de formulaire avec gestion des erreurs
 */
function FormField({ label, name, type, register, errors, placeholder, disabled }: FormFieldProps) {
  return (
    <>
      <label htmlFor={name} className={`mt-1 text-sm ${errors[name] && 'text-red-11'}`}>
        {label}
      </label>
      <div className="relative">
        <Input disabled={disabled} {...register(name)} type={type} name={name} placeholder={placeholder} />
        {errors[name] && <TriangleAlert size={20} className="absolute right-3.5 top-2 text-red-11" />}
      </div>
      {errors[name] && <p className="mb-1 text-sm text-red-11">{errors[name].message?.toString()}</p>}
    </>
  );
}

export default FormField;
