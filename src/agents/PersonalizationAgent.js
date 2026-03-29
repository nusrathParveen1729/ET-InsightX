export const PersonalizationAgent = {
  fetchFeed: async (persona) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const feeds = {
      default: {
        greeting: "Here's your personalized news intelligence.",
        briefings: [
          { tag: "Economy", title: "Union Budget 2026: Key Takeaways", summary: "AI analysis highlights a major push in infrastructure." },
          { tag: "Tech", title: "Meta leaps over Alphabet", summary: "Tech giant reaches new milestones following AI breakthroughs." },
          { tag: "Auto", title: "EV Sales projections double", summary: "Strong demand in Asian markets drives EV stocks up." }
        ],
        foryou: [
          { tag: "Startup", title: "Fintech startups secure $5B", summary: "VC funding pours into digital payments." },
          { tag: "Finance", title: "Reserve Bank holds rates", summary: "Central banks signal cautious optimism." },
          { tag: "Global", title: "Trade agreements signed", summary: "New pacts expected to boost export volumes." },
          { tag: "Tech", title: "Semiconductor shortage ending", summary: "Supply chain bottlenecks ease up." }
        ],
        insights: [
          { type: 'alert', label: 'Market Alert', text: 'Tech stocks highly volatile today.', icon: 'alert' },
          { type: 'success', label: 'Opportunity', text: 'Renewable energy sector bullish.', icon: 'up' },
          { type: 'neutral', label: 'Trend Alert', text: 'Retail spending indicates recovery.', icon: 'zap' }
        ]
      },
      investor: {
        greeting: "Here's your mutual fund & portfolio intelligence.",
        briefings: [
          { tag: "Portfolio", title: "Your Mid-Cap Tech Funds up 4.2%", summary: "AI analysis shows correlation with recent semiconductor announcements." },
          { tag: "Bonds", title: "Government Yields Stabilize", summary: "Safe-haven assets return to median after budget anxiety." },
          { tag: "Dividends", title: "Top 5 High-Yield Picks for Q3", summary: "Screener matches your risk profile to energy sector dividends." }
        ],
        foryou: [
          { tag: "Earnings", title: "Reliance beats Q2 estimates", summary: "O2C and Retail segments drive 15% YoY growth." },
          { tag: "Analysis", title: "Should you hold FMCG?", summary: "Inflation cooling suggests margin expansion in consumer goods." },
          { tag: "Macro", title: "FII inflows hit 6-month high", summary: "Foreign institutional investors pivot back to emerging markets." },
          { tag: "Insight", title: "NIFTY 50 technical resistance", summary: "Market approaches key psychological barrier." }
        ],
        insights: [
          { type: 'alert', label: 'Portfolio Warning', text: 'Auto sector exposure is currently 22% (High).', icon: 'alert' },
          { type: 'success', label: 'Rebalance Suggestion', text: 'Consider shifting 5% to Debt funds to match risk profile.', icon: 'up' },
          { type: 'neutral', label: 'Upcoming Event', text: 'TCS Earnings call tomorrow at 4 PM.', icon: 'zap' }
        ]
      },
      founder: {
        greeting: "Here's your startup & competitor intelligence.",
        briefings: [
          { tag: "Funding", title: "Series B valuations compress by 15%", summary: "AI models track 40+ deals this month showing tighter VCs." },
          { tag: "Competitor", title: "Stripe launches local India payments", summary: "Direct threat to existing fintech gateways with aggressive pricing." },
          { tag: "Policy", title: "New Angel Tax clarifications", summary: "DPIIT issues relief guidelines for registered startups." }
        ],
        foryou: [
          { tag: "M&A", title: "Swiggy acquires local logistics player", summary: "Consolidation continues in the hyperlocal delivery space." },
          { tag: "Talent", title: "Tech salaries normalize in 2026", summary: "Attrition rates drop below 14% as hiring frenzy cools." },
          { tag: "SaaS", title: "AI-first tools drive B2B growth", summary: "Companies aggressively adopt copilots across vertical SaaS." },
          { tag: "Compliance", title: "Digital Data Protection Act deadlines", summary: "Key dates founders must know for compliance architecture." }
        ],
        insights: [
          { type: 'alert', label: 'Competitor Move', text: 'Razorpay filed a new patent related to blockchain ledgers.', icon: 'alert' },
          { type: 'success', label: 'Grant Opportunity', text: 'MeitY unrolls ₹500Cr AI innovation fund. Apply by 15th.', icon: 'up' },
          { type: 'neutral', label: 'Industry Trend', text: 'Founders shifting focus from growth to unit economics.', icon: 'zap' }
        ]
      },
      student: {
        greeting: "Here's your simplified business & career intelligence.",
        briefings: [
          { tag: "Explainer", title: "What is exactly the 'Union Budget'?", summary: "AI breaks down the 120-page document into 5 simple concepts." },
          { tag: "Careers", title: "Data Science vs AI Engineering", summary: "Which path holds more job security in 2026?" },
          { tag: "101", title: "How does the stock market work?", summary: "A visual guide to understanding NIFTY and SENSEX." }
        ],
        foryou: [
          { tag: "Startup", title: "How a 22-year-old raised $1M", summary: "The story of building an AI scheduling tool in college." },
          { tag: "Economy", title: "Why are things getting expensive?", summary: "Understanding inflation with practical everyday examples." },
          { tag: "Prep", title: "Top interview questions for FinTech", summary: "Analyzed from 500+ recent graduate interviews." },
          { tag: "News", title: "RBI cuts repo rate (Explained)", summary: "What it means for your college loan EMI." }
        ],
        insights: [
          { type: 'success', label: 'Internship Alert', text: 'Google opens applications for APM cohort 2027.', icon: 'up' },
          { type: 'neutral', label: 'Concept Tip', text: 'Bull Market = Prices go up. Bear Market = Prices go down.', icon: 'zap' },
          { type: 'alert', label: 'Deadline', text: 'CAT 2026 registration window closes in 5 days.', icon: 'alert' }
        ]
      }
    };

    return feeds[persona] || feeds.default;
  }
};
