const { sequelize } = require('../config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Pioneer = require('../models/Pioneer');
const TimelineEvent = require('../models/TimelineEvent');
const Product = require('../models/Product');
const Quote = require('../models/Quote');
const Admin = require('../models/Admin');

const pioneers = [
  {
    name: 'J.R.D. Tata',
    roleTitle: 'Chairman, Tata Group (1938–1991)',
    activeYears: '1938–1991',
    shortBio: 'Jehangir Ratanji Dadabhoy Tata served as chairman of the Tata Group for over five decades. His strategic foresight in 1968 led to the creation of TCS as a division of Tata Sons, at a time when computing was virtually unknown in India. J.R.D. believed passionately in nation-building through enterprise, ethics, and employee welfare.',
    keyContributions: [
      'Authorized the creation of TCS in 1968 under Tata Sons',
      'Built Tata Group into India\'s largest industrial conglomerate',
      'Established a culture of ethics, trust, and nation-building',
      'Pioneered Indian civil aviation (founded Air India in 1932)',
      'Championed employee welfare and corporate social responsibility'
    ],
    portraitImageUrl: '',
    tags: ['chairman', 'founder', 'visionary', 'Tata Group', 'nation-building'],
    priority: 10
  },
  {
    name: 'F.C. Kohli',
    roleTitle: 'Founding CEO & Father of Indian IT Industry',
    activeYears: '1968–1996',
    shortBio: 'Faqir Chand Kohli is universally recognized as the father of the Indian IT industry. In 1968, he assembled a small team of US-returned IT professionals to form Tata Computer Systems (later TCS). Over 28 years as CEO, he pivoted TCS from management consultancy into software development and services. He received the Padma Bhushan in 2002.',
    keyContributions: [
      'Founded TCS in 1968 and served as CEO for 28 years',
      'Secured first international project (Iran, 1971) — birth of Indian IT exports',
      'Forged strategic partnership with Burroughs Corporation (1973)',
      'Pioneered the concept of offshore software development from India',
      'Awarded Padma Bhushan in 2002 for contributions to IT industry'
    ],
    portraitImageUrl: '',
    tags: ['founder', 'CEO', 'pioneer', 'Father of Indian IT', 'Padma Bhushan'],
    priority: 9
  },
  {
    name: 'S. Ramadorai',
    roleTitle: 'CEO (1996–2009) & Vice Chairman',
    activeYears: '1996–2009',
    shortBio: 'Subramanian Ramadorai succeeded F.C. Kohli as CEO of TCS in 1996 and led the company through its most transformative growth phase. Under his 14-year leadership, TCS grew from a $400 million company with 6,000 employees to over 200,000 employees and $6 billion in revenue. He led India\'s first billion-dollar private sector IPO in 2004.',
    keyContributions: [
      'Grew TCS revenue from $400 million to over $6 billion',
      'Scaled workforce from 6,000 to over 200,000 employees',
      'Led India\'s first billion-dollar private sector IPO (August 25, 2004)',
      'Formalized Global Network Delivery Model across continents',
      'Established TCS as a global brand in IT services'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'IPO', 'growth', 'global expansion', 'delivery model'],
    priority: 8
  },
  {
    name: 'N. Chandrasekaran',
    roleTitle: 'CEO (2009–2017) & Chairman, Tata Sons',
    activeYears: '2009–present',
    shortBio: 'Natarajan Chandrasekaran joined TCS in 1987 and rose to become CEO in 2009. He drove TCS\'s digital transformation, expanded the workforce to over 400,000, and made TCS the most valuable Indian company — reaching $100 billion market cap in 2014. In 2017, he was appointed Chairman of Tata Sons.',
    keyContributions: [
      'Grew TCS market capitalization past $100 billion (2014)',
      'Drove digital-first transformation of service delivery',
      'Expanded TCS to 400,000+ employees across 46 countries',
      'Appointed Chairman of Tata Sons in 2017',
      'Championed TCS AI WisdomNext generative AI platform'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'chairman', 'digital transformation', '$100B market cap', 'Tata Sons'],
    priority: 7
  },
  {
    name: 'Rajesh Gopinathan',
    roleTitle: 'CEO & Managing Director (2017–2023)',
    activeYears: '2017–2023',
    shortBio: 'Rajesh Gopinathan served as CEO from February 2017 to March 2023. Under his leadership, TCS navigated COVID-19 by deploying the Secure Borderless Workspaces (SBWS) model. He grew annual revenue from $19 billion to $25+ billion and achieved a historic $200 billion market capitalization in September 2021.',
    keyContributions: [
      'Achieved $200 billion market capitalization milestone (September 2021)',
      'Grew annual revenue from $19 billion to $25+ billion',
      'Deployed SBWS model — 95% remote workforce during pandemic',
      'Honored all 40,000 graduate job offers during COVID-19'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'SBWS', '$200B market cap', 'pandemic leadership', 'cloud'],
    priority: 6
  },
  {
    name: 'K. Krithivasan',
    roleTitle: 'CEO & Managing Director (2023–present)',
    activeYears: '2023–present',
    shortBio: 'K. Krithivasan assumed the role of CEO in June 2023, bringing over 34 years of TCS experience. Under his leadership, TCS crossed the $30 billion annual revenue milestone in FY2025 and drove annualized AI services revenue past $2.3 billion. He oversaw reskilling of 300,000+ employees in AI and machine learning.',
    keyContributions: [
      'Crossed $30 billion annual revenue milestone (FY2025)',
      'Grew annualized AI revenue to $2.3 billion in Q4 FY2026',
      'Oversaw reskilling of 300,000+ employees in AI/ML and GenAI',
      'Building world\'s largest AI-trained corporate workforce',
      'Launched TCS AI WisdomNext GenAI aggregation platform'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'AI', 'GenAI', '$30B revenue', 'reskilling', 'current leader'],
    priority: 5
  }
];

const products = [
  {
    name: 'TCS BaNCS',
    domain: 'Banking & Financial Services',
    launchPeriod: '2000s',
    description: 'TCS BaNCS is a flagship universal banking platform providing core banking, payments, wealth management, capital markets, and insurance solutions. It is one of the world\'s most deployed core banking platforms, serving financial institutions across 40+ countries.',
    impactHighlights: ['Deployed in over 40 countries for leading global banks', 'Processes billions of financial transactions annually', 'Named a global leader in core banking by multiple analyst firms'],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-bancs',
    featured: true
  },
  {
    name: 'TCS iON',
    domain: 'Education & Assessment',
    launchPeriod: '2010s',
    description: 'TCS iON is an integrated digital platform for learning, assessment, and institutional administration — India\'s leading digital examination platform, conducting millions of exams annually.',
    impactHighlights: ['Conducts tens of millions of online examinations annually', 'Trusted by major government recruitment bodies', 'Supports remote proctoring and AI-based monitoring'],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-ion',
    featured: true
  },
  {
    name: 'TCS HOBS',
    domain: 'Telecom & Media',
    launchPeriod: '2010s',
    description: 'TCS HOBS is a comprehensive digital business platform for communications service providers, enabling telecom operators to manage revenue and customer experience on a cloud-native architecture.',
    impactHighlights: ['Serves telecom operators in 20+ countries', 'Cloud-native platform enabling 5G-ready transformation', 'Handles entire order-to-cash lifecycle for telecom'],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-hobs',
    featured: true
  },
  {
    name: 'ignio',
    domain: 'AI & Cognitive Automation',
    launchPeriod: '2010s',
    description: 'ignio is TCS\'s pioneering cognitive automation platform — a "virtual engineer" for enterprise IT. Using machine learning, it autonomously resolves incidents and enables self-healing infrastructure.',
    impactHighlights: ['Reduces IT downtime by up to 80%', 'Named a leader in AIOps by Gartner', 'Deployed across Fortune 500 enterprises globally'],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/ignio',
    featured: true
  },
  {
    name: 'TCS MasterCraft',
    domain: 'Enterprise Automation & DevOps',
    launchPeriod: '2000s',
    description: 'TCS MasterCraft is a suite of enterprise tools for software development automation, testing, and application modernization, accelerating legacy-to-cloud transformations.',
    impactHighlights: ['Automates up to 75% of code generation', 'Accelerates legacy mainframe-to-cloud modernization', 'Used by hundreds of large enterprises globally'],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-mastercraft',
    featured: false
  },
  {
    name: 'TCS AI WisdomNext',
    domain: 'Generative AI Platform',
    launchPeriod: '2020s',
    description: 'TCS AI WisdomNext is an industry-first GenAI aggregation platform that accelerates scalable generative AI adoption for enterprises, aggregating multiple LLMs into a single governed interface.',
    impactHighlights: ['First-of-its-kind GenAI aggregation platform', 'Integrates multiple vendor and open-source LLM models', 'Powers TCS\'s $2.3 billion annualized AI services revenue'],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms',
    featured: true
  },
  {
    name: 'TCS OmniStore',
    domain: 'Retail & Commerce',
    launchPeriod: '2020s',
    description: 'TCS OmniStore is a cloud-native, API-first unified commerce platform enabling retailers to deliver seamless omnichannel customer experiences.',
    impactHighlights: ['Unifies in-store and online retail operations', 'Deployed by major international retail brands', 'Supports personalization and real-time inventory management'],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-omnistore',
    featured: false
  },
  {
    name: 'Quartz - Smart Ledgers',
    domain: 'Blockchain & Digital Assets',
    launchPeriod: '2020s',
    description: 'Quartz is TCS\'s blockchain and distributed ledger platform for financial services, enabling tokenization of real-world assets and CBDC pilot programs.',
    impactHighlights: ['Supports CBDC pilot programs', 'Enables tokenization of financial assets', 'Used by banking institutions for trade finance'],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/quartz',
    featured: false
  }
];

const timelineEvents = [
  { year: 1968, title: 'Tata Computer Systems Founded', description: 'TCS was established in 1968 as a division of Tata Sons. F.C. Kohli assembled a young team of IT professionals at a time when computing was virtually unknown in India.', category: 'History', decadeGroup: '1960s', importanceLevel: 'milestone' },
  { year: 1971, title: 'First Overseas Project — Iranian Electric Utility', description: 'TCS won its first overseas assignment — a project for an electric utility in Iran, inaugurating India\'s software export story.', category: 'Business', decadeGroup: '1970s', importanceLevel: 'major' },
  { year: 1973, title: 'Burroughs Corporation Partnership', description: 'TCS partnered with Burroughs Corporation to develop software for their machines worldwide, validating the offshore software model.', category: 'Business', decadeGroup: '1970s', importanceLevel: 'milestone' },
  { year: 1974, title: 'First Full Software Development Lifecycle Project', description: 'TCS delivered a financial accounting solution for a UK housing society — its first complete end-to-end software project for international markets.', category: 'Technology', decadeGroup: '1970s', importanceLevel: 'major' },
  { year: 1975, title: 'F.C. Kohli\'s Vision for IT in Nation-Building', description: 'F.C. Kohli addressed the Computer Society of India, declaring India must not miss the coming information revolution.', category: 'History', decadeGroup: '1970s', importanceLevel: 'minor' },
  { year: 1981, title: 'TRDDC Research Center Established', description: 'TCS established the Tata Research Development and Design Centre (TRDDC) in Pune — TCS\'s innovation engine for decades.', category: 'Technology', decadeGroup: '1980s', importanceLevel: 'major' },
  { year: 1981, title: 'First International Office Opened', description: 'TCS established its first permanent office outside India, marking the transition to a sustained global presence.', category: 'Business', decadeGroup: '1980s', importanceLevel: 'major' },
  { year: 1985, title: 'Swiss Banking Solutions — BFSI Expertise Begins', description: 'TCS developed sophisticated banking software for Swiss financial institutions, beginning its deep BFSI specialization that led to TCS BaNCS.', category: 'Technology', decadeGroup: '1980s', importanceLevel: 'major' },
  { year: 1989, title: 'Electronic Commerce and EDI Solutions', description: 'Before the World Wide Web, TCS developed electronic data interchange (EDI) and early electronic commerce solutions.', category: 'Technology', decadeGroup: '1980s', importanceLevel: 'minor' },
  { year: 1992, title: 'Global Network Delivery Model Pioneered', description: 'TCS formalized its Global Network Delivery Model (GNDM), enabling 24-hour "follow-the-sun" development — the blueprint for the Indian IT industry.', category: 'Business', decadeGroup: '1990s', importanceLevel: 'major' },
  { year: 1996, title: 'S. Ramadorai Becomes CEO', description: 'S. Ramadorai succeeded F.C. Kohli as CEO, inheriting a $400 million company. His tenure became the most explosive growth period in TCS history.', category: 'History', decadeGroup: '1990s', importanceLevel: 'major' },
  { year: 1999, title: 'Y2K — TCS Emerges as Global Technology Partner', description: 'TCS played a critical role helping corporations worldwide solve the Y2K bug, bringing unprecedented global visibility to Indian IT.', category: 'Technology', decadeGroup: '1990s', importanceLevel: 'major' },
  { year: 2001, title: 'TCS BaNCS Core Banking Platform Launched', description: 'TCS launched BaNCS, building on 15+ years of BFSI expertise. It now serves major banks in 40+ countries.', category: 'Products', decadeGroup: '2000s', importanceLevel: 'milestone' },
  { year: 2002, title: 'F.C. Kohli Awarded Padma Bhushan', description: 'The Government of India honored F.C. Kohli with the Padma Bhushan for extraordinary contributions to India\'s IT industry.', category: 'Awards', decadeGroup: '2000s', importanceLevel: 'major' },
  { year: 2004, title: 'TCS IPO — India\'s First Billion-Dollar Private Listing', description: 'On August 25, 2004, TCS listed on BSE and NSE raising $1.17 billion — India\'s largest private-sector IPO at the time.', category: 'Business', decadeGroup: '2000s', importanceLevel: 'milestone' },
  { year: 2006, title: 'First Indian IT Company to Cross $1 Billion Quarterly Revenue', description: 'TCS achieved the milestone of crossing $1 billion in quarterly revenue.', category: 'Business', decadeGroup: '2000s', importanceLevel: 'major' },
  { year: 2009, title: 'N. Chandrasekaran Appointed CEO', description: 'Natarajan Chandrasekaran, who joined TCS in 1987 as an intern, was appointed CEO.', category: 'History', decadeGroup: '2000s', importanceLevel: 'major' },
  { year: 2011, title: 'TCS iON Digital Platform Launched', description: 'TCS launched iON — now India\'s leading digital examination system conducting tens of millions of exams annually.', category: 'Products', decadeGroup: '2010s', importanceLevel: 'major' },
  { year: 2014, title: 'Market Capitalization Crosses $100 Billion', description: 'TCS became the most valuable Indian company, reaching a market cap of $100 billion.', category: 'Business', decadeGroup: '2010s', importanceLevel: 'milestone' },
  { year: 2016, title: 'ignio Cognitive Automation Platform Launched', description: 'TCS launched ignio — one of the earliest enterprise AIOps platforms globally.', category: 'Products', decadeGroup: '2010s', importanceLevel: 'major' },
  { year: 2017, title: 'N. Chandrasekaran Becomes Chairman of Tata Sons', description: 'N. Chandrasekaran was elevated to Chairman of Tata Sons — the youngest person and first professional manager to hold the position.', category: 'History', decadeGroup: '2010s', importanceLevel: 'major' },
  { year: 2018, title: 'TCS Golden Jubilee — 50 Years, 400,000+ Employees', description: 'TCS celebrated 50 years with 400,000+ employees across 150 locations in 46 countries.', category: 'History', decadeGroup: '2010s', importanceLevel: 'milestone' },
  { year: 2020, title: 'Secure Borderless Workspaces (SBWS) — Pandemic Response', description: 'TCS moved nearly 400,000 employees to remote work within weeks using SBWS, and honored all 40,000 graduate job offers during COVID-19.', category: 'Technology', decadeGroup: '2020s', importanceLevel: 'milestone' },
  { year: 2021, title: 'First Indian IT Company to Hit $200 Billion Market Cap', description: 'TCS reached a market capitalization of US$200 billion — the first Indian IT company to achieve this historic valuation.', category: 'Business', decadeGroup: '2020s', importanceLevel: 'milestone' },
  { year: 2023, title: 'K. Krithivasan Appointed CEO — AI-First Strategy', description: 'K. Krithivasan assumed the CEO role in June 2023, immediately signaling an AI-first direction.', category: 'History', decadeGroup: '2020s', importanceLevel: 'major' },
  { year: 2024, title: 'TCS AI WisdomNext Platform & 300K+ AI-Trained Employees', description: 'TCS launched AI WisdomNext and reported reskilling 300,000+ employees in AI and machine learning.', category: 'Technology', decadeGroup: '2020s', importanceLevel: 'milestone' },
  { year: 2025, title: 'TCS Crosses $30 Billion Revenue — AI Revenue at $2.3 Billion', description: 'TCS crossed $30 billion annual revenue in FY2025 with 607,000+ employees. Annualized AI services revenue surpassed $2.3 billion.', category: 'Business', decadeGroup: '2020s', importanceLevel: 'milestone' }
];

const quotes = [
  { type: 'quote', text: 'Many years ago, there was an industrial revolution; we missed it for reasons beyond our control. Today there is a new revolution — the information revolution. We cannot afford to miss it.', author: 'F.C. Kohli', context: 'Address to the Computer Society of India, 1975' },
  { type: 'quote', text: 'It is taken for granted now, but if we rewind to 1968, the concept of computing itself was brand new.', author: 'N. Chandrasekaran', context: 'Reflecting on TCS\'s founding' },
  { type: 'quote', text: 'Software is going to be the means of transforming India.', author: 'F.C. Kohli', context: 'Vision for India\'s technology future' },
  { type: 'stat', text: '607,000+ employees across 150 locations in 46 countries', author: '', context: 'TCS global workforce scale as of March 2025' },
  { type: 'stat', text: '$30+ billion in annual revenue (FY2025)', author: '', context: 'TCS revenue milestone' },
  { type: 'stat', text: '$2.3 billion annualized AI services revenue (Q4 FY2026)', author: '', context: 'AI revenue growing at 17%+ sequentially' },
  { type: 'stat', text: '300,000+ employees reskilled in AI, ML, and Generative AI', author: '', context: 'One of the largest corporate AI upskilling initiatives globally' },
  { type: 'theme', text: 'Building on Belief — the conviction that with the right talent, training, and trust, technology can solve any challenge.', author: 'TCS Corporate Philosophy', context: 'Core organizational theme reflecting Tata values' },
  { type: 'quote', text: 'Generative AI is a civilisational shift. We are building an AI-human workforce of the future.', author: 'N. Chandrasekaran', context: 'On TCS AI strategy, 2025' },
  { type: 'stat', text: 'First Indian IT company to reach $200 billion market capitalization (September 2021)', author: '', context: 'Historic valuation milestone' }
];

// ─── Exported function (called by /api/seed endpoint) ───────────────────────
const runSeed = async () => {
  // Drop and recreate all tables
  await sequelize.sync({ force: true });

  // Insert pioneers first to get their IDs
  const insertedPioneers = await Pioneer.bulkCreate(pioneers);

  const kohli   = insertedPioneers.find(p => p.name === 'F.C. Kohli');
  const jrd     = insertedPioneers.find(p => p.name === 'J.R.D. Tata');
  const chandra = insertedPioneers.find(p => p.name === 'N. Chandrasekaran');
  const rama    = insertedPioneers.find(p => p.name === 'S. Ramadorai');
  const gopi    = insertedPioneers.find(p => p.name === 'Rajesh Gopinathan');
  const krithi  = insertedPioneers.find(p => p.name === 'K. Krithivasan');

  // Attach pioneer IDs to timeline events
  timelineEvents[0].relatedPioneerIds  = [jrd.id, kohli.id];
  timelineEvents[1].relatedPioneerIds  = [kohli.id];
  timelineEvents[2].relatedPioneerIds  = [kohli.id];
  timelineEvents[3].relatedPioneerIds  = [kohli.id];
  timelineEvents[4].relatedPioneerIds  = [kohli.id];
  timelineEvents[5].relatedPioneerIds  = [kohli.id];
  timelineEvents[9].relatedPioneerIds  = [kohli.id];
  timelineEvents[10].relatedPioneerIds = [rama.id];
  timelineEvents[11].relatedPioneerIds = [rama.id];
  timelineEvents[13].relatedPioneerIds = [kohli.id];
  timelineEvents[14].relatedPioneerIds = [rama.id];
  timelineEvents[16].relatedPioneerIds = [chandra.id];
  timelineEvents[18].relatedPioneerIds = [chandra.id];
  timelineEvents[20].relatedPioneerIds = [chandra.id];
  timelineEvents[21].relatedPioneerIds = [chandra.id];
  timelineEvents[22].relatedPioneerIds = [gopi.id];
  timelineEvents[23].relatedPioneerIds = [gopi.id];
  timelineEvents[24].relatedPioneerIds = [krithi.id];
  timelineEvents[25].relatedPioneerIds = [krithi.id];
  timelineEvents[26].relatedPioneerIds = [krithi.id, chandra.id];

  await TimelineEvent.bulkCreate(timelineEvents);
  await Product.bulkCreate(products);
  await Quote.bulkCreate(quotes);

  // Create default admin (password hashed by beforeCreate hook)
  await Admin.create({
    email: 'admin@tcs-pioneers.com',
    password: 'admin123',
    name: 'Admin User'
  });

  return {
    pioneers: insertedPioneers.length,
    timelineEvents: timelineEvents.length,
    products: products.length,
    quotes: quotes.length,
    admin: 'admin@tcs-pioneers.com / admin123'
  };
};

// ─── Direct CLI run: node seed/seedData.js ───────────────────────────────────
if (require.main === module) {
  runSeed()
    .then(result => { console.log('Seed done:', result); process.exit(0); })
    .catch(err => { console.error('Seed error:', err); process.exit(1); });
}

module.exports = { runSeed };
