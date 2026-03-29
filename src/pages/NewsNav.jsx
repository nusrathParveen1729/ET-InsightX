import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight, User, Sparkles, Send, MoveUpRight, ArrowDownRight, Loader } from 'lucide-react';
import { SynthesisAgent } from '../agents/SynthesisAgent';

export default function NewsNav() {
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Can I get more details on how this affects tech startups?", isUser: true },
    { id: 2, text: "The new tax bracket changes primarily impact...", isUser: false },
    { id: 3, text: "Based on the 8 articles synthesized, the budget is highly favorable for AI and hardware startups. There's a proposed 2.5% tax rebate for companies investing 15% of revenue back into R&D.", isUser: false }
  ]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), text: chatInput, isUser: true };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
    setIsTyping(true);
    
    // Let Agent synthesize response
    const agentResponseText = await SynthesisAgent.chat(chatInput, "Union Budget 2026");
    
    setMessages(prev => [...prev, { 
      id: Date.now() + 1, 
      text: agentResponseText, 
      isUser: false 
    }]);
    setIsTyping(false);
  };

  return (
    <main className="container page-container animate-fade-in">
      <div className="article-layout mt-4">
        
        <div className="article-main">
          {/* Title Section */}
          <header className="article-header mb-5">
            <span className="tag">Economy & Policy</span>
            <h1 className="text-4xl font-bold mt-2 mb-2 article-headline">
              Union Budget 2026 Focuses on Digital R&D and Infrastructure Expansion
            </h1>
            <p className="article-subheading text-secondary text-xl font-serif">
              A decisive push to transition the economy towards advanced technologies while sustaining foundational sectors.
            </p>
          </header>

          <Link to="/video" className="btn-primary mb-6 video-btn-large">
            <PlayCircle size={20} />
            Watch AI Video Briefing
          </Link>

          {/* Overview Section */}
          <section className="article-section mb-6">
            <h3 className="section-title-small flex-center gap-2">
              <Sparkles className="red" size={16} /> AI Executive Summary
            </h3>
            <div className="text-sm font-bold text-red mb-2 bg-red-light inline-block px-2 py-1 rounded">
              Synthesized from 8 primary ET sources
            </div>
            <p className="article-body">
              The 2026 Union Budget allocates unprecedented capital towards artificial intelligence R&D, EV subsidies, and rural connectivity. The Finance Ministry highlighted that 4% of GDP will be directly channeled into modernizing supply chains. This aims to secure long-term domestic self-reliance against global supply shortages.
            </p>
          </section>

          {/* Key Insights Section */}
          <section className="article-section mb-6">
            <h3 className="section-title-small">Key Insights</h3>
            <div className="insights-list">
              <div className="insight-item">
                <div className="bullet red"></div>
                <p>₹1.5 Lakh Crore designated for new semiconductor fabrication units over 5 years.</p>
              </div>
              <div className="insight-item">
                <div className="bullet red"></div>
                <p>Corporate tax effectively lowered by 2.5% for companies prioritizing green energy.</p>
              </div>
              <div className="insight-item">
                <div className="bullet red"></div>
                <p>Digital public infrastructure pushed further into Tier-III and Tier-IV cities.</p>
              </div>
            </div>
          </section>

          {/* Impact on You Section (Highlighted) */}
          <section className="impact-box mb-6">
            <div className="impact-header">
              <h3 className="flex-center gap-2 font-bold mb-0">
                <User size={18} /> Impact on You (Personalized Engine)
              </h3>
              <span className="impact-badge medium">Medium Impact</span>
            </div>
            <div className="impact-content">
              <h4 className="font-bold text-sm mb-1">Key Effects on Portfolio (Tech & Auto)</h4>
              <p className="text-secondary mb-3 text-sm">Given your heavy investment in tech stocks, this budget is highly favorable. However, your FMCG holdings might see short-term stagnation due to unaltered consumer duties.</p>
              
              <h4 className="font-bold text-sm mb-1">Suggested Actions</h4>
              <ul className="action-list">
                <li><ArrowRight size={14} className="red" /> Re-evaluate short-term bonds and shift 5% towards semiconductor ETFs.</li>
                <li><ArrowRight size={14} className="red" /> Set up alerts for mid-cap green energy firms.</li>
              </ul>
              
              <Link to="/tracker" className="btn-outline text-sm mt-3 flex-center" style={{display: 'inline-flex'}}>
                Track full story evolution <ArrowRight size={14} className="ml-1"/>
              </Link>
            </div>
          </section>
          
        </div>

        <aside className="article-sidebar">
          
          {/* AI Chat Interaction Box */}
          <div className="ai-chat-box card mb-6" style={{height: '500px'}}>
            <div className="chat-header">
              <Sparkles className="red" size={16} /> 
              <span className="font-bold">Ask AI Synthesis Engine</span>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-message ${msg.isUser ? 'user' : 'ai'}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="chat-message ai flex-center gap-2">
                  <Loader className="animate-spin text-red" size={14} /> Agent Synthesizing...
                </div>
              )}
            </div>
            
            <form className="chat-input-area" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Ask about this news..." 
                className="chat-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" className="chat-send-btn" disabled={!chatInput.trim() || isTyping}>
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Sector Impact Visualization */}
          <div className="sector-impact card">
            <h3 className="section-title-small mb-3">Sector Impact</h3>
            <div className="sector-bar">
              <div className="sector-info">
                <span className="sector-name">Technology</span>
                <span className="sector-trend success"><MoveUpRight size={14}/> Positive</span>
              </div>
              <div className="progress-bg"><div className="progress-fill success" style={{width: '85%'}}></div></div>
            </div>
            <div className="sector-bar">
              <div className="sector-info">
                <span className="sector-name">Infrastructure</span>
                <span className="sector-trend success"><MoveUpRight size={14}/> Positive</span>
              </div>
              <div className="progress-bg"><div className="progress-fill success" style={{width: '70%'}}></div></div>
            </div>
            <div className="sector-bar">
              <div className="sector-info">
                <span className="sector-name">FMCG</span>
                <span className="sector-trend danger"><ArrowDownRight size={14}/> Negative</span>
              </div>
              <div className="progress-bg"><div className="progress-fill danger" style={{width: '30%'}}></div></div>
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}
