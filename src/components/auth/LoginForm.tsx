import { Dispatch, SetStateAction } from 'react';
import useValidation from '../../hooks/useValidation';
import { FormType } from '../../pages/AuthPage';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

type LoginFormProps = {
    setFormType: Dispatch<SetStateAction<FormType>>;
};

function LoginForm({ setFormType }: LoginFormProps) {
    const { inputState, error, touched, changeHandler, loginSubmitHandler } = useValidation();

    return (
        <form onSubmit={loginSubmitHandler} className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Connexion</h2>
            <p className="mb-4 text-sm text-neutral-11">Entrez votre email ci-dessous pour vous connecter à votre compte</p>
            <label htmlFor="email" className="text-sm">
                Email
            </label>
            <Input onChange={changeHandler} value={inputState.email} type="email" name="email" placeholder="Email" className="" />
            {touched.email && error.email && <p className="mb-2 text-sm text-red-600">Email invalide</p>}
            <div className="mt-2 flex justify-between text-sm">
                <label htmlFor="password">Mot de passe</label>
                <a onClick={() => setFormType('forgotPassword')} className="cursor-pointer underline hover:text-green-9">
                    Mot de passe oublié
                </a>
            </div>
            <Input onChange={changeHandler} value={inputState.password} type="password" name="password" placeholder="Mot de passe" className="" />
            {touched.password && error.password && <p className="mb-2 text-sm text-red-600">Mot de passe invalide</p>}
            <Button type="submit" className="mt-2 w-full">
                Se connecter
            </Button>
        </form>
    );
}

export default LoginForm;
