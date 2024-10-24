import { Dispatch, SetStateAction, useState } from 'react';
import { FormType } from '../../pages/AuthPage';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

type LoginFormProps = {
    setFormType: Dispatch<SetStateAction<FormType>>;
};

function LoginForm({ setFormType }: LoginFormProps) {
    const [inputState, setInputState] = useState({ email: '', password: '' });
    const [error, setError] = useState({
        email: false,
        password: false
    });

    const [areValid, setAreValid] = useState({ email: false, password: false });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (validationCheck()) {
            console.log('Envoi du formulaire');
        } else {
            console.log('Erreur dans le formulaire');
        }
    };

    const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({ ...inputState, password: e.target.value });

        if (inputState.password.length < 5) {
            setError(state => ({ ...state, password: true }));
            setAreValid({ ...areValid, password: false });
        } else {
            setAreValid({ ...areValid, password: true });
            setError(state => ({ ...state, password: false }));
        }
    };

    const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({ ...inputState, email: e.target.value });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(inputState.email)) {
            setError(state => ({ ...state, email: true }));
            setAreValid({ ...areValid, email: false });
        } else {
            setAreValid({ ...areValid, email: true });
            setError(state => ({ ...state, email: false }));
        }
    };

    function validationCheck() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(inputState.email)) {
            setError(state => ({ ...state, email: true }));
            setAreValid({ ...areValid, email: false });
        } else {
            setAreValid({ ...areValid, email: true });
            setError(state => ({ ...state, email: false }));
        }

        if (inputState.password.length < 5) {
            setError(state => ({ ...state, password: true }));
            setAreValid({ ...areValid, password: false });
        } else {
            setAreValid({ ...areValid, password: true });
            setError(state => ({ ...state, password: false }));
        }

        if (areValid.email && areValid.password) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Connexion</h2>
            <p className="mb-4 text-sm text-neutral-11">Entrez votre email ci-dessous pour vous connecter à votre compte</p>
            <label htmlFor="email" className="text-sm">
                Email
            </label>
            <Input onChange={changeEmailHandler} value={inputState.email} type="email" name="email" placeholder="Email" className="" />
            {error.email && <p className="mb-2 text-sm text-red-600">Email invalide</p>}
            <div className="mt-2 flex justify-between text-sm">
                <label htmlFor="password">Mot de passe</label>
                <button onClick={() => setFormType('forgotPassword')} className="underline hover:text-green-9">
                    Mot de passe oublié
                </button>
            </div>
            <Input onChange={changePasswordHandler} value={inputState.password} type="password" name="password" placeholder="Mot de passe" className="" />
            {error.password && <p className="mb-2 text-sm text-red-600">Mot de passe invalide</p>}
            <Button type="submit" className="mt-2 w-full">
                Se connecter
            </Button>
        </form>
    );
}
export default LoginForm;
