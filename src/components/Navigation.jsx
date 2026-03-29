import React, { useEffect, useState } from 'react';
import { Search, User, Bell, Globe, Activity, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LocalizationAgent } from '../agents/LocalizationAgent';

export default function Navigation() {
  const { persona, setPersona, language, setLanguage, theme, toggleTheme } = useAppContext();
  const [t, setT] = useState(null);

  useEffect(() => {
    LocalizationAgent.translatePage(language).then(dict => setT(dict));
  }, [language]);

  return (
    <header className="nav-header">
      <div className="container nav-container">
        <Link to="/home" className="logo">
          ET<span className="red">AI</span> Insights
        </Link>
        
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder={t?.search || "Search news, companies, economy..."}
          />
        </div>

        <nav className="main-nav" style={{display: 'flex', gap: '20px', marginLeft: 'auto', marginRight: '20px', alignItems: 'center'}}>
           <Link to="/home" className="nav-link font-medium" style={{textDecoration: 'none', color: 'var(--text-primary)'}}>{t?.home || "Home"}</Link>
           <Link to="/monitor" className="nav-link font-bold flex-center gap-1" style={{textDecoration: 'none', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '4px'}}>
             <Activity size={18} /> {t?.adminMonitor || "Admin Monitor"}
           </Link>
        </nav>
        
        <div className="nav-actions">
          
          <div className="agent-controls" style={{ display: 'flex', gap: '8px', alignItems:'center' }}>
            <div className="select-box" style={{position: 'relative'}}>
              <Globe size={14} style={{position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)'}}/>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                style={{padding: '4px 8px 4px 26px', borderRadius: '0px', border: '1px solid var(--card-border)', fontSize: '12px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none', fontWeight: 'bold'}}
              >
                <option value="EN">English</option>
                <option value="HI">हिंदी (Hindi)</option>
                <option value="TA">தமிழ் (Tamil)</option>
                <option value="TE">తెలుగు (Telugu)</option>
                <option value="BN">বাংলা (Bengali)</option>
              </select>
            </div>

            <select 
              value={persona} 
              onChange={(e) => setPersona(e.target.value)}
              style={{padding: '4px 12px', borderRadius: '0px', border: '1px solid var(--card-border)', fontSize: '12px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none', fontWeight: 'bold'}}
            >
              <option value="default">Default Reader</option>
              <option value="investor">Mutual Fund Investor</option>
              <option value="founder">Startup Founder</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button 
            onClick={toggleTheme}
            className="profile-btn" 
            aria-label="Toggle Theme"
            style={{ borderRadius: '0px', border: '1px solid var(--card-border)' }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button className="profile-btn" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button className="profile-btn" aria-label="User Profile">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
