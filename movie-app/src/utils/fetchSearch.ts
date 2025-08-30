export async function fetchSearch(query: string) {

    try {
   
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
   
      if (!response.ok) {
   
        throw new Error('Something went wrong: ' + response.statusText);
   
      }
   
      const result = await response.json();
   
      return result.results;
   
    } catch (error) {
   
      throw new Error('Failed to fetch search results: ' + (error as Error).message);
   
    }
   
   }
   

