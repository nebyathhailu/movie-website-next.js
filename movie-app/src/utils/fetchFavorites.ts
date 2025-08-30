export async function fetchFavorites() {
  const response = await fetch("/api/favorites");
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json();
}

export const toggleFavorite = async (movieId: number) => {
  try {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId }),
    });
    if (!response.ok) throw new Error('Failed to toggle favorite');
    return await response.json();
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

export async function isFavorite(movieId: number): Promise<boolean> {
  const response = await fetch(`/api/favorites?movieId=${movieId}`);
  if (!response.ok) {
    throw new Error("Failed to check favorite status");
  }
  const data = await response.json();
  return data.isFavorited;
}