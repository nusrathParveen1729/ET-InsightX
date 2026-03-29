import React, { useState, useEffect } from 'react';
import { PlayCircle, Anchor, TrendingUp, Sparkles, BookOpen, Loader } from 'lucide-react';
import { StoryArcAgent } from '../agents/StoryArcAgent';

export default function StoryTracker() {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPredictions() {
      const data = await StoryArcAgent.predictTimeline();
      setPredictions(data);
      setLoading(false);
    }
    loadPredictions();
  }, []);

  return (
    <main className="container page-container animate-fade-in mt-4">
      <div className="article-layout">
        
        <div className="article-main">
          {/* Header */}
          <section className="mb-6">
            <span className="tag text-red mb-2 bg-red-light inline-block px-2 py-1 rounded" style={{color: '#d91a1a', background: 'rgba(217,26,26,0.1)'}}>
              STORY ARC TRACKER
            </span>
            <h1 className="text-4xl font-bold font-serif mb-2">Evolution of Semiconductor Sops</h1>
            <p className="article-subheading text-secondary text-lg">
              Track the chronology of events that led to the recent ₹1.5 Lakh Crore tech infrastructure push.
            </p>
          </section>

          {/* Timeline Section */}
          <section className="tracker-timeline card mb-6">
            <h3 className="section-title-small flex-center gap-2 mb-4" style={{color: '#d91a1a'}}>
              <BookOpen size={18} /> Deep Narrative Trace
            </h3>
            
            <div className="timeline-container">
              
              <div className="timeline-event">
                <div className="timeline-dot red"></div>
                <div className="timeline-date font-bold text-sm mb-1 text-red" style={{color: '#d91a1a'}}>Jan 29, 2026 - Present</div>
                <h4 className="font-bold text-lg mb-1">Union Budget 2026 Announcements</h4>
                <p className="text-secondary text-sm mb-2">
                  Finance Ministry officially declares massive semiconductor subsidies. Stocks of associated hardware companies jump over 15% pre-market.
                </p>
                <div className="tag">Related: Tech, Policy, Trade</div>
              </div>
              
              <div className="timeline-event">
                <div className="timeline-dot"></div>
                <div className="timeline-date text-secondary text-sm mb-1">Dec 15, 2025</div>
                <h4 className="font-bold text-lg mb-1">Whitepaper on Digital Reliance</h4>
                <p className="text-secondary text-sm mb-2">
                  Government think-tank releases comprehensive survey detailing vulnerabilities due to heavy import reliance for microchips. Recommends immediate fiscal intervention.
                </p>
              </div>
              
              <div className="timeline-event">
                <div className="timeline-dot"></div>
                <div className="timeline-date text-secondary text-sm mb-1">Nov 02, 2025</div>
                <h4 className="font-bold text-lg mb-1">Global Supply Chain Disruption</h4>
                <p className="text-secondary text-sm mb-2">
                  Major Asian ports undergo 3-week backlog, leading to 23% reduction in automobile production locally. Triggers initial debate among industrial councils regarding diversification.
                </p>
              </div>

              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'var(--bg-tertiary)'}}></div>
            </div>
          </section>

        </div>

        <aside className="article-sidebar">
          
          {loading ? (
            <div className="card mb-6 flex-center justify-center p-6 text-red" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Loader className="animate-spin" size={24} /> 
              <span className="ml-2 font-bold">Predicting next moves...</span>
            </div>
          ) : (
            <div className="animate-fade-in">
              <section className="impact-box mb-6" style={{background: 'rgba(217, 160, 26, 0.05)', borderColor: 'rgba(217, 160, 26, 0.3)'}}>
                <div className="impact-header" style={{background: 'rgba(217, 160, 26, 0.1)', borderBottomColor: 'rgba(217, 160, 26, 0.2)'}}>
                  <h3 className="flex-center gap-2 font-bold mb-0">
                    <Sparkles size={18} color="#b07015" /> {predictions.prediction.headline}
                  </h3>
                  <span className="impact-badge" style={{background: 'white', color: '#b07015'}}>{predictions.prediction.confidence}</span>
                </div>
                <div className="impact-content text-sm">
                  {predictions.prediction.content}
                </div>
              </section>

              <section className="card mb-6 border-l-red">
                <h3 className="font-bold text-sm mb-2">{predictions.contrarianView.headline}</h3>
                <p className="text-sm text-secondary">{predictions.contrarianView.content}</p>
              </section>
            </div>
          )}

          {/* Sentiment Graph Mockup */}
          <section className="sentiment-card card mb-6">
            <h3 className="section-title-small flex-center gap-2 mb-3">
              <TrendingUp size={18} className="success" style={{color: '#0a8f4c'}} /> Media Sentiment Trend
            </h3>
            <div className="graph-placeholder bg-secondary mb-3">
              {/* SVG mock graph */}
              <svg viewBox="0 0 100 50" className="w-full h-auto">
                <path d="M0 40 Q25 45, 50 30 T100 10" fill="none" stroke="var(--positive-green)" strokeWidth="3" />
                <path d="M0 50 L0 40 Q25 45, 50 30 T100 10 L100 50 Z" fill="var(--positive-green)" opacity="0.1" />
              </svg>
            </div>
            <p className="text-sm text-secondary">Sentiment surrounding domestic semiconductor policy turned overwhelmingly positive post-budget. Analysts note high institutional buying.</p>
          </section>

        </aside>

      </div>
    </main>
  );
}
