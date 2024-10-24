import useValidation from '../../hooks/useValidation';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

function ForgotPasswordForm() {
    const { inputState, error, touched, changeHandler, forgotPwdSubmitHandler } = useValidation();

    return (
        <form onSubmit={forgotPwdSubmitHandler} className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Mot de passe oublié</h2>
            <p className="mb-4 text-sm text-neutral-11">Entrez votre email ci-dessous pour réinitialiser votre mot de passe.</p>
            <label htmlFor="email" className="text-sm">
                Email
            </label>
            <Input onChange={changeHandler} value={inputState.email} type="email" name="email" placeholder="Email" />
            {touched.email && error.email && <p className="mb-1 text-sm text-red-600">Email invalide</p>}
            <Button type="submit" className="mt-2 w-full">
                Réinitialiser le mot de passe
            </Button>
        </form>
    );
}
export default ForgotPasswordForm;
