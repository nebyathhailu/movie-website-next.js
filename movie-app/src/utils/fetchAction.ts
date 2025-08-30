const baseUrl = '/api/action';



export async function fetchAction() {

 try {

   const response = await fetch(baseUrl);

   if (!response.ok) {

     throw new Error('Something went wrong: ' + response.statusText);

   }

   const result = await response.json();

   return result.results;

 } catch (error) {

   throw new Error('Failed to fetch action movies: ' + (error as Error).message);

 }

}


