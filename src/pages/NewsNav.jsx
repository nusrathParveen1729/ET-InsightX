import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, User, Sparkles, MoveUpRight } from 'lucide-react';
import { PersonalizationAgent } from '../agents/PersonalizationAgent';
import { LocalizationAgent } from '../agents/LocalizationAgent';
import { useAppContext } from '../context/AppContext';

export default function NewsNav() {
  const { profileId, language } = useAppContext();
  const [t, setT] = useState(null);

  useEffect(() => {
    LocalizationAgent.translatePage(language).then(dict => setT(dict));
  }, [language]);

  // Log article visit to Supabase for personalization history
  useEffect(() => {
    if (profileId) {
      PersonalizationAgent.logArticleRead(profileId, "UNION_BUDGET_2026", "Economy");
    }
  }, [profileId]);

  return (
    <main className="container page-container animate-fade-in" style={{paddingTop: '100px'}}>
      <div className="article-layout mt-4">
        
        <div className="article-main">
          {/* Headline Section */}
          <header className="article-header mb-8 pb-6" style={{borderBottom: '2px solid var(--text-primary)'}}>
            <span className="tag" style={{background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '6px 16px', fontSize: '10px', fontWeight: 'bold', borderRadius: '0px'}}>ECONOMY & POLICY</span>
            <h1 className="text-5xl font-bold mt-4 mb-4" style={{letterSpacing: '-1.5px', lineHeight: '1.1', color: 'var(--text-primary)'}}>
              {t?.budgetTitle || "Union Budget 2026 Focuses on Digital R&D and Infrastructure Expansion"}
            </h1>
            <p className="text-secondary text-2xl font-serif italic" style={{opacity: 0.8, color: 'var(--text-secondary)'}}>
              "{t?.budgetQuote || "A decisive push to transition the economy towards advanced technologies while sustaining foundational sectors."}"
            </p>
            
            <Link to="/video" className="btn-primary mt-6" style={{padding: '14px 28px', borderRadius: '0px', background: 'var(--accent-red)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: 'white'}}>
              <PlayCircle size={20} />
              {t?.watchVideoBriefing || "Watch AI Video Briefing"}
            </Link>
          </header>

          <div className="grid-content" style={{display: 'flex', flexDirection: 'column', gap: '2.5rem'}}>
            
            {/* AI Summary Card */}
            <section className="card shadow-lg p-8" style={{borderLeft: '8px solid var(--accent-red)', background: 'var(--bg-secondary)', borderRadius: '0px', border: '1px solid var(--card-border)'}}>
              <h3 className="section-title-small flex-center gap-2 mb-4 font-bold uppercase tracking-tight" style={{fontSize: '1.2rem', color: 'var(--text-primary)'}}>
                <Sparkles className="red" size={24} /> {t?.aiExecutiveSummary || "AI Executive Summary"}
              </h3>
              <p className="article-body text-lg" style={{lineHeight: '1.9', color: 'var(--text-primary)'}}>
                {t?.budgetSummary || "The 2026 Union Budget allocates unprecedented capital towards artificial intelligence R&D, EV subsidies, and rural connectivity. The Finance Ministry highlighted that 4% of GDP will be directly channeled into modernizing supply chains. This aims to secure long-term domestic self-reliance against global supply shortages."}
              </p>
              <div className="text-xs font-bold text-red mt-6 uppercase tracking-widest border-t pt-4" style={{opacity: 0.6, color: 'var(--accent-red)'}}>
                ALGORITHMIC SYNTHESIS: 8 ET SOURCES SYNCED
              </div>
            </section>

            {/* Key Insights Card */}
            <section className="card p-8 shadow-sm" style={{background: 'var(--bg-secondary)', borderRadius: '0px', border: '1.5px solid var(--card-border)'}}>
              <h3 className="section-title-small font-bold mb-8 uppercase tracking-tight" style={{fontSize: '1.2rem', borderLeft: '4px solid var(--text-primary)', paddingLeft: '12px', color: 'var(--text-primary)'}}>{t?.coreStrategicInsights || "Core Strategic Insights"}</h3>
              <div className="insights-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem'}}>
                <div className="insight-tile p-6 card interactive" style={{background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '0px'}}>
                   <div className="bullet red mb-3"></div>
                   <p className="text-sm font-bold mb-2" style={{color: 'var(--text-primary)'}}>INFRASTRUCTURE</p>
                   <p className="text-xs text-secondary leading-relaxed" style={{color: 'var(--text-secondary)'}}>₹1.5 Lakh Crore designated for semiconductor fabrication units.</p>
                </div>
                <div className="insight-tile p-6 card interactive" style={{background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '0px'}}>
                   <div className="bullet red mb-3"></div>
                   <p className="text-sm font-bold mb-2" style={{color: 'var(--text-primary)'}}>TAX REFORMS</p>
                   <p className="text-xs text-secondary leading-relaxed" style={{color: 'var(--text-secondary)'}}>Corporate tax lowered by 2.5% for green energy priority sectors.</p>
                </div>
                <div className="insight-tile p-6 card interactive" style={{background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '0px'}}>
                   <div className="bullet red mb-3"></div>
                   <p className="text-sm font-bold mb-2" style={{color: 'var(--text-primary)'}}>DIGITAL REACH</p>
                   <p className="text-xs text-secondary leading-relaxed" style={{color: 'var(--text-secondary)'}}>Digital public infrastructure push into Tier-III and Tier-IV cities.</p>
                </div>
              </div>
            </section>

            {/* Impact Personalization Hub */}
            <section className="card p-8 shadow-2xl" style={{border: '3px solid var(--accent-red)', background: 'var(--card-bg)', borderRadius: '0px'}}>
              <div className="impact-header flex justify-between items-center mb-10 pb-4 border-b" style={{borderColor: 'var(--card-border)'}}>
                <h3 className="text-2xl font-black flex-center gap-3 uppercase tracking-tighter" style={{color: 'var(--text-primary)'}}>
                  <User size={28} className="red" /> {t?.portfolioDriftAnalysis || "Portfolio Drift Analysis"}
                </h3>
                <span className="impact-badge" style={{background: 'var(--accent-red)', color: 'white', padding: '6px 18px', borderRadius: '0px', fontSize: '11px', fontWeight: 'bold'}}>ALERT: MEDIUM HIGH AWARENESS</span>
              </div>
              
              <div className="impact-grid" style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem'}}>
                <div className="impact-analysis">
                  <h4 className="font-bold text-lg mb-4 uppercase tracking-wider" style={{color: 'var(--text-primary)'}}>AI Recommendation</h4>
                  <p className="text-secondary mb-8 leading-relaxed" style={{fontSize: '1.1rem', color: 'var(--text-secondary)'}}>
                    Given your heavy investment in tech stocks, this budget is highly favorable. However, your FMCG holdings might see short-term stagnation due to unaltered consumer duties.
                  </p>
                  <Link to="/tracker" className="btn-outline" style={{padding: '12px 24px', borderRadius: '0px', borderColor: 'var(--text-primary)', fontSize: '12px', fontWeight: 'bold', color: 'var(--text-primary)'}}>TRACK STORY EVOLUTION</Link>
                </div>
                <div className="impact-actions p-8" style={{background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '0px'}}>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-6 opacity-80 border-b pb-2" style={{color: 'var(--text-secondary)', borderColor: 'var(--card-border)'}}>{t?.operationalActions || "Operational Actions"}</h4>
                  <ul className="action-list" style={{listStyle: 'none', padding: 0}}>
                    <li className="flex items-start gap-4 text-sm mb-6" style={{color: 'var(--text-primary)'}}><MoveUpRight size={18} className="red mt-1" /> <span className="font-bold">SHIFT 5% CAPITAL TO SEMICONDUCTOR ETFs.</span></li>
                    <li className="flex items-start gap-4 text-sm" style={{color: 'var(--text-primary)'}}><MoveUpRight size={18} className="red mt-1" /> <span className="font-bold">EXECUTE PRICE ALERTS FOR GREEN-ENERGY MID-CAPS.</span></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>

        <aside className="article-sidebar sidebar">
          <div className="sector-impact card shadow-xl p-8" style={{borderRadius: '0px', border: '2px solid var(--text-primary)', background: 'var(--card-bg)', position: 'sticky', top: '100px'}}>
            <h3 className="section-title-small font-black mb-8 border-b pb-4 uppercase tracking-tighter" style={{fontSize: '1.3rem', color: 'var(--text-primary)', borderColor: 'var(--card-border)'}}>{t?.marketSectorDNA || "Market Sector DNA"}</h3>
            <div className="space-y-10 flex flex-col gap-8">
              <div className="sector-bar">
                <div className="sector-info mb-3 flex justify-between uppercase text-xs font-black" style={{color: 'var(--text-primary)'}}>
                  <span>Technology</span>
                  <span className="success">+8.5% DRIFT</span>
                </div>
                <div className="progress-bg" style={{height: '12px', border: '1px solid var(--card-border)'}}><div className="progress-fill success" style={{width: '85%', borderRadius: '0px'}}></div></div>
              </div>
              <div className="sector-bar">
                <div className="sector-info mb-3 flex justify-between uppercase text-xs font-black" style={{color: 'var(--text-primary)'}}>
                  <span>Infrastructure</span>
                  <span className="success">+7.0% DRIFT</span>
                </div>
                <div className="progress-bg" style={{height: '12px', border: '1px solid var(--card-border)'}}><div className="progress-fill success" style={{width: '70%', borderRadius: '0px'}}></div></div>
              </div>
              <div className="sector-bar">
                <div className="sector-info mb-3 flex justify-between uppercase text-xs font-black" style={{color: 'var(--text-primary)'}}>
                  <span>FMCG</span>
                  <span className="danger">-2.1% DRIFT</span>
                </div>
                <div className="progress-bg" style={{height: '12px', border: '1px solid var(--card-border)'}}><div className="progress-fill danger" style={{width: '30%', borderRadius: '0px'}}></div></div>
              </div>
            </div>
            
            <button className="btn-outline w-full mt-10 text-xs font-black py-4 uppercase tracking-widest hover:bg-black hover:text-white transition-all" style={{borderRadius: '0px', border: '2px solid var(--text-primary)', color: 'var(--text-primary)'}}>Initialize Sector Deep-Dive</button>
          </div>
        </aside>

      </div>
    </main>
  );
}
