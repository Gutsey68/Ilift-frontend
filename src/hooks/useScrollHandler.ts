import { RefObject, useEffect } from 'react';

const useScrollHandler = (middleDivRef: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (middleDivRef.current) {
                middleDivRef.current.scrollTop += event.deltaY;
            }
        };

        document.addEventListener('wheel', handleScroll);

        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []);
};

export default useScrollHandler;
