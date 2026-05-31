import { GoogleGenAI } from '@google/genai';

// Mock Candidate Profiles - Indian Professional Demographics
export const mockCandidates = [
  {
    id: "anya-sharma",
    name: "Anya Sharma",
    role: "Staff Frontend Engineer",
    currentCompany: "Hotstar (ex-Flipkart)",
    experience: "9 years",
    location: "Bengaluru, India (Hybrid)",
    status: "Submitted",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    skills: ["React/Next.js", "TypeScript", "Web Performance", "Design Systems", "GraphQL", "Tailwind CSS", "Node.js"],
    screeningOutcome: "Auto-Advanced",
    screeningReason: "Matches 94% of the tech stack. Directed core Next.js page performance initiatives at Hotstar. Alignment is exceptional.",
    isArchived: false,
    jobMatch: {
      title: "Principal Frontend Architect",
      company: "Stripe",
      matchScore: 94,
      rationale: "Anya is an exceptional UI architect who led the migration of Hotstar's core customer acquisition funnel to Next.js, improving LCP by 34% and increasing click-through by 12%. Her background aligns perfectly with Stripe's plan to overhaul their developer dashboard for international markets. She has deep expertise in design systems and building accessible (a11y), performant component libraries at scale.",
      strengths: [
        "Led performance optimization initiatives at Hotstar, achieving massive web vitals improvements.",
        "Core contributor to open-source UI libraries; strong product sense and UX intuition.",
        "Experienced in mentoring senior engineers and driving UI architecture across 5+ cross-functional teams."
      ],
      gaps: [
        "Less backend node.js experience compared to pure full-stack applicants, but highly capable of interface-level APIs.",
        "Has worked primarily in high-scale consumer streaming; will need to adapt to Stripe's strict B2B developer-centric requirements."
      ]
    },
    audioHighlights: [
      {
        id: "clip-1",
        topic: "Optimizing LCP at Scale",
        duration: "1:42",
        transcript: "At Hotstar, our main goal was reducing initial load times for landing pages on low-bandwidth mobile networks across tier 2 and tier 3 cities in India. We achieved a 34% improvement in Largest Contentful Paint (LCP) by moving to Next.js App Router, using partial pre-rendering (PPR) for static landing layouts while streaming in dynamic user widgets. I also enforced strict bundle budgets using custom Webpack/Turbopack plugin analyses.",
        audioUrl: "mock-audio-1"
      },
      {
        id: "clip-2",
        topic: "Managing Technical Debt in Design Systems",
        duration: "2:10",
        transcript: "When scaling design systems, the biggest trap is custom one-off component extensions. I implemented a strict RFC process for design token variations and introduced automated visual regression tests. If a product team wanted to deviate, they had to justify it with UX research; otherwise, they composed existing primitives. This saved us hundreds of engineering hours in long-term maintenance.",
        audioUrl: "mock-audio-2"
      }
    ],
    qnaDatabase: [
      {
        keywords: ["lcp", "performance", "speed", "optimize", "hotstar"],
        answer: "Anya led the performance audit of Hotstar's customer acquisition funnel. She optimized Largest Contentful Paint (LCP) by 34% using streaming SSR, aggressive code-splitting, font preloading, and implementing an automated image optimization pipeline. She's a performance fanatic who believes web vitals directly correlate with business conversion rates."
      },
      {
        keywords: ["design system", "ui library", "component", "tailwind", "css"],
        answer: "Yes, Anya has built and maintained design systems at both Flipkart and Hotstar. She emphasizes using design tokens (HSL-based, responsive scaling), automated accessibility compliance checks (axe-core integration), and strict semantic HTML. She prefers composable primitives over bloated monolithic components."
      },
      {
        keywords: ["stripe", "why Stripe", "motivation", "move"],
        answer: "Anya is looking for a new challenge focusing on developer-facing portals. She admires Stripe's attention to detail, design precision, and documentation quality. She wants to help scale Stripe's dashboard component systems to support next-generation payment integrations."
      },
      {
        keywords: ["backend", "node", "database", "sql"],
        answer: "While Anya is primarily frontend-focused, she regularly builds GraphQL gateways and Node.js BFF (Backend-for-Frontend) layers. She is comfortable designing APIs and working with key-value stores (Redis) but prefers to leave heavy database optimization or distributed clustering to dedicated systems engineers."
      }
    ]
  },
  {
    id: "aarav-patel",
    name: "Aarav Patel",
    role: "Lead MLOps & Backend Engineer",
    currentCompany: "Ola (ex-Swiggy)",
    experience: "7 years",
    location: "Bengaluru, India (Remote)",
    status: "Screening",
    avatar: "",
    skills: ["Python", "Go", "Kubernetes", "Ray", "PyTorch", "gRPC", "PostgreSQL", "Apache Kafka", "Docker"],
    screeningOutcome: "Auto-Advanced",
    screeningReason: "Strong architectural fit for AI platform. Go / distributed systems experience matched perfectly.",
    isArchived: false,
    jobMatch: {
      title: "Lead AI Platform Engineer",
      company: "Linear",
      matchScore: 89,
      rationale: "Aarav built Ola's real-time routing inference pipelines, processing 100k+ predictions/sec with sub-50ms latency using Go and Ray. His deep knowledge of distributed model orchestration and high-performance RPCs is ideal for Linear's initiative to embed real-time autocomplete, auto-tagging, and search intelligence directly into their desktop and web applications.",
      strengths: [
        "Expertise in ultra-low latency inference systems and distributed message queues.",
        "Deep knowledge of Kubernetes scheduling for GPU workloads and container optimization.",
        "Strong software engineering foundations in Go and Python, prioritizing type safety and clean architecture."
      ],
      gaps: [
        "Has worked in large enterprise structures (Ola, Swiggy); needs to adapt to Linear's extremely lean, self-directed product culture.",
        "Focuses primarily on backend systems and infrastructure; has minimal interest or experience in frontend UI implementation."
      ]
    },
    audioHighlights: [
      {
        id: "clip-1",
        topic: "Reducing GPU Inference Costs",
        duration: "2:05",
        transcript: "At Ola, our GPU cluster utilization was highly uneven. I built a dynamic model compilation pipeline that batched request streams and automatically scaled inference pods using custom Prometheus metrics. We managed to improve hardware efficiency by 40% and cut our operational cloud costs by nearly $1.2M annually without violating SLA thresholds.",
        audioUrl: "mock-audio-3"
      },
      {
        id: "clip-2",
        topic: "Why Go vs Python for Platform Services",
        duration: "1:35",
        transcript: "I always prefer Go for network services, concurrency, and performance-sensitive routing because of its lightweight goroutines and compilation speed. We keep Python strictly for model training, data science exploration, and orchestration via Ray. Combining them via gRPC schemas gives us the perfect mix of speed and machine learning flexibility.",
        audioUrl: "mock-audio-4"
      }
    ],
    qnaDatabase: [
      {
        keywords: ["gpu", "cost", "inference", "ray", "ola"],
        answer: "Aarav optimized Ola's model servers by implementing dynamic request batching and quantizing models from FP32 to INT8. By structuring a Ray cluster that dynamically scaled based on queue length rather than CPU thresholds, he increased throughput by 3x and reduced hardware expenses by 40%."
      },
      {
        keywords: ["go", "golang", "grpc", "protobuf"],
        answer: "Aarav is a strong proponent of Go for production services. He led the transition of Ola's routing engine from Python to Go, which reduced P99 latency by 180ms. He uses gRPC/Protobuf for low-overhead internal microservice communications."
      },
      {
        keywords: ["kubernetes", "k8s", "docker", "infra"],
        answer: "Aarav has 5+ years of hand-on Kubernetes experience. He wrote custom controllers for GPU scheduling, managed multi-tenant namespaces, and set up advanced network policies for secure inter-pod traffic. He is highly proficient in Terraform and IaC."
      },
      {
        keywords: ["ui", "frontend", "react", "html"],
        answer: "Aarav is explicitly a backend platform engineer. He does not build user interfaces and prefers to work on high-throughput streaming systems, APIs, and ML infra. He expects frontend developers to consume his documented gRPC/REST APIs."
      }
    ]
  },
  {
    id: "devendra-kumar",
    name: "Devendra Kumar",
    role: "Senior Java Developer",
    currentCompany: "TCS (Client: ICICI Bank)",
    experience: "12 years",
    location: "Mumbai, India",
    status: "Screening",
    avatar: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=150",
    skills: ["Java", "Spring Boot", "Oracle SQL", "Jenkins", "JQuery"],
    screeningOutcome: "Auto-Archived",
    screeningReason: "Profile is strictly legacy Java / enterprise banking backend. Stripe Principal Frontend mandate requires deep modern Javascript/React foundations.",
    isArchived: true,
    jobMatch: {
      title: "Principal Frontend Architect",
      company: "Stripe",
      matchScore: 42,
      rationale: "Devendra has extensive Java backend capabilities but lacks modern UI framework experience (React, Typescript, Next.js). Position requires web performance optimizations and design systems.",
      strengths: ["Strong Spring Boot architecture design", "Decade of secure banking SQL queries"],
      gaps: ["No React/Next.js experience", "No web performance optimization portfolio"]
    },
    audioHighlights: [],
    qnaDatabase: []
  },
  {
    id: "jyoti-iyer",
    name: "Jyoti Iyer",
    role: "Senior Product Engineer",
    currentCompany: "Freshworks",
    experience: "6 years",
    location: "Chennai, India (Remote Only)",
    status: "Screening",
    avatar: "",
    skills: ["React", "Typescript", "Node.js", "REST APIs"],
    screeningOutcome: "Auto-Archived",
    screeningReason: "Candidate demands 100% remote work. Stripe Principal UI role mandates 3 days/week on-site at San Francisco headquarters.",
    isArchived: true,
    jobMatch: {
      title: "Principal Frontend Architect",
      company: "Stripe",
      matchScore: 71,
      rationale: "Jyoti fits the technical stack well but fails the core location requirement. She requires a fully remote contract and cannot relocate to San Francisco.",
      strengths: ["Strong React state modeling", "Excellent remote team collaboration"],
      gaps: ["Cannot fulfill SF on-site requirement", "Lacks high-scale design system experience"]
    },
    audioHighlights: [],
    qnaDatabase: []
  }
];

function searchMockQA(candidate, question) {
  const normalizedQ = question.toLowerCase();
  for (const item of candidate.qnaDatabase) {
    if (item.keywords.some(keyword => normalizedQ.includes(keyword))) {
      return item.answer;
    }
  }
  
  if (normalizedQ.includes("experience") || normalizedQ.includes("work") || normalizedQ.includes("history")) {
    return `${candidate.name} has ${candidate.experience} of experience, currently working at ${candidate.currentCompany} as a ${candidate.role}. They specialize in ${candidate.skills.slice(0, 4).join(', ')}.`;
  }
  
  if (normalizedQ.includes("skills") || normalizedQ.includes("languages") || normalizedQ.includes("stack")) {
    return `${candidate.name}'s technical toolkit includes: ${candidate.skills.join(', ')}.`;
  }
  
  if (normalizedQ.includes("match") || normalizedQ.includes("fit") || normalizedQ.includes("why")) {
    return candidate.jobMatch.rationale;
  }
  
  return `Regarding ${candidate.name}: Based on their profile and recent pre-screening transcripts, they have extensive capabilities in ${candidate.skills.slice(0, 3).join(', ')}. They demonstrate strong leadership skills and are particularly motivated to work on high-impact projects at modern product companies. (Simulated Recruiter Response)`;
}

export const aiService = {
  getCandidates: () => {
    return mockCandidates;
  },

  askQuestion: async (candidateId, question, chatHistory = [], apiKey = '') => {
    const candidate = mockCandidates.find(c => c.id === candidateId);
    if (!candidate) throw new Error("Candidate not found");

    await new Promise(resolve => setTimeout(resolve, 800));

    if (apiKey && apiKey.trim() !== '') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `
          You are an elite AI Recruiter representing the hiring consultancy 'HirePitch'.
          You have access to a specific candidate's profile who is currently being presented to a hiring manager.
          
          CANDIDATE INFORMATION:
          Name: ${candidate.name}
          Role: ${candidate.role}
          Current: ${candidate.currentCompany}
          Experience: ${candidate.experience}
          Skills: ${JSON.stringify(candidate.skills)}
          
          JOB MATCH CONTEXT:
          Target Job: ${candidate.jobMatch.title} at ${candidate.jobMatch.company}
          Match Score: ${candidate.jobMatch.matchScore}%
          Match Rationale: ${candidate.jobMatch.rationale}
          Strengths: ${JSON.stringify(candidate.jobMatch.strengths)}
          Areas to probe/Gaps: ${JSON.stringify(candidate.jobMatch.gaps)}
          
          AUDIO PRE-SCREEN TRANSCRIPTS:
          ${candidate.audioHighlights ? candidate.audioHighlights.map(h => `- Topic: ${h.topic}. Transcript: ${h.transcript}`).join('\n') : "No audio screening logs available."}
          
          INSTRUCTIONS:
          1. Answer the user's question about the candidate objectively, accurately, and professionally.
          2. Use details from their resume, skills, and pre-screen audio transcripts to justify your claims.
          3. Be transparent about both strengths and weaknesses (areas to probe).
          4. Keep your answer concise (under 120 words) and styled in easy-to-read markdown.
          5. Address the client directly. Write in first-person as the representing recruiter, but focus entirely on candidate data.
        `;

        const contents = [];
        chatHistory.slice(-4).forEach(msg => {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        });
        contents.push({
          role: 'user',
          parts: [{ text: question }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens: 250,
          }
        });

        return response.text;
      } catch (error) {
        console.error("Gemini API call failed, falling back to mock:", error);
        return `[Gemini Live API Error: ${error.message}]. Falling back to local intelligence:\n\n${searchMockQA(candidate, question)}`;
      }
    }

    return searchMockQA(candidate, question);
  },

  generatePitch: async (candidateName, resumeText, jobDescription, apiKey = '') => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (apiKey && apiKey.trim() !== '') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
          Generate a HirePitch AI Match Analysis for a candidate based on their Resume and Target Job Description.
          
          CANDIDATE NAME: ${candidateName}
          
          RESUME:
          ${resumeText}
          
          TARGET JOB DESCRIPTION:
          ${jobDescription}
          
          Format the output as a JSON object with the following structure:
          {
            "matchScore": <number between 1 and 100 representing job alignment>,
            "rationale": "<compelling 3-4 sentence match rationale mapping background to requirements>",
            "strengths": ["list of 3 key structural strengths"],
            "gaps": ["list of 2 potential gaps or questions to ask the candidate"]
          }
          Return ONLY the raw JSON object. Do not wrap in markdown code blocks.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        return JSON.parse(response.text);
      } catch (error) {
        console.error("Gemini Pitch Generation failed, using simulation generator:", error);
      }
    }

    const mockScore = Math.floor(Math.random() * 50) + 45; // 45 - 95
    const outcome = mockScore >= 80 ? "Auto-Advanced" : "Auto-Archived";
    const reason = mockScore >= 80 
      ? `Auto-advanced. Strong skill alignments matched ${mockScore}% key requirements.`
      : `Auto-archived. Match score of ${mockScore}% falls below the executive 80% criteria.`;

    return {
      matchScore: mockScore,
      screeningOutcome: outcome,
      screeningReason: reason,
      rationale: `Profile matches approximately ${mockScore}% of the core technical requirements.`,
      strengths: [
        "Proven history of delivery under high scale.",
        "Demonstrated technical communication logic."
      ],
      gaps: [
        "Candidate lacks specialized tooling background.",
        "May require ramp up on framework design tokens."
      ]
    };
  }
};
