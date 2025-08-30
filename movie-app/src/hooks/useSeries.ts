'use client';

import { useState, useEffect } from 'react';

import { fetchSeries } from '@/utils/fetchSeries';



interface Movie {

 id: number;

 title: string;

 poster_path: string;}

 const usePopular = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
   
    const [loading, setLoading] = useState<boolean>(true);
   
    const [error, setError] = useState<string | null>(null);
   
   
   
    useEffect(() => {
   
      (async () => {
   
        try {
   
          const data = await fetchSeries();
   
          setMovies(data);
   
        } catch (error) {
   
          setError((error as Error).message);
   
        } finally {
   
          setLoading(false);
   
        }
   
      })();
   
    }, []);
   
   
   
    return { movies, loading, error };
   
   };
   
   
   
   export default usePopular;
   