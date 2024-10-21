import { RefObject, useEffect } from 'react';

const useScrollHandler = (middleDivRef: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (middleDivRef.current) {
                const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = middleDivRef.current;

                const isAtVerticalEdge = (scrollTop === 0 && event.deltaY < 0) || (scrollTop + clientHeight >= scrollHeight && event.deltaY > 0);
                const isAtHorizontalEdge = (scrollLeft === 0 && event.deltaX < 0) || (scrollLeft + clientWidth >= scrollWidth && event.deltaX > 0);

                if (!isAtVerticalEdge && !isAtHorizontalEdge) {
                    event.preventDefault();
                    middleDivRef.current.scrollTop += event.deltaY;
                    middleDivRef.current.scrollLeft += event.deltaX;
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
