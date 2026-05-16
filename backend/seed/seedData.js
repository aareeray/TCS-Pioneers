const { sequelize } = require('../config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Import models AFTER dotenv so DATABASE_URL is loaded
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
    shortBio: 'Jehangir Ratanji Dadabhoy Tata served as chairman of the Tata Group for over five decades, overseeing its transformation from a traditional industrial conglomerate into a diversified enterprise spanning steel, aviation, chemicals, and technology. His strategic foresight in 1968 led to the creation of TCS as a division of Tata Sons, at a time when computing was virtually unknown in India. J.R.D. believed passionately in nation-building through enterprise, ethics, and employee welfare — values that remain embedded in TCS\'s DNA.',
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
    shortBio: 'Faqir Chand Kohli is universally recognized as the father of the Indian IT industry. In 1968, he assembled a small team of US-returned IT professionals to form Tata Computer Systems (later TCS). Over 28 years as CEO, he pivoted TCS from management consultancy into software development and services. He secured TCS\'s first overseas project in 1971, forged a landmark partnership with Burroughs Corporation in 1973, and advocated for computer literacy across India. He received the Padma Bhushan in 2002.',
    keyContributions: [
      'Founded TCS in 1968 and served as CEO for 28 years',
      'Secured first international project (Iran, 1971) — birth of Indian IT exports',
      'Forged strategic partnership with Burroughs Corporation (1973)',
      'Pioneered the concept of offshore software development from India',
      'Championed computer literacy and adult education programs nationally',
      'Awarded Padma Bhushan in 2002 for contributions to IT industry',
      'Mentored an entire generation of Indian IT industry leaders'
    ],
    portraitImageUrl: '',
    tags: ['founder', 'CEO', 'pioneer', 'Father of Indian IT', 'Padma Bhushan'],
    priority: 9
  },
  {
    name: 'S. Ramadorai',
    roleTitle: 'CEO (1996–2009) & Vice Chairman',
    activeYears: '1996–2009',
    shortBio: 'Subramanian Ramadorai succeeded F.C. Kohli as CEO of TCS in 1996 and led the company through its most transformative growth phase. Under his 14-year leadership, TCS grew from a $400 million revenue company with 6,000 employees to over 200,000 employees and revenues exceeding $6 billion. His crowning achievement was steering TCS through its landmark IPO on August 25, 2004 — India\'s first billion-dollar private sector IPO.',
    keyContributions: [
      'Grew TCS revenue from $400 million to over $6 billion',
      'Scaled workforce from 6,000 to over 200,000 employees',
      'Led India\'s first billion-dollar private sector IPO (August 25, 2004)',
      'Formalized Global Network Delivery Model across continents',
      'Built Fortune 500 client relationships across banking, manufacturing, and retail',
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
    shortBio: 'Natarajan Chandrasekaran joined TCS in 1987 and rose through the ranks to become CEO in 2009. During his tenure, he drove TCS\'s digital transformation strategy, expanded the workforce to over 400,000, and made TCS the most valuable Indian company by market capitalization — reaching the $100 billion mark in 2014. In 2017, he was appointed Chairman of Tata Sons.',
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
    shortBio: 'Rajesh Gopinathan served as CEO and Managing Director of TCS from February 2017 to March 2023. Under his leadership, TCS navigated the COVID-19 pandemic by deploying the Secure Borderless Workspaces (SBWS) model. He grew annual revenue from $19 billion to over $25 billion and achieved a historic $200 billion market capitalization in September 2021.',
    keyContributions: [
      'Achieved $200 billion market capitalization milestone (September 2021)',
      'Grew annual revenue from $19 billion to $25+ billion',
      'Deployed SBWS model — 95% remote workforce during pandemic',
      'Expanded cloud, cybersecurity, and digital offerings',
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
    shortBio: 'K. Krithivasan assumed the role of CEO and Managing Director in June 2023, bringing over 34 years of TCS experience with deep BFSI expertise. Under his leadership, TCS has crossed the $30 billion annual revenue milestone in FY2025 and driven annualized AI services revenue past $2.3 billion. He has overseen the reskilling of 300,000+ employees in AI and machine learning.',
    keyContributions: [
      'Crossed $30 billion annual revenue milestone (FY2025)',
      'Grew annualized AI revenue to $2.3 billion in Q4 FY2026',
      'Oversaw reskilling of 300,000+ employees in AI/ML and GenAI',
      'Building world\'s largest AI-trained corporate workforce (607,000+ employees)',
      'Driving generative and agentic AI strategy across all verticals',
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
    description: 'TCS BaNCS is a flagship universal banking platform providing core banking, payments, wealth management, capital markets, and insurance solutions. It is now one of the world\'s most deployed core banking platforms, serving financial institutions across 40+ countries.',
    impactHighlights: [
      'Deployed in over 40 countries for leading global banks',
      'Processes billions of financial transactions annually',
      'Covers retail banking, corporate banking, payments, wealth, and insurance',
      'Named a global leader in core banking by multiple analyst firms'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-bancs',
    featured: true
  },
  {
    name: 'TCS iON',
    domain: 'Education & Assessment',
    launchPeriod: '2010s',
    description: 'TCS iON is an integrated digital platform for learning, assessment, and institutional administration. It has become India\'s leading digital examination platform, conducting millions of competitive and recruitment exams annually.',
    impactHighlights: [
      'Conducts tens of millions of online examinations annually across India',
      'Trusted by major government recruitment bodies and educational institutions',
      'Offers corporate learning and development solutions globally',
      'Supports remote proctoring, AI-based monitoring, and assessment analytics'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-ion',
    featured: true
  },
  {
    name: 'TCS HOBS',
    domain: 'Telecom & Media',
    launchPeriod: '2010s',
    description: 'TCS HOBS is a comprehensive digital business platform for communications service providers, enabling telecom operators to manage revenue, customer experience, and digital services on a cloud-native, microservices-based architecture.',
    impactHighlights: [
      'Serves telecom operators in 20+ countries',
      'Cloud-native platform enabling 5G-ready transformation',
      'Supports complex multi-partner digital ecosystems',
      'Handles entire order-to-cash lifecycle for telecom'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-hobs',
    featured: true
  },
  {
    name: 'ignio',
    domain: 'AI & Cognitive Automation',
    launchPeriod: '2010s',
    description: 'ignio is TCS\'s pioneering cognitive automation platform that functions as a "virtual engineer" for enterprise IT and business operations. Using machine learning and neural automation, it autonomously resolves incidents and enables self-healing infrastructure.',
    impactHighlights: [
      'Autonomous incident detection and resolution for enterprise IT',
      'Self-healing infrastructure capabilities reduce downtime by up to 80%',
      'Named a leader in AIOps by industry analysts including Gartner',
      'Deployed across Fortune 500 enterprises globally'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/ignio',
    featured: true
  },
  {
    name: 'TCS MasterCraft',
    domain: 'Enterprise Automation & DevOps',
    launchPeriod: '2000s',
    description: 'TCS MasterCraft is a suite of enterprise tools for software development automation, testing, data management, and application modernization. It accelerates digital transformation by automating code generation and continuous testing.',
    impactHighlights: [
      'Automates up to 75% of code generation for common patterns',
      'Accelerates legacy mainframe-to-cloud modernization',
      'Integrated DevOps automation across the software lifecycle',
      'Used by hundreds of large enterprises globally'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-mastercraft',
    featured: false
  },
  {
    name: 'TCS AI WisdomNext',
    domain: 'Generative AI Platform',
    launchPeriod: '2020s',
    description: 'TCS AI WisdomNext is an industry-first GenAI aggregation platform that accelerates scalable generative AI adoption for enterprises. It aggregates multiple GenAI services into a single interface with governance guardrails.',
    impactHighlights: [
      'First-of-its-kind GenAI aggregation platform in the IT services industry',
      'Integrates multiple vendor, open-source, and proprietary LLM models',
      'Enables real-time experimentation across AI models with governance',
      'Powers TCS\'s $2.3 billion annualized AI services revenue'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms',
    featured: true
  },
  {
    name: 'TCS OmniStore',
    domain: 'Retail & Commerce',
    launchPeriod: '2020s',
    description: 'TCS OmniStore is a cloud-native, API-first unified commerce platform that enables retailers to deliver seamless omnichannel customer experiences, unifying point-of-sale, e-commerce, and order management.',
    impactHighlights: [
      'Unifies in-store and online retail operations on one platform',
      'Cloud-native microservices architecture for global scalability',
      'Deployed by major international retail brands',
      'Supports personalization, loyalty, and real-time inventory management'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-omnistore',
    featured: false
  },
  {
    name: 'Quartz - Smart Ledgers',
    domain: 'Blockchain & Digital Assets',
    launchPeriod: '2020s',
    description: 'Quartz is TCS\'s blockchain and distributed ledger platform for financial services, enabling tokenization of real-world assets, CBDC pilots, and next-generation payment infrastructure.',
    impactHighlights: [
      'Enables tokenization of financial assets and securities',
      'Supports Central Bank Digital Currency (CBDC) pilot programs',
      'Multi-party distributed ledger network for cross-border payments',
      'Used by banking institutions for trade finance and settlements'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/quartz',
    featured: false
  }
];


const timelineEvents = [
  { year: 1968, title: 'Tata Computer Systems Founded', description: 'Tata Consultancy Services was established in 1968 as a division of Tata Sons Limited. F.C. Kohli assembled a young team of IT professionals at a time when computing was virtually unknown in India.', category: 'History', decadeGroup: '1960s', importanceLevel: 'milestone' },
  { year: 1971, title: 'First Overseas Project — Iranian Electric Utility', description: 'TCS won its first overseas assignment in 1971 — a project for an electric utility company in Iran, inaugurating India\'s software export story.', category: 'Business', decadeGroup: '1970s', importanceLevel: 'major' },
  { year: 1973, title: 'Burroughs Corporation Partnership', description: 'TCS partnered with Burroughs Corporation to sell and service Burroughs systems in India and develop software for their machines worldwide, validating the offshore software model.', category: 'Business', decadeGroup: '1970s', importanceLevel: 'milestone' },
  { year: 1974, title: 'First Full Software Development Lifecycle Project', description: 'TCS delivered a financial accounting solution for a housing society in the UK on behalf of Burroughs — its first complete end-to-end software project for international markets.', category: 'Technology', decadeGroup: '1970s', importanceLevel: 'major' },
  { year: 1975, title: 'F.C. Kohli\'s Vision for IT in Nation-Building', description: 'F.C. Kohli addressed the Computer Society of India, drawing parallels to the Industrial Revolution and declaring India must not miss the coming information revolution.', category: 'History', decadeGroup: '1970s', importanceLevel: 'minor' },
  { year: 1981, title: 'TRDDC Research Center Established', description: 'TCS established the Tata Research Development and Design Centre (TRDDC) in Pune. The lab became TCS\'s innovation engine for decades.', category: 'Technology', decadeGroup: '1980s', importanceLevel: 'major' },
  { year: 1981, title: 'First International Office Opened', description: 'TCS established its first permanent office outside India, marking the transition to a sustained global presence.', category: 'Business', decadeGroup: '1980s', importanceLevel: 'major' },
  { year: 1985, title: 'Swiss Banking Solutions — BFSI Expertise Begins', description: 'TCS developed sophisticated banking software for Swiss financial institutions, beginning its deep specialization in BFSI that would eventually lead to TCS BaNCS.', category: 'Technology', decadeGroup: '1980s', importanceLevel: 'major' },
  { year: 1989, title: 'Electronic Commerce and EDI Solutions', description: 'Before the World Wide Web, TCS developed electronic data interchange (EDI) and early electronic commerce solutions.', category: 'Technology', decadeGroup: '1980s', importanceLevel: 'minor' },
  { year: 1992, title: 'Global Network Delivery Model Pioneered', description: 'TCS formalized its Global Network Delivery Model (GNDM), establishing 24-hour "follow-the-sun" development — the blueprint for the entire Indian IT industry\'s offshore model.', category: 'Business', decadeGroup: '1990s', importanceLevel: 'major' },
  { year: 1996, title: 'S. Ramadorai Becomes CEO', description: 'S. Ramadorai succeeded F.C. Kohli as CEO of TCS, inheriting a $400 million company with 6,000 employees. His tenure became the most explosive growth period in TCS history.', category: 'History', decadeGroup: '1990s', importanceLevel: 'major' },
  { year: 1999, title: 'Y2K — TCS Emerges as Global Technology Partner', description: 'TCS played a critical role helping corporations worldwide solve the Y2K bug, bringing unprecedented global visibility and demonstrating India\'s IT capabilities.', category: 'Technology', decadeGroup: '1990s', importanceLevel: 'major' },
  { year: 2001, title: 'TCS BaNCS Core Banking Platform Launched', description: 'TCS launched BaNCS, its comprehensive core banking platform, building on 15+ years of BFSI expertise. It now serves major banks in 40+ countries.', category: 'Products', decadeGroup: '2000s', importanceLevel: 'milestone' },
  { year: 2002, title: 'F.C. Kohli Awarded Padma Bhushan', description: 'The Government of India honored F.C. Kohli with the Padma Bhushan for his extraordinary contributions to building India\'s IT industry.', category: 'Awards', decadeGroup: '2000s', importanceLevel: 'major' },
  { year: 2004, title: 'TCS IPO — India\'s First Billion-Dollar Private Listing', description: 'On August 25, 2004, TCS listed on BSE and NSE at Rs 850 per share, raising $1.17 billion — India\'s largest private-sector IPO at the time. Shares listed at a 26.6% premium.', category: 'Business', decadeGroup: '2000s', importanceLevel: 'milestone' },
  { year: 2006, title: 'TCS Becomes First Indian IT Company to Cross $1 Billion Quarterly Revenue', description: 'TCS achieved the milestone of crossing $1 billion in quarterly revenue, establishing India\'s IT industry at the highest global levels.', category: 'Business', decadeGroup: '2000s', importanceLevel: 'major' },
  { year: 2009, title: 'N. Chandrasekaran Appointed CEO', description: 'Natarajan Chandrasekaran, who joined TCS in 1987 as an intern, was appointed CEO, signaling TCS\'s commitment to digital transformation and global expansion.', category: 'History', decadeGroup: '2000s', importanceLevel: 'major' },
  { year: 2011, title: 'TCS iON Digital Platform Launched', description: 'TCS launched the iON platform for digital learning, examination, and institutional management — now India\'s leading digital examination system.', category: 'Products', decadeGroup: '2010s', importanceLevel: 'major' },
  { year: 2014, title: 'Market Capitalization Crosses $100 Billion', description: 'TCS became one of the few global IT services companies to reach a market cap of $100 billion, making it the most valuable Indian company at the time.', category: 'Business', decadeGroup: '2010s', importanceLevel: 'milestone' },
  { year: 2016, title: 'ignio Cognitive Automation Platform Launched', description: 'TCS launched ignio, a pioneering AI-powered cognitive automation platform and one of the earliest enterprise AIOps platforms globally.', category: 'Products', decadeGroup: '2010s', importanceLevel: 'major' },
  { year: 2017, title: 'N. Chandrasekaran Becomes Chairman of Tata Sons', description: 'N. Chandrasekaran was elevated to Chairman of Tata Sons, becoming the youngest person and first professional manager to hold the position.', category: 'History', decadeGroup: '2010s', importanceLevel: 'major' },
  { year: 2018, title: 'TCS Golden Jubilee — 50 Years, 400,000+ Employees', description: 'TCS celebrated its 50th anniversary with a workforce exceeding 400,000 employees operating from 150 locations across 46 countries.', category: 'History', decadeGroup: '2010s', importanceLevel: 'milestone' },
  { year: 2020, title: 'Secure Borderless Workspaces (SBWS) — Pandemic Response', description: 'TCS deployed its SBWS model, moving nearly 400,000 employees to remote work within weeks and honoring all 40,000 graduate job offers during COVID-19.', category: 'Technology', decadeGroup: '2020s', importanceLevel: 'milestone' },
  { year: 2021, title: 'First Indian IT Company to Hit $200 Billion Market Cap', description: 'In September 2021, TCS recorded a market capitalization of US$200 billion, becoming the first Indian IT company to achieve this historic valuation.', category: 'Business', decadeGroup: '2020s', importanceLevel: 'milestone' },
  { year: 2023, title: 'K. Krithivasan Appointed CEO — AI-First Strategy', description: 'K. Krithivasan assumed the role of CEO in June 2023, immediately signaling an AI-first strategic direction and the ambition to build the world\'s largest AI-trained workforce.', category: 'History', decadeGroup: '2020s', importanceLevel: 'major' },
  { year: 2024, title: 'TCS AI WisdomNext Platform & 300K+ AI-Trained Employees', description: 'TCS launched AI WisdomNext — an industry-first GenAI aggregation platform — and reported reskilling 300,000+ employees in AI and machine learning skills.', category: 'Technology', decadeGroup: '2020s', importanceLevel: 'milestone' },
  { year: 2025, title: 'TCS Crosses $30 Billion Revenue — AI Revenue at $2.3 Billion', description: 'TCS crossed the $30 billion annual revenue milestone in FY2025 with 607,000+ employees. Annualized AI services revenue surpassed $2.3 billion with generative and agentic AI revenue tripling year-over-year.', category: 'Business', decadeGroup: '2020s', importanceLevel: 'milestone' }
];


const quotes = [
  { type: 'quote', text: 'Many years ago, there was an industrial revolution; we missed it for reasons beyond our control. Today there is a new revolution — the information revolution. We cannot afford to miss it.', author: 'F.C. Kohli', context: 'Address to the Computer Society of India, 1975' },
  { type: 'quote', text: 'It is taken for granted now, but if we rewind to 1968, the concept of computing itself was brand new.', author: 'N. Chandrasekaran', context: 'Reflecting on TCS\'s founding' },
  { type: 'quote', text: 'Software is going to be the means of transforming India.', author: 'F.C. Kohli', context: 'Vision for India\'s technology future' },
  { type: 'stat', text: '607,000+ employees across 150 locations in 46 countries', author: '', context: 'TCS global workforce scale as of March 2025' },
  { type: 'stat', text: '$30+ billion in annual revenue (FY2025)', author: '', context: 'TCS revenue milestone' },
  { type: 'stat', text: '$2.3 billion annualized AI services revenue (Q4 FY2026)', author: '', context: 'AI revenue growing at 17%+ sequentially' },
  { type: 'stat', text: '300,000+ employees reskilled in AI, ML, and Generative AI', author: '', context: 'One of the largest corporate AI upskilling initiatives globally' },
  { type: 'theme', text: 'Building on Belief — the conviction that with the right talent, training, and trust, technology can solve any challenge and transform any industry.', author: 'TCS Corporate Philosophy', context: 'Core organizational theme reflecting Tata values' },
  { type: 'quote', text: 'Generative AI is a civilisational shift. We are building an AI-human workforce of the future.', author: 'N. Chandrasekaran', context: 'On TCS AI strategy, 2025' },
  { type: 'stat', text: 'First Indian IT company to reach $200 billion market capitalization (September 2021)', author: '', context: 'Historic valuation milestone' }
];

const seedDB = async () => {
  try {
    // Sync DB (creates tables)
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Database synced (tables created)');

    // Insert pioneers first so we can get their IDs
    const insertedPioneers = await Pioneer.bulkCreate(pioneers);
    console.log(`Inserted ${insertedPioneers.length} pioneers`);

    const kohli   = insertedPioneers.find(p => p.name === 'F.C. Kohli');
    const jrd     = insertedPioneers.find(p => p.name === 'J.R.D. Tata');
    const chandra = insertedPioneers.find(p => p.name === 'N. Chandrasekaran');
    const rama    = insertedPioneers.find(p => p.name === 'S. Ramadorai');
    const gopi    = insertedPioneers.find(p => p.name === 'Rajesh Gopinathan');
    const krithi  = insertedPioneers.find(p => p.name === 'K. Krithivasan');

    // Attach related pioneer IDs (by index matching timelineEvents array)
    timelineEvents[0].relatedPioneerIds  = [jrd.id, kohli.id];   // 1968 founding
    timelineEvents[1].relatedPioneerIds  = [kohli.id];            // 1971 overseas
    timelineEvents[2].relatedPioneerIds  = [kohli.id];            // 1973 Burroughs
    timelineEvents[3].relatedPioneerIds  = [kohli.id];            // 1974 SDLC
    timelineEvents[4].relatedPioneerIds  = [kohli.id];            // 1975 CSI speech
    timelineEvents[5].relatedPioneerIds  = [kohli.id];            // 1981 TRDDC
    timelineEvents[9].relatedPioneerIds  = [kohli.id];            // 1992 GNDM
    timelineEvents[10].relatedPioneerIds = [rama.id];             // 1996 Ramadorai CEO
    timelineEvents[11].relatedPioneerIds = [rama.id];             // 1999 Y2K
    timelineEvents[13].relatedPioneerIds = [kohli.id];            // 2002 Padma Bhushan
    timelineEvents[14].relatedPioneerIds = [rama.id];             // 2004 IPO
    timelineEvents[16].relatedPioneerIds = [chandra.id];          // 2009 Chandra CEO
    timelineEvents[18].relatedPioneerIds = [chandra.id];          // 2014 $100B
    timelineEvents[20].relatedPioneerIds = [chandra.id];          // 2017 Chairman
    timelineEvents[21].relatedPioneerIds = [chandra.id];          // 2018 jubilee
    timelineEvents[22].relatedPioneerIds = [gopi.id];             // 2020 SBWS
    timelineEvents[23].relatedPioneerIds = [gopi.id];             // 2021 $200B
    timelineEvents[24].relatedPioneerIds = [krithi.id];           // 2023 new CEO
    timelineEvents[25].relatedPioneerIds = [krithi.id];           // 2024 WisdomNext
    timelineEvents[26].relatedPioneerIds = [krithi.id, chandra.id]; // 2025 $30B

    const insertedEvents = await TimelineEvent.bulkCreate(timelineEvents);
    console.log(`Inserted ${insertedEvents.length} timeline events`);

    const insertedProducts = await Product.bulkCreate(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    const insertedQuotes = await Quote.bulkCreate(quotes);
    console.log(`Inserted ${insertedQuotes.length} quotes`);

    // Create default admin (password will be hashed by beforeCreate hook)
    const admin = await Admin.create({
      email: 'admin@tcs-pioneers.com',
      password: 'admin123',
      name: 'Admin User'
    });
    console.log(`Created admin user: ${admin.email}`);

    console.log('\n=== Seed completed successfully ===');
    console.log('Admin login: admin@tcs-pioneers.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
