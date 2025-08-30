const TMDB_BASE_URL = 'https://api.themoviedb.org/3';



export async function GET(request: Request) {

 const url = new URL(request.url);

 const query = url.searchParams.get('query');

 if (!query) {

   return new Response(JSON.stringify({ message: 'Query required' }), { status: 400 });

 }

 try {

   const response = await fetch(`${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${process.env.TMDB_API_KEY}`);

   const result = await response.json();

   return new Response(JSON.stringify(result), { status: 200 });

 } catch (error) {

   return new Response(JSON.stringify({ message: (error as Error).message }), { status: 500 });

 }

}
