import { Code2, Dumbbell, GraduationCap } from 'lucide-react';
import { Spacing } from '../components/ui/Spacing';
import { socials } from '../lib/links';

function AboutPage() {
  return (
    <>
      <Spacing size="sm" />
      <div className="mx-auto mb-auto flex w-full max-w-6xl flex-col gap-8 bg-neutral-1 text-neutral-11 max-md:px-4">
        <section className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-wider text-neutral-12">À propos de ILift</h1>
          <p className="mx-auto max-w-2xl text-lg">
            Développé dans le cadre d'une formation CDA à la CCI de Strasbourg, <br />
            ILift est un réseau social dédié au suivi de vos performances sportives et au partage de votre progression.
          </p>
        </section>
        <section className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded-lg border border-neutral-6 p-6 text-center">
            <GraduationCap size={40} className="text-green-11" />
            <h2 className="text-xl font-semibold text-neutral-12">Le Projet</h2>
            <p>Développé par Gauthier Seyzeriat-Meyer dans le cadre du Bachelor Concepteur Développeur d'Applications à la CCI Strasbourg (2024-2025).</p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-neutral-6 p-6 text-center">
            <Dumbbell size={40} className="text-green-11" />
            <h2 className="text-xl font-semibold text-neutral-12">La Mission</h2>
            <p>Permettre aux sportifs de suivre leur progression, partager leurs performances et s'inspirer de la communauté pour atteindre leurs objectifs.</p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-neutral-6 p-6 text-center">
            <Code2 size={40} className="text-green-11" />
            <h2 className="text-xl font-semibold text-neutral-12">Technologies</h2>
            <p>Application développée avec React et Node.js, utilisant une architecture moderne et des pratiques de développement professionnelles.</p>
          </div>
        </section>
        <section className="mt-20 rounded-lg bg-neutral-3 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-neutral-12">Contexte du Projet</h2>
          <p className="mb-4">
            ILift est né d'un projet scolaire, mettant en pratique les concepts avancés du développement web moderne. L'application intègre un système
            d'authentification sécurisé, une gestion complète des données utilisateurs, et une interface intuitive pour le suivi des performances.
          </p>
          <p>
            Ce projet s'inscrit dans une formation intensive de septembre 2024 à janvier 2025, démontrant la maîtrise des technologies web actuelles et des
            méthodologies de développement professionnel.
          </p>
        </section>
        <section className="mt-20 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-neutral-12">Mes Réseaux</h2>
          <p className="mb-6 text-neutral-11">Retrouvez-moi sur les réseaux sociaux pour suivre mes projets</p>
          <div className="flex items-center justify-center gap-6">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-neutral-6 px-4 py-2 text-neutral-11 transition-all hover:border-green-6 hover:text-green-11"
              >
                <Icon className="size-5" />
                <span>{label === 'Globe' ? 'Site web' : label}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
      <Spacing />
    </>
  );
}

export default AboutPage;
