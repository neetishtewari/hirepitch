/* eslint-disable no-unused-vars, react-hooks/set-state-in-effect, react-hooks/purity */
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Send, Sparkles, User, HelpCircle, Check, Award, AlertCircle, MessageSquare, Volume2, Briefcase, ChevronRight, TrendingUp, Users, Calendar, Clock, ClipboardList } from 'lucide-react';
import { aiService } from '../utils/aiService';

export default function ClientPortal({ candidates, onBack, apiKey, initialCandidate, clientFilter, isClientSession }) {
  const [viewMode, setViewMode] = useState(initialCandidate ? 'detail' : 'overview');
  const [selectedCandidate, setSelectedCandidate] = useState(initialCandidate || null);
  const [activeAudio, setActiveAudio] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const audioIntervalRef = useRef(null);

  // Sync initialCandidate changes from recruiter preview clicks
  useEffect(() => {
    if (initialCandidate) {
      setSelectedCandidate(initialCandidate);
      setViewMode('detail');
      setMessages([
        {
          id: "initial",
          sender: "ai",
          text: `Hello! I am your PitchHire AI assistant. I have reviewed ${initialCandidate.name}'s profile and pre-screening transcripts for the **${initialCandidate.jobMatch.title}** role. Ask me anything about their technical depth, soft skills, or experience.`
        }
      ]);
    } else {
      setSelectedCandidate(null);
      setViewMode('overview');
    }
  }, [initialCandidate]);

  // Filter candidates based on client parameter (Stripe, Linear, etc.)
  const filteredCandidates = clientFilter
    ? candidates.filter(c => c.jobMatch.company.toLowerCase() === clientFilter.toLowerCase())
    : candidates;

  // Group candidates by position
  const positions = {};
  filteredCandidates.forEach(c => {
    const key = `${c.jobMatch.title} at ${c.jobMatch.company}`;
    if (!positions[key]) {
      positions[key] = {
        title: c.jobMatch.title,
        company: c.jobMatch.company,
        count: 0,
        candidates: [],
        avgScore: 0,
      };
    }
    positions[key].candidates.push(c);
    positions[key].count += 1;
    positions[key].avgScore += c.jobMatch.matchScore;
  });
  
  Object.keys(positions).forEach(key => {
    positions[key].avgScore = Math.round(positions[key].avgScore / positions[key].count);
  });
  
  const positionList = Object.values(positions);

  // Kanban status columns definition
  const columns = [
    { id: 'Screening', title: 'Pre-Screening', color: 'var(--color-secondary)' },
    { id: 'Submitted', title: 'Submitted to Client', color: 'var(--color-primary)' },
    { id: 'Interviewing', title: 'Client Interview Loop', color: 'var(--color-success)' },
    { id: 'Offer', title: 'Offer Extended', color: 'var(--color-warning)' }
  ];

  // Map candidates to status buckets
  const getCandidatesByColumn = (colId) => {
    return filteredCandidates.filter(c => c.status === colId);
  };

  // Mock recruiter activity log items
  const activityLogs = [
    {
      id: 1,
      time: "2 hours ago",
      text: "Sarah Jenkins completed technical profile analysis. Match rating confirmed: 94%.",
      candidate: "Sarah Jenkins"
    },
    {
      id: 2,
      time: "Yesterday",
      text: "Marcus Chen submitted to 'Lead AI Platform Engineer' loop at Linear.",
      candidate: "Marcus Chen"
    },
    {
      id: 3,
      time: "2 days ago",
      text: "Hiring Manager scheduled pre-screen review feedback call for Stripe frontend roles.",
      candidate: "General Update"
    }
  ];

  // Filter recruiter logs to match the selected client candidates only
  const filteredActivityLogs = activityLogs.filter(log => {
    if (log.candidate === "General Update") return true;
    return filteredCandidates.some(c => c.name === log.candidate);
  });

  // Auto-scroll chat in detailed view
  useEffect(() => {
    if (viewMode === 'detail') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, viewMode]);

  const openCandidateDetail = (candidate) => {
    setSelectedCandidate(candidate);
    setViewMode('detail');
    setMessages([
      {
        id: "initial",
        sender: "ai",
        text: `Hello! I am your PitchHire AI assistant. I have reviewed ${candidate.name}'s profile and pre-screening transcripts for the **${candidate.jobMatch.title}** role. Ask me anything about their technical depth, soft skills, or experience.`
      }
    ]);
  };

  // Audio simulation
  const handlePlayAudio = (clip) => {
    if (activeAudio?.id === clip.id) {
      clearInterval(audioIntervalRef.current);
      setActiveAudio(null);
      setAudioProgress(0);
    } else {
      clearInterval(audioIntervalRef.current);
      setActiveAudio(clip);
      setAudioProgress(0);
      let progress = 0;
      audioIntervalRef.current = setInterval(() => {
        progress += 5;
        if (progress > 100) {
          clearInterval(audioIntervalRef.current);
          setActiveAudio(null);
          setAudioProgress(0);
        } else {
          setAudioProgress(progress);
        }
      }, 300);
    }
  };

  const handleSendMessage = async (e, customText = null) => {
    if (e) e.preventDefault();
    const query = customText || inputText;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await aiService.askQuestion(
        selectedCandidate.id, 
        query, 
        messages, 
        apiKey
      );

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Sorry, I ran into an issue finding that detail. Please try another question."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = [
    "What is their experience with performance?",
    "Tell me about their design system work.",
    "Why are they leaving their current role?",
    "What are their main areas to probe in interviews?"
  ];

  // ----------------------------------------------------
  // RENDER 1: Top-Level Client Dashboard Overview
  // ----------------------------------------------------
  if (viewMode === 'overview') {
    return (
      <div className="client-portal animate-fade-in" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Header navigation bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {!isClientSession && (
              <>
                <button className="btn btn-secondary" onClick={onBack} style={{ padding: '8px 12px' }}>
                  <ArrowLeft size={16} />
                  Return Recruiter Panel
                </button>
                <div style={{ width: '1px', height: '24px', background: 'var(--border-light)' }}></div>
              </>
            )}
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Active Workspace</span>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontWeight: '700' }}>
                {clientFilter ? `${clientFilter.toUpperCase()} Dashboard Overview` : 'Executive Dashboard Overview'}
              </h2>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Updated: <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>Just now</span>
          </div>
        </div>

        {/* Global summary statistics cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px', background: '#fff', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '10px', color: 'var(--color-primary)' }}>
              <Briefcase size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>ACTIVE MANDATES</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{positionList.length}</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#fff', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(13, 148, 136, 0.05)', borderRadius: '10px', color: 'var(--color-secondary)' }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>ACTIVE POOL</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{filteredCandidates.length} Presented</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#fff', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '10px', color: 'var(--color-success)' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>AVG ALIGNMENT</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {filteredCandidates.length > 0 ? Math.round(filteredCandidates.reduce((sum, c) => sum + c.jobMatch.matchScore, 0) / filteredCandidates.length) : 0}%
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#fff', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '10px', color: 'var(--color-warning)' }}>
              <Clock size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>RESPONSE INDEX</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>Strong</div>
            </div>
          </div>
        </div>

        {/* Mid layout section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>
          
          {/* Active Positions grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: '700' }}>Active Open Roles</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {positionList.map((pos, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '24px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '700' }}>{pos.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{pos.company} mandate</p>
                    </div>
                    <span className="badge badge-info" style={{ textTransform: 'none' }}>Active Search</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '24px', background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: 'var(--border-radius-md)' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CANDIDATES</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>{pos.count} submitted</div>
                    </div>
                    <div style={{ width: '1px', background: 'var(--border-light)' }}></div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AVG MATCH</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-primary)' }}>{pos.avgScore}%</div>
                    </div>
                  </div>
                </div>
              ))}
              {positionList.length === 0 && (
                <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px', background: '#fff', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-light)', color: 'var(--text-dark)' }}>
                  No active openings configured for this workspace.
                </div>
              )}
            </div>
          </div>

          {/* Recruiter Activity update list */}
          <div className="glass-panel" style={{ padding: '24px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList size={18} color="var(--color-primary)" />
              Timeline Logs
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredActivityLogs.map(log => (
                <div key={log.id} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dark)', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600' }}>{log.candidate}</span>
                    <span>{log.time}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.4' }}>{log.text}</p>
                </div>
              ))}
              {filteredActivityLogs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-dark)', fontSize: '0.85rem' }}>
                  No recent activities recorded.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pipeline Stage columns */}
        <div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: '700', marginBottom: '20px' }}>Candidates Pipeline</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', alignItems: 'start' }}>
            {columns.map(col => {
              const colCandidates = getCandidatesByColumn(col.id);
              return (
                <div key={col.id} className="glass-panel" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border-light)', borderRadius: 'var(--border-radius-lg)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '300px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid ' + col.color, paddingBottom: '8px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '700' }}>{col.title}</h4>
                    <span className="badge" style={{ background: 'rgba(0,0,0,0.03)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>
                      {colCandidates.length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {colCandidates.map(c => (
                      <div 
                        key={c.id} 
                        onClick={() => openCandidateDetail(c)}
                        className="glass-panel" 
                        style={{ 
                          padding: '16px', 
                          background: '#fff', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '12px',
                          border: '1px solid var(--border-light)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {c.avatar ? (
                            <img src={c.avatar} alt={c.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
                              {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)' }}>{c.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.role}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {c.skills.slice(0, 3).map(skill => (
                            <span key={skill} style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'var(--bg-primary)', color: 'var(--text-muted)', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px', fontSize: '0.75rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Fit rating:</span>
                          <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{c.jobMatch.matchScore}%</span>
                        </div>
                      </div>
                    ))}
                    
                    {colCandidates.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '32px 0', fontSize: '0.8rem', color: 'var(--text-dark)', border: '1px dashed var(--border-light)', borderRadius: 'var(--border-radius-md)' }}>
                        No candidates in status
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER 2: Single Candidate Detail View with Q&A Chat
  // ----------------------------------------------------
  return (
    <div className="client-portal animate-fade-in" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Detail view header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="btn btn-secondary" onClick={() => setViewMode('overview')} style={{ padding: '8px 12px' }}>
          <ArrowLeft size={16} />
          Back to Overview
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Presented by</span>
          <span style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '0.9rem' }}>PitchHire AI Portal</span>
        </div>
      </div>

      {/* Candidate Hero Card */}
      <div className="glass-panel" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {selectedCandidate.avatar ? (
            <img 
              src={selectedCandidate.avatar} 
              alt={selectedCandidate.name} 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                border: '3px solid var(--border-light)', 
                objectFit: 'cover',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }} 
            />
          ) : (
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'rgba(79, 70, 229, 0.08)', 
              color: 'var(--color-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: '700', 
              fontSize: '1.8rem', 
              border: '3px solid var(--border-light)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <h1 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-main)' }}>{selectedCandidate.name}</h1>
              <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>{selectedCandidate.status}</span>
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '600' }}>{selectedCandidate.role}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {selectedCandidate.currentCompany} • {selectedCandidate.experience} Exp • {selectedCandidate.location}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Fit Match</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-primary)', display: 'flex', alignItems: 'baseline', gap: '2px', lineHeight: 1 }}>
              {selectedCandidate.jobMatch.matchScore}
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>%</span>
            </div>
          </div>
          <div style={{ width: '1px', height: '48px', background: 'var(--border-light)' }}></div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Target Alignment</div>
            <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.05rem' }}>{selectedCandidate.jobMatch.title}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>at {selectedCandidate.jobMatch.company}</div>
          </div>
        </div>
      </div>

      {/* Detail main layout columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="glass-panel" style={{ padding: '28px', background: '#fff' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontSize: '1.15rem', color: 'var(--text-main)' }}>
              <Award size={18} color="var(--color-primary)" />
              Executive Match Alignment
            </h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{selectedCandidate.jobMatch.rationale}</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
              {selectedCandidate.skills.map(s => (
                <span key={s} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '4px solid #16a34a' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#16a34a', fontSize: '1rem', fontWeight: '700' }}>
                Key Strengths
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '18px', fontSize: '0.875rem', color: '#14532d', lineHeight: '1.4' }}>
                {selectedCandidate.jobMatch.strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '24px', background: '#fff8e6', border: '1px solid #fee2e2', borderLeft: '4px solid #d97706' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#d97706', fontSize: '1rem', fontWeight: '700' }}>
                Points to Probe
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '18px', fontSize: '0.875rem', color: '#78350f', lineHeight: '1.4' }}>
                {selectedCandidate.jobMatch.gaps.map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            </div>
          </div>

          {selectedCandidate.audioHighlights && selectedCandidate.audioHighlights.length > 0 && (
            <div className="glass-panel" style={{ padding: '28px', background: '#fff' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', fontSize: '1.15rem', color: 'var(--text-main)' }}>
                <Volume2 size={18} color="var(--color-primary)" />
                Candidate Pre-Screen Audio Excerpts
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedCandidate.audioHighlights.map((clip) => {
                  const isPlaying = activeAudio?.id === clip.id;
                  return (
                    <div key={clip.id} style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                        <button 
                          onClick={() => handlePlayAudio(clip)} 
                          className="btn" 
                          style={{ 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '50%', 
                            padding: 0,
                            background: isPlaying ? 'var(--color-primary)' : 'var(--bg-secondary)',
                            color: isPlaying ? '#white' : 'var(--text-muted)',
                            border: '1px solid var(--border-light)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                          }}
                        >
                          {isPlaying ? <Pause size={14} color="#fff" /> : <Play size={14} style={{ marginLeft: '2px' }} color="var(--color-primary)" />}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{clip.topic}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Excerpt Duration: {clip.duration}</div>
                        </div>
                      </div>
                      
                      {isPlaying && (
                        <div style={{ background: '#e2e8f0', height: '4px', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px' }}>
                          <div style={{ background: 'var(--color-primary)', width: `${audioProgress}%`, height: '100%', transition: 'width 0.3s' }}></div>
                        </div>
                      )}

                      <div style={{ background: '#fff', padding: '12px', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', borderLeft: '3px solid var(--border-light)', border: '1px solid var(--border-light)' }}>
                        "{clip.transcript}"
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Q&A Panel */}
        <div className="glass-panel" style={{ height: '620px', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>
          
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={16} color="var(--color-primary)" />
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '700' }}>AI Recruiter Q&A</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ask questions regarding credentials, screening, and competencies.</p>
            </div>
          </div>

          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px', background: 'var(--bg-primary)' }}>
            {messages.map((m) => (
              <div 
                key={m.id} 
                style={{ 
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', fontWeight: '500' }}>
                  {m.sender === 'user' ? 'You' : 'PitchHire Recruiter AI'}
                </div>
                <div 
                  style={{
                    background: m.sender === 'user' ? 'var(--color-primary)' : '#ffffff',
                    color: m.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    borderTopRightRadius: m.sender === 'user' ? '2px' : '12px',
                    borderTopLeftRadius: m.sender === 'user' ? '12px' : '2px',
                    border: m.sender === 'user' ? '1px solid transparent' : '1px solid var(--border-light)',
                    fontSize: '0.875rem',
                    lineHeight: '1.4',
                    boxShadow: m.sender === 'user' ? '0 1px 3px rgba(79, 70, 229, 0.15)' : '0 1px 2px rgba(0,0,0,0.02)'
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '4px', padding: '10px 14px', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <span className="dot" style={{ width: '5px', height: '5px', background: 'var(--text-dark)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out' }}></span>
                <span className="dot" style={{ width: '5px', height: '5px', background: 'var(--text-dark)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out 0.2s', animationDelay: '0.2s' }}></span>
                <span className="dot" style={{ width: '5px', height: '5px', background: 'var(--text-dark)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out 0.4s', animationDelay: '0.4s' }}></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div style={{ padding: '12px 20px', background: '#fff', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>Suggested Questions:</div>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', whiteSpace: 'nowrap' }} className="scrollbar-hidden">
              {suggestedQuestions.map((q) => (
                <button 
                  key={q} 
                  onClick={() => handleSendMessage(null, q)}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '12px',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                  className="suggested-chip"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '10px', background: '#fff' }}>
            <input 
              type="text" 
              className="form-input" 
              style={{ flex: 1, borderRadius: '20px', padding: '8px 16px', fontSize: '0.85rem' }} 
              placeholder="Ask a question about the candidate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '36px', height: '36px', borderRadius: '50%', padding: 0 }}
              disabled={isTyping}
            >
              <Send size={14} color="#fff" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
