import React, { useState, useEffect } from 'react';
import { Shield, Activity, Clock, AlertTriangle, CheckCircle, Database } from 'lucide-react';
import { globalMonitor } from '../orchestration/WorkflowMonitor';

export default function AdminMonitor() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Initial fetch
    setLogs(globalMonitor.getLogs());

    // Subscribe to real-time events from the orchestration cluster
    const unsubscribe = globalMonitor.subscribe((latestLogs) => {
      setLogs(latestLogs);
    });

    return () => unsubscribe();
  }, []);

  // Compute live analytics
  const totalExecutions = logs.length;
  const breaches = logs.filter(l => l.isViolation).length;
  const healthScore = totalExecutions === 0 ? 100 : Math.round(((totalExecutions - breaches) / totalExecutions) * 100);

  return (
    <main className="container page-container animate-fade-in mt-4">
      <div className="mb-6 flex justify-between align-center" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <span className="tag mb-2 font-bold" style={{color: '#fff', background: '#333'}}>Internal Operations</span>
          <h1 className="text-3xl font-bold font-serif flex items-center gap-2" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Database size={28} /> Process Orchestrator & SLA Monitor
          </h1>
          <p className="text-secondary text-sm">Real-time health tracking of multi-agent collaboration setups.</p>
        </div>
      </div>

      <div className="grid-3-col mb-6" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'}}>
        <div className="card text-center" style={{padding: '1.5rem', textAlign: 'center'}}>
          <Activity size={32} className="mx-auto text-secondary mb-2" style={{margin: '0 auto', color: '#666', marginBottom: '8px'}} />
          <h3 className="text-xl font-bold">{totalExecutions}</h3>
          <p className="text-xs text-secondary text-uppercase font-bold tracking-wider">Sub-Processes Executed</p>
        </div>
        
        <div className="card text-center" style={{padding: '1.5rem', textAlign: 'center', borderColor: breaches > 0 ? '#d91a1a' : '#0a8f4c'}}>
          <AlertTriangle size={32} className={`mx-auto mb-2 ${breaches > 0 ? 'text-red' : 'text-green'}`} style={{margin: '0 auto', color: breaches > 0 ? '#d91a1a' : '#0a8f4c', marginBottom: '8px'}} />
          <h3 className="text-xl font-bold">{breaches}</h3>
          <p className="text-xs text-secondary text-uppercase font-bold tracking-wider">SLA Drift / Breaches</p>
        </div>

        <div className="card text-center" style={{padding: '1.5rem', textAlign: 'center', background: healthScore > 90 ? 'rgba(10,143,76,0.05)' : 'rgba(217,26,26,0.05)'}}>
          <Shield size={32} className={`mx-auto mb-2 ${healthScore > 90 ? 'success' : 'danger'}`} style={{margin: '0 auto', color: healthScore > 90 ? '#0a8f4c' : '#d91a1a', marginBottom: '8px'}} />
          <h3 className="text-xl font-bold">{healthScore}%</h3>
          <p className="text-xs text-secondary text-uppercase font-bold tracking-wider">System Health</p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="bg-secondary p-4 border-b font-bold flex align-center gap-2" style={{background: '#f9f8f4', padding: '16px', borderBottom: '1px solid #eee', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Clock size={16} /> Live Orchestration Logbook
        </div>
        
        <div className="table-responsive" style={{overflowX: 'auto'}}>
          <table className="w-full text-left" style={{width: '100%', borderCollapse: 'collapse', fontSize: '14px'}}>
            <thead>
              <tr className="text-secondary text-xs uppercase" style={{color: '#666', borderBottom: '2px solid #eee'}}>
                <th style={{padding: '12px 16px'}}>Timestamp</th>
                <th style={{padding: '12px 16px'}}>Process ID</th>
                <th style={{padding: '12px 16px'}}>Stage</th>
                <th style={{padding: '12px 16px'}}>Routing Agent</th>
                <th style={{padding: '12px 16px'}}>Duration / SLA</th>
                <th style={{padding: '12px 16px'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-secondary" style={{padding: '32px', textAlign: 'center', color: '#999'}}>
                    No workflows have been initiated yet. Trigger a video generation to start the engine.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} style={{borderBottom: '1px solid #f0f0f0', background: log.isViolation ? 'rgba(217,26,26,0.05)' : 'white'}}>
                    <td style={{padding: '12px 16px', color: '#666', fontSize: '13px'}}>
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td style={{padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px'}}>{log.processId}</td>
                    <td style={{padding: '12px 16px', fontWeight: '500'}}>{log.step}</td>
                    <td style={{padding: '12px 16px'}}><span className="tag gray" style={{fontSize: '10px'}}>{log.agentName}</span></td>
                    <td style={{padding: '12px 16px'}}>
                      {log.duration > 0 ? (
                        <span style={{color: log.isViolation ? '#d91a1a' : '#0a8f4c', fontWeight: 'bold'}}>
                          {log.duration}ms <span style={{color: '#999', fontWeight: 'normal'}}>/ {log.sla}ms</span>
                        </span>
                      ) : (
                        <span style={{color: '#999'}}>-</span>
                      )}
                    </td>
                    <td style={{padding: '12px 16px'}}>
                      {log.isViolation || log.status === 'Failed' ? (
                        <span style={{color: '#d91a1a', display: 'flex', alignItems: 'center', gap: '4px'}}>
                          <AlertTriangle size={14}/> {log.status}
                        </span>
                      ) : (
                        <span style={{color: log.duration > 0 ? '#0a8f4c' : '#333', display: 'flex', alignItems: 'center', gap: '4px'}}>
                          {log.duration > 0 && <CheckCircle size={14}/>} {log.status}
                        </span>
                      )}
                      {log.details && (
                        <div style={{fontSize: '11px', color: '#666', marginTop: '4px'}}>{log.details}</div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
