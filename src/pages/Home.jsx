import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Sparkles, TrendingUp, AlertCircle, Briefcase, Zap, Loader } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LocalizationAgent } from '../agents/LocalizationAgent';
import { PersonalizationAgent } from '../agents/PersonalizationAgent';
import { NewsIngestionAgent } from '../agents/NewsIngestionAgent';

export default function Home() {
  const { persona, language, profileId, userName } = useAppContext();
  const [feed, setFeed] = useState(null);
  const [t, setT] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      // 1. Proactive Synchronization (No buttons needed!)
      // Automatically pull latest ET news every time the page loads
      try {
        await NewsIngestionAgent.fetchAndStoreNews();
      } catch (e) {
        console.warn("Live Sync currently unavailable, falling back to local database insights.");
      }

      // 2. Persona-Aware Feed Synthesis
      const [rawFeed, langDict] = await Promise.all([
        PersonalizationAgent.fetchFeed(persona, profileId),
        LocalizationAgent.translatePage(language)
      ]);
      
      const translatedFeed = await LocalizationAgent.translateFeed(rawFeed, language);
      setFeed(translatedFeed);
      setT(langDict);
      setLoading(false);
    }
    loadData();
  }, [persona, language, profileId]);

  if (loading || !feed) {
    return (
      <main className="container page-container flex-center justify-center" style={{minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Loader className="animate-spin text-red" size={32} style={{color:'#d91a1a'}}/>
        <span className="ml-2 font-medium">Agent synthesizing your feed...</span>
      </main>
    );
  }

  // Helper to render icons for insights
  const renderIcon = (type) => {
    switch(type) {
      case 'alert': return <AlertCircle size={18} />;
      case 'success': return <TrendingUp size={18} />;
      default: return <Zap size={18} />;
    }
  };

  const briefings = feed.briefings || [];
  const foryou = feed.foryou || [];

  return (
    <main className="container page-container animate-fade-in">
      <section className="hero-banner p-10 mb-24 mt-6 card shadow-xl" style={{ 
        background: 'var(--theme-hero-bg, linear-gradient(135deg, rgba(217, 26, 26, 0.04) 0%, rgba(255, 255, 255, 1) 100%))',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '10px solid var(--accent-red)',
        borderRadius: '0px',
        borderTop: 'none',
        borderRight: '1px solid var(--card-border)',
        borderBottom: '1px solid var(--card-border)'
      }}>
        <div className="hero-content">
          <div className="flex items-center gap-2 mb-2">
            <span className="tag text-[10px] py-1 px-2 mb-2" style={{ background: 'var(--accent-red)', color: 'white', fontWeight: '900', borderRadius: '0px' }}>{persona.toUpperCase()} MODE</span>
            <span className="text-secondary text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              <Sparkles size={12} className="red" /> {t?.realtimeAgents || "Realtime Agents Active"}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t?.greeting ? t.greeting.replace('{name}', userName) : `Hi, ${userName}`}
          </h1>
          <p className="text-secondary text-lg" style={{ color: 'var(--text-secondary)' }}>
            {t?.subtitle || "Your intelligence hub is synchronized with today's Economic Times pulse."}
          </p>
        </div>
      </section>

      <div className="home-grid">
        <div className="main-content">
          <section className="mb-12">
            <div className="section-header pb-4 mb-8" style={{ borderColor: 'var(--card-border)', borderBottom: '2px solid var(--card-border)' }}>
              <h2 className="section-title" style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: '800' }}>
                <Sparkles className="icon red" size={24} /> 
                {t?.aiBriefings || "AI Briefings"}
              </h2>
            </div>
            <div className="briefing-cards">
              {briefings.map((b, idx) => (
                <Card 
                  key={idx}
                  externalUrl={b.url}
                  image={b.image}
                  source={b.source}
                  publishedAt={b.publishedAt}
                  title={b.title}
                  summary={b.summary}
                  tag={b.tag}
                  className={idx === 0 ? "featured-briefing" : "small-briefing"}
                />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="section-header pb-4 mb-8" style={{ borderColor: 'var(--card-border)', borderBottom: '2px solid var(--card-border)' }}>
              <h2 className="section-title" style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: '800' }}>{t?.forYou || "For You"}</h2>
            </div>
            <div className="for-you-grid">
              {foryou.map((b, idx) => (
                <Card 
                  key={idx}
                  externalUrl={b.url}
                  image={b.image}
                  source={b.source}
                  publishedAt={b.publishedAt}
                  title={b.title}
                  summary={b.summary}
                  tag={b.tag}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar">
          <section className="insights-section card shadow-md" style={{ borderRadius: '0px', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)' }}>
            <h2 className="section-title-small mb-6 text-center font-bold uppercase tracking-widest text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>{t?.quickInsights || "Execution Insights"}</h2>
            
            {(feed.insights || []).map((insight, idx) => (
              <div key={idx} className={`insight-card ${insight.type === 'success' ? 'opportunity' : insight.type}`} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', marginBottom: '12px', padding: '16px' }}>
                <div className={`insight-icon ${insight.type}`} style={{ borderRadius: '0px' }}>
                  {renderIcon(insight.type)}
                </div>
                <div className="insight-content">
                  <span className="insight-label" style={{ color: 'var(--accent-red)' }}>
                    {t?.[insight.label?.replace(' ', '')] || insight.label}
                  </span>
                  <p className="insight-text" style={{ color: 'var(--text-secondary)' }}>{insight.text}</p>
                </div>
              </div>
            ))}
            
          </section>
        </aside>
      </div>
    </main>
  );
}
