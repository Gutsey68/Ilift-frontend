import { useEffect, useState } from 'react';

const useValidation = () => {
  const [inputState, setInputState] = useState({ email: '', password: '', confirmPassword: '', pseudo: '' });
  const [areValid, setAreValid] = useState({ email: false, password: false, confirmPassword: false });
  const [error, setError] = useState({ email: false, password: false, confirmPassword: false });
  const [touched, setTouched] = useState({ email: false, password: false, confirmPassword: false });

  useEffect(() => {
    if (touched.email) validateEmail();
    if (touched.password) validatePassword();
    if (touched.confirmPassword) validateConfirmPassword();
  }, [inputState]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputState.email);
    setAreValid(prev => ({ ...prev, email: isValid }));
    setError(prev => ({ ...prev, email: !isValid }));
  };

  const validatePassword = () => {
    const isValid = inputState.password.length >= 3;
    setAreValid(prev => ({ ...prev, password: isValid }));
    setError(prev => ({ ...prev, password: !isValid }));
  };

  const validateConfirmPassword = () => {
    const isValid = inputState.password === inputState.confirmPassword;
    setAreValid(prev => ({ ...prev, confirmPassword: isValid }));
    setError(prev => ({ ...prev, confirmPassword: !isValid }));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const markAllTouched = () => {
    setTouched({ email: true, password: true, confirmPassword: true });
  };

  const loginSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    markAllTouched();
    validateEmail();
    validatePassword();
    if (areValid.email && areValid.password) {
      console.log('Envoi du formulaire');
    } else {
      console.error('Erreur dans le formulaire');
    }
  };

  const registerSubmitValidation = (e: React.FormEvent) => {
    e.preventDefault();
    markAllTouched();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    if (areValid.email && areValid.password && areValid.confirmPassword) {
      console.log('Envoi du formulaire');
    } else {
      console.error('Erreur dans le formulaire');
    }
  };

  const forgotPwdSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    markAllTouched();
    validateEmail();
    if (areValid.email) {
      console.log('Envoi du formulaire');
    } else {
      console.error('Erreur dans le formulaire');
    }
  };

  return {
    inputState,
    error,
    areValid,
    touched,
    changeHandler,
    loginSubmitHandler,
    registerSubmitValidation,
    forgotPwdSubmitHandler
  };
};

export default useValidation;
