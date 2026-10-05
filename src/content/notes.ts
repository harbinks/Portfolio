export interface Note {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export const notes: Note[] = [
  {
    slug: 'building-rag-from-scratch',
    title: 'What I Learned Building a RAG Pipeline from Scratch',
    date: '2025-10-15',
    excerpt: 'Building a retrieval-augmented generation system taught me more about LLMs than any course. Here are the real lessons from shipping one.',
    tags: ['RAG', 'LangChain', 'LLMs', 'Python'],
    content: `<h2>Why RAG Matters</h2>
<p>Large language models are incredible at generating text, but they hallucinate. They make things up with total confidence. Retrieval-Augmented Generation (RAG) solves this by grounding the LLM's answers in actual documents — your documents.</p>
<p>When I built my RAG-based AI assistant, I wanted a system where users could upload documents and ask questions that get answered using the actual content, not the model's training data.</p>

<h2>The Architecture That Worked</h2>
<p>The pipeline has three stages:</p>
<ul>
<li><strong>Ingestion</strong>: Documents get chunked into smaller pieces (I used 500-token chunks with 50-token overlap) and converted into vector embeddings using a sentence transformer model.</li>
<li><strong>Retrieval</strong>: When a user asks a question, the query gets embedded and FAISS finds the most similar document chunks using cosine similarity.</li>
<li><strong>Generation</strong>: The retrieved chunks are passed as context to the LLM, which generates an answer grounded in the actual document content.</li>
</ul>

<h2>The Chunk Size Trap</h2>
<p>My biggest lesson: chunk size makes or breaks retrieval quality. Too small (100 tokens) and you lose context — the model gets sentence fragments that don't make sense. Too large (2000 tokens) and you dilute relevance — the chunk contains too much unrelated information.</p>
<p>I settled on 500 tokens with 50-token overlap after testing extensively. The overlap ensures that information at chunk boundaries doesn't get lost.</p>

<h2>What I'd Do Differently</h2>
<p>If I rebuilt this today, I'd add a re-ranking step after retrieval. FAISS gives you the top-k similar chunks, but similarity doesn't always mean relevance. A cross-encoder re-ranker would filter noise before it reaches the LLM.</p>
<p>I'd also add metadata filtering — letting users specify date ranges or document types to narrow the search space.</p>`,
  },
  {
    slug: 'community-building-lessons',
    title: 'Growing a Community from 0 to 400+ Members',
    date: '2025-08-20',
    excerpt: 'What I learned co-founding @interviewkit — a job discovery community built from scratch with zero budget and pure hustle.',
    tags: ['Community', 'Growth', 'Product', 'Edtech'],
    content: `<h2>Starting from Zero</h2>
<p>When we started @interviewkit, we had no audience, no platform, no budget. Just a WhatsApp group and a belief that fresh graduates needed better job-prep resources. The first 50 members came from personal outreach — DMs to college batchmates, LinkedIn messages, and word of mouth.</p>

<h2>Content Is the Product</h2>
<p>We quickly learned that a community without consistent value dies. People join for the promise but stay for the content. We built a content cadence: daily job alerts, weekly interview tips, bi-weekly resume review sessions, and monthly mock interviews.</p>
<p>The key insight: <strong>consistency beats quality in the early days.</strong> A "good enough" daily post creates more habit and trust than a perfect weekly one.</p>

<h2>What Worked for Growth</h2>
<p>Three things drove our growth from 50 to 400+:</p>
<ul>
<li><strong>Direct outreach</strong>: Personally messaging people in relevant LinkedIn and WhatsApp groups. Not spamming — having actual conversations about their job search.</li>
<li><strong>Member referrals</strong>: When members found value, they brought friends. We made sharing easy and incentivized it with exclusive content.</li>
<li><strong>Platform expansion</strong>: Moving from WhatsApp-only to web channels broadened our reach beyond immediate networks.</li>
</ul>

<h2>The 0-to-1 Lesson</h2>
<p>Building @interviewkit taught me something no technical project could: how to ship without waiting for perfection, how to listen to users, and how to iterate based on real feedback. It's the most transferable skill I've gained alongside ML engineering.</p>`,
  },
  {
    slug: 'ml-model-production-gap',
    title: 'The Gap Between ML Notebooks and Production',
    date: '2025-06-10',
    excerpt: 'Training a model in Jupyter is the easy part. Here\'s what I learned about the hard parts — deployment, monitoring, and making models actually useful.',
    tags: ['Machine Learning', 'Deployment', 'Streamlit', 'Production'],
    content: `<h2>The Notebook Illusion</h2>
<p>In college, ML feels like this: load a dataset, train a model, check the accuracy, done. But when I deployed my Employee Attrition Prediction app with Streamlit, I realized the notebook was maybe 20% of the actual work.</p>

<h2>What the Other 80% Looks Like</h2>
<p>The real work includes:</p>
<ul>
<li><strong>Input validation</strong>: Users will enter impossible values. Age = -5. Salary = "banana". Your app needs to handle everything gracefully.</li>
<li><strong>Feature encoding</strong>: The model expects encoded inputs, but users enter raw values. You need the exact same encoding pipeline used during training.</li>
<li><strong>Explainability</strong>: A prediction of "high attrition risk" is useless without context. HR teams need to know <em>why</em> — which factors are driving the prediction.</li>
<li><strong>Edge cases</strong>: What happens when a feature is missing? When the input distribution is wildly different from training data?</li>
</ul>

<h2>Class Imbalance Is Real</h2>
<p>In my attrition dataset, about 16% of employees had churned. A model that always predicts "no attrition" gets 84% accuracy. Impressive on paper, completely useless in practice.</p>
<p>I used class-balanced logistic regression to weight the minority class higher. It dropped overall accuracy slightly but pushed recall to 77% — meaning we catch 77% of actual attrition cases. For HR, catching true positives matters far more than overall accuracy.</p>

<h2>Streamlit Changed My Perspective</h2>
<p>Streamlit is genuinely amazing for ML deployment. In under 100 lines, you get a functional web app with inputs, predictions, and visualizations. It's not production-grade infrastructure, but it bridges the gap between "model in a notebook" and "tool someone can actually use."</p>`,
  },
  {
    slug: 'why-feature-engineering-matters',
    title: 'Feature Engineering > Model Selection',
    date: '2025-04-15',
    excerpt: 'After multiple internships and projects, I\'m convinced: the choice of features matters more than the choice of algorithm. Here\'s why.',
    tags: ['Data Science', 'Feature Engineering', 'ML'],
    content: `<h2>The Model Shopping Trap</h2>
<p>When I started with ML, I spent hours comparing algorithms. Should I use Random Forest or XGBoost? Neural network or SVM? I'd tune hyperparameters for days trying to squeeze out 0.5% more accuracy.</p>
<p>Then during my internship at Wayeva Technologies, working on traffic flow prediction, I learned the real lesson: <strong>good features on a simple model beat bad features on a complex model, every time.</strong></p>

<h2>What Good Features Look Like</h2>
<p>For the traffic prediction pipeline, raw features like timestamp and sensor readings were mediocre predictors. But engineered features changed everything:</p>
<ul>
<li><strong>Time decomposition</strong>: Extracting hour-of-day, day-of-week, is-holiday, is-rush-hour from timestamps</li>
<li><strong>Rolling statistics</strong>: 15-min, 30-min, 1-hour rolling averages of traffic volume</li>
<li><strong>Lag features</strong>: Traffic volume at the same time yesterday, last week</li>
<li><strong>Interaction features</strong>: Combinations like rush-hour × rain, weekday × location</li>
</ul>
<p>With these features, even a basic linear model performed reasonably well. Without them, even gradient boosting struggled.</p>

<h2>The EDA Investment</h2>
<p>The boring step — exploratory data analysis — is where the magic happens. Plotting distributions, checking correlations, visualizing patterns over time. This is where you discover that "number of overtime hours" is a stronger churn predictor than "salary," or that traffic patterns on public holidays look completely different from weekends.</p>
<p>I now spend 60% of project time on EDA and feature engineering, 20% on modeling, and 20% on evaluation and deployment. It was the opposite when I started.</p>`,
  },
  {
    slug: 'upsc-aspirants-phone-classroom',
    title: 'UPSC aspirants can’t quit their phones. The phone is their classroom.',
    date: '2026-10-05',
    excerpt: 'UPSC preparation now happens on phones. The challenge is keeping aspirants focused while they use the lectures, notes, and current affairs their study depends on.',
    tags: ['UPSC', 'Edtech', 'Focus', 'Product Research'],
    content: `<p><strong>By Harbin · AI/ML graduate · October 2026</strong></p>
<p><em>Last December, serving IAS officers told a room of aspirants in Trichy that self-discipline matters more than knowledge, and warned them off social media. Good advice. But it hands aspirants a problem without a tool.</em></p>
<p>For a modern UPSC aspirant, telling them to “limit mobile use” is like telling a student to limit their textbooks. The phone is where the lectures, notes, and current affairs live. The real question is not how to get them off the phone, but how to keep them focused while they are on it.</p>

<h2>1. Aspirants study on their phones</h2>
<p>A primary survey of about 300 UPSC aspirants in Delhi found how central digital tools are to preparation.</p>
<h3>How Delhi aspirants prepare</h3>
<div role="img" aria-label="About 90 percent use YouTube as their main classroom, 70 percent use Telegram for notes, and 56 percent prefer digital study to coaching centres.">
<p>YouTube as main classroom · ~90%<br/><progress value="90" max="100">90%</progress></p>
<p>Telegram for notes · ~70%<br/><progress value="70" max="100">70%</progress></p>
<p>Prefer digital to coaching centres · ~56%<br/><progress value="56" max="100">56%</progress></p>
</div>
<p><small>Source: TPMap survey of UPSC aspirants in Delhi (n≈300), as summarised in the research brief.</small></p>

<h2>2. The same phone is the biggest obstacle</h2>
<p>Studying through YouTube means studying inside an algorithm built to keep you watching. In a study of UPSC aspirants aged 18 to 32, the top challenge of YouTube-based preparation was not poor content. It was distraction.</p>
<h3>Biggest obstacle to YouTube-based UPSC preparation</h3>
<p>Non-educational videos · 58.4%<br/><progress value="58.4" max="100">58.4%</progress></p>
<p>Everything else · 41.6%<br/><progress value="41.6" max="100">41.6%</progress></p>
<p><small>Source: “The Role of YouTube in Preparing for Competitive Exams” (JMSR), as cited in the research brief.</small></p>

<h2>3. It’s not about hours alone</h2>
<p>A 2024 study of 89 civil service aspirants (Fatima &amp; Pradhan, IJFMR) found that social media use affected one dimension of wellbeing significantly: mental wellbeing. Heavy users (6+ hours a day) fared worse than light users (1 to 2 hours). The 1 to 2 hour group did better than people who used social media for under an hour, and better than those above two. Short, deliberate use may work like a break, not a threat.</p>
<h3>Shape of the finding (illustrative, not exact scores)</h3>
<div style="overflow-x:auto"><svg viewBox="0 0 520 220" role="img" aria-label="Illustrative curve: mental wellbeing is highest at 1 to 2 hours of social media a day and lowest above 6 hours" style="max-width:100%;height:auto">
<line x1="50" y1="180" x2="500" y2="180" stroke="#e5e1d8" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="180" stroke="#e5e1d8" stroke-width="2"/>
<polyline fill="none" stroke="#1f3a5f" stroke-width="4" stroke-linejoin="round" points="90,110 190,50 290,95 390,140 470,165"/>
<circle cx="90" cy="110" r="6" fill="#1f3a5f"/><circle cx="190" cy="50" r="8" fill="#b8893b"/><circle cx="290" cy="95" r="6" fill="#1f3a5f"/><circle cx="390" cy="140" r="6" fill="#1f3a5f"/><circle cx="470" cy="165" r="6" fill="#9b2c2c"/>
<g font-family="sans-serif" font-size="13" fill="#0f1b2d"><text x="90" y="202" text-anchor="middle">&lt;1 hr</text><text x="190" y="202" text-anchor="middle">1–2 hrs</text><text x="290" y="202" text-anchor="middle">2–4 hrs</text><text x="390" y="202" text-anchor="middle">4–6 hrs</text><text x="470" y="202" text-anchor="middle">6+ hrs</text><text x="190" y="36" text-anchor="middle">best</text><text x="470" y="152" text-anchor="middle">worst</text><text x="12" y="105" transform="rotate(-90 12 105)" text-anchor="middle">mental wellbeing</text></g></svg></div>
<p><small>The paper reports significant differences for 1–2 hrs vs 6+ hrs and a better result for 1–2 hrs than for under 1 hr and over 2 hrs. It does not publish a score per band, so this curve shows direction only; intermediate points are an interpolation. Small sample (n=89), convenience sampling, online form.</small></p>

<h2>4. Why willpower alone loses</h2>
<p>Research on Indian students describes a loop: stress pushes students toward digital escape, escape damages sleep and mood, and low mood lowers study effort, which brings more stress (IJNRD, 2025). Add platform design such as infinite scroll and variable notifications, and the loop is hard to break by intention alone. Willpower is being asked to beat a system engineered against it.</p>
<h3>The distraction loop</h3>
<div style="overflow-x:auto"><svg viewBox="0 0 520 300" role="img" aria-label="Cycle: exam stress leads to escape to the phone, worse sleep and mood, less study effort, and back to more stress" style="max-width:100%;height:auto">
<defs><marker id="upsc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5f6b7a"/></marker></defs>
<g stroke="#5f6b7a" stroke-width="2" fill="none" marker-end="url(#upsc-arrow)"><path d="M300,48 C360,48 400,70 410,100"/><path d="M410,160 C410,200 380,232 320,246"/><path d="M200,246 C140,246 110,215 110,175"/><path d="M110,125 C110,80 150,52 200,48"/></g>
<g font-family="sans-serif" font-size="14" text-anchor="middle" fill="#0f1b2d"><rect x="200" y="22" width="100" height="52" rx="10" fill="#fff" stroke="#9b2c2c" stroke-width="2"/><text x="250" y="45">Exam</text><text x="250" y="63">stress</text><rect x="360" y="100" width="100" height="60" rx="10" fill="#fff" stroke="#1f3a5f" stroke-width="2"/><text x="410" y="126">Escape to</text><text x="410" y="144">the phone</text><rect x="190" y="220" width="130" height="52" rx="10" fill="#fff" stroke="#1f3a5f" stroke-width="2"/><text x="255" y="243">Worse sleep</text><text x="255" y="261">and mood</text><rect x="60" y="100" width="100" height="60" rx="10" fill="#fff" stroke="#1f3a5f" stroke-width="2"/><text x="110" y="126">Less study</text><text x="110" y="144">effort</text><text x="260" y="152" font-size="13" fill="#5f6b7a">repeat</text></g></svg></div>
<p><small>Loop as described in “Learned Helplessness in the Age of Digital Addiction” (IJNRD, 2025).</small></p>

<h2>5. What this means for a product like SuperKalam</h2>
<p>SuperKalam already sells discipline: daily targets, mentor-style evaluation, and revision tracking. The research suggests the next layer is <strong>focus inside the session</strong>. Not a blanket block, since aspirants need their phones, but a guided session tied to actual study work.</p>
<h3>A Focus Mode concept</h3>
<ol><li><strong>Pick a task.</strong> Start from today’s target: a set of MCQs, an answer to write, or a topic to revise.</li><li><strong>Time-box it.</strong> A 25 to 50 minute session with notifications muted and a short planned break at the end.</li><li><strong>Keep the study tools open.</strong> Lectures, notes, and practice stay available; feeds and unrelated video do not.</li><li><strong>Close the loop.</strong> Show what got done in the session (questions attempted, accuracy, words written), so the win is visible.</li><li><strong>Learn from it.</strong> Over time, see which session lengths and times of day lead to better accuracy.</li></ol>
<blockquote><p>The goal isn’t less phone. It’s more of the phone time that actually moves the score.</p></blockquote>

<h2>What I’d test first</h2>
<ul><li>Interview 15 serious aspirants (6+ months into preparation) about their phone routines and what has failed before.</li><li>Survey users on hours of use, top distracting apps, and how they cope today.</li><li>If a focus feature ships, compare MCQ accuracy and answer-writing frequency for users who use it against those who don’t.</li></ul>

<h2>Limits of this evidence</h2>
<p>Most of the hard data here comes from small or non-UPSC samples. The wellbeing study has 89 participants and found no significant effect for gender or number of attempts. The 60% smartphone-addiction figure often quoted in Indian studies is for medical students, so it is not used here as a UPSC number. Treat these findings as a strong reason to test, not proof of the outcome.</p>

<h2>Sources</h2>
<p><small>Fatima, M. &amp; Pradhan, M. (2024), “Gender, Number of Attempts and Social Media Usage as Correlates of Wellbeing among Civil Service Aspirants,” IJFMR 6(4). · Rastogi, D. (2026), “Smartphone Addiction in India Among the Youth Population,” Social Science Archives 4(3). · TPMap Delhi aspirant survey; JMSR YouTube study; IJNRD (2025) “Learned Helplessness in the Age of Digital Addiction,” all as summarised in the research brief. · Times of India, “Limit mobile use, develop self-discipline, IAS officers tell UPSC aspirants,” Dec 21, 2025.</small></p>`,
  },
];
