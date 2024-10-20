import { useState } from 'react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

type FormType = 'login' | 'register' | 'forgotPassword';

export default function AuthPage() {
    const [formType, setFormType] = useState<FormType>('login');

    const renderForm = () => {
        switch (formType) {
            case 'login':
                return <LoginForm />;
            case 'register':
                return <RegisterForm />;
            case 'forgotPassword':
                return <ForgotPasswordForm />;
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="flex h-fit w-96 flex-col rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2 p-8 shadow-md">
                <form className="grow overflow-y-auto">{renderForm()}</form>
                <div className="mt-4 text-center">
                    {formType !== 'login' && (
                        <button onClick={() => setFormType('login')} className="text-green-9 hover:underline">
                            Se connecter
                        </button>
                    )}
                    {formType !== 'register' && (
                        <button onClick={() => setFormType('register')} className="ml-4 text-green-9 hover:underline">
                            S'inscrire
                        </button>
                    )}
                    {formType !== 'forgotPassword' && (
                        <button onClick={() => setFormType('forgotPassword')} className="ml-4 text-green-9 hover:underline">
                            Mot de passe oublié
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
