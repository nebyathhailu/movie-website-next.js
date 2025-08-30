"use client";

import useTrending from "@/hooks/useTrending";
import Image from "next/image";

const Banner = () => {
  const { movies, loading } = useTrending(); 
  if (loading) {
    return <div className="h-96 bg-gray-900"></div>;
  }

  const featured = movies[0]; 

  if (!featured) {
    return <div className="h-96 bg-gray-900 flex items-center justify-center text-white">No trending movies available</div>;
  }

  return (
    <div className="relative h-96">
      <Image
        src={`https://image.tmdb.org/t/p/w1280${featured.backdrop_path}`}
        alt={featured.title || "Featured movie"}
        fill
        className="object-cover"
        priority 
      />
      <div className="absolute bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
        <h1 className="text-4xl text-white">{featured.title}</h1>
        <p className="text-white">{featured.overview?.slice(0, 150)}...</p>
      </div>
    </div>
  );
};

export default Banner;