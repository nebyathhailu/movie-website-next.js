'use client';

import { useState, useEffect } from 'react';

import { fetchMovie } from '@/utils/fetchMovie';



const useMovie = (id: string) => {

 const [movie, setMovie] = useState<any>(null);

 const [loading, setLoading] = useState<boolean>(true);

 const [error, setError] = useState<string | null>(null);



 useEffect(() => {

   (async () => {

     try {

       const data = await fetchMovie(id);

       setMovie(data);

     } catch (error) {

       setError((error as Error).message);

     } finally {

       setLoading(false);

     }

   })();

 }, [id]);



 return { movie, loading, error };

};



export default useMovie;
