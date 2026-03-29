export class RetrievalAgent {
  static name = "DataRetrievalAgent";

  static async execute(context) {
    // Simulates "data retrieval" from a source or enterprise DB
    const delay = Math.random() > 0.8 ? 1600 : 800; // Occasional SLA breach Simulation
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    if (!context.articleId) {
      throw new Error("Missing articleId to retrieve data.");
    }

    // Mock DB return
    return {
      rawStoryData: {
        text: "The budget detailed massive EV subsidies and green tech investments. Market reacted positively. Focus on mid-tier manufacturing.",
        date: "2026-03-29",
        author: "ET Bureau"
      }
    };
  }
}
