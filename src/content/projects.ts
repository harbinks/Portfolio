export interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  coverImage: string;
  problem: string;
  objective: string;
  role: string;
  process: string[];
  tools: string[];
  visuals: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
  results: string[];
  lessons: string[];
}

export const projects: Project[] = [
  {
    slug: 'flightpulse',
    title: 'FlightPulse: Flight Delay Investigation System',
    category: 'Data Engineering / AI',
    year: 2026,
    coverImage: '/images/flightpulse-cover.png',
    problem: 'A passenger sees "Delayed 105 minutes: Weather." That label fails to reveal what actually happened — whether a storm triggered an FAA ground stop, air traffic flow management cascaded delays, or previous aircraft rotations were responsible. Existing flight trackers state delays without verifiable evidence.',
    objective: 'Build an operational flight investigation system that gathers evidence across 3 independent data feeds, reasons about causality using a deterministic delay engine, and only then lets a local LLM generate an operational briefing.',
    role: 'Sole developer — designed and implemented ETL pipelines, PostgreSQL data schema, deterministic cause-ranking engine, FastAPI backend, and React/Vite operations dashboard.',
    process: [
      'Built fault-tolerant ETL pipelines for OpenSky (ADS-B telemetry), Open-Meteo (METAR weather observations), and FAA NAS/ATCSCC (ground stops & delay programs) with retry backoff, 429 rate limit handling, duplicate detection, and idempotent loads.',
      'Architected PostgreSQL schema (Supabase) with strict source provenance (OPENSKY_LIVE, FIXTURE_REPLAY, FLIGHTAWARE), UTC TIMESTAMPTZ, IANA timezones, and operations sync logs.',
      'Developed a deterministic delay engine that evaluates flight schedules, atmospheric conditions, and FAA advisories to rank candidate causes (WEATHER, ATC, AIRLINE_OPERATIONAL, LATE_AIRCRAFT, AIRPORT, or INSUFFICIENT_EVIDENCE) with confidence scores.',
      'Separated reasoning from synthesis: kept the LLM outside the decision loop, supplying established facts to Ollama / Llama 3 to output structured Operational Briefings.',
      'Engineered an airport operations room dashboard in React/Vite featuring interactive flight search, chronological investigation timeline, weather & disruption panels, and candidate cause breakdowns.',
      'Profiled local inference bottlenecks: streamlined prompts from ~1,235 tokens to ~330 tokens, cutting cold inference time from ~93s down to ~42.3s.',
      'Deployed full stack across Vercel (frontend), Render (FastAPI), and Supabase (PostgreSQL 17), handling API rate limits and telemetry gaps gracefully.'
    ],
    tools: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Supabase',
      'React',
      'Vite',
      'Llama 3',
      'Ollama',
      'OpenSky',
      'Open-Meteo',
      'FAA NAS',
      'Pydantic',
      'pytest',
      'Vercel',
      'Render'
    ],
    visuals: [
      {
        src: '/images/flightpulse-cover.png',
        alt: 'FlightPulse Flight Delay Investigation System - Evidence First, Deterministic Reasoning, AI Explanation Last',
        caption: 'FlightPulse investigation architecture: Evidence timeline and cause attribution for benchmark UA415.'
      }
    ],
    demoUrl: 'https://flightpulse-psi.vercel.app/',
    githubUrl: 'https://github.com/harbinks/flightpulse',
    results: [
      'Successfully passed 103 of 103 backend test suites with 0 frontend lint errors.',
      'Reduced LLM prompt token size by 73% (~1,235 to ~330 tokens) and cut cold inference latency from 93s to ~42.3s.',
      'Investigated UA415 benchmark flight (105 min delay), accurately establishing ATC / Weather Interaction with High Confidence (1.00 score across 14 facts).',
      'Maintained honest live telemetry: strictly models missing/rate-limited data rather than hallucinating scheduled flights.'
    ],
    lessons: [
      'Data engineering is the foundation: validation, provenance, idempotency, and failure modes are paramount.',
      'AI should explain evidence rather than make opaque decisions — deterministic attribution preserves auditability.',
      'Never fabricate missing data — explicitly model partial states and API limits (such as OpenSky 429s).',
      'Measure before optimizing: profiling prompt payload and hardware utilization was far more effective than increasing timeouts.'
    ]
  },
  {
    slug: 'rag-ai-assistant',
    title: 'RAG-Based AI Assistant',
    category: 'LLM / NLP',
    year: 2026,
    coverImage: '',
    problem: 'Traditional Q&A systems struggle with domain-specific documents — they either hallucinate answers or fail to surface relevant information from large document collections.',
    objective: 'Build a document-grounded Q&A assistant that uses semantic search and vector embeddings to provide accurate, context-aware answers from uploaded documents.',
    role: 'Sole developer — designed the architecture, built the retrieval pipeline, and deployed the API.',
    process: [
      'Researched RAG architecture patterns and chose LangChain as the orchestration framework',
      'Implemented document ingestion pipeline with chunking and embedding generation using FAISS',
      'Built semantic search layer for retrieving relevant document chunks based on query similarity',
      'Integrated LLM for answer generation with retrieved context as grounding',
      'Developed REST API endpoints for document upload and Q&A interactions',
      'Tested with various document types and optimized retrieval accuracy',
    ],
    tools: ['LangChain', 'FAISS', 'LLMs', 'Python', 'Vector Embeddings', 'REST API'],
    visuals: [],
    demoUrl: '',
    githubUrl: 'https://github.com/harbins/nextwork-rag-api',
    results: [
      'Successfully grounds answers in uploaded documents, reducing hallucination',
      'Handles semantic search across large document collections',
      'Deployed as a functional API ready for integration',
    ],
    lessons: [
      'Chunk size and overlap significantly impact retrieval quality',
      'FAISS provides excellent performance for similarity search at scale',
    ],
  },
  {
    slug: 'employee-attrition-prediction',
    title: 'Employee Attrition Prediction',
    category: 'Machine Learning',
    year: 2025,
    coverImage: '',
    problem: 'Organizations lose significant resources to unexpected employee departures. HR teams need early warning signals to implement proactive retention strategies.',
    objective: 'Build and deploy a live ML application that predicts employee attrition risk and identifies the key factors driving turnover.',
    role: 'Sole developer — handled data analysis, model training, evaluation, and deployment as a Streamlit web app.',
    process: [
      'Performed exploratory data analysis to understand attrition patterns and feature distributions',
      'Engineered features from employee demographics, satisfaction scores, and work metrics',
      'Trained and compared multiple classification models with cross-validation',
      'Selected class-balanced logistic regression for best recall-precision trade-off',
      'Built interactive Streamlit dashboard for real-time predictions',
      'Deployed the app for live use with input validation and result explanation',
    ],
    tools: ['Scikit-learn', 'Pandas', 'Streamlit', 'Python', 'Logistic Regression', 'EDA'],
    visuals: [],
    demoUrl: '',
    githubUrl: '',
    results: [
      'Achieved 77% recall with class-balanced logistic regression',
      'Identified key retention drivers for actionable HR insights',
      'Deployed as a live, interactive ML application',
    ],
    lessons: [
      'Class imbalance handling is critical for meaningful recall in attrition prediction',
      'Simple models with good feature engineering often outperform complex ones for business use cases',
    ],
  },
  {
    slug: 'sign-speak',
    title: 'Sign Speak — Sign Language Recognition',
    category: 'Computer Vision',
    year: 2025,
    coverImage: '',
    problem: 'Communication barriers between hearing/speech-impaired individuals and others limit daily interactions. Real-time sign language translation could bridge this gap.',
    objective: 'Build a real-time gesture recognition system that translates sign language into text, making communication more accessible.',
    role: 'Lead developer (final-year project) — designed the computer vision pipeline, trained the model, and built the real-time inference system.',
    process: [
      'Collected and curated sign language gesture datasets for training',
      'Designed CNN architecture for gesture classification using TensorFlow',
      'Implemented real-time hand detection and tracking with OpenCV',
      'Built preprocessing pipeline for frame extraction and normalization',
      'Integrated model inference with live video feed for real-time translation',
      'Tested with multiple users to validate recognition accuracy across different hand sizes',
    ],
    tools: ['TensorFlow', 'OpenCV', 'Python', 'CNN', 'Deep Learning', 'Computer Vision'],
    visuals: [],
    demoUrl: '',
    githubUrl: '',
    results: [
      'Real-time gesture recognition with live video feed',
      'Successfully recognizes standard sign language gestures',
      'Final-year project completed and presented',
    ],
    lessons: [
      'Real-time inference requires careful optimization of model size and preprocessing speed',
      'Data augmentation is essential when gesture datasets are limited',
    ],
  },
  {
    slug: 'interviewkit-community',
    title: '@interviewkit — Community Platform',
    category: 'Product & Growth',
    year: 2025,
    coverImage: '',
    problem: 'Job seekers, especially fresh graduates, lack structured access to job discovery, interview preparation resources, and peer support during their job search.',
    objective: 'Build and grow a job discovery and interview-prep community from zero, creating real value for members through curated content and peer connections.',
    role: 'Co-Founder — owned end-to-end product strategy, content, platform operations, and community growth.',
    process: [
      'Identified the gap in structured job-prep resources for fresh graduates',
      'Designed content strategy: job alerts, interview tips, resume reviews, mock interviews',
      'Built distribution across WhatsApp and web channels',
      'Drove direct outreach campaigns to grow membership organically',
      'Created consistent content cadence to maintain engagement',
      'Managed community operations, member feedback, and content iteration',
    ],
    tools: ['WhatsApp', 'Content Strategy', 'Community Management', 'Direct Outreach', 'Analytics'],
    visuals: [],
    demoUrl: '',
    githubUrl: '',
    results: [
      'Grew from zero to 400+ members through organic outreach',
      'Real-world 0-to-1 execution track record beyond technical work',
      'Ongoing community with consistent engagement',
    ],
    lessons: [
      'Consistent content delivery matters more than perfection in early-stage communities',
      'Direct outreach and personal connections drive early growth better than paid acquisition',
    ],
  },
  {
    slug: 'churn-prediction-model',
    title: 'Customer Churn Prediction',
    category: 'Data Science',
    year: 2026,
    coverImage: '',
    problem: 'Businesses lose revenue from customer churn but often react too late. Proactive identification of at-risk customers enables targeted retention efforts.',
    objective: 'Build a classification model on large-scale behavioural datasets to predict customer churn and surface the key signals driving attrition.',
    role: 'AI/ML Intern at SMEC Labs — built the prediction model and conducted exploratory analysis to support data-driven business strategy.',
    process: [
      'Analyzed large-scale behavioural datasets to understand churn patterns',
      'Conducted exploratory data analysis and statistical profiling of churned vs retained customers',
      'Engineered features from usage patterns, demographics, and transaction history',
      'Trained classification algorithms and optimized for business-relevant metrics',
      'Performed feature extraction to surface key churn signals',
      'Presented findings to support data-driven retention strategy decisions',
    ],
    tools: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Classification Algorithms', 'EDA'],
    visuals: [],
    demoUrl: '',
    githubUrl: '',
    results: [
      'Enabled proactive retention decisions through early churn identification',
      'Surfaced key behavioural signals supporting data-driven business strategy',
      'Completed during internship at SMEC Labs (Dec 2025 - Feb 2026)',
    ],
    lessons: [
      'Feature engineering from behavioural data requires deep domain understanding',
      'Communicating model insights to non-technical stakeholders is as important as model accuracy',
    ],
  },
];
