import { useState, useEffect } from 'react';
import { 
  Sparkles, ShieldCheck, 
  Users, Check, ChevronDown, Award, Volume2
} from 'lucide-react';

export default function LandingPage() {
  // Sourcing Velocity Simulator state
  const [sourcingDays, setSourcingDays] = useState(3); // Slider value 1 to 10 days
  
  // Derive velocity stats dynamically to avoid set-state-in-effect warning
  const daysVal = parseInt(sourcingDays);
  const mappedCount = daysVal * 125 + 40;
  const screenedCount = Math.round(mappedCount * 0.08) + 3;
  const shortlistsCount = daysVal < 3 ? 1 : daysVal < 6 ? 3 : 4;

  // Lead Form
  const [contactType, setContactType] = useState('client'); // 'client' | 'candidate'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [roleNeed, setRoleNeed] = useState('');
  const [message, setMessage] = useState('');

  // FAQ
  const [activeFaq, setActiveFaq] = useState(null);

  // IntersectionObserver for scroll-reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Hover magnetic glow tracker (sets CSS variables at 60fps)
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setCompany('');
      setRoleNeed('');
      setMessage('');
    }, 1200);
  };

  const faqs = [
    {
      q: "Why is PitchHire different from traditional recruitment agencies?",
      a: "Most agencies optimize for volume. We optimize for outcomes. Our focus is identifying high-performing talent, validating fit early, and maintaining complete transparency throughout the hiring process."
    },
    {
      q: "How quickly can you present candidates?",
      a: "Most searches produce qualified candidates within the first week, depending on role complexity and market conditions."
    },
    {
      q: "How do you evaluate candidates?",
      a: "We assess technical capability, relevant experience, communication skills, motivation, and alignment with your team's needs."
    },
    {
      q: "Do you only work with technology companies?",
      a: "No. While we have deep expertise in technology hiring, we support organizations across multiple industries and functions."
    }
  ];

  return (
    <div className="landing-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Accent Parallax Blobs */}
      <div className="floating-blob blob-1"></div>
      <div className="floating-blob blob-2"></div>
      
      {/* ==========================================
         HERO SECTION: EXCLUSIVE & VELOCITY FOCUSED
         ========================================== */}
      <section className="hero-mesh-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(197, 162, 93, 0.05)', border: '1px solid rgba(197, 162, 93, 0.2)', borderRadius: '0px', color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <Sparkles size={13} className="spinner" style={{ animation: 'spin 4s linear infinite', color: 'var(--color-gold)' }} />
          Executive Search & Talent Consultancy
        </div>
        
        <h1 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '4rem', 
          lineHeight: '1.2', 
          maxWidth: '950px', 
          margin: '0 auto', 
          fontWeight: '500', 
          color: '#ffffff',
          letterSpacing: '-0.01em'
        }}>
          Hire exceptional talent <span style={{ color: 'var(--color-gold)', fontStyle: 'italic', fontWeight: '400' }}>before your competitors do</span>
        </h1>
        
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: 'var(--color-gold)', fontSize: '1.3rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: '400', margin: 0 }}>
            The best candidates are rarely applying for jobs.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.65', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: '300' }}>
            PitchHire helps ambitious companies identify, engage, vet, and close high-performing talent with speed, accuracy, and complete transparency.
          </p>
          <p style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '600', letterSpacing: '0.02em', margin: 0, fontFamily: 'var(--font-sans)' }}>
            No resume spam. No black-box recruiting. Just exceptional hires.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
          <a href="#contact" className="btn-luxury-gold" style={{ textDecoration: 'none' }}>
            Start Hiring &rarr;
          </a>
          <a href="#contact" className="btn-luxury-outline" style={{ textDecoration: 'none' }}>
            Book a Discovery Call
          </a>
        </div>
      </section>

      {/* ==========================================
         CONSULTANCY METRICS / STATS SECTION
         ========================================== */}
      <section className="reveal-on-scroll" style={{ padding: '80px 24px', background: 'rgba(15, 16, 20, 0.65)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: '500' }}>
              Results that matter
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '3.2rem', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontWeight: '600' }}>
                94%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', lineHeight: '1.4' }}>
                retention after 12 months
              </div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '3.2rem', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontWeight: '600' }}>
                600+
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', lineHeight: '1.4' }}>
                senior professionals placed
              </div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '3.2rem', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontWeight: '600' }}>
                18
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', lineHeight: '1.4' }}>
                years of recruitment expertise
              </div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '3.2rem', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontWeight: '600' }}>
                42
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', lineHeight: '1.4' }}>
                industries served globally
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         HOW WE WORK SECTION
         ========================================== */}
      <section id="services" style={{ padding: '100px 24px', background: 'rgba(15, 16, 20, 0.3)' }} className="scroll-reveal reveal-on-scroll">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: 'var(--color-gold)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>How We Work</span>
            <h2 style={{ fontSize: '2.4rem', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: '500', marginTop: '8px', marginBottom: '16px' }}>
              Find the right people. Fast.
            </h2>
            <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ color: 'var(--color-gold)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: '400', margin: 0 }}>
                Most recruiters search active job seekers. We focus on high-performing professionals who are already succeeding in their current roles.
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', margin: 0, fontWeight: '300' }}>
                Our process combines deep market mapping, rigorous evaluation, and transparent communication to help you make confident hiring decisions.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div className="glass-panel hover-float magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.4)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="feature-icon-wrapper" style={{ position: 'relative', zIndex: 2 }}>
                <Users size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600', color: '#fff', fontFamily: 'var(--font-serif)', position: 'relative', zIndex: 2 }}>1. Talent Mapping</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.65', fontWeight: '300', position: 'relative', zIndex: 2 }}>
                We identify and engage talent across relevant companies, industries, and networks.
              </p>
            </div>

            <div className="glass-panel hover-float magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.4)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="feature-icon-wrapper" style={{ position: 'relative', zIndex: 2 }}>
                <Volume2 size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600', color: '#fff', fontFamily: 'var(--font-serif)', position: 'relative', zIndex: 2 }}>2. Structured Evaluation</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.65', fontWeight: '300', position: 'relative', zIndex: 2 }}>
                Every candidate is assessed for capability, experience, motivation, and role fit before reaching your desk.
              </p>
            </div>

            <div className="glass-panel hover-float magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.4)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="feature-icon-wrapper" style={{ position: 'relative', zIndex: 2 }}>
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600', color: '#fff', fontFamily: 'var(--font-serif)', position: 'relative', zIndex: 2 }}>3. Curated Shortlists</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.65', fontWeight: '300', position: 'relative', zIndex: 2 }}>
                Receive a focused shortlist of highly aligned candidates, complete with screening insights and hiring recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         WHY HIREPITCH SECTION
         ========================================== */}
      <section style={{ padding: '100px 24px', background: 'transparent' }} className="scroll-reveal reveal-on-scroll">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: 'var(--color-gold)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Why PitchHire</span>
            <h2 style={{ fontSize: '2.4rem', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: '500', marginTop: '8px' }}>
              Recruitment built for modern teams
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            <div className="dark-card hover-float magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', position: 'relative', zIndex: 2 }}>Speed without sacrificing quality</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.6', fontWeight: '300', margin: 0, position: 'relative', zIndex: 2 }}>
                Move from search kickoff to qualified candidates in days, not months.
              </p>
            </div>

            <div className="dark-card hover-float magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', position: 'relative', zIndex: 2 }}>Transparent hiring process</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.6', fontWeight: '300', margin: 0, position: 'relative', zIndex: 2 }}>
                Know exactly where your search stands at every stage.
              </p>
            </div>

            <div className="dark-card hover-float magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', position: 'relative', zIndex: 2 }}>Better candidate quality</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.6', fontWeight: '300', margin: 0, position: 'relative', zIndex: 2 }}>
                We prioritize fit, capability, and long-term success over volume.
              </p>
            </div>

            <div className="dark-card hover-float magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', position: 'relative', zIndex: 2 }}>Access to passive talent</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: '1.6', fontWeight: '300', margin: 0, position: 'relative', zIndex: 2 }}>
                Reach exceptional professionals who aren't actively looking but are open to the right opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         TESTIMONIALS SECTION
         ========================================== */}
      <section id="about" style={{ padding: '100px 24px', background: 'transparent' }} className="scroll-reveal reveal-on-scroll">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: 'var(--color-gold)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Testimonial Section</span>
            <h2 style={{ fontSize: '2.4rem', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: '500', marginTop: '8px' }}>
              Trusted by growing and high-performing teams
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            
            <div className="glass-panel magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.4)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', gap: '4px', color: 'var(--color-gold)', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
                <Award size={16} /><Award size={16} /><Award size={16} /><Award size={16} /><Award size={16} />
              </div>
              <p style={{ fontStyle: 'italic', color: '#cbd5e1', lineHeight: '1.65', fontSize: '0.95rem', fontWeight: '300', position: 'relative', zIndex: 2 }}>
                &ldquo;PitchHire delivered quality over quantity. Instead of dozens of resumes, we received a handful of thoroughly vetted candidates and closed the role in less than two weeks.&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', position: 'relative', zIndex: 2 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '0px', border: '1px solid rgba(197, 162, 93, 0.25)', background: 'rgba(197, 162, 93, 0.05)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                  SM
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff', fontFamily: 'var(--font-sans)' }}>Siddharth Mehta</h4>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hiring Director</p>
                </div>
              </div>
            </div>

            <div className="glass-panel magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '32px', background: 'rgba(20, 21, 26, 0.4)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', gap: '4px', color: 'var(--color-gold)', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
                <Award size={16} /><Award size={16} /><Award size={16} /><Award size={16} /><Award size={16} />
              </div>
              <p style={{ fontStyle: 'italic', color: '#cbd5e1', lineHeight: '1.65', fontSize: '0.95rem', fontWeight: '300', position: 'relative', zIndex: 2 }}>
                &ldquo;The transparency was refreshing. We always knew where the search stood, what the market looked like, and why candidates were progressing.&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', position: 'relative', zIndex: 2 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '0px', border: '1px solid rgba(197, 162, 93, 0.25)', background: 'rgba(197, 162, 93, 0.05)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                  KL
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff', fontFamily: 'var(--font-sans)' }}>Kartik Lakshman</h4>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>VP Engineering</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ==========================================
         SOURCING VELOCITY SIMULATOR (INTERACTIVE WIDGET)
         ========================================== */}
      <section id="process" style={{ padding: '100px 24px', background: 'rgba(15, 16, 20, 0.3)', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="scroll-reveal reveal-on-scroll">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: 'var(--color-gold)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Process Timeline</span>
            <h2 style={{ fontSize: '2.4rem', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: '500', marginTop: '8px' }}>
              Hiring Velocity Timeline
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0 auto', fontWeight: '300', lineHeight: '1.6' }}>
              Adjust the timeline below to see how our process quickly filters candidate pools to select the finest talent for your team.
            </p>
          </div>

          <div className="dark-card magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '40px', border: '1px solid rgba(255,255,255,0.06)' }}>
            
            {/* Slider control */}
            <div style={{ marginBottom: '40px', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: '600', letterSpacing: '0.05em' }}>SEARCH TIMELINE:</span>
                <span style={{ fontSize: '1.4rem', color: 'var(--color-gold)', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                  {sourcingDays} {sourcingDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={sourcingDays}
                onChange={e => setSourcingDays(e.target.value)}
                className="cyber-slider"
              />
            </div>

            {/* Visual node grid */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px 0', minHeight: '80px', zIndex: 2 }}>
              <div className="node-line">
                <div className="node-line-active" style={{ width: `${Math.min(100, Math.max(0, ((sourcingDays - 1) / 4) * 100))}%` }}></div>
              </div>
              
              {/* Node 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div className={`node-dot ${sourcingDays >= 1 ? 'active' : ''}`}>
                  {sourcingDays >= 1 && <div className="pulsing-glow"></div>}
                  {mappedCount}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Identified</span>
              </div>

              {/* Node 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div className={`node-dot ${sourcingDays >= 3 ? 'success' : sourcingDays >= 2 ? 'active' : ''}`}>
                  {sourcingDays >= 3 && <div className="pulsing-glow"></div>}
                  {screenedCount}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Vetted</span>
              </div>

              {/* Node 3 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div className={`node-dot ${sourcingDays >= 5 ? 'success' : sourcingDays >= 4 ? 'active' : ''}`}>
                  {sourcingDays >= 5 && <div className="pulsing-glow"></div>}
                  {shortlistsCount}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Shortlisted</span>
              </div>
            </div>

            {/* Dynamic summary text */}
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '0px', padding: '24px', fontSize: '0.925rem', color: '#cbd5e1', lineHeight: '1.7' }}>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hiring Progress Summary:</h4>
              By day <strong style={{ color: 'var(--color-gold)' }}>{sourcingDays}</strong>, we map <strong style={{ color: '#fff' }}>{mappedCount} professionals</strong> across the industry. Through our screening process, we select the top <strong style={{ color: '#fff' }}>{screenedCount} qualified candidates</strong>, and deliver a curated shortlist of <strong style={{ color: 'var(--color-gold)' }}>{shortlistsCount} candidates</strong> ready for your review.
            </div>

            {/* Active search feed list */}
            <div style={{ marginTop: '28px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Search Mandate Examples:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span style={{ flex: 1 }}>• Engineering Leadership Mandate</span>
                  <span style={{ color: 'var(--color-gold)', fontFamily: 'monospace', fontWeight: '600' }}>Shortlist Delivered (3 Candidates)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span style={{ flex: 1 }}>• Technical Lead Architect</span>
                  <span style={{ color: 'var(--color-gold-dark)', fontFamily: 'monospace', fontWeight: '600' }}>Screening & Vetting (2 Candidates)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         FAQ SECTION
         ========================================== */}
      <section style={{ padding: '100px 24px', background: 'rgba(15, 16, 20, 0.4)', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="scroll-reveal reveal-on-scroll">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.4rem', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: '500' }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="glass-panel magnetic-glow-card" 
                  onMouseMove={handleMouseMove}
                  style={{ background: 'rgba(20, 21, 26, 0.4)', borderColor: 'rgba(255,255,255,0.06)', padding: '20px 24px', cursor: 'pointer', transition: 'var(--transition-smooth)', position: 'relative' }}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff', fontFamily: 'var(--font-serif)' }}>{faq.q}</h4>
                    <ChevronDown size={18} color="var(--color-gold)" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </div>
                  <div className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
                    <p style={{ marginTop: '12px', fontSize: '0.925rem', color: '#cbd5e1', lineHeight: '1.65', fontWeight: '300', margin: '12px 0 0 0' }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================================
         CONTACT / LEAD CAPTURE FORM
         ========================================== */}
      <section id="contact" style={{ padding: '100px 24px', background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }} className="scroll-reveal reveal-on-scroll">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-success" style={{ marginBottom: '12px', background: 'rgba(197, 162, 93, 0.08)', color: 'var(--color-gold)', borderColor: 'rgba(197, 162, 93, 0.2)', borderRadius: '0px' }}>Final CTA</span>
            <h2 style={{ fontSize: '2.4rem', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: '500' }}>
              Build your next great team
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', fontWeight: '300', lineHeight: '1.5', margin: 0 }}>
                Whether you're hiring your first key employee or scaling an entire department, PitchHire helps you move faster with confidence.
              </p>
              <p style={{ color: 'var(--color-gold)', fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                Book a discovery call and start your search today.
              </p>
            </div>
          </div>

          <div className="glass-panel magnetic-glow-card" onMouseMove={handleMouseMove} style={{ padding: '40px', background: 'rgba(20, 21, 26, 0.55)', borderColor: 'rgba(255,255,255,0.06)' }}>
            
            {/* Form type tabs */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.01)', borderRadius: '0px', padding: '4px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <button 
                type="button"
                onClick={() => { setContactType('client'); setFormSubmitted(false); }}
                style={{ flex: 1, padding: '12px 16px', background: contactType === 'client' ? 'var(--color-gold)' : 'none', border: 'none', borderRadius: '0px', fontWeight: '700', fontSize: '0.85rem', color: contactType === 'client' ? '#0c0d10' : '#94a3b8', cursor: 'pointer', transition: 'var(--transition-smooth)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                I am Hiring (Client)
              </button>
              <button 
                type="button"
                onClick={() => { setContactType('candidate'); setFormSubmitted(false); }}
                style={{ flex: 1, padding: '12px 16px', background: contactType === 'candidate' ? 'var(--color-gold)' : 'none', border: 'none', borderRadius: '0px', fontWeight: '700', fontSize: '0.85rem', color: contactType === 'candidate' ? '#0c0d10' : '#94a3b8', cursor: 'pointer', transition: 'var(--transition-smooth)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                I am a Candidate
              </button>
            </div>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '0px', border: '1px solid rgba(197, 162, 93, 0.25)', background: 'rgba(197, 162, 93, 0.05)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <Check size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Submission Secured</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5', fontWeight: '300' }}>
                  {contactType === 'client' 
                    ? "Mandate mapping details secured. Our founding talent managers will contact you within 2 hours."
                    : "Resume details indexed securely in our passive pool vector. We will coordinate for verification soon."
                  }
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="btn-luxury-outline" 
                  style={{ marginTop: '24px', padding: '8px 16px', color: '#fff' }}
                >
                  Submit Another Mandate
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#cbd5e1' }} htmlFor="contact-name">Full Name *</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    className="cyber-input" 
                    placeholder="Rohan Malhotra" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#cbd5e1' }} htmlFor="contact-email">Work Email *</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    className="cyber-input" 
                    placeholder="rohan@company.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required 
                  />
                </div>

                {contactType === 'client' ? (
                  <>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#cbd5e1' }} htmlFor="contact-company">Company Name</label>
                      <input 
                        type="text" 
                        id="contact-company" 
                        className="cyber-input" 
                        placeholder="Linear" 
                        value={company} 
                        onChange={e => setCompany(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#cbd5e1' }} htmlFor="contact-need">Engineering Role Target</label>
                      <input 
                        type="text" 
                        id="contact-need" 
                        className="cyber-input" 
                        placeholder="E.g., Staff AI Platform Engineer" 
                        value={roleNeed} 
                        onChange={e => setRoleNeed(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#cbd5e1' }} htmlFor="contact-resume">Paste LinkedIn Link or Resume Summary</label>
                    <textarea 
                      id="contact-resume" 
                      className="cyber-input" 
                      rows="4" 
                      placeholder="E.g., 6+ years React/Go platform engineer. Led migration from Python to Go microservices, reducing P99 latency by 180ms."
                      value={roleNeed}
                      onChange={e => setRoleNeed(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" style={{ color: '#cbd5e1' }} htmlFor="contact-message">Additional Context or Requirements</label>
                  <textarea 
                    id="contact-message" 
                    className="cyber-input" 
                    rows="3" 
                    placeholder="Timeline constraints, budget alignment parameters, or technical stacks."
                    value={message} 
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-luxury-gold" 
                  style={{ width: '100%', border: 'none', padding: '14px 24px', fontSize: '0.85rem', marginTop: '12px', fontWeight: '700' }}
                >
                  {contactType === 'client' ? 'Start Hiring' : 'Submit Pitch Application'}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* ==========================================
         FOOTER
         ========================================== */}
      <footer style={{ background: '#08090b', color: '#71717a', padding: '80px 24px 40px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '48px', marginBottom: '60px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem', letterSpacing: '-0.025em', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#e9c37a', fontWeight: '600' }}>
                  Pitch
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', color: '#fff', marginLeft: '2px' }}>
                  Hire
                </span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.65', color: '#cbd5e1', fontWeight: '300' }}>
              PitchHire helps ambitious companies identify, engage, vet, and close high-performing talent with speed, accuracy, and complete transparency.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#52525b' }}>
              Registered domain: pitchhire.in
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '700', marginBottom: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Portal</h4>
            <div className="footer-link-group">
              <a href="https://app.pitchhire.in" className="footer-link">Client Portal Login</a>
              <a href="https://app.pitchhire.in" className="footer-link">Recruiter Portal Login</a>
              <a href="#contact" className="footer-link">Get in Touch</a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '700', marginBottom: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Partners</h4>
            <div className="footer-link-group">
              <a href="#contact" className="footer-link">Contact Sales</a>
              <a href="#contact" className="footer-link">Apply as Candidate</a>
              <a href="#process" className="footer-link">How it Works</a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '700', marginBottom: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Office</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.65', color: '#94a3b8', fontWeight: '300' }}>
              PitchHire Sourcing Ltd.<br />
              Varthur Hobli, Bengaluru,<br />
              Karnataka 560087, India
            </p>
          </div>

        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.8rem' }}>
          <span>© 2026 PitchHire. All rights reserved. Registered in India.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" className="footer-link" style={{ fontSize: '0.8rem' }}>Privacy Policy</a>
            <a href="#" className="footer-link" style={{ fontSize: '0.8rem' }}>Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
