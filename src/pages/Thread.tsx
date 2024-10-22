import { useRef } from 'react';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import useScrollHandler from '../hooks/useScrollHandler';

function Thread() {
    const middleDivRef = useRef<HTMLDivElement>(null);
    useScrollHandler(middleDivRef);

    return (
        <div className="mx-auto flex max-h-screen min-h-screen w-full max-w-6xl gap-6">
            <div className="flex w-1/4 flex-col">
                <ProfilCard />
            </div>
            <div className="flex max-h-screen w-2/4 flex-col">
                <div ref={middleDivRef} className="no-scrollbar mb-10 flex w-full flex-1 flex-col overflow-y-auto">
                    <InputPost />
                    <AllPosts />
                </div>
            </div>
            <div className="flex w-1/4 flex-col">
                <SuggestedProfils />
            </div>
        </div>
    );
}

export default Thread;
