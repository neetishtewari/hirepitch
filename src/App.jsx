/* eslint-disable no-unused-vars, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import RecruiterDashboard from './components/RecruiterDashboard';
import ClientPortal from './components/ClientPortal';
import LandingPage from './components/LandingPage';
import { aiService } from './utils/aiService';
import { Briefcase, Eye, ShieldCheck, Home, ArrowLeft } from 'lucide-react';
import logoImg from './assets/logo.png';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'recruiter' | 'client'
  const [clientFilter, setClientFilter] = useState(null);
  const [isClientSession, setIsClientSession] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('pitchhire_gemini_key') || localStorage.getItem('hirepitch_gemini_key') || '';
  });

  const [activeSection, setActiveSection] = useState('');

  // Load initial candidates and detect client query parameters
  useEffect(() => {
    setCandidates(aiService.getCandidates());
    
    const params = new URLSearchParams(window.location.search);
    const clientParam = params.get('client');
    if (clientParam) {
      setClientFilter(clientParam);
      setIsClientSession(true);
      setViewMode('client');
    }
  }, []);

  const isLanding = viewMode === 'landing';

  // Scroll spy for landing sections
  useEffect(() => {
    if (!isLanding) return;
    
    const handleScroll = () => {
      const sections = ['services', 'industries', 'process', 'about', 'contact'];
      const scrollPosition = window.scrollY + 120; // header height offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLanding]);

  // Save API key
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('pitchhire_gemini_key', key);
  };

  const handleAddCandidate = (candidate) => {
    setCandidates(prev => [candidate, ...prev]);
  };

  const handleUpdateCandidate = (candidateId, updates) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, ...updates } : c));
  };

  const handleOpenLanding = () => {
    if (isClientSession) return;
    setViewMode('landing');
    setSelectedCandidate(null);
  };

  const handleOpenRecruiter = () => {
    if (isClientSession) return; // Prevent client access
    setViewMode('recruiter');
    setSelectedCandidate(null);
  };

  const handleOpenClientOverview = () => {
    setSelectedCandidate(null);
    setViewMode('client');
  };

  const handleOpenCandidateClientView = (candidate) => {
    setSelectedCandidate(candidate);
    setViewMode('client');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: isLanding ? '#0c0d10' : 'var(--bg-primary)' }}>
      
      {/* Premium Sticky Header */}
      <header className="glass-panel" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderRadius: 0,
        borderWidth: '0 0 1px 0',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isLanding ? 'rgba(12, 13, 16, 0.92)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: isLanding ? 'rgba(255, 255, 255, 0.06)' : 'var(--border-light)',
        boxShadow: isLanding ? '0 4px 30px rgba(0, 0, 0, 0.4)' : '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        transition: 'var(--transition-smooth)'
      }}>
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: isClientSession ? 'default' : 'pointer' }} 
          onClick={handleOpenLanding}
        >
          {isLanding ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                fontSize: '1.5rem',
                letterSpacing: '0.02em',
                color: '#e9c37a' // High-contrast premium gold
              }}>
                Pitch
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: '800',
                fontSize: '1.4rem',
                letterSpacing: '-0.02em',
                color: '#ffffff'
              }}>
                Hire
              </span>
            </div>
          ) : (
            <>
              <img 
                src={logoImg} 
                alt="PitchHire Logo" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 6px rgba(79, 70, 229, 0.1)'
                }} 
              />
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: '700',
                letterSpacing: '-0.025em',
                color: 'var(--text-main)'
              }}>
                PitchHire
              </span>
            </>
          )}
        </div>

        {/* Middle Navigation Menu - Landing Only */}
        {isLanding && (
          <div className="hide-mobile" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a href="#services" className={`landing-nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</a>
            <a href="#industries" className={`landing-nav-link ${activeSection === 'industries' ? 'active' : ''}`}>Industries</a>
            <a href="#process" className={`landing-nav-link ${activeSection === 'process' ? 'active' : ''}`}>Our Process</a>
            <a href="#about" className={`landing-nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a>
            <a href="#contact" className={`landing-nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </div>
        )}

        {/* Global Nav Toggles - Hidden/Modified in Secure Client Sessions */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isLanding ? (
            <>
              <a 
                href="https://app.pitchhire.in" 
                className="landing-nav-link" 
                style={{ fontSize: '0.75rem', padding: '6px 14px', border: 'none' }}
              >
                Login
              </a>
              <a 
                href="#contact" 
                className="landing-header-btn"
              >
                Get in Touch
              </a>
            </>
          ) : isClientSession ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--border-radius-md)', color: '#065f46', fontSize: '0.85rem', fontWeight: '600' }}>
              <ShieldCheck size={16} />
              Secure Portal: {clientFilter.toUpperCase()}
            </div>
          ) : (
            <>
              {viewMode !== 'landing' && (
                <button 
                  className="btn btn-secondary"
                  onClick={handleOpenLanding}
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                >
                  <Home size={15} />
                  Home Site
                </button>
              )}

              <button 
                className={`btn ${viewMode === 'recruiter' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={handleOpenRecruiter}
                style={{ 
                  padding: '8px 14px', 
                  fontSize: '0.85rem',
                  background: viewMode === 'recruiter' ? '#4f46e5' : 'var(--bg-secondary)',
                  color: viewMode === 'recruiter' ? '#fff' : 'var(--text-muted)',
                  borderColor: viewMode === 'recruiter' ? 'transparent' : 'var(--border-light)'
                }}
              >
                <Briefcase size={15} />
                Recruiter Panel
              </button>
              
              {candidates.length > 0 && (
                <button 
                  className={`btn ${viewMode === 'client' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={handleOpenClientOverview}
                  style={{ 
                    padding: '8px 14px', 
                    fontSize: '0.85rem',
                    background: viewMode === 'client' ? '#0d9488' : 'var(--bg-secondary)',
                    color: viewMode === 'client' ? '#fff' : 'var(--text-muted)',
                    borderColor: viewMode === 'client' ? 'transparent' : 'var(--border-light)'
                  }}
                >
                  <Eye size={15} />
                  Client Portal
                </button>
              )}
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {viewMode === 'landing' ? (
          <LandingPage />
        ) : viewMode === 'client' ? (
          <ClientPortal 
            candidates={candidates} 
            onBack={handleOpenRecruiter}
            apiKey={apiKey}
            initialCandidate={selectedCandidate}
            clientFilter={clientFilter}
            isClientSession={isClientSession}
          />
        ) : (
          <RecruiterDashboard 
            candidates={candidates}
            onSelectCandidate={handleOpenCandidateClientView}
            onAddCandidate={handleAddCandidate}
            onUpdateCandidate={handleUpdateCandidate}
            apiKey={apiKey}
            onSaveApiKey={handleSaveApiKey}
          />
        )}
      </main>

      {/* Mini Footer - Visible on App Views, Landing Page has its own full footer */}
      {viewMode !== 'landing' && (
        <footer style={{
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          borderTop: '1px solid var(--border-light)',
          background: '#fff'
        }}>
          © 2026 PitchHire. Elevating startup sourcing with high-leverage artificial intelligence. (Registered: pitchhire.in)
        </footer>
      )}
    </div>
  );
}
