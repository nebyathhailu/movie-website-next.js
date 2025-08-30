import Link from 'next/link';

import Image from 'next/image';



const MovieCard = ({ movie }: { movie: any }) => {

 const isMovie = movie.media_type === 'movie' || !movie.media_type;

 const title = movie.title || movie.name;

 const path = isMovie ? '/movie/' : '/tv/';



 return (

   <Link href={`${path}${movie.id}`}>

     <div className="w-60 items-center flex justify-items-center">

       <Image

         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}

         alt={title}

         width={500}

         height={500}

         className="object-cover h-100 rounded"

       />

     </div>

     <h1 className="text-white text-2xl text-center">{title}</h1>

   </Link>

 );

};



export default MovieCard;
