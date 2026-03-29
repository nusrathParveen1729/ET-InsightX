export const SynthesisAgent = {
  chat: async (query, contextSnippet) => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate thinking

    const queryLower = query.toLowerCase();

    if (queryLower.includes("startup") || queryLower.includes("founder")) {
      return "Based on the 8 articles synthesized, the budget is highly favorable for AI and hardware startups. There's a proposed 2.5% tax rebate for companies investing 15% of revenue back into R&D.";
    } 
    
    if (queryLower.includes("student") || queryLower.includes("job")) {
      return "The push towards localized semiconductor manufacturing is expected to create 45,000 new jobs in electronics engineering and computer science over the next 4 years.";
    }

    if (queryLower.includes("portfolio") || queryLower.includes("invest")) {
      return "If you hold tech or EV stocks, this is a strong positive signal. The ₹1.5L Cr subsidy specifically targets mid-cap infra firms, meaning rapid growth potential for those indices.";
    }

    return "Synthesizing the latest ET coverage: The government's focus is clearly on robust infrastructure to combat supply chain bottlenecks. Would you like me to break down how this affects a specific sector?";
  }
};
