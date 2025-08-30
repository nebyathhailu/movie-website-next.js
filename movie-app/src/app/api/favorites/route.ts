import { db } from '@/lib/db';

import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';



const TMDB_BASE_URL = 'https://api.themoviedb.org/3';



export async function GET() {

 const session = await getServerSession(authOptions);

 if (!session || !session.user?.email) {

   return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

 }

 const userId = session.user.email;

 const favIds = db.favorites.get(userId) || [];

 try {

   const promises = favIds.map((id) =>

     fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`).then((res) => res.json())

   );

   const results = await Promise.all(promises);

   return new Response(JSON.stringify({ results }), { status: 200 });

 } catch (error) {

   return new Response(JSON.stringify({ message: (error as Error).message }), { status: 500 });

 }

}



export async function POST(request: Request) {

 const session = await getServerSession(authOptions);

 if (!session || !session.user?.email) {

   return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

 }

 const userId = session.user.email;

 const { movieId } = await request.json();

 if (!movieId) {

   return new Response(JSON.stringify({ message: 'movieId required' }), { status: 400 });

 }

 let favs = db.favorites.get(userId) || [];

 if (favs.includes(movieId)) {

   favs = favs.filter((id) => id !== movieId);

 } else {

   favs.push(movieId);

 }

 db.favorites.set(userId, favs);

 return new Response(JSON.stringify({ success: true }), { status: 200 });

}
