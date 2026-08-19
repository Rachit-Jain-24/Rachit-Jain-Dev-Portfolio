// ─── All project media lives in /public/projects/<slug>/ ─────────────────────

export type Screenshot = { src: string; caption: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  stack: string[];
  highlight?: string;
  architectureImage?: string;
  paper?: string;
  decisions: string[];
  results: { label: string; value: string }[];
  demoNote: string;
  demoMedia?: string;
  screenshots?: Screenshot[];
  cover?: string;
  repo?: string;
  details?: {
    abstract?: string;
    methodology?: string[];
    awsServices?: Array<{ service: string; usage: string; cost: string }>;
    limitations?: Array<{ area: string; issue: string; improvement: string }>;
    futureScope?: string[];
  };
};

export const profile = {
  name: "Rachit Jain",
  role: "AI Engineer | GenAI • RAG • Agentic AI • AWS",
  tagline: "I build practical AI systems using LLMs, RAG, and cloud infrastructure, while exploring agentic architectures and LLM internals.",
  education: "B.Tech Computer Science & Engineering (Data Science), NMIMS Hyderabad · Graduated May 2026",
  certification: "AWS Certified Cloud Practitioner • 2026 • AWS Academy Cloud Architecting • 2026 • AWS Academy GenAI Foundations • 2026",
  email: "mailto:rachitshaileshjain@gmail.com",
  github: "https://github.com/Rachit-Jain-24",
  linkedin: "https://www.linkedin.com/in/rachitjain24",
  resume: "https://drive.google.com/file/d/1A49U8c4HwSkHCx_BeTzVaMMqgzIkwo94/view?usp=drive_link",
  profilePhoto: "/newprofilephoto.jpeg",
  stats: [
    { value: "91%", label: "RAG Benchmark Accuracy" },
    { value: "200+", label: "Students Using Campus2Career" },
    { value: "2", label: "IEEE Publications" },
  ],
};

export const journey = [
  {
    year: "2022",
    title: "Started Computer Science",
    body: "Programming, software development and data foundations.",
  },
  {
    year: "2023",
    title: "Software & Data Foundations",
    body: "Python, SQL, application development and data science.",
  },
  {
    year: "2024",
    title: "AI & Machine Learning",
    body: "NLP, RAG and intelligent applications.",
  },
  {
    year: "2025",
    title: "AI Engineering",
    body: "RAG systems, AWS, software projects and professional experience.",
  },
  {
    year: "2026",
    title: "B.Tech CSDS Graduate · Open to Hire",
    body: "Graduated May 2026. Building AI-powered products and pursuing AI/ML engineering opportunities.",
  },
];

export const projects: Project[] = [
  {
    slug: "campus-assistant",
    name: "Campus Assistant",
    tagline: "Federated RAG System · IEEE ICoECIT 2026",
    problem:
      "Multilingual campus AI assistant using domain-specific Federated RAG and context-aware routing to improve retrieval relevance and reduce hallucinations.",
    stack: ["Python", "AWS Bedrock", "Mixtral", "FAISS", "LangChain", "S3", "Textract", "Titan Embeddings"],
    highlight: "IEEE ICoECIT 2026",
    architectureImage: "/projects/campus-assistant/architecture flow.png",
    decisions: [
      "Federated per-department indexes instead of one monolithic vector store — keeps ownership and retrieval precision local.",
      "Trilingual query normalization before embedding, so recall does not collapse on code-mixed input.",
      "Whisper STT front-end for voice queries on low-literacy paths.",
      "Grounding-check pass that refuses to answer when retrieved support falls below threshold.",
    ],
    results: [
      { label: "Benchmark accuracy", value: "91%" },
      { label: "Hallucination rate", value: "3%" },
      { label: "Contextual relevance", value: "61% → 89%" },
    ],
    demoNote: "Demo video — full end-to-end walkthrough.",
    demoMedia: "/projects/campus-assistant/campus assistant demo - Made with Clipchamp.mp4",
    cover: "/projects/campus-assistant/user_chat_interface.png",
    screenshots: [
      { src: "/projects/campus-assistant/first_interface_chat.jpg",    caption: "Chat interface — first interaction on the NMIMS Hyderabad site" },
      { src: "/projects/campus-assistant/user_chat_interface.png",     caption: "Full user chat interface with citation chips" },
      { src: "/projects/campus-assistant/hindi.jpg",                   caption: "Hindi language support — trilingual onboarding" },
      { src: "/projects/campus-assistant/user_conversational_flow.png",caption: "End-to-end conversational flow" },
      { src: "/projects/campus-assistant/query_classification.png",    caption: "Query classification and department routing" },
      { src: "/projects/campus-assistant/end_to_end_query.png",        caption: "End-to-end query resolution with grounding check" },
      { src: "/projects/campus-assistant/admin_interface.png",         caption: "Admin portal — knowledge base management" },
      { src: "/projects/campus-assistant/knowledgebase_interface.png", caption: "Knowledge base ingestion and rebuild UI" },
      { src: "/projects/campus-assistant/Figure_4_1_1.png",            caption: "System evaluation — Figure 4.1.1" },
      { src: "/projects/campus-assistant/Figure_4_1_2.png",            caption: "Accuracy metrics — Figure 4.1.2" },
    ],
    paper: "/projects/campus-assistant/campusassistant_paper.pdf",
    repo: "https://github.com/Rachit-Jain-24",
  },
  {
    slug: "campus2career",
    name: "Campus2Career",
    tagline: "AI Virtual Placement Assistant",
    problem:
      "AI-powered career and placement platform helping students evaluate readiness, improve resumes, identify skill gaps and receive personalized career guidance.",
    stack: ["React", "FastAPI", "PostgreSQL", "RAG", "LLM APIs", "GitHub Actions", "Firebase"],
    highlight: "200+ Students · 28 Functional Modules",
    architectureImage: "/projects/campus2career/systemarch.png",
    decisions: [
      "Three-model LLM fallback chain (Claude 3.5 Sonnet → Llama 3 70B → Mistral 7B) keeps the assistant online through provider rate limits and model-specific outages.",
      "Module-scoped retrieval across 28 curriculum modules for tight context and precise answers about course content, evaluation patterns, and placement requirements.",
      "FastAPI streaming responses for perceived latency under a second — students see typing indicators while the model reasons.",
      "Hybrid retrieval: BM25 for exact clause matching (e.g., 'attendance 75%') + dense embeddings for conceptual queries (e.g., 'how to prepare for HR round').",
    ],
    results: [
      { label: "Students", value: "200+" },
      { label: "Functional modules", value: "28" },
    ],
    demoNote: "Demo video — full end-to-end walkthrough.",
    demoMedia: "/projects/campus2career/demo.mp4",
    cover: "/projects/campus2career/campus2career_intro.png",
    screenshots: [
      { src: "/projects/campus2career/studentportal.png", caption: "Student dashboard — placement readiness overview and progress tracking" },
      { src: "/projects/campus2career/ai_career_advisor.png", caption: "AI career advisor chat interface — ask anything about placements, resume, or interviews" },
      { src: "/projects/campus2career/career roadmap.png", caption: "4-year career roadmap with milestone tracking and skill gap recommendations" },
      { src: "/projects/campus2career/4year roadmap.png", caption: "Interactive 4-year roadmap showing semester-wise preparation plan" },
      { src: "/projects/campus2career/batch analytics.png", caption: "Batch analytics — placement trends, top hiring companies, and average packages" },
      { src: "/projects/campus2career/student_onboarding_flow.png", caption: "Student onboarding flow — profile setup and career preference collection" },
      { src: "/projects/campus2career/resume analyis.png", caption: "Resume analysis with ATS scoring and skill gap identification" },
      { src: "/projects/campus2career/interview.png", caption: "Interview preparation module — common questions and best practices" },
      { src: "/projects/campus2career/mock interview.png", caption: "Mock interview session with AI interviewer feedback" },
      { src: "/projects/campus2career/code console.png", caption: "Technical coding practice interface with real-time evaluation" },
      { src: "/projects/campus2career/readiness_Score.png", caption: "Placement readiness score breakdown — resume, technical, and soft skills" },
      { src: "/projects/campus2career/program chair dashboard.png", caption: "Program chair dashboard — student performance tracking and intervention alerts" },
      { src: "/projects/campus2career/student registration.png", caption: "Student registration and profile creation flow" },
      { src: "/projects/campus2career/database_entity_diagram.png", caption: "Database schema — student profiles, modules, placements, and interactions" },
      { src: "/projects/campus2career/Screenshot 2026-04-30 121046.png", caption: "Search interface — find placement questions, company patterns, and preparation tips" },
    ],
    repo: "https://github.com/Rachit-Jain-24",
    details: {
      abstract: "A comprehensive AI-powered placement assistance platform that helps NMIMS Hyderabad students prepare for campus placements through personalized guidance, resume analysis, mock interviews, and module-specific curriculum queries. The system provides 24/7 chat-based assistance using a multi-model LLM fallback chain and hybrid retrieval over the entire curriculum.",
      methodology: [
        "Student onboarding captures academic history, skills, and career preferences",
        "Hybrid retrieval combines BM25 keyword search with dense vector embeddings for curriculum content",
        "Three-tier LLM fallback ensures availability: Claude 3.5 Sonnet → Llama 3 70B → Mistral 7B",
        "Module-scoped retrieval limits context to relevant courses and placement modules",
        "Resume upload triggers ATS scoring, skill extraction, and gap analysis against target roles",
        "AI career advisor answers questions about syllabus, evaluation patterns, and industry expectations",
        "4-year career roadmap generates personalized preparation plans based on current semester and goals",
        "Mock interview module simulates HR and technical interviews with performance feedback",
        "Admin dashboard provides batch analytics, readiness scores, and intervention alerts",
        "FastAPI streaming responses deliver typing indicators for perceived low latency",
      ],
      limitations: [
        { area: "NLP Understanding", issue: "Limited to curriculum-based knowledge; cannot answer general career advice outside syllabus", improvement: "Integrate general career guidance knowledge base alongside curriculum" },
        { area: "Resume Parsing", issue: "Currently extracts basic details; lacks deep section parsing for achievements", improvement: "Implement spaCy-based resume section extraction for projects and achievements" },
        { area: "User Engagement", issue: "No gamification or progress tracking incentives", improvement: "Add badges, leaderboards, and streak tracking for daily engagement" },
        { area: "Interview Simulation", issue: "Text-based only; no video or voice interview capability", improvement: "Add Whisper STT and video recording for realistic interview simulation" },
        { area: "Company-Specific Prep", issue: "Limited company interview experience data", improvement: "Incorporate LeetCode, Glassdoor, and interview分享 from alumni" },
      ],
      futureScope: [
        "Advanced NLP: Implement BERT-based section extraction and resume optimization suggestions",
        "Video Interviews: Add video recording and Whisper STT for realistic interview practice",
        "Gamification: Badge system, streak tracking, and peer comparison leaderboards",
        "Company Data: Scrape and integrate company-specific interview experiences and patterns",
        " Alumni Network: Connect students with alumni for mentorship and referral tracking",
        "Skill Badges: Issue verifiable skill badges based on assessment performance",
      ],
    },
  },
  {
    slug: "smart-resume-evaluator",
    name: "Smart Resume Evaluator",
    tagline: "Serverless ATS Scoring Pipeline · IEEE ICoECIT 2026",
    problem:
      "Cloud-based resume evaluation system using AWS Textract and TF-IDF/cosine similarity to evaluate resume-job alignment.",
    stack: ["Python", "Streamlit", "AWS Textract", "S3", "DynamoDB", "SNS", "TF-IDF"],
    highlight: "AWS Mini Project",
    architectureImage: "/projects/smart-resume-evaluator/aws_services_flow.png",
    decisions: [
      "Textract for layout-aware parsing instead of naive PDF text extraction — preserves table structure and formatting clues ATS uses.",
      "TF-IDF scoring against the job description keeps results explainable — cosine similarity quantifies how well resume skills match JD keywords.",
      "Event-driven SNS notifications decouple scoring from delivery — admin gets email summaries without blocking the scoring flow.",
      "DynamoDB for zero-ops storage of evaluation history — no database provisioning, automatic scaling, and built-in backup.",
      "S3 for immutable file storage — resumes and evaluation reports stored permanently with versioning enabled.",
    ],
    results: [
      { label: "Scoring", value: "Explainable TF-IDF" },
      { label: "Infrastructure", value: "Fully serverless (AWS)" },
      { label: "Parse engine", value: "AWS Textract" },
      { label: "Delivery", value: "SNS event-driven" },
    ],
    demoNote: "Demo video — full end-to-end walkthrough.",
    demoMedia: "/projects/smart-resume-evaluator/smart-resume-evaluator-demo.mp4",
    cover: "/projects/smart-resume-evaluator/UI_1.png",
    paper: "/projects/smart-resume-evaluator/VCC-PROJECT REPORT final[1].pdf",
    screenshots: [
      { src: "/projects/smart-resume-evaluator/UI_1.png", caption: "Streamlit interface — resume upload, job role selection, and AWS credential input" },
      { src: "/projects/smart-resume-evaluator/ats_score.png", caption: "ATS score breakdown with visual indicator — score ≥80 passes, below 80 triggers improvement suggestions" },
      { src: "/projects/smart-resume-evaluator/missing_skills_learning_resources.png", caption: "Skill gap analysis — present skills highlighted in green, missing skills with YouTube/Coursera learning resources" },
      { src: "/projects/smart-resume-evaluator/Analysis_1.png", caption: "Evaluation results dashboard — shows extracted details, skill match percentage, and report summary" },
      { src: "/projects/smart-resume-evaluator/s3bucket.png", caption: "S3 bucket storage — resumes and generated reports stored with versioning enabled" },
      { src: "/projects/smart-resume-evaluator/admin_portsal.png", caption: "Admin portal — view all evaluations, download reports, manage student data" },
    ],
    repo: "https://github.com/Rachit-Jain-24",
    details: {
      abstract: "A Streamlit-based web application that analyzes resumes, matches them against job-specific skill sets, and provides an ATS score along with actionable feedback to help users improve their chances of getting shortlisted.",
      methodology: [
        "User uploads resume through Streamlit web interface",
        "AWS Textract extracts raw text content from PDF — handles scanned documents with OCR",
        "Backend logic extracts personal details (name, email, projects) and skills from resume",
        "Resume content is compared against predefined job role skill sets stored in JSON file",
        "TF-IDF vectorization + cosine similarity calculates ATS alignment score",
        "System identifies present and missing skills with YouTube/Coursera learning resource links",
        "Evaluation report is generated and uploaded to AWS S3 along with original resume",
        "Metadata is stored in AWS DynamoDB with automatic backup and scaling",
        "Summary notification is sent via AWS SNS to admin's email for monitoring",
        "Optional admin dashboard allows viewing, downloading, and managing all evaluations",
      ],
      awsServices: [
        { service: "Amazon Textract", usage: "Text extraction from PDF resumes (50 pages/month, free tier)", cost: "$0.00" },
        { service: "Amazon S3", usage: "File storage for resumes and reports (500 MB, free tier)", cost: "$0.00" },
        { service: "Amazon DynamoDB", usage: "NoSQL database for evaluation data (free tier: 25GB, 25 WCU)", cost: "$0.00" },
        { service: "Amazon SNS", usage: "Email notifications to admin (first 1,000 free)", cost: "$0.00" },
        { service: "AWS IAM", usage: "User roles and access policies", cost: "$0.00" },
        { service: "AWS CloudWatch", usage: "Monitoring logs (free tier included)", cost: "$0.00" },
      ],
      limitations: [
        { area: "NLP Matching", issue: "Uses basic TF-IDF; lacks contextual understanding", improvement: "Upgrade to BERT or contextual embeddings" },
        { area: "Resume Parsing", issue: "Limited to basic detail extraction (name, email, projects)", improvement: "Implement full resume section parsing with spaCy" },
        { area: "User Management", issue: "No authentication or profile management", improvement: "Add login/registration system for candidates and admins" },
        { area: "Scoring Logic", issue: "General matching, not tailored to industry-specific JDs", improvement: "Include industry/job-type specific scoring logic" },
        { area: "UI/UX Features", issue: "Minimal UI; no filters or search in admin dashboard", improvement: "Add advanced dashboard controls and analytics charts" },
      ],
      futureScope: [
        "Advanced NLP Techniques: Incorporate named entity recognition (NER), BERT, or spaCy",
        "Section-wise ATS Scoring: Analyze resume sections separately (education, experience)",
        "User Authentication: Add login/signup for candidates and admins to save history",
        "Interactive Dashboard: Enhance admin panel with analytics, charts, and filtering",
        "Dynamic Job Descriptions: Allow recruiters to upload JDs dynamically instead of fixed JSON",
      ],
    },
  },
  {
    slug: "finnacleai",
    name: "FinnacleAI",
    tagline: "Personalised Market Intelligence",
    problem:
      "GenAI market intelligence application combining live financial data, economic news and user risk preferences to generate personalized market insights.",
    stack: ["Python", "AWS PartyRock", "AWS Bedrock", "Claude 3.5 Sonnet", "Streamlit", "yfinance", "GNews"],
    highlight: "AWS PartyRock Build",
    architectureImage: "/projects/finnacleai/fetchfinancle.png",
    decisions: [
      "Live price and news APIs (yfinance + GNews) grounded directly into the prompt to avoid stale model knowledge and provide current market context.",
      "Per-portfolio briefing format instead of generic market summaries — each investor receives a custom memo focused on their actual holdings.",
      "Claude 3.5 Sonnet chosen for instruction-following on structured memo format with clear sections: portfolio performance, market context, holdings breakdown, and action items.",
      "AWS PartyRock for rapid frontend prototyping with built-in authentication and database — enabled 48-hour MVP to validate core concept.",
      "FastAPI backend aggregates financial data and orchestrates LLM calls, keeping API keys secure and enabling caching for frequently requested portfolios.",
    ],
    results: [
      { label: "Briefing", value: "Portfolio-specific" },
      { label: "Data freshness", value: "Live APIs" },
      { label: "LLM", value: "Claude 3.5 Sonnet" },
      { label: "News source", value: "GNews API" },
    ],
    demoNote: "Demo walkthrough coming soon.",
    demoMedia: "/projects/finnacleai/demo.mp4",
    cover: "/projects/finnacleai/homepage_stock selection.png",
    screenshots: [
      { src: "/projects/finnacleai/homepage_stock selection.png", caption: "Portfolio input page — enter tickers to generate personalized market intelligence" },
      { src: "/projects/finnacleai/fetchfinancle.png", caption: "System architecture — yfinance + GNews APIs → FastAPI → Claude 3.5 Sonnet → personalized briefing" },
      { src: "/projects/finnacleai/stock_info_json.png", caption: "Stock data extraction — real-time prices, historical performance, and key metrics" },
      { src: "/projects/finnacleai/stock_insights.png", caption: "Portfolio analysis output — holdings breakdown, performance attribution, and market sentiment" },
      { src: "/projects/finnacleai/rsi_analysis_and _stockbot.png", caption: "Technical indicators — RSI, MACD, and moving averages for each holding" },
    ],
    repo: "https://github.com/Rachit-Jain-24",
    details: {
      abstract: "A personalized market intelligence platform that generates daily investment memos tailored to an investor's actual portfolio holdings. By combining live financial data (yfinance) with real-time news (GNews), FinnacleAI uses Claude 3.5 Sonnet on AWS Bedrock to produce structured, actionable briefings that explain how individual stocks are performing within broader market context.",
      methodology: [
        "User inputs stock tickers (e.g., AAPL, TSLA, RELIANCE) through PartyRock frontend",
        "FastAPI backend fetches live price data via yfinance for each holding",
        "GNews API retrieves recent news articles relevant to each stock and market segments",
        "Claude 3.5 Sonnet processes aggregated data with structured prompt engineering",
        "Output follows consistent memo format: Executive Summary, Portfolio Performance, Market Context, Holdings Deep Dive, Action Items",
        "RAG grounding ensures answers reference actual price movements and news headlines",
        "AWS Cognito provides user authentication; DynamoDB stores portfolio history and past briefings",
        "Responsive React frontend adapts to desktop and mobile viewing experiences",
      ],
      awsServices: [
        { service: "Amazon Bedrock", usage: "Claude 3.5 Sonnet model for memo generation (on-demand pricing)", cost: "Usage-based" },
        { service: "AWS PartyRock", usage: "Rapid frontend prototyping with built-in auth and DB", cost: "Free tier available" },
        { service: "Amazon Cognito", usage: "User authentication and session management", cost: "Free for first 50,000 MAUs" },
        { service: "Amazon DynamoDB", usage: "Storage for user portfolios and historical briefings", cost: "Free tier: 25GB storage, 25 WCU" },
        { service: "AWS Lambda", usage: "Background data aggregation and memo caching", cost: "Free tier: 1M requests" },
        { service: "Amazon API Gateway", usage: "REST API for frontend-backend communication", cost: "Free tier: 1M calls" },
      ],
      limitations: [
        { area: "Data Coverage", issue: "Limited to publicly traded stocks; no crypto or private equity", improvement: "Add alternative asset classes via additional APIs" },
        { area: "Analysis Depth", issue: "Basic technical indicators; lacks advanced quantitative analysis", improvement: "Incorporate backtesting and scenario analysis modules" },
        { area: "User Interface", issue: "PartyRock has limited customization for advanced financial dashboards", improvement: "Migrate to full React app with Plotly/Chart.js for interactive visualizations" },
        { area: "Real-time Updates", issue: "Data fetched on-demand; no WebSocket streaming for live updates", improvement: "Add WebSocket connection for real-time price alerts and notifications" },
        { area: "Investment Advice", issue: "Informational only; not tailored financial advice", improvement: "Add risk tolerance assessment and automated portfolio rebalancing suggestions" },
      ],
      futureScope: [
        "Advanced Visualizations: Replace PartyRock with full React app featuring Plotly charts, candlestick graphs, and performance dashboards",
        "Risk Analysis: Add portfolio volatility metrics, value-at-risk (VaR), and drawdown analysis",
        "Alert System: Real-time price alerts, news notifications, and rebalancing suggestions via SMS/email",
        "Backtesting Engine: Test portfolio strategies against historical data before live execution",
        "Tax Optimization: Suggest tax-loss harvesting opportunities and capital gains planning",
        "Social Features: Allow users to share anonymized performance benchmarks and learn from top investors",
        "Mobile App: Native iOS/Android apps with push notifications and offline reading mode",
      ],
    },
  },
];

export const publications = [
  {
    title:
      "The Role and Impact of Information and Communication Technologies (ICT) in 21st Century Education",
    venue: "IEEE ICTBIG 2023 · Published March 2024",
    summary:
      "Examines how ICT is reshaping modern education and the impact of scalable, AI-driven campus systems on learning outcomes.",
    link: "https://ieeexplore.ieee.org/document/10456031",
    certificate: {
      preview: "/certificates/previews/research_1.png",
      pdf: "/certificates/research_1.pdf",
    },
  },
  {
    title:
      "Campus Assistant: A Scalable Conversational AI using Domain-Specific Federated RAG (F-RAG) and Context-Aware Routing",
    venue: "IEEE ICoECIT 2026",
    summary:
      "Presents a domain-specific federated RAG architecture with context-aware routing that improves accuracy and reduces hallucinations for multilingual campus Q&A.",
    link: "https://ieeexplore.ieee.org/document/11497500",
    certificate: {
      preview: "/certificates/previews/research_2.jpeg",
      pdf: "/certificates/research_1.pdf",
    },
  },
];

export const experience = [
  {
    role: "Software Engineer Intern",
    org: "NextGen Services",
    period: "Jun 2025 – Aug 2025 · Hyderabad",
    points: [
      "Built a RAG chatbot POC for internal employee FAQ retrieval using Python and LangChain.",
      "Integrated retrieval capabilities with a React frontend.",
      "Developed responsive React/Tailwind components.",
      "Connected frontend components with backend APIs.",
    ],
  },
  {
    role: "Software Developer",
    org: "Mahbubnagar District Administration",
    period: "Feb 2025 – Jun 2025 · Telangana",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.mbnrvidhyaeye.hostelsurvey&pcampaignid=web_share",
    points: [
      "Worked in a 4-member team to digitize workflows across 100+ government hostel facilities.",
      "Implemented role-based authentication and real-time reporting using Firebase.",
      "Contributed to testing, deployment and end-to-end product delivery.",
      "Released the application on the Google Play Store for district officials.",
    ],
  },
];

export const certifications = [
  { issuer: "AWS", name: "Cloud Practitioner", link: "#" },
  { issuer: "NMIMS", name: "B.Tech CSE (Data Science) · 2026", link: "#" },
  { issuer: "IEEE", name: "Published Author · 2024 & 2026", link: "https://ieeexplore.ieee.org" },
  { issuer: "NPTEL", name: "Silver Badge in Python", link: "#" },
  { issuer: "AWS", name: "GenAI Hackathon 2025 - Top 20 Finalist", link: "#" },
];

export const skills = [
  {
    group: "AI / GenAI",
    items: ["LLMs", "Generative AI", "RAG", "Prompt Engineering", "LangChain", "LangGraph", "Hugging Face", "Embeddings", "Semantic Search"],
  },
  {
    group: "Cloud",
    items: ["AWS Bedrock", "S3", "Textract", "DynamoDB", "SNS", "EC2", "Lambda", "PartyRock"],
  },
  { group: "Vector Search", items: ["FAISS", "ChromaDB"] },
  { group: "Backend", items: ["Python", "FastAPI", "Flask", "REST APIs", "SQL", "PostgreSQL"] },
  { group: "Frontend", items: ["React", "JavaScript", "Streamlit", "Tailwind CSS"] },
  { group: "DevOps", items: ["Git", "GitHub", "GitHub Actions", "Docker"] },
  { group: "ML", items: ["PyTorch", "scikit-learn", "XGBoost", "Transformers", "RAG", "Fine-tuning", "Embeddings", "NLP", "Text Classification", "Sentiment Analysis"] },
];

export const achievements = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2026",
    credlyUrl: "https://www.credly.com/badges/0f8d7b5c-9c8a-4b12-8e4a-1a2b3c4d5e6f",
    imageUrl: "/badges/aws-certified-cloud-practitioner (1).png",
  },
  {
    title: "AWS Academy Graduate - Cloud Architecting",
    issuer: "AWS Academy",
    date: "2026",
    credlyUrl: "https://www.credly.com/badges/0f8d7b5c-9c8a-4b12-8e4a-1a2b3c4d5e6f",
    imageUrl: "/badges/aws-academy-graduate-cloud-architecting-training-ba.png",
  },
  {
    title: "AWS Academy Graduate - GenAI Foundations",
    issuer: "AWS Academy",
    date: "2026",
    credlyUrl: "https://www.credly.com/badges/0f8d7b5c-9c8a-4b12-8e4a-1a2b3c4d5e6f",
    imageUrl: "/badges/aws-academy-graduate-generative-ai-foundations-trai.png",
  },
  {
    title: "Python Essentials 1 - Cisco",
    issuer: "Cisco Networking Academy",
    date: "2023",
    credlyUrl: "https://www.credly.com/badges/0f8d7b5c-9c8a-4b12-8e4a-1a2b3c4d5e6f",
    imageUrl: "/badges/python-essentials-1.1.png",
  },
  {
    title: "Google Cloud Computing Foundations",
    issuer: "Google Cloud",
    date: "2025",
    credlyUrl: "https://www.credly.com/badges/0f8d7b5c-9c8a-4b12-8e4a-1a2b3c4d5e6f",
    imageUrl: "/badges/google-cloud-computing-foundations-certificate.png",
  },
  {
    title: "MongoDB CRUD Operations",
    issuer: "MongoDB",
    date: "2025",
    credlyUrl: "https://www.credly.com/badges/0f8d7b5c-9c8a-4b12-8e4a-1a2b3c4d5e6f",
    imageUrl: "/badges/crud-operations-in-mongodb.1.png",
  },
];

export const certificates = [
  {
    title: "AWS Certified Cloud Practitioner Certificate",
    issuer: "Amazon Web Services",
    date: "2026",
    previewUrl: "/certificates/previews/awscloudpractitioner.png",
    pdfUrl: "/certificates/AWS Certified Cloud Practitioner certificate.pdf",
  },
  {
    title: "Scrum Fundamentals Certified",
    issuer: "SCRUMstudy",
    date: "2025",
    previewUrl: "/certificates/previews/scrumfundamentals.png",
    pdfUrl: "/certificates/ScrumFundamentalsCertified-RachitJain-1113906.pdf",
  },
];

export const currentlyLearning = [
  {
    topic: "Agentic AI",
    description: "Learning agent architectures, tool calling, ReAct, reasoning workflows and multi-step task execution.",
    tags: ["LangGraph", "Multi-Agent Systems", "ReAct", "Tool Calling"],
  },
  {
    topic: "GPT-2 From Scratch",
    description: "Building a GPT-2-style language model from scratch using PyTorch to understand tokenization, self-attention, transformer blocks, training and inference.",
    tags: ["PyTorch", "Transformers", "Natural Language Processing", "Deep Learning"],
  },
  {
    topic: "AI Systems",
    description: "Exploring how RAG, agents, LLMs and cloud infrastructure can be combined into reliable AI applications.",
    tags: ["RAG", "Agents", "LLMs", "Cloud Infrastructure"],
  },
];
