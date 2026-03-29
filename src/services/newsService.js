// Frontend service to fetch news from our backend proxy

export const fetchNews = async ({ country = 'us', category = 'business', q = '', persona = '' } = {}) => {
  try {
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    if (category) params.append('category', category);
    if (q) params.append('q', q);
    if (persona) params.append('persona', persona);

    const response = await fetch(`/api/news?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
