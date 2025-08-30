"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toggleFavorite, isFavorite } from "@/utils/fetchFavorites";
import { useSession } from "next-auth/react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

interface Props {
  movie: Movie;
  session: any; 
}

export default function MovieDetailsClient({ movie, session }: Props) {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      (async () => {
        try {
          const favorited = await isFavorite(movie.id);
          setIsFavorited(favorited);
        } catch (err) {
          setError("Failed to check favorite status");
        }
      })();
    }
  }, [movie.id, session]);

  const handleFavorite = useCallback(async () => {
    if (!sessionData) {
      router.push("/signin");
      return;
    }

    setIsToggling(true);
    setError(null);
    try {
      await toggleFavorite(movie.id);
      setIsFavorited((prev) => !prev);
    } catch (err) {
      setError("Failed to toggle favorite");
    } finally {
      setIsToggling(false);
    }
  }, [movie.id, sessionData, router]);

  return (
    <main className="p-4">
      {error && (
        <div className="text-red-500 mb-4 text-center" role="alert">
          {error}
        </div>
      )}
      <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title || "Movie backdrop"}
          fill
          className="object-cover rounded"
          priority
          sizes="100vw"
        />
      </div>
      <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
      <p className="mb-4 text-gray-300 max-w-2xl">{movie.overview}</p>
      <button
        onClick={handleFavorite}
        disabled={isToggling}
        className={`px-4 py-2 rounded font-semibold text-black transition-colors ${
          isToggling
            ? "bg-gray-500 cursor-not-allowed"
            : isFavorited
            ? "bg-red-500 hover:bg-red-600"
            : "bg-yellow-500 hover:bg-yellow-600"
        }`}
        aria-label={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
      >
        {isToggling
          ? "Toggling..."
          : isFavorited
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </button>
    </main>
  );
}