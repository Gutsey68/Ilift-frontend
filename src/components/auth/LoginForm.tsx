import Button from '../ui/Button';

function LoginForm() {
    return (
        <>
            <h2 className="mb-4 text-center text-2xl font-bold">Connexion</h2>
            <input type="email" name="email" placeholder="Email" className="mb-4 w-full rounded border p-2" required />
            <input type="password" name="password" placeholder="Mot de passe" className="mb-4 w-full rounded border p-2" required />
            <Button type="submit" className="w-full">
                Se connecter
            </Button>
        </>
    );
}
export default LoginForm;
