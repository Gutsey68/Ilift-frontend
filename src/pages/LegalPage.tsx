import { Spacing } from '../components/ui/Spacing';

function LegalPage() {
  return (
    <>
      <Spacing size="sm" />
      <div className="mx-auto mb-auto flex min-h-screen w-full max-w-6xl flex-col justify-between bg-neutral-1 text-neutral-11 max-md:px-4">
        <h1 className="pb-1 text-3xl text-green-9">Mentions légales</h1>
        <hr className="border-neutral-6" />
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Identité du propriétaire du site</h2>
          <p>Nom : Société Exemple SARL</p>
          <p>Adresse : 123 Rue Fictive, 75000 Paris, France</p>
          <p>Contact : contact@example.com</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Numéro d'identification</h2>
          <p>SIRET : 123 456 789 00012</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Directeur de la publication</h2>
          <p>John Doe</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Coordonnées de l'hébergeur du site</h2>
          <p>Hébergeur : Hébergeur Exemple</p>
          <p>Adresse : 456 Avenue Imaginaire, 75001 Paris, France</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Informations sur la propriété intellectuelle</h2>
          <p>Le contenu du site est protégé par les lois en vigueur sur la propriété intellectuelle.</p>
        </section>

        <h2 className="mt-8 pb-1 text-3xl text-green-9">Politique de confidentialité</h2>
        <hr className="border-neutral-6" />
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Type de données collectées</h2>
          <p>Données personnelles telles que nom, adresse e-mail, etc.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Finalité de la collecte des données</h2>
          <p>Amélioration des services offerts aux utilisateurs.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Durée de conservation des données</h2>
          <p>Les données sont conservées pendant une durée de 5 ans.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Droits des utilisateurs</h2>
          <p>Accès, rectification et suppression de leurs données.</p>
          <p>Contact pour exercer ces droits : privacy@example.com</p>
        </section>

        <h2 className="mt-8 pb-1 text-3xl text-green-9">Conditions Générales d'Utilisation (CGU)</h2>
        <hr className="border-neutral-6" />
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Règles d'utilisation du site</h2>
          <p>Les utilisateurs doivent respecter les conditions d'utilisation du site.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Responsabilités de l'utilisateur et du propriétaire du site</h2>
          <p>
            L'utilisateur est responsable de l'utilisation qu'il fait du site. Le propriétaire du site décline toute responsabilité en cas de mauvaise
            utilisation.
          </p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Limitation de responsabilité</h2>
          <p>Le propriétaire du site ne peut être tenu responsable des erreurs ou omissions présentes sur le site.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Loi applicable et juridiction compétente</h2>
          <p>Les présentes conditions sont régies par la loi française. En cas de litige, les tribunaux français seront seuls compétents.</p>
        </section>

        <h2 className="mt-8 pb-1 text-3xl text-green-9">Conditions Générales de Vente (CGV)</h2>
        <hr className="border-neutral-6" />
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Processus de commande</h2>
          <p>Les commandes peuvent être passées en ligne via notre site.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Prix et modalités de paiement</h2>
          <p>Les prix sont indiqués en euros, toutes taxes comprises. Le paiement s'effectue en ligne au moment de la commande.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Politique de livraison</h2>
          <p>Les produits sont livrés à l'adresse indiquée par le client lors de la commande.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Conditions de retour et de remboursement</h2>
          <p>Le client dispose d'un délai de 14 jours pour retourner le produit à ses frais.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Garantie et service après-vente</h2>
          <p>Nos produits bénéficient d'une garantie légale de conformité.</p>
        </section>

        <h2 className="mt-8 pb-1 text-3xl text-green-9">Politique de Cookies</h2>
        <hr className="border-neutral-6" />
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Consentement des utilisateurs pour l'utilisation des cookies</h2>
          <p>En utilisant notre site, vous consentez à l'utilisation des cookies conformément à cette politique.</p>
        </section>
        <section className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl text-neutral-12">Instructions pour gérer et supprimer les cookies</h2>
          <p>Vous pouvez configurer votre navigateur pour refuser les cookies ou pour vous alerter lorsque des cookies sont envoyés.</p>
        </section>
      </div>
      <Spacing />
    </>
  );
}
export default LegalPage;
