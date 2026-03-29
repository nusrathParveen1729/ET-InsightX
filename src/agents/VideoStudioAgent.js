export const VideoStudioAgent = {
  generateVideo: async (onProgress) => {
    
    onProgress("Synthesizing core story highlights...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onProgress("Generating narrative script...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onProgress("Fetching relevant B-roll and charts...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onProgress("Rendering 1080p broadcast video...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      success: true,
      videoUrl: "MOCK_VIDEO_URL", // the UI will just display the mock player
      highlights: [
        { title: "EV Policy Shifts", time: "01:15", summary: "The Finance Ministry detailed massive new subsidies." },
        { title: "Corporate Tax Cut Breakdowns", time: "03:40", summary: "Significant positive market reactions expected for green energy." }
      ]
    };
  }
};
