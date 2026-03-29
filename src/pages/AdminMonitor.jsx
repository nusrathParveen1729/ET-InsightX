import React, { useState, useEffect } from 'react';
import { Shield, Activity, Clock, AlertTriangle, CheckCircle, Database } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LocalizationAgent } from '../agents/LocalizationAgent';
import { supabase } from '../lib/supabaseClient';
import { globalMonitor } from '../orchestration/WorkflowMonitor';
import { NewsIngestionAgent } from '../agents/NewsIngestionAgent';

export default function AdminMonitor() {
  const { profileId, language } = useAppContext();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [t, setT] = useState(null);

  useEffect(() => {
    LocalizationAgent.translatePage(language).then(dict => setT(dict));
  }, [language]);

  const handleSyncNews = async () => {
    setSyncing(true);
    await NewsIngestionAgent.fetchAndStoreNews();
    setSyncing(false);
    // Reload history to show the newest articles in logs (simulated)
    window.location.reload();
  };

  useEffect(() => {
    // 1. Initial Load from the Supabase Database instead of volatile memory
    async function fetchHistoricalData() {
      const { data, error } = await supabase
        .from('workflow_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && data) {
        setLogs(data);
      }
      setLoading(false);
    }
    
    fetchHistoricalData();

    // 2. Subscribe to real-time events triggered by active application workflows
    const unsubscribe = globalMonitor.subscribe((latestCache) => {
      // Whenever a new cache item is written to DB locally, prepend it so the dashboard feels perfectly real-time
      if (latestCache.length > 0) {
         setLogs(prevLogs => {
            // Check if the log already exists (to avoid duplicates from rapid rapid re-renders)
            const exists = prevLogs.find(l => l.id === latestCache[0].id);
            if (exists) return prevLogs;
            
            const newLogs = [latestCache[0], ...prevLogs];
            if (newLogs.length > 100) newLogs.pop();
            return newLogs;
         });
      }
    });

    return () => unsubscribe();
  }, []);

  // Compute live analytics based on the true historical payload
  const totalExecutions = logs.length;
  const breaches = logs.filter(l => l.is_violation).length;
  const healthScore = totalExecutions === 0 ? 100 : Math.round(((totalExecutions - breaches) / totalExecutions) * 100);

  return (
    <main className="container page-container animate-fade-in mt-4">
      <div className="mb-6 flex justify-between align-center" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <span className="tag mb-2 font-bold" style={{color: 'white', background: 'var(--accent-red)'}}>{t?.adminMonitor || "Internal Operations"}</span>
          <h1 className="text-3xl font-bold font-serif flex items-center gap-2" style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)'}}>
            <Database size={28} /> {t?.initializeIntelligence || "Live Database Orchestrator Monitor"}
          </h1>
          <p className="text-secondary text-sm">Now powered by robust Supabase execution persistence.</p>
        </div>
        <button 
          onClick={handleSyncNews} 
          disabled={syncing}
          className="btn-primary" 
          style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px'}}
        >
          <Activity size={18} className={syncing ? "animate-spin" : ""} />
          {syncing ? "Syncing ET News..." : "Sync Realtime News (ET)"}
        </button>
      </div>

      <div className="grid-3-col mb-6" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'}}>
        <div className="card text-center" style={{padding: '1.5rem', textAlign: 'center', borderRadius: '0px'}}>
          <Activity size={32} className="mx-auto mb-2" style={{margin: '0 auto', color: 'var(--text-secondary)', marginBottom: '8px'}} />
          <h3 className="text-xl font-bold" style={{color: 'var(--text-primary)'}}>{totalExecutions}</h3>
          <p className="text-xs text-secondary text-uppercase font-bold tracking-wider">Sub-Processes Executed</p>
        </div>
        
        <div className="card text-center" style={{padding: '1.5rem', textAlign: 'center', borderColor: breaches > 0 ? 'var(--accent-red)' : 'var(--card-border)', borderRadius: '0px'}}>
          <AlertTriangle size={32} className={`mx-auto mb-2 ${breaches > 0 ? 'text-red' : 'text-green'}`} style={{margin: '0 auto', color: breaches > 0 ? 'var(--accent-red)' : '#0a8f4c', marginBottom: '8px'}} />
          <h3 className="text-xl font-bold" style={{color: 'var(--text-primary)'}}>{breaches}</h3>
          <p className="text-xs text-secondary text-uppercase font-bold tracking-wider">SLA Drift / Breaches</p>
        </div>

        <div className="card text-center" style={{padding: '1.5rem', textAlign: 'center', background: healthScore > 90 ? 'rgba(10,143,76,0.05)' : 'rgba(217,26,26,0.05)', borderRadius: '0px'}}>
          <Shield size={32} className={`mx-auto mb-2 ${healthScore > 90 ? 'success' : 'danger'}`} style={{margin: '0 auto', color: healthScore > 90 ? '#0a8f4c' : '#d91a1a', marginBottom: '8px'}} />
          <h3 className="text-xl font-bold">{healthScore}%</h3>
          <p className="text-xs text-secondary text-uppercase font-bold tracking-wider">System Health</p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
        <div className="p-4 border-b font-bold flex align-center gap-2" style={{background: 'var(--bg-secondary)', padding: '16px', borderBottom: '1px solid var(--card-border)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)'}}>
          <Clock size={16} /> {t?.databaseLog || "Production Database Logbook (Supabase)"}
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
              {loading ? (
                <tr><td colSpan="6" className="text-center p-8 text-secondary">Fetching enterprise data...</td></tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-secondary" style={{padding: '32px', textAlign: 'center', color: '#999'}}>
                    No workflows have been initiated yet. Trigger a video generation to write immediately to your database.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} style={{borderBottom: '1px solid var(--card-border)', background: log.is_violation ? 'rgba(217,26,26,0.1)' : 'transparent'}}>
                    <td style={{padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px'}}>
                      {new Date(log.created_at).toLocaleTimeString()}
                    </td>
                    <td style={{padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px'}}>{log.process_id}</td>
                    <td style={{padding: '12px 16px', fontWeight: '500'}}>{log.step}</td>
                    <td style={{padding: '12px 16px'}}><span className="tag gray" style={{fontSize: '10px'}}>{log.agent_name}</span></td>
                    <td style={{padding: '12px 16px'}}>
                      {log.duration > 0 ? (
                        <span style={{color: log.is_violation ? '#d91a1a' : '#0a8f4c', fontWeight: 'bold'}}>
                          {log.duration}ms <span style={{color: '#999', fontWeight: 'normal'}}>/ {log.sla_ms}ms</span>
                        </span>
                      ) : (
                        <span style={{color: '#999'}}>-</span>
                      )}
                    </td>
                    <td style={{padding: '12px 16px'}}>
                      {log.is_violation || log.status === 'Failed' ? (
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
