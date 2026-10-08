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
  customSections?: {
    heading: string;
    subheading?: string;
    content: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: 'flightpulse',
    title: 'FlightPulse: Flight Delay Investigation System',
    category: 'Data Engineering / AI',
    year: 2026,
    coverImage: 'images/flightpulse-cover.png',
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
        src: 'images/flightpulse-cover.png',
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
    ],
    customSections: [
      {
        heading: '02 / THE IDEA',
        subheading: 'Evidence First, AI Last',
        content: `<p>The most important decision in the project: <strong>the LLM is not the source of truth.</strong> FlightPulse keeps four things separate:</p>
<ul>
  <li><strong>Carrier-reported reason:</strong> What the airline or source reported, e.g. WEATHER.</li>
  <li><strong>Candidate cause:</strong> What the deterministic engine finds best supported by the evidence.</li>
  <li><strong>Supporting evidence:</strong> Observed facts: gusts, visibility, FAA events, timing.</li>
  <li><strong>Confidence:</strong> HIGH, MEDIUM, LOW or INSUFFICIENT. The LLM cannot override it.</li>
</ul>`
      },
      {
        heading: '04 / DATA LAYER',
        subheading: 'Three Pipelines, One Pattern',
        content: `<p>Each source follows extract, validate, transform, load, and analyze. I wanted the project to show real data engineering, not just a frontend calling a third-party API.</p>
<ul>
  <li><strong>Flights (OpenSky):</strong> Retry and backoff, HTTP 429 handling, callsign and timestamp validation, duplicate detection, upserts, dry-run mode, and fixture replay. 11 tests at initial validation.</li>
  <li><strong>Weather (Open-Meteo):</strong> Wind, gusts, visibility, temperature, and conditions. Tested on KORD, KATL, KDEN, and KJFK. 21 tests. Surface pressure isn't a METAR altimeter reading, so it isn't treated as one.</li>
  <li><strong>Disruptions (FAA NAS/ATCSCC):</strong> Ground stops, ground delay programs, outages, and delays. 30 tests. Feed is US-focused.</li>
</ul>
<p>Fixture runs showed the pipeline doing its job: one flight run extracted 10 records, transformed 5, removed 1 duplicate, and skipped 4; a second real load updated rows instead of duplicating them.</p>`
      },
      {
        heading: '05 / DATABASE & PROVENANCE',
        subheading: 'Lineage & Auditable Storage',
        content: `<p>PostgreSQL (Supabase) with schemas for <code>airports</code>, <code>airlines</code>, <code>flights</code>, <code>weather_observations</code>, <code>news_events</code>, <code>flight_events</code>, and <code>operations_sync_log</code>. Uses UTC <code>TIMESTAMPTZ</code>, IANA airport time zones, JSONB metadata, indexes, foreign keys, and idempotent ingestion.</p>
<p>Every flight is explicitly tagged with its origin source (<code>FLIGHTAWARE</code>, <code>FIXTURE_REPLAY</code>, <code>OPENSKY_LIVE</code>) because live telemetry and demo fixtures must never silently mix. Benchmark flights like UA415 are protected so live ingestion cannot overwrite benchmark truth.</p>`
      },
      {
        heading: '06 / REASONING ENGINE',
        subheading: 'Teaching the System to Say "I Don\'t Know"',
        content: `<p>The engine checks the schedule, delay, nearby weather, FAA advisories, and timeline events, weighing timing and location. It then ranks candidates: <code>WEATHER</code>, <code>ATC</code>, <code>AIRLINE_OPERATIONAL</code>, <code>LATE_AIRCRAFT</code>, <code>AIRPORT</code>, or <code>UNKNOWN / INSUFFICIENT_EVIDENCE</code>.</p>
<p>Each classification is accompanied by an evidence score, confidence rating, supporting facts, and an explanation. If evidence falls below a rigorous threshold, the engine deliberately refuses to force a cause.</p>
<div style="background: rgba(0,0,0,0.04); border-left: 3px solid var(--accent-terminal); padding: 12px; margin: 12px 0;">
  <strong>A Deliberately Hard Test:</strong> Given a 105 min delay reported as WEATHER, but with weather and FAA data from the wrong time window, the engine outputs <code>UNKNOWN / INSUFFICIENT_EVIDENCE</code>. The system would rather be incomplete than confidently wrong.
</div>`
      },
      {
        heading: '07 / BENCHMARK CASE STUDY',
        subheading: 'The UA415 Investigation',
        content: `<p>United Airlines UA415 from Chicago O'Hare (ORD) to Denver (DEN), delayed 105 minutes, carrier reported as <code>WEATHER</code>.</p>
<ul>
  <li>Severe convective weather & thunderstorms recorded around ORD</li>
  <li>Peak gusts reached ~42 kt with visibility collapsing to ~2.5 mi</li>
  <li>FAA ground stop initiated affecting ORD operations, followed by dispatch ground delays</li>
  <li>FlightPulse attribution: <strong>ATC / WEATHER INTERACTION</strong> (Confidence: HIGH, Evidence score: 1.00 across 14 observed facts)</li>
</ul>
<p>The dashboard renders this as an interactive chronological timeline: scheduled departure &rarr; convective weather development &rarr; FAA ground stop restriction &rarr; delay events &rarr; actual departure.</p>`
      },
      {
        heading: '09 / PERFORMANCE PROFILING',
        subheading: 'Cutting AI Cold Inference from 93s to 42s',
        content: `<p>Local Ollama / Llama 3 inference initially took 67 to 93 seconds. Raising the timeout was not an option. Profiling exposed four critical bottlenecks:</p>
<ol>
  <li><strong>Bloated prompt:</strong> 4,741 characters (~1,235 tokens), with weather and event observations redundantly repeated.</li>
  <li><strong>CPU/GPU hardware path:</strong> ~55% CPU / 45% GPU running at 4.2 to 4.5 tokens/sec, meaning every excess token penalized latency.</li>
  <li><strong>Request queuing:</strong> React development renders and rapid flight switches queued concurrent inference requests.</li>
  <li><strong>Truncated outputs:</strong> A <code>num_predict: 220</code> cap chopped the JSON payload mid-generation.</li>
</ol>
<p><strong>Fixes implemented:</strong> Lean prompt structure (dropped 73% of tokens), <code>num_ctx: 1024</code>, tuned temperature, removed rigid token caps, per-flight concurrency locks, in-memory caching, startup model prewarming, and client-side <code>AbortController</code> on navigation.</p>`
      },
      {
        heading: '10 / REAL-WORLD TELEMETRY',
        subheading: 'Honest Handling of ADS-B Gaps and HTTP 429',
        content: `<p>OpenSky ADS-B telemetry provides aircraft position, callsign, and timestamps — not airline schedules or official delay causes. An early prototype assumed first seen was scheduled departure. That was abandoned in favor of truth: live records preserve scheduled fields as NULL and mark sources as <code>OPENSKY_LIVE</code>.</p>
<p>When OpenSky issued an HTTP 429 rate limit with a ~22.4 hour cooldown, the system didn't disguise it: the status dashboard clearly surfaces <code>OPENSKY: RATE LIMITED</code>, weather OK, FAA OK, status PARTIAL — refusing to fabricate flights.</p>`
      },
      {
        heading: '13 / KNOWN LIMITATIONS',
        subheading: 'Honest Engineering Tradeoffs',
        content: `<ul>
  <li><strong>OpenSky rate limits:</strong> Public unauthenticated telemetry cannot guarantee continuous stream ingestion.</li>
  <li><strong>Missing ADS-B metadata:</strong> Live transponder data frequently omits planned destinations or equipment type.</li>
  <li><strong>Aircraft rotation modeling:</strong> Cascading late-aircraft delays require analyzing the previous flight leg.</li>
  <li><strong>Airport-level granularity:</strong> En-route convective storms and waypoint airspace polygons are not yet evaluated.</li>
  <li><strong>Cloud vs Local AI:</strong> In public cloud demo (Vercel/Render), local Ollama is bypassed in favor of instant deterministic attribution.</li>
</ul>`
      }
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
