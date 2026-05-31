/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Upload, Key, ArrowRight, User, Settings, Database, Sparkles, CheckCircle2, XCircle, ShieldAlert, Archive, Check, FileText, Mail, RefreshCw, Layers } from 'lucide-react';
import { aiService } from '../utils/aiService';

export default function RecruiterDashboard({ 
  candidates, 
  onSelectCandidate, 
  onAddCandidate, 
  onUpdateCandidate,
  apiKey, 
  onSaveApiKey 
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Tab state: 'active' or 'screening'
  const [activeTab, setActiveTab] = useState('active');

  // Copy Link State
  const [copiedClient, setCopiedClient] = useState(null);

  // Bulk Processing Queue State
  const [bulkQueue, setBulkQueue] = useState([]);
  const [showQueueModal, setShowQueueModal] = useState(false);

  // Email Router Simulator State
  const [emailLogs, setEmailLogs] = useState([
    {
      id: 1,
      sender: "rohan.malhotra@gmail.com",
      subject: "Applying for MLOps Lead Position",
      date: "3 hours ago",
      status: "Processed",
      log: "Detected Target: Linear (Lead AI Platform Engineer). Score: 89%. Auto-Advanced."
    }
  ]);
  const [isSimulatingEmail, setIsSimulatingEmail] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onSaveApiKey(tempKey);
    setShowSettings(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle Multi-file Drop (Bulk Processing)
  const processBulkFiles = async (files) => {
    setBulkQueue([]);
    setShowQueueModal(true);
    
    const fileList = Array.from(files);
    const initialQueue = fileList.map((file, idx) => ({
      id: idx,
      name: file.name,
      status: 'Parsing CV...',
      progress: 20,
      candidateName: file.name.split('.')[0].replace(/_/g, ' '),
      score: null,
      outcome: null
    }));
    
    setBulkQueue(initialQueue);

    for (let i = 0; i < fileList.length; i++) {
      const fileItem = fileList[i];
      
      // Step 1: Parsing
      setBulkQueue(prev => prev.map(item => item.id === i ? { ...item, status: 'Matching against active jobs...', progress: 50 } : item));
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: Scoring & Outcomes
      const mockScore = Math.floor(Math.random() * 45) + 50; // 50 to 95%
      const outcome = mockScore >= 80 ? 'Auto-Advanced' : 'Auto-Archived';
      const targetJob = mockScore >= 85 ? 'Principal Frontend Architect' : 'Lead AI Platform Engineer';
      const targetCompany = mockScore >= 85 ? 'Stripe' : 'Linear';
      
      setBulkQueue(prev => prev.map(item => item.id === i ? { 
        ...item, 
        status: `Completed: Routed to ${targetCompany} (${mockScore}%)`, 
        progress: 100,
        score: mockScore,
        outcome: outcome
      } : item));

      // Inject to parent candidates array
      const newCandidate = {
        id: `bulk-${Date.now()}-${i}`,
        name: initialQueue[i].candidateName,
        role: targetJob,
        currentCompany: "Bulk Upload Queue",
        experience: "6+ years",
        location: "Hybrid / Remote",
        status: outcome === 'Auto-Advanced' ? 'Submitted' : 'Screening',
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*1000000)}?auto=format&fit=crop&q=80&w=150`,
        skills: ["React", "Go", "Kubernetes", "System Design"],
        screeningOutcome: outcome,
        screeningReason: outcome === 'Auto-Advanced' 
          ? `Auto-advanced. Strong qualifications matched ${mockScore}% job criteria.`
          : `Auto-archived. Score of ${mockScore}% falls below the executive 80% criteria.`,
        isArchived: outcome === 'Auto-Archived',
        jobMatch: {
          title: targetJob,
          company: targetCompany,
          matchScore: mockScore,
          rationale: `Profile mapped via automated bulk upload analysis against ${targetCompany} mandates.`,
          strengths: ["Strong backend capabilities", "Scalable service architectures"],
          gaps: ["No specialized frontend design systems experience"]
        },
        audioHighlights: [],
        qnaDatabase: []
      };

      onAddCandidate(newCandidate);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processBulkFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processBulkFiles(e.target.files);
    }
  };

  // Simulate an incoming email application
  const handleSimulateEmail = async () => {
    if (isSimulatingEmail) return;
    setIsSimulatingEmail(true);

    const emailPool = [
      {
        sender: "aditi.rao@gmail.com",
        subject: "Application for Principal Frontend Architect - Aditi Rao",
        body: "Hello HirePitch team, I am applying for the Frontend Architect role at Stripe. Please find my CV attached. I specialize in Next.js, design systems, and web vitals performance optimization. I prefer hybrid work in SF.",
        candidateName: "Aditi Rao",
        targetJob: "Principal Frontend Architect",
        targetCompany: "Stripe",
        score: 88,
        skills: ["React/Next.js", "TypeScript", "Web Performance", "Design Systems"],
        reason: "Auto-advanced. Candidate has 5+ years Next.js experience matching 88% of Stripe's architecture requirements."
      },
      {
        sender: "deepak.verma@outlook.com",
        subject: "applying for Java developer position",
        body: "Hey, applying for the open developer position. I have 10 years experience writing Spring Boot microservices for databases in Oracle. Hope to hear back.",
        candidateName: "Deepak Verma",
        targetJob: "Principal Frontend Architect",
        targetCompany: "Stripe",
        score: 45,
        skills: ["Java", "Spring Boot", "SQL"],
        reason: "Auto-archived. Stripe Principal Frontend mandate requires deep Javascript foundations; candidate portfolio is exclusively legacy Java backend."
      }
    ];

    // Pick a random email from pool
    const selectedEmail = emailPool[Math.floor(Math.random() * emailPool.length)];

    // Simulate logs delays
    await new Promise(resolve => setTimeout(resolve, 1500));

    const outcome = selectedEmail.score >= 80 ? "Auto-Advanced" : "Auto-Archived";

    const newLog = {
      id: Date.now(),
      sender: selectedEmail.sender,
      subject: selectedEmail.subject,
      date: "Just now",
      status: "Processed",
      log: `Detected Target: ${selectedEmail.targetCompany} (${selectedEmail.targetJob}). Score: ${selectedEmail.score}%. Routing: ${outcome}.`
    };

    setEmailLogs(prev => [newLog, ...prev]);

    // Add candidate to global state
    const newCandidate = {
      id: `email-${Date.now()}`,
      name: selectedEmail.candidateName,
      role: selectedEmail.targetJob,
      currentCompany: "Email Application",
      experience: "5+ years",
      location: "San Francisco / Remote",
      status: outcome === 'Auto-Advanced' ? 'Submitted' : 'Screening',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*1000000)}?auto=format&fit=crop&q=80&w=150`,
      skills: selectedEmail.skills,
      screeningOutcome: outcome,
      screeningReason: selectedEmail.reason,
      isArchived: outcome === 'Auto-Archived',
      jobMatch: {
        title: selectedEmail.targetJob,
        company: selectedEmail.targetCompany,
        matchScore: selectedEmail.score,
        rationale: `Profile automatically parsed and matched via email router from inbox stream.`,
        strengths: ["Strong domain foundations matching JD", "Relevant framework tool experience"],
        gaps: ["No audio prescreen logs recorded yet"]
      },
      audioHighlights: [],
      qnaDatabase: []
    };

    onAddCandidate(newCandidate);
    setIsSimulatingEmail(false);

    // Switch tab to show candidate
    if (newCandidate.isArchived) {
      setActiveTab('screening');
    } else {
      setActiveTab('active');
    }
  };

  const handleCopyLink = (client) => {
    const origin = window.location.origin;
    const url = `${origin}/?client=${client.toLowerCase()}`;
    navigator.clipboard.writeText(url);
    setCopiedClient(client);
    setTimeout(() => setCopiedClient(null), 2000);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!name || !role) return;
    
    setIsGenerating(true);
    
    const pitchData = await aiService.generatePitch(name, resume, jobDesc, apiKey);
    
    const newCandidate = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      role,
      currentCompany: "Applicant Workspace",
      experience: "6+ years",
      location: "Hybrid / Remote",
      status: pitchData.screeningOutcome === 'Auto-Advanced' ? 'Submitted' : 'Screening',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*1000000)}?auto=format&fit=crop&q=80&w=150`,
      skills: ["React", "JavaScript", "Typescript", "CSS"],
      screeningOutcome: pitchData.screeningOutcome,
      screeningReason: pitchData.screeningReason,
      isArchived: pitchData.screeningOutcome === 'Auto-Archived',
      jobMatch: {
        title: role,
        company: "Target Client",
        matchScore: pitchData.matchScore,
        rationale: pitchData.rationale,
        strengths: pitchData.strengths,
        gaps: pitchData.gaps
      },
      audioHighlights: [
        {
          id: `clip-${Date.now()}`,
          topic: "Core Architectures",
          duration: "1:20",
          transcript: "I design scalable layouts using component modules and system design guidelines.",
          audioUrl: "mock-audio-new"
        }
      ],
      qnaDatabase: [
        {
          keywords: ["design", "architecture"],
          answer: "The candidate designs layouts utilizing component systems and design libraries."
        }
      ]
    };
    
    onAddCandidate(newCandidate);
    
    if (newCandidate.isArchived) {
      setActiveTab('screening');
    } else {
      setActiveTab('active');
    }

    setName('');
    setRole('');
    setResume('');
    setJobDesc('');
    setIsGenerating(false);
  };

  const activeCandidates = candidates.filter(c => !c.isArchived);
  const screeningCandidates = candidates;
  const uniqueClients = [...new Set(candidates.map(c => c.jobMatch.company))];

  return (
    <div className="recruiter-container animate-fade-in" style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', minHeight: 'calc(100vh - 80px)' }}>
      {/* Left Workspace Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Banner Area */}
        <div className="glass-panel" style={{ padding: '32px', background: 'linear-gradient(135deg, #ffffff, #f8fafc)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '700' }}>
              Recruiter Control panel
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>AI-automated screening logs, bulk uploads, and email parsers.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => setShowSettings(true)}>
              <Settings size={16} />
              API Settings
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', background: 'rgba(0,0,0,0.02)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-light)' }}>
              {apiKey ? (
                <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> Live API
                </span>
              ) : (
                <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Database size={12} /> Mock Mode
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pipeline Tab Headers */}
        <div className="glass-panel" style={{ padding: '24px', background: '#fff' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', marginBottom: '24px', gap: '20px' }}>
            <button 
              onClick={() => setActiveTab('active')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'active' ? '3px solid var(--color-primary)' : '3px solid transparent',
                color: activeTab === 'active' ? 'var(--color-primary)' : 'var(--text-muted)',
                padding: '10px 4px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              Active Pipeline ({activeCandidates.length})
            </button>
            <button 
              onClick={() => setActiveTab('screening')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'screening' ? '3px solid var(--color-primary)' : '3px solid transparent',
                color: activeTab === 'screening' ? 'var(--color-primary)' : 'var(--text-muted)',
                padding: '10px 4px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              AI Screening Queue ({screeningCandidates.length})
            </button>
          </div>

          {/* TAB 1: Active Pipeline Profiles */}
          {activeTab === 'active' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Candidate Name</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Target Match</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Match Score</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Screening outcome</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCandidates.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'var(--transition-smooth)' }} className="pipeline-row">
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {c.avatar ? (
                            <img src={c.avatar} alt={c.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-light)' }} />
                          ) : (
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
                              {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{c.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.role} at {c.currentCompany}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '0.85rem' }}>{c.jobMatch.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>at {c.jobMatch.company}</div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span className="badge badge-info" style={{ fontWeight: '700', fontSize: '0.8rem' }}>
                          {c.jobMatch.matchScore}%
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'none' }}>
                          <Check size={12} /> Auto-Advanced
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button className="btn btn-secondary" onClick={() => onSelectCandidate(c)} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                            View Portal
                            <ArrowRight size={14} />
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            title="Screen out / Archive"
                            onClick={() => onUpdateCandidate(c.id, { isArchived: true })} 
                            style={{ padding: '6px 8px', color: 'var(--color-danger)' }}
                          >
                            <Archive size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeCandidates.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-dark)' }}>
                        No active candidates. Review the AI Screening Queue to advance profiles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: AI Screening Queue log */}
          {activeTab === 'screening' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Applicant</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Job Target</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>AI Match Score</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Screening outcome & Reason</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {screeningCandidates.map((c) => {
                    const isPassed = !c.isArchived;
                    return (
                      <tr key={c.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'var(--transition-smooth)', background: isPassed ? 'rgba(16, 185, 129, 0.01)' : 'rgba(239, 68, 68, 0.01)' }} className="pipeline-row">
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                             {c.avatar ? (
                               <img src={c.avatar} alt={c.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-light)' }} />
                             ) : (
                               <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
                                 {c.name.split(' ').map(n => n[0]).join('')}
                               </div>
                             )}
                            <div>
                              <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{c.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.role}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '0.85rem' }}>{c.jobMatch.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>at {c.jobMatch.company}</div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span className={`badge ${c.jobMatch.matchScore >= 80 ? 'badge-info' : 'badge-warning'}`} style={{ fontWeight: '700', fontSize: '0.8rem' }}>
                            {c.jobMatch.matchScore}% Fit
                          </span>
                        </td>
                        <td style={{ padding: '16px', maxWidth: '280px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {c.isArchived ? (
                              <span className="badge badge-warning" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'none', fontSize: '0.7rem' }}>
                                <XCircle size={10} /> Auto-Archived
                              </span>
                            ) : (
                              <span className="badge badge-success" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'none', fontSize: '0.7rem' }}>
                                <CheckCircle2 size={10} /> Advanced
                              </span>
                            )}
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                              {c.screeningReason || "Processed against active job criteria."}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          {c.isArchived ? (
                            <button 
                              className="btn btn-secondary" 
                              onClick={() => onUpdateCandidate(c.id, { isArchived: false, status: 'Submitted' })} 
                              style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--color-primary)' }}
                            >
                              Force Advance
                            </button>
                          ) : (
                            <button 
                              className="btn btn-secondary" 
                              onClick={() => onUpdateCandidate(c.id, { isArchived: true })} 
                              style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--text-dark)' }}
                            >
                              Archive
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Screener Form, Email Router & Share Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Bulk Uploader dropzone */}
        <div className="glass-panel" style={{ padding: '28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--color-primary)" />
              Bulk Resume Uploader
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Upload multiple files to parse and screen candidates simultaneously.</p>
          </div>

          <div 
            className="dropzone"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
              border: '2px dashed var(--border-light)',
              borderRadius: 'var(--border-radius-md)',
              padding: '24px 16px',
              textAlign: 'center',
              background: dragActive ? 'rgba(79, 70, 229, 0.03)' : 'rgba(0,0,0,0.01)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Upload size={24} color="var(--color-primary)" style={{ margin: '0 auto 8px' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', display: 'block' }}>Drag & Drop CV Files</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>or click to browse your folders</span>
            <input 
              type="file" 
              multiple 
              onChange={handleFileInput} 
              style={{ display: 'none' }} 
              id="bulk-file-input" 
            />
            <label htmlFor="bulk-file-input" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'pointer' }} />
          </div>
        </div>

        {/* AI Email Router simulation widget */}
        <div className="glass-panel" style={{ padding: '28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} color="var(--color-secondary)" />
                AI Email Listener
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Simulating mailbox <code style={{ fontSize: '0.75rem', padding: '1px 4px' }}>hiring@hirepitch.in</code></p>
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={handleSimulateEmail}
              disabled={isSimulatingEmail}
              style={{ padding: '6px 10px', fontSize: '0.75rem' }}
            >
              {isSimulatingEmail ? (
                <RefreshCw size={12} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                'Simulate Email'
              )}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxH: '200px', overflowY: 'auto' }} className="scrollbar-hidden">
            {emailLogs.map(log => (
              <div key={log.id} style={{ padding: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600' }}>{log.sender}</span>
                  <span>{log.date}</span>
                </div>
                <div style={{ fontWeight: '500', color: 'var(--text-main)', marginBottom: '2px' }}>{log.subject}</div>
                <div style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>{log.log}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Shareable Portals Widget */}
        <div className="glass-panel" style={{ padding: '28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>Shareable Client Portals</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Provide isolated, secure links to your clients. They will only see candidates mapped to their company.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {uniqueClients.map(client => (
              <div key={client} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-light)' }}>
                <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)' }}>{client}</span>
                <button 
                  className={`btn ${copiedClient === client ? 'btn-glow' : 'btn-secondary'}`}
                  onClick={() => handleCopyLink(client)}
                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                >
                  {copiedClient === client ? 'Link Copied!' : 'Copy Share Link'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bulk Processing Queue Progress Modal */}
      {showQueueModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel" style={{ width: '500px', padding: '32px', background: '#fff', border: '1px solid #cbd5e1' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <Layers size={18} color="var(--color-primary)" />
              AI Bulk Processing Queue
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              The AI is reading resumes, extracting domain capabilities, scoring them against job description criteria, and routing profiles.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {bulkQueue.map(item => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '600' }}>
                    <span>{item.name}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{item.status}</span>
                  </div>
                  <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ background: item.progress === 100 ? 'var(--color-success)' : 'var(--color-primary)', width: `${item.progress}%`, height: '100%', transition: 'width 0.4s' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowQueueModal(false)}
                disabled={bulkQueue.some(item => item.progress < 100)}
              >
                Close Queue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel" style={{ width: '440px', padding: '32px', background: '#fff', border: '1px solid #cbd5e1' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <Key size={18} color="var(--color-primary)" />
              Google Gemini Credentials
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Add a Gemini API key to activate live, context-aware interactive recruiter Q&A. Otherwise, the app operates using pre-configured mock data.
            </p>

            <form onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label className="form-label">Google GenAI API Key</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="AIzaSy..." 
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowSettings(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
