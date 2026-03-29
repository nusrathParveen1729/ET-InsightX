import { supabase } from '../lib/supabaseClient';

export const PersonalizationAgent = {
  // Logs an article view into Supabase (Now supporting relational UUIDs)
  logArticleRead: async (profileId, articleId, category) => {
    if (!profileId || !articleId) return;
    
    try {
      let finalId = articleId;

      // If the ID is a string slug, try to find the real UUID from the DB
      if (articleId.length > 0 && !articleId.includes('-')) {
        const { data } = await supabase
          .from('articles')
          .select('id')
          .ilike('title', `%${articleId.replace('_', ' ')}%`)
          .limit(1)
          .maybeSingle();
        
        if (data) finalId = data.id;
        else return; // Don't log if we can't find a valid reference
      }

      await supabase
        .from('user_reading_history')
        .insert([{ 
          user_id: profileId, 
          article_id: finalId, 
          category: category 
        }])
        .select();
      
      console.log(`Live sync complete! ${storedArticles?.length || 0} business stories recorded.`);
      return storedArticles || [];
    } catch (err) {
      console.error("Critical Failure in Live News Stream:", err);
      return [];
    }
  },

  // Fetches a personalized feed based on persona and actual articles in Supabase
  fetchFeed: async (persona, profileId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    let historyBonus = [];
    let realNews = [];
    
    // 1. Adaptive News Fetch (Persona-Aware Filtering)
    try {
      // Define categories of interest for each persona
      const interests = {
        student: ['Economy', 'Education', 'Career'],
        investor: ['Finance', 'Economy', 'Corporate'],
        founder: ['Startup', 'Technology', 'Business'],
        default: ['Economy', 'General']
      };
      
      const targetCats = interests[persona] || interests.default;

      // Fetch the latest Articles from Supabase that match these interests
      const { data: dbArticles } = await supabase
        .from('articles')
        .select('*')
        .in('category', targetCats)
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (dbArticles && dbArticles.length > 0) {
        realNews = dbArticles.map(art => ({
          tag: art.category || "Live News",
          title: art.title,
          summary: art.content.split('|')[0].substring(0, 110) + "...",
          image: art.image_url
        }));
      } else {
        // Fallback: If no matches for the persona, pull the very latest news to ensure a live experience
        console.log("No persona-specific matches, pulling latest general news stream...");
        const { data: latest } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (latest) {
          realNews = latest.map(art => ({
            tag: art.category || "Top Story",
            title: art.title,
            summary: art.content.split('|')[0].substring(0, 110) + "...",
            image: art.image_url
          }));
        }
      }
    } catch (err) {
      console.error("Failed to fetch real-time persona feed", err);
    }

    // 2. Effortlessly boost recommendations based on user history
    if (profileId) {
      try {
        const { data: history } = await supabase
          .from('user_reading_history')
          .select('category')
          .eq('user_id', profileId)
          .order('read_at', { ascending: false })
          .limit(5);

        if (history && history.length > 0) {
          const topCategory = history[0].category;
          historyBonus = [{ 
            tag: topCategory, 
            title: `Deep Dive: Your ${topCategory} focus`, 
            summary: "Based on your recent reading, here is an AI-curated deep dive into this sector." 
          }];
        }
      } catch (err) {
        console.error("History fetch failed", err);
      }
    }

    const feeds = {
      default: {
        greeting: "Here's your personalized news intelligence.",
        briefings: [
          ...historyBonus,
          ...realNews,
          { tag: "Economy", title: "Union Budget 2026: Key Takeaways", summary: "AI analysis highlights a major push in infrastructure." },
        ],
        foryou: [
          { tag: "Startup", title: "Fintech startups secure $5B", summary: "VC funding pours into digital payments." },
          { tag: "Finance", title: "Reserve Bank holds rates", summary: "Central banks signal cautious optimism." }
        ],
        insights: [
          { type: 'alert', label: 'Market Alert', text: 'Tech stocks highly volatile today.', icon: 'alert' }
        ]
      },
      investor: {
        greeting: "Here's your mutual fund & portfolio intelligence.",
        briefings: [
          ...historyBonus,
          ...realNews,
          { tag: "Portfolio", title: "Your Mid-Cap Tech Funds up 4.2%", summary: "AI analysis shows correlation with recent semiconductor announcements." }
        ],
        foryou: [
          { tag: "Earnings", title: "Reliance beats Q2 estimates", summary: "O2C and Retail segments drive 15% YoY growth." }
        ],
        insights: [
          { type: 'alert', label: 'Portfolio Warning', text: 'Auto sector exposure is currently 22% (High).', icon: 'alert' }
        ]
      },
      founder: {
        greeting: "Here's your startup & competitor intelligence.",
        briefings: [
          ...historyBonus,
          ...realNews,
          { tag: "Funding", title: "Series B valuations compress by 15%", summary: "AI models track 40+ deals this month showing tighter VCs." }
        ],
        foryou: [
          { tag: "M&A", title: "Swiggy acquires local logistics player", summary: "Consolidation continues in the hyperlocal delivery space." }
        ],
        insights: [
          { type: 'alert', label: 'Competitor Move', text: 'Razorpay filed a new patent related to blockchain ledgers.', icon: 'alert' }
        ]
      },
      student: {
        greeting: "Here's your simplified business & career intelligence.",
        briefings: [
          ...historyBonus,
          ...realNews,
          { tag: "Explainer", title: "What is exactly the 'Union Budget'?", summary: "AI breaks down the 120-page document into 5 simple concepts." }
        ],
        foryou: [
          { tag: "Startup", title: "How a 22-year-old raised $1M", summary: "The story of building an AI scheduling tool in college." }
        ],
        insights: [
          { type: 'success', label: 'Internship Alert', text: 'Google opens applications for APM cohort 2027.', icon: 'up' },
          { type: 'alert', label: 'Deadline', text: 'CAT 2026 registration window closes in 5 days.', icon: 'alert' }
        ]
      }
    };

    return feeds[persona] || feeds.default;
  }
};
