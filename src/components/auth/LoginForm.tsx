import { Dispatch, SetStateAction } from 'react';
import { FormType } from '../../pages/AuthPage';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

type LoginFormProps = {
    formType: string;
    setFormType: Dispatch<SetStateAction<FormType>>;
};

function LoginForm({ formType, setFormType }: LoginFormProps) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Connexion</h2>
            <p className="mb-4 text-sm text-neutral-11">Entrez votre email ci-dessous pour vous connecter à votre compte</p>
            <label htmlFor="email" className="text-sm">
                Email
            </label>
            <Input type="email" name="email" placeholder="Email" className="" required />
            <div className="mt-2 flex justify-between text-sm">
                <label htmlFor="password">Mot de passe</label>
                {formType !== 'forgotPassword' && (
                    <button onClick={() => setFormType('forgotPassword')} className="underline hover:text-green-9">
                        Mot de passe oublié
                    </button>
                )}
            </div>
            <Input type="password" name="password" placeholder="Mot de passe" className="" required />
            <Button type="submit" className="mt-2 w-full">
                Se connecter
            </Button>
        </div>
    );
}
export default LoginForm;
