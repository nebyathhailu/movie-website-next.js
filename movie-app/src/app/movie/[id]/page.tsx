"use client";

import useMovie from "@/hooks/useMovie";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toggleFavorite } from "@/utils/fetchFavorites";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useFavorites from "@/hooks/useFavorites";

export default function MovieDetails() {
  const params = useParams();
  const id = params.id as string;
  const { movie, loading } = useMovie(id);
  const { data: session } = useSession();
  const { movies: favorites, refreshFavorites } = useFavorites();
  const router = useRouter();
  const [favStatus, setFavStatus] = useState("Add to Favorites");

  useEffect(() => {
    if (movie && favorites) {
      const isFavorited = favorites.some((fav) => fav.id === parseInt(id));
      setFavStatus(isFavorited ? "Remove from Favorites" : "Add to Favorites");
    }
  }, [movie, favorites, id]);

  if (loading) return <div>Loading...</div>;

  const handleFavorite = async () => {
    if (!session) {
      router.push("/signin");
      return;
    }
    try {
      const isFavorited = await toggleFavorite(parseInt(id));
      setFavStatus(isFavorited ? "Remove from Favorites" : "Add to Favorites");
      refreshFavorites(); 
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      setFavStatus("Error toggling favorite");
    }
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <main className="p-4">
      <div className="relative h-96 mb-4">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover rounded"
        />
      </div>
      <h1 className="text-4xl mb-2">{movie.title}</h1>
      <p className="mb-4">{movie.overview}</p>
      <button
        onClick={handleFavorite}
        className="bg-yellow-500 text-black px-4 py-2"
      >
        {favStatus}
      </button>
    </main>
  );
}