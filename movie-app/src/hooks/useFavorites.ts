"use client";

import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const useFavorites = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/favorites", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch favorites: ${response.statusText}`);
      }

      const data = await response.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [refreshKey]);

  const refreshFavorites = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return { movies, loading, error, refreshFavorites };
};

export default useFavorites;