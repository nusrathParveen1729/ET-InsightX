import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Settings, Sparkles, AlertCircle, ArrowLeft, Loader, Video, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WorkflowEngine } from '../orchestration/WorkflowEngine';
import { RetrievalAgent } from '../orchestration/agents/RetrievalAgent';
import { DecisionAgent } from '../orchestration/agents/DecisionAgent';
import { ExecutionAgent } from '../orchestration/agents/ExecutionAgent';
import { VerificationAgent } from '../orchestration/agents/VerificationAgent';

export default function VideoView() {
  const [videoState, setVideoState] = useState('idle'); // idle, generating, generated, failed
  const [progressMsg, setProgressMsg] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [orchestratorLogs, setOrchestratorLogs] = useState([]);

  const handleGenerate = async () => {
    setVideoState('generating');
    setOrchestratorLogs([]);

    // Construct the Multi-Agent Pipeline
    const generatorFlow = new WorkflowEngine("AI_Video_Generation", [
      { agent: RetrievalAgent, stepName: "Information Context Retrieval", maxSLA_ms: 1200 },
      { agent: DecisionAgent, stepName: "Highlight Extraction Logic", maxSLA_ms: 1000 },
      { agent: ExecutionAgent, stepName: "Render Script & Video Action", maxSLA_ms: 1500 },
      { agent: VerificationAgent, stepName: "Quality & Compliance Verification", maxSLA_ms: 500 }
    ]);

    const result = await generatorFlow.run(
      { articleId: "DOC_109283" }, 
      (msg) => {
        setProgressMsg(msg);
        setOrchestratorLogs(prev => [...prev, msg]);
      }
    );

    if (result.success) {
      setVideoData(result.finalContext);
      setVideoState('generated');
    } else {
      setProgressMsg(`Workflow Error: ${result.error}`);
      setVideoState('failed');
    }
  };

  return (
    <main className="container page-container animate-fade-in video-page-center">
      <div className="video-layout w-full max-w-4xl mt-6" style={{margin: '0 auto'}}>
        
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-4">
          <Link to="/news" className="back-link flex-center gap-1 font-medium text-sm text-secondary">
            <ArrowLeft size={16} /> Back to Article
          </Link>
        </div>

        {videoState === 'idle' && (
          <div className="card flex flex-col items-center justify-center p-12 text-center shadow-lg border border-gray-200" style={{minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Video size={48} className="text-secondary mb-4" />
            <h2 className="text-2xl font-bold font-serif mb-2">Automated Orchestration Setup</h2>
            <p className="text-secondary max-w-md mx-auto mb-6">Dispatch a fully autonomous multi-agent chain (Retrieval ➔ Decision ➔ Execution ➔ Verification) to process and render a broadcast ready asset.</p>
            <button className="btn-primary" onClick={handleGenerate} style={{padding: '12px 24px', fontSize: '1.1rem'}}>
              <Sparkles size={18} /> Initialize Orchestrator Loop
            </button>
          </div>
        )}

        {(videoState === 'generating' || videoState === 'failed') && (
          <div className="card p-8" style={{minHeight: '400px', display: 'flex', gap: '32px'}}>
            
            <div className="flex-1 flex-col flex-center text-center justify-center border-r" style={{borderRight: '1px solid #eee', paddingRight: '2rem'}}>
              {videoState === 'failed' ? (
                 <AlertCircle size={48} className="text-red mb-4" />
              ) : (
                <Loader size={48} className="text-red animate-spin mb-4" />
              )}
              
              <h2 className={`text-xl font-bold mb-2 ${videoState === 'failed' ? 'text-red' : ''}`}>
                {videoState === 'failed' ? 'SLA / Verification Breach' : 'Orchestrating Collaboration...'}
              </h2>
              <p className="font-bold text-lg text-secondary">{progressMsg}</p>
              
              {videoState === 'failed' && (
                <button className="btn-outline mt-6" onClick={() => setVideoState('idle')}>Acknowledge Exception</button>
              )}
            </div>

            <div className="flex-1 flex-col justify-center">
              <h3 className="section-title-small mb-4 text-secondary flex-center gap-2"><Settings size={16}/> Live Terminal Logs</h3>
              <div className="bg-secondary p-4 rounded text-xs font-mono" style={{background: '#111', color: '#0f0', minHeight: '150px', maxHeight: '300px', overflowY: 'auto'}}>
                {orchestratorLogs.map((log, i) => (
                  <div key={i} className="mb-2 opacity-80">&gt; {log}</div>
                ))}
                {videoState === 'generating' && <div className="animate-pulse">&gt; _</div>}
              </div>
              <div className="text-xs text-secondary mt-2 text-right">Monitored by Global SLA Tracker</div>
            </div>

          </div>
        )}

        {videoState === 'generated' && (
          <div className="animate-fade-in">
            {/* Mock Video Player */}
            <div className="video-player-container relative rounded-lg bg-black aspect-video overflow-hidden shadow-lg group">
              {/* Overlay Content */}
              <div className="video-overlay absolute inset-0 flex flex-col justify-end p-6">
                
                {/* Play Button - Center */}
                <div className="play-button-center absolute inset-0 flex-center opacity-0 transition-opacity" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <button className="play-btn bg-red-white-icon shadow-red-glow">
                    <Play fill="currentColor" size={48} color="white" />
                  </button>
                </div>

                {/* Controls */}
                <div className="video-controls relative z-10 w-full">
                  <div className="progress-bar-container bg-gray-half group-bar cursor-pointer mb-4">
                    <div className="progress-bar-fill bg-red w-third h-full absolute top-0 left-0"></div>
                  </div>
                  
                  <div className="flex-center justify-between text-white w-full" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="flex-center gap-4" style={{display: 'flex', gap: '16px'}}>
                      <button className="hover-text-red transition-colors"><Pause fill="currentColor" size={20} /></button>
                      <button className="hover-text-red transition-colors"><Volume2 size={20} /></button>
                      <span className="text-sm font-medium">02:14 / 06:45</span>
                    </div>
                    <div className="flex-center gap-4" style={{display: 'flex', gap: '16px'}}>
                      <button className="hover-text-red transition-colors"><Settings size={20} /></button>
                      <button className="hover-text-red transition-colors"><Maximize size={20} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info Card */}
            <div className="card mt-6 border-t-4 border-t-green">
              <div className="flex-center gap-2 text-green mb-2" style={{color: '#0a8f4c', fontSize: '14px', fontWeight: 'bold'}}>
                <CheckCircle size={16} /> Process Orchestration Verified & Completed
              </div>
              <h1 className="text-3xl font-bold font-serif mb-3">AI Deep Dive: Union Budget 2026 Breakdown</h1>
              <p className="text-secondary text-lg">Verified successfully by multi-agent collaboration cluster. Raw data extracted and rendered into executable video format.</p>
            </div>

            {/* Highlights Section */}
            <div className="highlights-container grid-2-col gap-6 mt-6">
              {videoData?.highlights.map((h, i) => (
                <div key={i} className={`card ${i%2===0 ? 'border-l-red' : 'border-l-green'}`}>
                  <h3 className="font-bold mb-2 text-lg">
                    {h.title}
                  </h3>
                  <p className="text-secondary text-sm">{h.summary}</p>
                  <span className={`timestamp-badge text-xs font-bold ${i%2===0?'red bg-red-light':'success bg-green-light'} mt-3 inline-block rounded`}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
