import { useState } from 'react';

const useValidation = () => {
    const [inputState, setInputState] = useState({ email: '', password: '' });
    const [areValid, setAreValid] = useState({ email: false, password: false });
    const [error, setError] = useState({
        email: false,
        password: false
    });

    const emailValidation = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(inputState.email)) {
            setError(state => ({ ...state, email: true }));
            setAreValid({ ...areValid, email: false });
        } else {
            setAreValid({ ...areValid, email: true });
            setError(state => ({ ...state, email: false }));
        }
    };

    const passwordValidation = () => {
        if (inputState.password.length < 5) {
            setError(state => ({ ...state, password: true }));
            setAreValid({ ...areValid, password: false });
        } else {
            setAreValid({ ...areValid, password: true });
            setError(state => ({ ...state, password: false }));
        }
    };

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
        passwordValidation();
    };

    const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({ ...inputState, email: e.target.value });
        emailValidation();
    };

    const validationCheck = () => {
        emailValidation();
        passwordValidation();

        return areValid.email && areValid.password;
    };

    return {
        inputState,
        error,
        areValid,
        changeEmailHandler,
        changePasswordHandler,
        submitHandler
    };
};

export default useValidation;
