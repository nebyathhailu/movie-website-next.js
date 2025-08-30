const baseUrl = '/api/latest';

export async function fetchLatest() {

 try {

   const response = await fetch(baseUrl);

   if (!response.ok) {

     throw new Error('Something went wrong: ' + response.statusText);

   }

   const result = await response.json();

   return result.results;

 } catch (error) {

   throw new Error('Failed to fetch latest movies: ' + (error as Error).message);

 }

}
