import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader } from 'lucide-react';
import { SynthesisAgent } from '../agents/SynthesisAgent';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! I'm your ET InsightX assistant. How can I help you understand today's news?", isUser: false }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await SynthesisAgent.chat(input, "Global Context");
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, isUser: false }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm having trouble connecting to the brain right now. Please try again.", isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="floating-chat-container" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window shadow-2xl animate-fade-in" style={{ width: '380px', height: '500px', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--card-bg)', borderRadius: '0px', border: '2px solid var(--text-primary)', marginBottom: '20px' }}>
          <div className="chat-header p-3 flex justify-between items-center" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} className="red" />
              <span className="font-bold tracking-tight uppercase text-xs">ET Intelligence Protocol</span>
            </div>
            <X size={20} className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          
          <div className="chat-messages p-3" style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.isUser ? 'user' : 'ai'}`} style={{ 
                alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                background: msg.isUser ? 'var(--bg-secondary)' : 'rgba(217, 26, 26, 0.05)',
                color: 'var(--text-primary)',
                padding: '12px',
                borderRadius: '0px',
                maxWidth: '90%',
                fontSize: '13px',
                border: msg.isUser ? '1px solid var(--card-border)' : '1px solid var(--accent-red)'
              }}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="text-secondary text-xs flex items-center gap-1" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <Loader size={12} className="animate-spin red" /> SYNTESIZING RESPONSE...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="chat-input p-3 border-t" style={{ padding: '15px', borderTop: '2px solid var(--card-border)', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Query the news brain..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, border: '1px solid var(--card-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: '0px', padding: '10px 15px', outline: 'none', fontSize: '13px' }}
            />
            <button type="submit" style={{ background: 'var(--accent-red)', color: 'white', border: 'none', borderRadius: '0px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="floating-btn shadow-xl"
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '0px', 
          background: 'var(--accent-red)', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 16px rgba(217, 26, 26, 0.3)'
        }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
      
      {!isOpen && (
        <div className="chat-tooltip animate-fade-in" style={{ position: 'absolute', right: '70px', bottom: '15px', background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '8px 15px', borderRadius: '0px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', whiteSpace: 'nowrap', borderLeft: '4px solid var(--accent-red)', fontSize: '12px', fontWeight: 'bold' }}>
          INTEL READY: QUERY NOW
        </div>
      )}
    </div>
  );
}
