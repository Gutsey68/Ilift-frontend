import Button from '../ui/Button';
import { Input } from '../ui/Input';

function RegisterForm() {
    return (
        <form className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Inscription</h2>
            <p className="mb-4 text-sm text-neutral-11">Entre tes informations pour créer un compte</p>
            <label htmlFor="email" className="mt-1 text-sm">
                Email
            </label>
            <Input type="email" name="email" placeholder="Email" required />
            <label htmlFor="password" className="mt-1 text-sm">
                Password
            </label>
            <Input type="password" name="password" placeholder="Mot de passe" required />
            <label htmlFor="confirmPassword" className="mt-1 text-sm">
                Confirmer le mot de passe
            </label>
            <Input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" required />
            <Button type="submit" className="mt-2 w-full">
                S'inscrire
            </Button>
        </form>
    );
}
export default RegisterForm;
