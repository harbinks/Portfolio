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
  tagline?: string;
  apiDocsUrl?: string;
  stats?: {
    value: string;
    label: string;
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
    title: 'FlightPulse',
    tagline: 'Flight Delay Intelligence Platform',
    category: 'Data Engineering / AI',
    year: 2026,
    coverImage: 'images/flightpulse-cover.png',
    apiDocsUrl: 'https://flightpulse-51i5.onrender.com/docs',
    demoUrl: 'https://flightpulse-psi.vercel.app/',
    githubUrl: 'https://github.com/harbinks/flightpulse',
    stats: [
      { value: '3', label: 'Data Sources' },
      { value: '7', label: 'Core Tables' },
      { value: '103', label: 'Backend Tests Passed' },
      { value: '42.3s', label: 'Cold LLM Inference (from ~93s)' }
    ],
    problem: 'A flight tracker can tell you your flight was delayed. I wanted to know why. A passenger sees "Delayed 105 minutes: Weather." That doesn\'t say what happened. Maybe a storm hit. Maybe the storm triggered an FAA ground stop. Maybe the airline said weather but the real mechanism was air traffic flow management, or the previous rotation of the aircraft. Maybe there isn\'t enough evidence to say at all.',
    objective: 'Build an operational flight investigation system that gathers evidence across 3 independent data feeds, reasons about causality using a deterministic delay engine, and only then lets a local LLM explain the established result.',
    role: 'Sole developer — designed and built the end-to-end data pipelines, PostgreSQL schema, deterministic attribution engine, FastAPI backend, React/Vite operations dashboard, and multi-tier deployment.',
    process: [
      'Built ETL pipelines for OpenSky (ADS-B telemetry), Open-Meteo (METAR weather observations), and FAA NAS/ATCSCC (ground stops, ground delay programs) with retry backoff, 429 rate-limit handling, duplicate detection, and idempotent loads.',
      'Designed a PostgreSQL data model on Supabase with source provenance (OPENSKY_LIVE, FIXTURE_REPLAY, FLIGHTAWARE), UTC TIMESTAMPTZ, IANA timezones, and operations sync logs.',
      'Implemented deterministic delay cause ranking across WEATHER, ATC, AIRLINE_OPERATIONAL, LATE_AIRCRAFT, AIRPORT, or UNKNOWN / INSUFFICIENT_EVIDENCE with supporting facts and confidence scoring.',
      'Kept the LLM strictly outside the decision path: it receives established engine findings and produces a grounded Operational Briefing, while the system functions completely without it.',
      'Engineered an airport operations room dashboard in React/Vite featuring interactive flight search, chronological investigation timeline, weather & disruption panels, and candidate cause breakdowns.',
      'Profiled local Llama 3 inference bottlenecks and reduced the prompt from ~1,235 tokens to ~330 tokens, cutting cold inference from ~93s to ~42.3s.',
      'Deployed full stack across Vercel (frontend), Render (FastAPI), and Supabase (PostgreSQL 17), handling telemetry gaps and rate limits gracefully.'
    ],
    tools: [
      'Python',
      'FastAPI',
      'Pydantic',
      'pytest',
      'PostgreSQL',
      'Supabase',
      'React',
      'Vite',
      'Ollama',
      'Llama 3',
      'OpenSky',
      'Open-Meteo',
      'FAA NAS',
      'Vercel',
      'Render'
    ],
    visuals: [
      {
        src: 'images/flightpulse-cover.png',
        alt: 'FlightPulse Cover - Flight Delay Investigation System',
        caption: 'FlightPulse: Evidence First, Deterministic Reasoning, AI Explanation Last.'
      },
      {
        src: 'images/flightpulse-investigation.png',
        alt: 'FlightPulse Investigation Timeline and Cause Attribution Analysis',
        caption: '07 / UA415 Investigation View: Chronological progression, METAR observations, FAA disruption advisory, and candidate cause scoring.'
      },
      {
        src: 'images/flightpulse-dashboard.png',
        alt: 'FlightPulse Airport Operations Dashboard View',
        caption: '11 / Operations Dashboard: Dispatch search, active matches, timeline telemetry, and grounded analyst dossier.'
      }
    ],
    results: [
      'Passed 103 of 103 backend test suites (5 warnings, 0 failures), 0 frontend lint errors, and verified production build.',
      'Reduced LLM prompt token payload by ~73% (from ~1,235 tokens down to ~330 tokens) and cut cold inference latency from up to 93s to ~42.3s; cached responses return in tens of milliseconds.',
      'Investigated 105-minute UA415 delay: the deterministic engine established ATC / Weather Interaction with High Confidence based on 14 observed evidence facts (Score 1.00).',
      'Maintained honest live telemetry: unavailable schedule fields remain null, and rate limits surface as partial system status instead of fabricated flights.'
    ],
    lessons: [
      'Data engineering is more than API calls: validation, provenance, duplicate handling, idempotency, and failure states are the actual work.',
      'Don\'t fabricate missing data: if an ADS-B transponder source lacks scheduled departure, model that reality with nulls rather than plausible guesses.',
      'AI doesn\'t need to make every decision: the deterministic engine matters far more than the LLM; keep attribution auditable and reproducible.',
      'Real APIs are messy: design for the HTTP 429 and rate limits upfront rather than hiding them.',
      'Measure before you tune: profiling prompt token speed, hardware paths, and payload size beat blindly raising timeouts.',
      'Deployment changes the problem: cold starts, CORS policies, environment variables, remote databases, and cloud-vs-local AI all surfaced after localhost worked.'
    ],
    customSections: [
      {
        heading: '02 / THE IDEA',
        subheading: 'Evidence First, AI Last',
        content: `<p>The most important decision in the project: <strong>the LLM is not the source of truth.</strong> FlightPulse keeps four things separate:</p>
<div class="case-study-grid-cards">
  <div class="case-study-card">
    <strong>Carrier-reported reason</strong>
    <span>What the airline or source reported, e.g. WEATHER.</span>
  </div>
  <div class="case-study-card">
    <strong>Candidate cause</strong>
    <span>What the deterministic engine finds best supported by the evidence.</span>
  </div>
  <div class="case-study-card">
    <strong>Supporting evidence</strong>
    <span>Observed facts: gusts, visibility, FAA events, timing alignment.</span>
  </div>
  <div class="case-study-card">
    <strong>Confidence rating</strong>
    <span>HIGH, MEDIUM, LOW, or INSUFFICIENT. The LLM cannot override it.</span>
  </div>
</div>`
      },
      {
        heading: '03 / ARCHITECTURE',
        subheading: 'From Raw Data to Grounded Explanation',
        content: `<p>FlightPulse maintains a strict separation between the <strong>Evidence Path</strong> (where truth is established) and the <strong>Explanation Path</strong> (which only receives established findings).</p>
<div class="case-study-arch-flow">
  <div class="arch-flow-title">EVIDENCE PATH (Deterministic Truth)</div>
  <div class="arch-flow-steps">
    <div class="arch-step"><strong>External Data</strong><span>OpenSky · Open-Meteo · FAA NAS</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step"><strong>Python ETL</strong><span>Extract · Validate · Transform · Load</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step"><strong>PostgreSQL (Supabase)</strong><span>7 Core Tables · Provenance Tags</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step arch-step-highlight"><strong>Deterministic Delay Engine</strong><span>Candidate Cause Ranking · Confidence</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step"><strong>FastAPI Backend</strong><span>REST Endpoints · Caching</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step"><strong>React / Vite</strong><span>Operations Room UI</span></div>
  </div>

  <div class="arch-flow-title" style="margin-top: 18px;">EXPLANATION PATH (AI Briefing)</div>
  <div class="arch-flow-steps">
    <div class="arch-step arch-step-highlight"><strong>Evidence + Findings</strong><span>Established Facts Only</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step"><strong>Grounded Prompt</strong><span>Strict JSON Schema · No Extrapolation</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step"><strong>Ollama + Llama 3</strong><span>Local LLM</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step arch-step-success"><strong>Operational Briefing</strong><span>Structured Synthesized Dossier</span></div>
  </div>
</div>
<p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Top row: the evidence path. Bottom row: the explanation path, which only receives what the engine already established.</p>`
      },
      {
        heading: '04 / DATA LAYER',
        subheading: 'Three Pipelines, One Pattern',
        content: `<p>Each source follows extract, validate, transform, load, and analyze. I wanted the project to demonstrate authentic data engineering, not a frontend calling external APIs:</p>
<div class="case-study-grid-cards">
  <div class="case-study-card">
    <strong>Flights (OpenSky)</strong>
    <span>Retry with exponential backoff, 429 rate limit handling, callsign & timestamp validation, duplicate detection, upserts, dry-run mode, and fixture replay. 11 tests at initial validation.</span>
  </div>
  <div class="case-study-card">
    <strong>Weather (Open-Meteo)</strong>
    <span>Wind speed, gusts, visibility, temperature, and atmospheric conditions. Live checks on KORD, KATL, KDEN, and KJFK verified. 21 tests. Surface pressure isn't a METAR altimeter reading, so it isn't treated as one.</span>
  </div>
  <div class="case-study-card">
    <strong>Disruptions (FAA NAS / ATCSCC)</strong>
    <span>Ground stops, ground delay programs, airport equipment outages, and arrival/departure delays. 30 tests. Feed is US-focused.</span>
  </div>
</div>
<p style="margin-top: 12px;">Fixture runs demonstrated the pipeline executing correctly: one flight test run extracted 10 records, transformed 5, eliminated 1 duplicate, and skipped 4; a second live run updated existing rows instead of duplicating them.</p>`
      },
      {
        heading: '05 / DATABASE',
        subheading: 'Provenance Matters',
        content: `<p>PostgreSQL 17 (local development, Supabase production) with tables for <code>airports</code>, <code>airlines</code>, <code>flights</code>, <code>weather_observations</code>, <code>news_events</code>, <code>flight_events</code>, and <code>operations_sync_log</code>.</p>
<ul>
  <li><strong>UTC TIMESTAMPTZ:</strong> All temporal events stored in universal UTC with IANA airport time zone conversions for local displays.</li>
  <li><strong>JSONB Metadata:</strong> Flexible auxiliary payload storage for vendor-specific disruption metadata.</li>
  <li><strong>Source Provenance:</strong> Every flight record is tagged with its source (<code>FLIGHTAWARE</code>, <code>FIXTURE_REPLAY</code>, <code>OPENSKY_LIVE</code>) because live telemetry and benchmark test sets cannot casually share a table.</li>
  <li><strong>Protected Benchmarks:</strong> Benchmark flight UA415 is write-protected so live pipeline syncs can never overwrite ground truth.</li>
</ul>`
      },
      {
        heading: '06 / REASONING',
        subheading: 'Teaching the System to Say "I Don\'t Know"',
        content: `<p>The deterministic engine evaluates schedule metrics, delay durations, localized meteorological telemetry, FAA NAS disruption notices, and operational timeline events, weighing timing alignment and airport proximity.</p>
<p>It scores and ranks candidate causes:</p>
<div class="case-study-tags-row">
  <span class="tool-tag">WEATHER</span>
  <span class="tool-tag">ATC</span>
  <span class="tool-tag">AIRLINE_OPERATIONAL</span>
  <span class="tool-tag">LATE_AIRCRAFT</span>
  <span class="tool-tag">AIRPORT</span>
  <span class="tool-tag">UNKNOWN / INSUFFICIENT_EVIDENCE</span>
</div>
<p>Each attribution is returned with an evidence score, confidence level (<code>HIGH</code>, <code>MEDIUM</code>, <code>LOW</code>, <code>INSUFFICIENT</code>), supporting facts, and an auditable rationale. If supporting signals fall below an evidence threshold, it deliberately refuses to force a cause.</p>
<div class="case-study-callout">
  <strong>A Deliberately Hard Test:</strong>
  <p>Input: 105 min delay, carrier-reported as WEATHER.<br/>
  Data available: Weather and FAA data from the wrong time window.<br/>
  Engine output: <strong>UNKNOWN / INSUFFICIENT_EVIDENCE</strong>.<br/>
  <em>The system would rather be incomplete than confidently wrong. That test validated the entire engineering philosophy.</em></p>
</div>`
      },
      {
        heading: '07 / UA415 CASE STUDY',
        subheading: 'From Reported Reason to Verified Attribution',
        content: `<p><strong>United Airlines UA415:</strong> Chicago O'Hare (ORD) to Denver (DEN), 105 minutes departure delay, carrier-reported reason <code>WEATHER</code>.</p>
<div class="case-study-grid-cards">
  <div class="case-study-card">
    <strong>Carrier Reported</strong>
    <span>WEATHER</span>
  </div>
  <div class="case-study-card">
    <strong>FlightPulse Attribution</strong>
    <span>ATC / WEATHER INTERACTION</span>
  </div>
  <div class="case-study-card">
    <strong>Confidence Level</strong>
    <span>HIGH (Evidence Score: 1.00)</span>
  </div>
  <div class="case-study-card">
    <strong>Supporting Facts</strong>
    <span>14 Corroborated Evidence Points</span>
  </div>
</div>
<p style="margin-top: 12px;"><strong>Observed Evidence:</strong></p>
<ul>
  <li>Severe convective weather & thunderstorms active directly over ORD.</li>
  <li>Peak surface wind gusts reached ~42 kt with visibility collapsing to ~2.5 miles.</li>
  <li>FAA ground stop restriction issued for ORD airspace, cascading into flow-management delay programs.</li>
  <li>Airline operational dispatch events recorded subsequent gate turnaround adjustments.</li>
</ul>
<p class="case-study-note"><em>Note on metrics:</em> The <strong>1.00</strong> score is a deterministic evidence score representing complete multi-signal corroboration, not a "100% correlation" or absolute claim of singular causality. The evidence strongly supports an interaction between severe weather and ATC restrictions.</p>`
      },
      {
        heading: '08 / INVESTIGATION SCREENSHOT',
        subheading: 'Visual Evidence: The Investigation Screen',
        content: `<p>Below is the actual investigation view from FlightPulse running against the benchmark UA415 flight record:</p>
<figure class="case-study-figure">
  <img src="images/flightpulse-investigation.png" alt="FlightPulse investigation view with chronological flight timeline, METAR observations, FAA disruption advisory, and candidate cause scoring" loading="lazy" width="800" />
  <figcaption>The investigation screen pairs the chronological milestone timeline with METAR atmospheric telemetry, FAA NAS disruption notices, and candidate cause scoring (14 evidence facts).</figcaption>
</figure>`
      },
      {
        heading: '09 / THE AI ANALYST',
        subheading: 'Why the LLM Doesn\'t Decide',
        content: `<p>Local Ollama running Llama 3 receives <strong>only the facts the deterministic engine has already established</strong>. The model prompt enforces strict guardrails:</p>
<ul>
  <li>Use only the supplied facts — invent zero timeline events or statistics.</li>
  <li>Preserve the deterministic cause attribution and confidence rating without modification.</li>
  <li>Explicitly articulate uncertainty and data limitations.</li>
  <li>Output clean, validated JSON according to the application schema.</li>
</ul>
<p>The interface presents the output as an <strong>"Operational Briefing"</strong>, not a generic conversational chatbot.</p>
<p><strong>Deterministic Fallback:</strong> If Ollama is offline or unavailable (such as in cloud production where Render cannot connect to a local Ollama daemon), the dashboard surfaces the engine findings directly without interruption. The public deployment relies on the deterministic engine.</p>`
      },
      {
        heading: '10 / PERFORMANCE',
        subheading: 'When the AI Took 93 Seconds',
        content: `<p>Local inference initially took between 67 and 93 seconds. Simply increasing request timeouts was not an acceptable solution. Profiling the execution path identified four root bottlenecks:</p>
<ul>
  <li><strong>Bloated prompt:</strong> 4,741 characters (~1,235 tokens), with weather observations and event chronologies redundantly repeated.</li>
  <li><strong>Slow hardware path:</strong> ~55% CPU / 45% GPU executing at 4.2 to 4.5 tokens/sec, meaning every extraneous token added noticeable latency.</li>
  <li><strong>Stacked requests:</strong> React development re-renders and quick flight selection changes queued sequential inference requests, where two ~85s calls blew client timeouts.</li>
  <li><strong>Truncated output:</strong> A rigid <code>num_predict: 220</code> limit chopped the JSON mid-generation, causing decoding failures.</li>
</ul>
<p><strong>Architecture Optimizations:</strong></p>
<div class="case-study-stats-grid">
  <div><b>4,741 &rarr; 2,192</b><span>Prompt Characters (-54%)</span></div>
  <div><b>~1,235 &rarr; ~330</b><span>Prompt Tokens (-73%)</span></div>
  <div><b>93s &rarr; 42.3s</b><span>Cold Inference Latency</span></div>
  <div><b>&lt; 50ms</b><span>In-Memory Cached Queries</span></div>
</div>
<p style="margin-top: 14px;">Implemented fixes: lean prompt structure, <code>num_ctx: 1024</code>, reduced temperature, removed rigid token ceiling, per-flight concurrency locks, in-memory caching, startup prewarming, and client-side <code>AbortController</code> on route changes.</p>`
      },
      {
        heading: '11 / GOING LIVE',
        subheading: 'Honest Telemetry and an HTTP 429',
        content: `<p>OpenSky's departure endpoint yields raw ADS-B transponder telemetry (ICAO24, callsign, firstSeen, lastSeen, estimated airport coordinates) — not airline schedules, passenger delay minutes, or carrier delay categorizations.</p>
<p>An early prototype attempted to treat <code>firstSeen</code> as a scheduled departure. I rejected that: live records now keep scheduled times and delay fields as <code>NULL</code>, use <code>firstSeen</code> / <code>lastSeen</code> as actual observed times, and tag rows as <code>OPENSKY_LIVE</code>.</p>
<p>In a live trial against KORD, 125 raw flights returned and transformed 0: 73 lacked airport codes and 54 had unidentified airlines. The strict rules designed for demo data broke against raw telemetry. I bifurcated the pipeline: strict validation for commercial data, tolerant nullable ingestion for live transponder feeds.</p>
<p>Later, OpenSky returned HTTP 429 with an 80,603-second retry window (~22.4 hours). The dashboard does not disguise this failure: it transparently displays <code>OPENSKY: RATE LIMITED</code>, weather OK, FAA OK, status <code>PARTIAL</code>, and manufactures zero synthetic flights. That is why FlightPulse features separate <strong>DEMO</strong> and <strong>LIVE</strong> operational modes backed by <code>operations_sync_log</code>.</p>`
      },
      {
        heading: '12 / THE DASHBOARD',
        subheading: 'An Operations Room, Not a Chatbot',
        content: `<p>The initial prototype looked like a generic AI SaaS template: purple gradients, glowing cards, and a prominent chat bubble. I discarded it. The operational reality demanded an airport dispatch terminal aesthetic: linen background, charcoal text, terracotta accents, thin borders, and compact typography.</p>
<figure class="case-study-figure">
  <img src="images/flightpulse-dashboard.png" alt="FlightPulse operations room dashboard showing dispatch search, active matches, and live flight telemetry" loading="lazy" width="800" />
  <figcaption>FlightPulse Dashboard: Dispatch search, active flight list (AA2401 +45m, UA415 +105m), carrier-reported reasons, and grounded operational dossier.</figcaption>
</figure>
<p style="margin-top: 14px;">The single monolithic file was refactored into focused modular components: <code>Header</code>, <code>FlightSearch</code>, <code>FlightList</code>, <code>FlightHeader</code>, <code>AnalystBrief</code>, <code>FlightTimeline</code>, <code>WeatherPanel</code>, <code>DisruptionPanel</code>, and <code>CandidateBreakdown</code>.</p>`
      },
      {
        heading: '13 / DEPLOYMENT',
        subheading: 'Vercel, Render, Supabase',
        content: `<div class="case-study-arch-flow">
  <div class="arch-flow-title">PRODUCTION TOPOLOGY</div>
  <div class="arch-flow-steps">
    <div class="arch-step"><strong>User Client</strong><span>Browser</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step"><strong>Vercel</strong><span>React / Vite Dashboard</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step"><strong>Render</strong><span>FastAPI Python Service</span></div>
    <div class="arch-arrow">&rarr;</div>
    <div class="arch-step arch-step-highlight"><strong>Supabase</strong><span>PostgreSQL 17 Database</span></div>
  </div>
</div>
<p style="margin-top: 12px;">Local development adds the connection: <code>FastAPI &rarr; Ollama &rarr; Llama 3</code>. The public cloud deployment falls back to the deterministic attribution engine.</p>
<p>Database migration preserved 13 flights, 8 airports, 5 airlines, weather observations, FAA disruption events, and sync logs, with benchmark UA415 protected. Verification: 103 of 103 backend tests passed (5 warnings, 0 failures), 0 frontend lint errors, and zero orphaned database foreign keys.</p>`
      },
      {
        heading: '14 / WHAT BROKE',
        subheading: 'Limitations, Stated Plainly',
        content: `<ul>
  <li><strong>OpenSky Rate Limits:</strong> Public unauthenticated telemetry cannot sustain continuous live streams without hitting 24-hour rate limits.</li>
  <li><strong>Incomplete ADS-B Metadata:</strong> Live transponder feeds frequently omit destination or equipment identity, and the system refuses to guess.</li>
  <li><strong>Aircraft Rotation Gaps:</strong> Detecting cascading late-aircraft delays requires fetching the inbound leg.</li>
  <li><strong>Airport-Level Scope:</strong> En-route convective storms and waypoint airspace polygons are not yet evaluated.</li>
  <li><strong>Local LLM in Cloud:</strong> Render free-tier hosting cannot run local Llama 3 models; the public demo uses the deterministic engine.</li>
  <li><strong>Render Free-Tier Spin-Up:</strong> The backend goes to sleep after inactivity; initial cold requests take 30–50 seconds to wake up.</li>
  <li><strong>US-Centric Disruptions:</strong> The FAA NAS / ATCSCC feed is limited to United States airspace.</li>
</ul>`
      },
      {
        heading: '15 / NEXT',
        subheading: 'What I\'d Build Next',
        content: `<p>Future roadmap iterations planned for FlightPulse:</p>
<ul>
  <li>Integration with commercial aviation data feeds that include published schedules and verified tail numbers.</li>
  <li>Multi-leg aircraft rotation analysis for automated <code>LATE_AIRCRAFT</code> root-cause attribution.</li>
  <li>Geospatial en-route convective weather mapping overlaid across active flight paths.</li>
  <li>Native METAR/TAF parser for raw weather station telegraphic reports.</li>
  <li>Hosted cloud inference service for low-latency operational briefings.</li>
  <li>Automated cron-scheduled ingestion pipelines replacing on-demand sync triggers.</li>
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
