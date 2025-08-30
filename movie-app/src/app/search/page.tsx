'use client';

import { useSearchParams } from 'next/navigation';

import useSearch from '@/hooks/useSearch';

import Section from '@/components/Section';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function SearchPage() {

 const searchParams = useSearchParams();

 const query = searchParams.get('q') || '';



 const { items } = useSearch(query);



 return (

   <main className="p-4">

     <h1 className="text-3xl mb-4">Search Results for "{query}"</h1>

     {/* <Section title="Results" movies={items} /> */}

   </main>

 );

}


