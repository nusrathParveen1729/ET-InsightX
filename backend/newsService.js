/* global process */
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// Simple in-memory cache
const cache = {
  data: null,
  timestamp: 0,
  ttl: 5 * 60 * 1000, // 5 minutes
};

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

const fetchNewsAPI = async (country, category, q) => {
  const params = {
    apiKey: NEWS_API_KEY,
    pageSize: 10
  };
  if (country) params.country = country;
  if (category && category !== 'general') params.category = category;
  if (q) params.q = q;

  const url = 'https://newsapi.org/v2/top-headlines';
  const response = await axios.get(url, { params });

  return response.data.articles.map(article => ({
    title: article.title,
    description: article.description,
    image: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url
  }));
};

const fetchNewsDataIOFallback = async (country, category, q) => {
  console.log("Using NewsData.io Fallback");
  const params = {
    apikey: NEWSDATA_API_KEY,
    language: 'en'
  };
  if (country) params.country = country;
  if (category && category !== 'general') params.category = category;
  if (q) params.q = q;

  const url = 'https://newsdata.io/api/1/news';
  const response = await axios.get(url, { params });

  return response.data.results.map(article => ({
    title: article.title,
    description: article.description,
    image: article.image_url,
    source: article.source_id,
    publishedAt: article.pubDate,
    url: article.link
  }));
};

const getNews = async ({ country = 'us', category = 'business', q = '', persona = 'default' } = {}) => {
  const cacheKey = `${country}-${category}-${q}-${persona}`;
  
  if (cache.data && cache.key === cacheKey && (Date.now() - cache.timestamp) < cache.ttl) {
    console.log("Returning cached news");
    return cache.data;
  }

  try {
    const articles = await fetchNewsAPI(country, category, q);
    
    // Throw error if API successfully responds but gives zero articles
    if (!articles || articles.length === 0) {
      throw new Error("NewsAPI returned 0 articles payload.");
    }
    
    cache.data = articles;
    cache.timestamp = Date.now();
    cache.key = cacheKey;
    return articles;
  } catch (error) {
    console.error("NewsAPI failed or empty, trying fallback...", error.message);
    try {
      const articles = await fetchNewsDataIOFallback(country, category, q);
      
      // Throw error if fallback API also responds with zero articles
      if (!articles || articles.length === 0) {
        throw new Error("NewsData.io also returned 0 articles payload.");
      }
      
      cache.data = articles;
      cache.timestamp = Date.now();
      cache.key = cacheKey;
      return articles;
    } catch (fallbackError) {
      console.error("Fallback APIs failed or returned empty data:", fallbackError.message);
      console.log("Serving mock data for persona:", persona);
      
      let mockArticles = [];
      
      switch (persona) {
        case 'founder':
          mockArticles = [
            {
              title: "Meta leaps over Alphabet following AI milestones",
              description: "Tech giant reaches new milestones following AI breakthroughs, launching aggressive new models targeting founders.",
              image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300",
              source: "Tech Journal",
              publishedAt: new Date(Date.now() - 3600000).toISOString(),
              url: "#"
            },
            {
              title: "Fintech startups secure $5B in Q1",
              description: "VC funding pours into digital payments and blockchain-based ledgers across the globe. Founders rejoice.",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300",
              source: "Startup Daily",
              publishedAt: new Date(Date.now() - 86400000).toISOString(),
              url: "#"
            },
            {
              title: "AI models track 40+ deals this month",
              description: "Series B valuations compress by 15% as venture capital markets tighten due to high interest rates.",
              image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300",
              source: "Founder Weekly",
              publishedAt: new Date(Date.now() - 172800000).toISOString(),
              url: "#"
            },
            {
              title: "Stripe launches local India payments",
              description: "A direct threat to existing fintech gateways with aggressive pricing for software startups.",
              image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300",
              source: "Tech Insider",
              publishedAt: new Date(Date.now() - 259200000).toISOString(),
              url: "#"
            },
            {
              title: "Swiggy acquires local logistics player",
              description: "Consolidation continues in the hyperlocal delivery space with massive venture backing.",
              image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300",
              source: "Business Tech",
              publishedAt: new Date(Date.now() - 345600000).toISOString(),
              url: "#"
            }
          ];
          break;
        case 'student':
          mockArticles = [
            {
              title: "What is exactly the 'Union Budget'?",
              description: "AI breaks down the 120-page document into 5 simple concepts for students and standard workers.",
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300",
              source: "Edu News",
              publishedAt: new Date().toISOString(),
              url: "#"
            },
            {
              title: "Data Science vs AI Engineering",
              description: "Which path holds more job security in 2026? We dive into the most lucrative campus placements.",
              image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300",
              source: "Career Weekly",
              publishedAt: new Date(Date.now() - 3600000).toISOString(),
              url: "#"
            },
            {
              title: "How does the stock market work?",
              description: "A visual guide to understanding NIFTY and SENSEX designed for absolute beginners.",
              image: "https://images.unsplash.com/photo-1611974789855-9c2d0a7236a3?w=400&h=300",
              source: "Finance 101",
              publishedAt: new Date(Date.now() - 7200000).toISOString(),
              url: "#"
            },
            {
              title: "Top interview questions for FinTech",
              description: "Analyzed from 500+ recent graduate interviews inside the banking technology layer.",
              image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300",
              source: "Prep Journal",
              publishedAt: new Date(Date.now() - 86400000).toISOString(),
              url: "#"
            },
            {
              title: "How a 22-year-old raised $1M",
              description: "The inspiring story of building an AI scheduling tool inside a college dorm room.",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300",
              source: "Student Innovator",
              publishedAt: new Date(Date.now() - 172800000).toISOString(),
              url: "#"
            }
          ];
          break;
        case 'investor':
        case 'default':
        default:
          mockArticles = [
            {
              title: "Union Budget 2026: Key Takeaways",
              description: "AI analysis highlights a major push in infrastructure. Proposed 2.5% tax rebate for companies investing 15% of revenue back into R&D. Bullish for investors.",
              image: "https://images.unsplash.com/photo-1611974789855-9c2d0a7236a3?w=400&h=300",
              source: "Economy Today",
              publishedAt: new Date().toISOString(),
              url: "#"
            },
            {
              title: "Government Yields Stabilize for Portfolios",
              description: "Safe-haven assets return to median after pre-budget anxiety clears the market.",
              image: "https://images.unsplash.com/photo-1590283603385-18ff3888c0cd?w=400&h=300",
              source: "Investor Daily",
              publishedAt: new Date(Date.now() - 3600000).toISOString(),
              url: "#"
            },
            {
              title: "EV Sales projections double in Asian markets",
              description: "Strong demand in Asian markets drives EV stocks up, signalling a definitive shift from traditional combustion engines.",
              image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300",
              source: "Auto Insights",
              publishedAt: new Date(Date.now() - 7200000).toISOString(),
              url: "#"
            },
            {
              title: "Top 5 High-Yield Picks for Q3",
              description: "Screener matches your high-risk investor profile strictly to energy sector dividends.",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300",
              source: "Trading Journal",
              publishedAt: new Date(Date.now() - 86400000).toISOString(),
              url: "#"
            },
            {
              title: "Central Banks Signal Cautious Optimism",
              description: "Major financial institutions are holding rates steady going into the next quarter to offset inflation fears.",
              image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300",
              source: "Global Finance",
              publishedAt: new Date(Date.now() - 172800000).toISOString(),
              url: "#"
            }
          ];
          break;
      }
      
      return mockArticles;
    }
  }
};

export { getNews };
