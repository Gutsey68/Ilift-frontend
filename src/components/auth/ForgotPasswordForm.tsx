import Button from '../ui/Button';
import { Input } from '../ui/Input';

function ForgotPasswordForm() {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Mot de passe oublié</h2>
            <p className="mb-4 text-sm text-neutral-11">Entrez votre email ci-dessous pour réinitialiser votre mot de passe.</p>
            <label htmlFor="email" className="text-sm">
                Email
            </label>
            <Input type="email" name="email" placeholder="Email" required />
            <Button type="submit" className="mt-2 w-full">
                Réinitialiser le mot de passe
            </Button>
        </div>
    );
}
export default ForgotPasswordForm;
