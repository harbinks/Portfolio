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
    title: 'FlightPulse — Flight Delay Investigation System',
    category: 'Data Engineering / AI',
    year: 2026,
    coverImage: '/images/flightpulse-dashboard.png',
    problem: 'A flight tracker can report a delay reason such as WEATHER, but that label does not show what happened. Passengers need an explanation grounded in flight, weather, and air traffic evidence, with uncertainty made clear.',
    objective: 'Build an operational flight investigation system that combines independent aviation data, ranks delay causes with a deterministic evidence engine, and uses an LLM only to explain the established findings.',
    role: 'Sole developer — designed and built the data pipelines, PostgreSQL schema, attribution engine, FastAPI backend, React dashboard, and deployment.',
    process: [
      'Built ETL pipelines for OpenSky flight telemetry, Open-Meteo weather observations, and FAA NAS disruption data, with validation, deduplication, retry handling, and idempotent loads',
      'Designed a PostgreSQL data model with source provenance, UTC timestamps, airport time zones, and operational sync tracking',
      'Implemented deterministic cause ranking across weather, ATC, airline operations, late aircraft, airport, and insufficient evidence, including confidence and supporting facts',
      'Kept the LLM outside the decision path: it receives the engine findings and produces a grounded operational briefing, while the dashboard remains useful without it',
      'Built a React and Vite operations dashboard with demo and live modes, flight search, timelines, weather, FAA advisories, and candidate cause breakdowns',
      'Profiled local Llama 3 inference and reduced the prompt from about 1,235 tokens to about 330, bringing cold inference from as much as 93 seconds to about 42 seconds',
      'Deployed the frontend on Vercel, FastAPI on Render, and PostgreSQL on Supabase; handled live data gaps and OpenSky rate limits transparently',
    ],
    tools: ['Python', 'FastAPI', 'Pydantic', 'PostgreSQL', 'Supabase', 'React', 'Vite', 'Ollama', 'Llama 3', 'OpenSky', 'Open-Meteo', 'FAA NAS', 'pytest', 'Vercel', 'Render'],
    visuals: [
      {
        src: '/images/flightpulse-investigation.png',
        alt: 'FlightPulse investigation view with a chronological flight timeline, METAR observations, FAA disruption advisory, and candidate cause scoring',
        caption: 'An investigation combines the flight timeline with weather and FAA evidence to show how the cause was attributed.',
      },
    ],
    demoUrl: 'https://flightpulse-psi.vercel.app/',
    githubUrl: 'https://github.com/harbinks/flightpulse',
    results: [
      'Passed 103 of 103 backend tests, with zero frontend lint errors and a successful production build',
      'Reduced the LLM prompt by about 73% and cold inference from up to 93 seconds to about 42 seconds; cached responses return in tens of milliseconds',
      'Investigated a 105-minute UA415 delay using weather observations, an FAA ground stop, and operational events; the engine reported a high-confidence weather and ATC interaction based on 14 facts',
      'Preserved honest live telemetry: unavailable schedule fields stay null, and rate limits appear as partial system status instead of fabricated flights',
    ],
    lessons: [
      'The LLM should explain evidence rather than decide the cause; deterministic attribution keeps confidence and uncertainty auditable',
      'Data provenance, validation, duplicate handling, and failure states are core parts of reliable ingestion',
      'Measure prompt size, concurrency, and token speed before changing timeouts; architecture choices can dominate inference latency',
      'Model missing data explicitly instead of filling it with plausible guesses',
    ],
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
