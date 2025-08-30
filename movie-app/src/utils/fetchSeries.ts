const baseUrl = '/api/series';



export async function fetchSeries() {

 try {

   const response = await fetch(baseUrl);

   if (!response.ok) {

     throw new Error('Something went wrong: ' + response.statusText);

   }

   const result = await response.json();

   return result.results;

 } catch (error) {

   throw new Error('Failed to fetch series: ' + (error as Error).message);

 }

}
