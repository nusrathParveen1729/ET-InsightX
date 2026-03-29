import { supabase } from '../../lib/supabaseClient';

export class RetrievalAgent {
  static name = "DataRetrievalAgent";

  static async execute(context) {
    const delay = Math.random() > 0.8 ? 1600 : 800; 
    await new Promise(resolve => setTimeout(resolve, delay));
    
    if (!context.articleId) {
      throw new Error("Missing articleId to retrieve data.");
    }

    try {
      // Attempt to fetch the real data from Supabase Articles Table
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', context.articleId)
        .single();
        
      if (data && !error) {
        return {
          rawStoryData: {
            text: data.content,
            date: data.created_at,
            author: data.author
          }
        };
      }
    } catch (e) {
      console.log("Database fetch failed or articles table not initialized. Defaulting to system mock.");
    }

    // Graceful Fallback if the database isn't fully set up yet
    return {
      rawStoryData: {
        text: "The budget detailed massive EV subsidies and green tech investments. Market reacted positively. Focus on mid-tier manufacturing.",
        date: "2026-03-29",
        author: "ET Bureau"
      }
    };
  }
}
