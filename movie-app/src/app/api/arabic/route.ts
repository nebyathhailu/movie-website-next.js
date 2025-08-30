const TMDB_BASE_URL = 'https://api.themoviedb.org/3';



export async function GET() {

 try {

   const response = await fetch(`${TMDB_BASE_URL}/discover/movie?with_original_language=ar&api_key=${process.env.TMDB_API_KEY}`);

   const result = await response.json();

   return new Response(JSON.stringify(result), { status: 200 });

 } catch (error) {

   return new Response(JSON.stringify({ message: (error as Error).message }), { status: 500 });

 }

}
