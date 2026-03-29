import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Sparkles, TrendingUp, AlertCircle, Briefcase, Zap, Loader } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PersonalizationAgent } from '../agents/PersonalizationAgent';
import { LocalizationAgent } from '../agents/LocalizationAgent';

export default function Home() {
  const { persona, language } = useAppContext();
  const [feed, setFeed] = useState(null);
  const [t, setT] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgents() {
      setLoading(true);
      const [rawFeed, langDict] = await Promise.all([
        PersonalizationAgent.fetchFeed(persona),
        LocalizationAgent.translatePage(language)
      ]);
      const translatedFeed = await LocalizationAgent.translateFeed(rawFeed, language);
      setFeed(translatedFeed);
      setT(langDict);
      setLoading(false);
    }
    loadAgents();
  }, [persona, language]);

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

  return (
    <main className="container page-container animate-fade-in">
      <section className="greeting-section mb-6 mt-4">
        <h1 className="text-3xl font-bold mb-1">{t?.greeting || "Hi, Nusrath"}</h1>
        <p className="text-secondary text-lg">{t?.subtitle || feed.greeting}</p>
      </section>

      <div className="home-grid">
        <div className="main-content">
          <section className="mb-6">
            <div className="section-header">
              <h2 className="section-title">
                <Sparkles className="icon red" size={20} /> 
                {t?.aiBriefings || "AI Briefings"}
              </h2>
            </div>
            <div className="briefing-cards">
              {feed.briefings.map((b, idx) => (
                <Card 
                  key={idx}
                  linkTo="/news"
                  tag={b.tag}
                  title={b.title}
                  summary={b.summary}
                  className={idx === 0 ? "featured-briefing" : "small-briefing"}
                />
              ))}
            </div>
          </section>

          <section className="mb-6">
            <div className="section-header">
              <h2 className="section-title">{t?.forYou || "For You"}</h2>
            </div>
            <div className="for-you-grid">
              {feed.foryou.map((b, idx) => (
                <Card 
                  key={idx}
                  linkTo="/news"
                  tag={b.tag}
                  title={b.title}
                  summary={b.summary}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar">
          <section className="insights-section card">
            <h2 className="section-title-small mb-4 text-center">{t?.quickInsights || "Quick Insights"}</h2>
            
            {feed.insights.map((insight, idx) => (
              <div key={idx} className={`insight-card ${insight.type === 'success' ? 'opportunity' : insight.type}`}>
                <div className={`insight-icon ${insight.type}`}>
                  {renderIcon(insight.type)}
                </div>
                <div className="insight-content">
                  <span className="insight-label">
                    {t?.[insight.label.replace(' ', '')] || insight.label}
                  </span>
                  <p className="insight-text">{insight.text}</p>
                </div>
              </div>
            ))}
            
          </section>
        </aside>
      </div>
    </main>
  );
}
