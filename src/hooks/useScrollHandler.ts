import { RefObject, useEffect } from 'react';

const useScrollHandler = (middleDivRef: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (middleDivRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = middleDivRef.current;
                const isAtTop = scrollTop === 0 && event.deltaY < 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1 && event.deltaY > 0;

                if (isAtTop || isAtBottom) {
                    window.scrollBy(0, event.deltaY);
                } else {
                    middleDivRef.current.scrollTop += event.deltaY;
                    event.preventDefault();
                }
            }
        };

        window.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [middleDivRef]);
};

export default useScrollHandler;
