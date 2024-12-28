import { TriangleAlert } from 'lucide-react';
import { Textarea } from './Textarea';

type TextareaFieldProps = {
  label: string;
  name: string;
  register: any;
  errors: { [key: string]: { message?: string } };
  placeholder?: string;
  disabled?: boolean;
};

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
