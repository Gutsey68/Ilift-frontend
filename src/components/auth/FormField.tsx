import { TriangleAlert } from 'lucide-react';
import { Input } from '../ui/Input';

type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  register: any;
  errors: any;
};

function FormField({ label, name, type, register, errors }: FormFieldProps) {
  return (
    <>
      <label htmlFor={name} className="mt-1 text-sm">
        {label}
      </label>
      <div className="relative">
        <Input {...register(name)} type={type} name={name} placeholder={label} />
        {errors[name] && <TriangleAlert size={20} className="absolute right-3.5 top-2 text-red-600" />}
      </div>
      {errors[name] && <p className="mb-1 text-sm text-red-600">{errors[name].message?.toString()}</p>}
    </>
  );
}

export default FormField;
