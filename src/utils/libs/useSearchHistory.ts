import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ISearch } from '@components/molecules/searchBar';

export default function useSearchHistory(): [ISearch[], Dispatch<SetStateAction<ISearch[]>>] {
  const [searchHistory, setSearchHistory] = useState<ISearch[]>([]);
  useEffect(() => {
    const storedSearchHistory = JSON.parse(localStorage.getItem('cola-search-history') ?? '[]');
    if (storedSearchHistory && Array.isArray(storedSearchHistory)) {
      setSearchHistory(storedSearchHistory);
    } else {
      localStorage.setItem('cola-search-history', JSON.stringify([]));
    }
  }, []);

  return [searchHistory, setSearchHistory];
}
