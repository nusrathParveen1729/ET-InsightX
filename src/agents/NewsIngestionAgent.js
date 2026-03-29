import { supabase } from '../lib/supabaseClient';

export const NewsIngestionAgent = {
  fetchAndStoreNews: async () => {
    // 1. Get key from environment
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
    if (!API_KEY) {
      console.warn("No News API Key found in .env.local! Skipping sync.");
      return [];
    }

    // 2. Configure NewsData.io for Indian Business News
    // Categories: business, financial | Language: English | Country: India
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&category=business`;

    console.log("Connecting to NewsData.io Live Stream: India Business...");
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== "success" || !data.results) {
        console.error("News API Error:", data.message || "Unknown Error");
        return [];
      }

      // 3. Map the live news data to our Relational Supabase schema
      const liveArticles = data.results.map(art => {
        // Extract the best category match from the API results
        const rawCategory = Array.isArray(art.category) ? art.category[0] : (art.category || 'Business');
        const displayCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

        return {
          title: art.title,
          content: (art.description || art.content || "Read more at source.") + " | " + (art.link || ""),
          category: displayCategory,
          author: art.source_id || "Live Business Feed",
          image_url: art.image_url || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=300"
        };
      });

      // 4. Persistence into Supabase
      // We use a simple insert; the relational database will handle the UUIDs
      const { data: storedArticles, error } = await supabase
        .from('articles')
        .insert(liveArticles)
        .select();

      if (error) throw error;
      
      console.log(`Live sync complete! ${storedArticles.length} business stories recorded.`);
      return storedArticles;
    } catch (err) {
      console.error("Critical Failure in Live News Stream:", err);
      return [];
    }
  }
};
