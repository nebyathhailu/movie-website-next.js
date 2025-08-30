export async function fetchMovie(id: string) {

    try {
   
      const response = await fetch(`/api/movie/${id}`);
   
      if (!response.ok) {
   
        throw new Error('Something went wrong: ' + response.statusText);
   
      }
   
      const result = await response.json();
   
      return result;
   
    } catch (error) {
   
      throw new Error('Failed to fetch movie: ' + (error as Error).message);
   
    }
   
   }
   