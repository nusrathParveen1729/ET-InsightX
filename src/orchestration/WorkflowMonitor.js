import { supabase } from '../lib/supabaseClient';

class WorkflowMonitor {
  constructor() {
    this.localCache = [];
    this.listeners = [];
  }

  async logEvent(processId, step, agentName, status, duration = 0, sla = 0, details = null) {
    const isViolation = duration > sla && sla > 0;
    
    // Create the structured data payload
    const logData = {
      process_id: processId,
      step: step,
      agent_name: agentName,
      status: status,
      duration: duration,
      sla_ms: sla,
      is_violation: isViolation,
      details: details
    };
    
    try {
      // Execute live DB Insert instead of memory caching
      const { data, error } = await supabase
        .from('workflow_logs')
        .insert([logData])
        .select();

      if (error) {
        console.error("Workflow Monitor Database Error:", error);
      } else {
        // Success
        this.localCache.unshift(data[0]);
        if (this.localCache.length > 50) this.localCache.pop();
        this.notifyListeners();
      }

    } catch (err) {
      console.error("Critical Exception in Workflow Monitor Database Layer:", err);
    }
  }

  // Live subscription function used by React pages
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb([...this.localCache]));
  }
}

export const globalMonitor = new WorkflowMonitor();
