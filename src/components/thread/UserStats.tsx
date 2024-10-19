function UserStats() {
    return (
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
    );
}
export default UserStats;
