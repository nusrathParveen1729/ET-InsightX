export class ExecutionAgent {
  static name = "ActionExecutionAgent";

  static async execute(context) {
    if (!context.keyHighlights) {
      throw new Error("Missing 'keyHighlights' from Decision phase to execute video generation.");
    }
    
    // Simulate complex rendering and script writing action
    const delay = Math.random() > 0.8 ? 1600 : 900; 
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Transform extraction nodes into renderable UI properties
    const formattedHighlights = context.keyHighlights.map((hl) => ({
      title: hl.impact === 'High' ? `🔥 ${hl.title}` : `✓ ${hl.title}`,
      time: hl.timestamp,
      summary: `Our intelligence engine categorized this as a ${hl.impact} impact event.`
    }));

    return {
      videoUrl: "MOCK_RENDER_$39X92L.mp4",
      highlights: formattedHighlights
    };
  }
}
