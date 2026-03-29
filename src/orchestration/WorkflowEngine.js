import { globalMonitor } from './WorkflowMonitor';

export class WorkflowEngine {
  constructor(processName, pipelineSequence) {
    this.processName = processName;
    this.pipeline = pipelineSequence; // Array of { agent: AgentClass, stepName: string, maxSLA_ms: number }
  }

  async run(initialContext, statusCallback) {
    const processId = `WF_${Date.now()}_${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    let currentContext = { ...initialContext };

    globalMonitor.logEvent(processId, "START", "WorkflowEngine", "Running", 0, 0, `Started ${this.processName}`);
    
    try {
      for (let i = 0; i < this.pipeline.length; i++) {
        const stage = this.pipeline[i];
        
        // Notify UI about the exact node executing
        if (statusCallback) {
          statusCallback(`Agent: [${stage.agent.name}] running step: ${stage.stepName}...`);
        }

        const startTime = Date.now();
        
        try {
          // Pass the evolving context explicitly, executing the specialized single-agent act
          const result = await stage.agent.execute(currentContext);
          
          const duration = Date.now() - startTime;
          
          if (duration > stage.maxSLA_ms) {
            console.warn(`[SLA BREACH] ${stage.agent.name} took ${duration}ms, SLA is ${stage.maxSLA_ms}ms`);
            globalMonitor.logEvent(processId, stage.stepName, stage.agent.name, "SLA Violation", duration, stage.maxSLA_ms, "Process drift caught in health monitor.");
          } else {
            globalMonitor.logEvent(processId, stage.stepName, stage.agent.name, "Success", duration, stage.maxSLA_ms);
          }

          // Merge result into current context for the next agent
          currentContext = { ...currentContext, ...result };
          
        } catch (error) {
          // Built-in exception handling (Routing)
          const duration = Date.now() - startTime;
          globalMonitor.logEvent(processId, stage.stepName, stage.agent.name, "Failed", duration, stage.maxSLA_ms, error.message);
          throw new Error(`${stage.agent.name} failed at ${stage.stepName}: ${error.message}`);
        }
      }

      globalMonitor.logEvent(processId, "VERIFIED", "WorkflowEngine", "Completed", 0, 0, `Finished ${this.processName}`);
      
      if (statusCallback) {
        statusCallback("Collaboration setup completed cleanly.");
      }

      return { success: true, finalContext: currentContext, processId };

    } catch (err) {
      return { success: false, error: err.message, processId };
    }
  }
}
