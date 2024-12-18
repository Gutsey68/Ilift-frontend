import { useEffect } from 'react';

const useInfiniteScroll = (fetchNextPage: () => void, hasNextPage: boolean, isFetchingNextPage: boolean) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
};

export default useInfiniteScroll;
