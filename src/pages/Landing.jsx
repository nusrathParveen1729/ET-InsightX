import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, TrendingUp, GraduationCap, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LocalizationAgent } from '../agents/LocalizationAgent';

export default function Landing() {
  const { setPersona, language } = useAppContext();
  const navigate = useNavigate();
  const [t, setT] = useState(null);

  useEffect(() => {
    LocalizationAgent.translatePage(language).then(dict => setT(dict));
  }, [language]);

  const personas = [
    { 
      id: 'investor', 
      title: t?.investor || 'Investor', 
      icon: <TrendingUp size={32} />,
      color: '#d91a1a' 
    },
    { 
      id: 'founder', 
      title: t?.founder || 'Founder', 
      icon: <Briefcase size={32} />,
      color: '#d91a1a'
    },
    { 
      id: 'student', 
      title: t?.student || 'Student', 
      icon: <GraduationCap size={32} />,
      color: '#d91a1a'
    },
    { 
      id: 'default', 
      title: t?.default || 'Default', 
      icon: <Globe size={32} />,
      color: '#d91a1a'
    }
  ];

  const handleSelect = (id) => {
    setPersona(id);
    navigate('/home');
  };

  return (
    <main className="landing-container" style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      
      <div className="landing-header text-center" style={{ marginBottom: '80px', maxWidth: '900px' }}>
        <h1 className="font-black uppercase tracking-tighter" style={{ fontSize: '4rem', marginBottom: '10px', lineHeight: '0.9', color: 'var(--text-primary)' }}>
          {t?.initializeIntelligence?.split(' ')[0] || 'Initialize'} <span style={{ color: 'var(--accent-red)' }}>{t?.initializeIntelligence?.split(' ')[1] || 'Intelligence'}</span>
        </h1>
        <div style={{ width: '120px', height: '6px', background: 'var(--accent-red)', margin: '20px auto' }}></div>
        <p className="text-secondary uppercase font-bold tracking-widest text-xs" style={{ opacity: 0.8, marginTop: '20px', color: 'var(--text-secondary)' }}>
          {t?.selectPersona || 'Select your tactical persona to deploy agent array'}
        </p>
      </div>

      <div className="persona-icon-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5rem', width: 'auto' }}>
        {personas.map((p) => (
          <div 
            key={p.id} 
            onClick={() => handleSelect(p.id)}
            className="persona-target" 
            style={{ cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease' }}
          >
            <div 
              className="icon-tile shadow-md" 
              style={{ 
                width: '100px', 
                height: '100px', 
                background: 'var(--card-bg)', 
                border: '2px solid var(--card-border)', 
                borderRadius: '0px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '20px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                color: 'var(--accent-red)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--accent-red)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--accent-red)';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--card-bg)';
                e.currentTarget.style.color = 'var(--accent-red)';
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {p.icon}
            </div>
            <span className="font-bold text-sm uppercase tracking-tighter" style={{ display: 'block', color: 'var(--text-primary)' }}>{p.title}</span>
          </div>
        ))}
      </div>

      <div className="footer-status" style={{ position: 'fixed', bottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ width: '8px', height: '8px', background: '#d91a1a', borderRadius: '0px' }}></div>
        <span className="text-xs font-black uppercase tracking-widest" style={{ opacity: 0.4 }}>System Ready: 1.4.2 ALPHA</span>
      </div>
    </main>
  );
}
