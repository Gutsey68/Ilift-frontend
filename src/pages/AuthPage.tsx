import { useState } from 'react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export type FormType = 'login' | 'register' | 'forgotPassword';

export default function AuthPage() {
    const [formType, setFormType] = useState<FormType>('login');

    const renderForm = () => {
        switch (formType) {
            case 'login':
                return <LoginForm formType={formType} setFormType={setFormType} />;
            case 'register':
                return <RegisterForm />;
            case 'forgotPassword':
                return <ForgotPasswordForm />;
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex w-96 flex-col rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2 p-6 shadow-sm">
                <form>{renderForm()}</form>
                <div className="mt-4 flex flex-col gap-2 text-center text-sm">
                    {formType !== 'login' && (
                        <button className="group" onClick={() => setFormType('login')}>
                            Vous avez déjà un compte ? <span className="underline group-hover:text-green-9">Se connecter</span>
                        </button>
                    )}
                    {formType !== 'register' && (
                        <button className="group" onClick={() => setFormType('register')}>
                            Vous n'avez pas encore de compte ? <span className="underline group-hover:text-green-9">S'inscrire</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
