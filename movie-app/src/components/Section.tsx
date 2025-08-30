import MovieCard from './MovieCard';

interface Movie {

  id: number;
 
  title: string;
 
  poster_path: string;}


const Section = ({ title, movies }: { title: string; movies: Movie[] }) => {

 return (

   <section className="p-4">

     <h2 className="text-2xl text-yellow-500 mb-4">{title}</h2>

     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

       {movies.map((movie) => (

         <MovieCard key={movie.id} movie={movie} />

       ))}

     </div>

   </section>

 );

};



export default Section;
