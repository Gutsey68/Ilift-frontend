import { ChevronRight, Image } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';

function Home() {
    return (
        <div className="mx-auto flex w-full max-w-7xl">
            <div className="flex w-1/4 flex-col p-4">
                <section className="flex flex-col gap-4 rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2 p-4">
                    {/* avatar et nom */}
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Avatar
                            alt=""
                            size="md"
                            src="https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                        <h1 className="text-xl font-semibold text-neutral-12">John Doe</h1>
                    </div>

                    {/* statistiques du profil */}
                    <div className="flex h-fit w-full items-center justify-center gap-4">
                        <div className="flex w-1/3 flex-col items-center justify-center gap-1 border-r border-neutral-6">
                            <p className="text-xs text-neutral-11">Abonnés</p>
                            <p className="text-xl font-bold text-neutral-12">458</p>
                        </div>
                        <div className="flex w-1/3 flex-col items-center justify-center gap-1 ">
                            <p className="text-xs text-neutral-11">Abonnements</p>
                            <p className="text-xl font-bold text-neutral-12">365</p>
                        </div>
                        <div className="flex w-1/3 flex-col items-center justify-center gap-1 border-l border-neutral-6">
                            <p className="text-xs text-neutral-11">Activités</p>
                            <p className="text-xl font-bold text-neutral-12">23</p>
                        </div>
                    </div>

                    {/* dernière activité */}
                    <div className="mx-2 border-y border-neutral-6 py-4">
                        <p className="pb-2 text-xs text-neutral-11">Dernière activité</p>
                        <p className="font-semibold text-neutral-12">Séance push</p>
                        <p className="text-xs text-neutral-11">18 octobre 2024</p>
                    </div>

                    {/* voir le journal */}
                    <div className="group mx-2 flex cursor-pointer items-center justify-between text-xs text-neutral-11">
                        <p>Voir le journal d’entraînements</p>
                        <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-2" />
                    </div>
                </section>
            </div>
            <div className="w-2/4">
                {/* input */}
                <div className="mt-4 flex gap-4 rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2 p-4">
                    <div className="mt-0.5">
                        <Avatar
                            alt=""
                            className="mt-1"
                            size="sm"
                            src="https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </div>
                    <div className="flex w-full flex-col justify-center">
                        <div className="w-full border-b border-neutral-6">
                            <textarea placeholder="Ecrire un post..." className="mt-2 w-full bg-transparent focus:outline-none" />
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <IconButton icon={<Image className="-ml-2 size-5" />} />
                            <Button className="py-2">Poster</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/4"></div>
        </div>
    );
}
export default Home;
