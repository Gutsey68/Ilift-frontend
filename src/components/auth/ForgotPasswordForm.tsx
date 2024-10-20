import Button from '../ui/Button';

function ForgotPasswordForm() {
    return (
        <>
            <h2 className="mb-4 text-center text-2xl font-bold">Mot de passe oublié</h2>
            <input type="email" name="email" placeholder="Email" className="mb-4 w-full rounded border p-2" required />
            <Button type="submit" className="w-full">
                Réinitialiser le mot de passe
            </Button>
        </>
    );
}
export default ForgotPasswordForm;
