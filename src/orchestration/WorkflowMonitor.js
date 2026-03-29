class WorkflowMonitor {
  constructor() {
    this.logs = [];
    this.listeners = [];
  }

  logEvent(processId, step, agentName, status, duration = 0, sla = 0, details = null) {
    const isViolation = duration > sla && sla > 0;
    const entry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      processId,
      timestamp: new Date().toISOString(),
      step,
      agentName,
      status,
      duration,
      sla,
      isViolation,
      details
    };
    
    this.logs.unshift(entry);
    
    // Keep only last 100 logs in memory
    if (this.logs.length > 100) this.logs.pop();
    
    this.notifyListeners();
  }

  getLogs() {
    return this.logs;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb([...this.logs]));
  }
}

// Singleton instance for the frontend prototype
export const globalMonitor = new WorkflowMonitor();
