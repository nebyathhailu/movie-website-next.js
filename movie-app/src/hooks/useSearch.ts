'use client';

import { useState, useEffect } from 'react';

import { fetchSearch } from '@/utils/fetchSearch';



interface Item {

 id: number;

 title?: string;

 name?: string;

 poster_path: string;

 media_type: 'movie' | 'tv';

}



const useSearch = (query: string) => {

 const [items, setItems] = useState<Item[]>([]);

 const [loading, setLoading] = useState<boolean>(true);

 const [error, setError] = useState<string | null>(null);



 useEffect(() => {

   if (!query) return;

   (async () => {

     try {

       const data = await fetchSearch(query);

       setItems(data);

     } catch (error) {

       setError((error as Error).message);

     } finally {

       setLoading(false);

     }

   })();

 }, [query]);



 return { items, loading, error };

};



export default useSearch;
