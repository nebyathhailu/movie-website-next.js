"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useFavorites from "@/hooks/useFavorites";
import Section from "@/components/Section";
import { useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function MyListClient() {
  const { data: session } = useSession();
  const { movies, loading, error, refreshFavorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  if (loading) {
    return <div className="p-4 text-center">Loading favorites...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error: {error}
        <button
          onClick={refreshFavorites}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>No favorites yet. Add some movies to your list!</p>
        <button
          onClick={refreshFavorites}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl mb-4">My List</h1>
      <button
        onClick={refreshFavorites}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh Favorites
      </button>
      <Section title="Favorites" movies={movies} />
    </main>
  );
}