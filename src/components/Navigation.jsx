import React, { useEffect, useState } from 'react';
import { Search, User, Bell, Globe, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LocalizationAgent } from '../agents/LocalizationAgent';

export default function Navigation() {
  const { persona, setPersona, language, setLanguage } = useAppContext();
  const [t, setT] = useState(null);

  useEffect(() => {
    LocalizationAgent.translatePage(language).then(dict => setT(dict));
  }, [language]);

  return (
    <header className="nav-header">
      <div className="container nav-container">
        <Link to="/" className="logo">
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
        
        <div className="nav-actions">
          
          <div className="agent-controls" style={{ display: 'flex', gap: '8px', alignItems:'center' }}>
            <Link to="/monitor" className="btn-outline" style={{padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', marginRight: '8px', color: '#d91a1a', borderColor: '#d91a1a'}}>
              <Activity size={14}/> SLA Monitor
            </Link>

            <div className="select-box" style={{position: 'relative'}}>
              <Globe size={14} style={{position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#666'}}/>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                style={{padding: '4px 8px 4px 26px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '12px', background: '#f9f8f4', cursor: 'pointer', outline: 'none'}}
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
              style={{padding: '4px 8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '12px', background: '#f9f8f4', cursor: 'pointer', outline: 'none'}}
            >
              <option value="default">Default Reader</option>
              <option value="investor">Mutual Fund Investor</option>
              <option value="founder">Startup Founder</option>
              <option value="student">Student</option>
            </select>
          </div>

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
