const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Pioneer = require('../models/Pioneer');
const TimelineEvent = require('../models/TimelineEvent');
const Product = require('../models/Product');
const Quote = require('../models/Quote');
const Admin = require('../models/Admin');

// Sources: tata.com, Wikipedia (Tata Consultancy Services), economictimes.com,
// businessoutreach.in, financialexpress.com, ndtv.com
// All content below is original summarization of publicly available facts.

const pioneers = [
  {
    name: 'J.R.D. Tata',
    roleTitle: 'Chairman, Tata Group (1938–1991)',
    activeYears: '1938–1991',
    shortBio: 'Jehangir Ratanji Dadabhoy Tata served as chairman of the Tata Group for over five decades, overseeing its transformation from a traditional industrial conglomerate into a diversified enterprise spanning steel, aviation, chemicals, and technology. His strategic foresight in 1968 led to the creation of TCS as a division of Tata Sons, at a time when computing was virtually unknown in India. J.R.D. believed passionately in nation-building through enterprise, ethics, and employee welfare — values that remain embedded in TCS\'s DNA. He is credited with establishing the Tata culture of trust and social responsibility that distinguishes the group globally.',
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
    shortBio: 'Faqir Chand Kohli, born in pre-partition Peshawar, is universally recognized as the father of the Indian IT industry. In 1968, he assembled a small team of US-returned IT professionals to form Tata Computer Systems (later TCS) when computing was a brand-new concept in India. Over 28 years as CEO, he pivoted TCS from management consultancy into software development and services, navigating multiple technology waves. He secured TCS\'s first overseas project in 1971 for an Iranian utility company, forged a landmark partnership with Burroughs Corporation in 1973, and relentlessly advocated for computer literacy across India. He received the Padma Bhushan in 2002 for his contributions to the Indian software industry. He passed away in November 2020 at age 96.',
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
    shortBio: 'Subramanian Ramadorai succeeded F.C. Kohli as CEO of TCS in 1996 and led the company through its most transformative growth phase. Under his 14-year leadership, TCS grew from a $400 million revenue company with 6,000 employees to a global technology services giant with over 200,000 employees and revenues exceeding $6 billion. His crowning achievement was steering TCS through its landmark IPO on August 25, 2004 — India\'s first billion-dollar private sector IPO, which raised approximately $1.17 billion. He formalized TCS\'s Global Network Delivery Model and established the company as a trusted partner for Fortune 500 enterprises worldwide.',
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
    shortBio: 'Natarajan Chandrasekaran joined TCS in 1987 and rose through the ranks to become CEO in 2009. During his tenure, he drove TCS\'s digital transformation strategy, expanded the workforce to over 400,000, and made TCS the most valuable Indian company by market capitalization — reaching the $100 billion mark in 2014. He championed cloud computing, analytics, and automation at scale. In 2017, he was appointed Chairman of Tata Sons, becoming the youngest person and first professional manager to hold the role. He continues to shape TCS\'s AI strategy and recently called generative AI a "civilisational shift," overseeing the launch of TCS AI WisdomNext platform.',
    keyContributions: [
      'Grew TCS market capitalization past $100 billion (2014)',
      'Drove digital-first transformation of service delivery',
      'Expanded TCS to 400,000+ employees across 46 countries',
      'Appointed Chairman of Tata Sons in 2017',
      'Championed TCS AI WisdomNext generative AI platform',
      'Described by peers as driving company "to travel a lot and forge relationships"'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'chairman', 'digital transformation', '$100B market cap', 'Tata Sons'],
    priority: 7
  },
  {
    name: 'Rajesh Gopinathan',
    roleTitle: 'CEO & Managing Director (2017–2023)',
    activeYears: '2017–2023',
    shortBio: 'Rajesh Gopinathan served as CEO and Managing Director of TCS from February 2017 to March 2023. A finance professional by training, he previously served as TCS\'s CFO. Under his leadership, TCS navigated the COVID-19 pandemic by rapidly deploying the Secure Borderless Workspaces (SBWS) model — transitioning nearly 400,000 employees to remote work within weeks. He grew annual revenue from $19 billion to over $25 billion, achieved a historic $200 billion market capitalization in September 2021 (a first for any Indian IT company), and significantly expanded cloud and cybersecurity capabilities.',
    keyContributions: [
      'Achieved $200 billion market capitalization milestone (September 2021)',
      'Grew annual revenue from $19 billion to $25+ billion',
      'Deployed SBWS model — 95% remote workforce during pandemic',
      'Expanded cloud, cybersecurity, and digital offerings',
      'First Indian IT company to reach $200 billion valuation',
      'Honored all 40,000 graduate job offers during COVID-19 despite uncertainties'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'SBWS', '$200B market cap', 'pandemic leadership', 'cloud'],
    priority: 6
  },
  {
    name: 'K. Krithivasan',
    roleTitle: 'CEO & Managing Director (2023–present)',
    activeYears: '2023–present',
    shortBio: 'K. Krithivasan assumed the role of CEO and Managing Director in June 2023, bringing over 34 years of experience at TCS with deep expertise in banking, financial services, and insurance (BFSI). Under his leadership, TCS has crossed the $30 billion annual revenue milestone in FY2025 and driven annualized AI services revenue past $2.3 billion. He has overseen the reskilling of 300,000+ employees in AI and machine learning, making TCS home to what is expected to be the world\'s largest AI-trained workforce. His strategic focus centers on generative AI adoption, agentic AI, and building next-generation platforms for enterprise clients.',
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
    description: 'TCS BaNCS is a flagship universal banking platform that provides core banking, payments, wealth management, capital markets, and insurance solutions. Evolved from TCS\'s decades of BFSI expertise dating back to the 1980s Swiss banking projects, it is now one of the world\'s most deployed core banking platforms, serving financial institutions across 40+ countries and processing billions of transactions.',
    impactHighlights: [
      'Deployed in over 40 countries for leading global banks',
      'Processes billions of financial transactions annually',
      'Covers retail banking, corporate banking, payments, wealth, and insurance',
      'Named a global leader in core banking by multiple analyst firms',
      'Evolved from TCS\'s 1980s Swiss banking expertise'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-bancs',
    featured: true
  },
  {
    name: 'TCS iON',
    domain: 'Education & Assessment',
    launchPeriod: '2010s',
    description: 'TCS iON is an integrated digital platform for learning, assessment, and institutional administration. It has become India\'s leading digital examination platform, conducting millions of competitive and recruitment exams annually for government bodies, universities, and corporations. The platform supports end-to-end exam lifecycle management including registration, scheduling, proctoring, and analytics.',
    impactHighlights: [
      'Conducts tens of millions of online examinations annually across India',
      'Trusted by major government recruitment bodies and educational institutions',
      'Offers corporate learning and development solutions globally',
      'Supports remote proctoring, AI-based monitoring, and assessment analytics',
      'Enables digital transformation of educational institutions end-to-end'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-ion',
    featured: true
  },
  {
    name: 'TCS HOBS',
    domain: 'Telecom & Media',
    launchPeriod: '2010s',
    description: 'TCS HOBS (Hosted & Managed OSS/BSS solution) is a comprehensive digital business platform for communications service providers. It enables telecom operators to manage revenue, customer experience, partnerships, and digital services on a cloud-native, microservices-based architecture, supporting the transition to 5G and IoT-era business models.',
    impactHighlights: [
      'Serves telecom operators in 20+ countries',
      'Cloud-native platform enabling 5G-ready transformation',
      'Supports complex multi-partner digital ecosystems',
      'Enables subscription, usage-based, and dynamic billing models',
      'Handles entire order-to-cash lifecycle for telecom'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-hobs',
    featured: true
  },
  {
    name: 'ignio',
    domain: 'AI & Cognitive Automation',
    launchPeriod: '2010s',
    description: 'ignio is TCS\'s pioneering cognitive automation platform that functions as a "virtual engineer" for enterprise IT and business operations. Using machine learning and neural automation, it autonomously resolves incidents, optimizes resources, and enables self-healing infrastructure. It was one of the first enterprise AIOps platforms when launched in 2016.',
    impactHighlights: [
      'Autonomous incident detection and resolution for enterprise IT',
      'Self-healing infrastructure capabilities reduce downtime by up to 80%',
      'Named a leader in AIOps by industry analysts including Gartner',
      'Covers IT operations, business operations, and cloud management',
      'Deployed across Fortune 500 enterprises globally'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/ignio',
    featured: true
  },
  {
    name: 'TCS MasterCraft',
    domain: 'Enterprise Automation & DevOps',
    launchPeriod: '2000s',
    description: 'TCS MasterCraft is a suite of enterprise tools for software development automation, testing, data management, and application modernization. It accelerates digital transformation by automating code generation, model-driven development, and continuous testing, enabling organizations to modernize legacy applications at scale.',
    impactHighlights: [
      'Automates up to 75% of code generation for common patterns',
      'Accelerates legacy mainframe-to-cloud modernization',
      'Integrated DevOps automation across the software lifecycle',
      'Reduces testing effort through AI-powered test generation',
      'Used by hundreds of large enterprises globally'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-mastercraft',
    featured: false
  },
  {
    name: 'TCS AI WisdomNext',
    domain: 'Generative AI Platform',
    launchPeriod: '2020s',
    description: 'TCS AI WisdomNext is an industry-first GenAI aggregation platform that accelerates scalable generative AI adoption for enterprises. Launched in 2024, it aggregates multiple GenAI services (vendor, internal, and open-source LLMs) into a single interface, allowing businesses to experiment, deploy, and scale AI solutions while maintaining regulatory compliance and governance guardrails.',
    impactHighlights: [
      'First-of-its-kind GenAI aggregation platform in the IT services industry',
      'Integrates multiple vendor, open-source, and proprietary LLM models',
      'Enables real-time experimentation across AI models with governance',
      'Accelerates enterprise GenAI adoption at lower cost and risk',
      'Powers TCS\'s $2.3 billion annualized AI services revenue'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms',
    featured: true
  },
  {
    name: 'TCS OmniStore',
    domain: 'Retail & Commerce',
    launchPeriod: '2020s',
    description: 'TCS OmniStore is a cloud-native, API-first unified commerce platform that enables retailers to deliver seamless omnichannel customer experiences. It unifies point-of-sale, e-commerce, order management, and customer engagement across physical and digital touchpoints.',
    impactHighlights: [
      'Unifies in-store and online retail operations on one platform',
      'Cloud-native microservices architecture for global scalability',
      'Deployed by major international retail brands',
      'Supports personalization, loyalty, and real-time inventory management',
      'Headless commerce architecture enabling rapid digital innovation'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-omnistore',
    featured: false
  },
  {
    name: 'Quartz - Smart Ledgers',
    domain: 'Blockchain & Digital Assets',
    launchPeriod: '2020s',
    description: 'Quartz is TCS\'s blockchain and distributed ledger platform for financial services, enabling tokenization of real-world assets, decentralized finance solutions, and next-generation payment infrastructure. It supports central bank digital currency (CBDC) pilots and multi-party settlement networks.',
    impactHighlights: [
      'Enables tokenization of financial assets and securities',
      'Supports Central Bank Digital Currency (CBDC) pilot programs',
      'Multi-party distributed ledger network for cross-border payments',
      'Built for regulatory compliance in financial services',
      'Used by banking institutions for trade finance and settlements'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/quartz',
    featured: false
  }
];


const timelineEvents = [
  {
    year: 1968,
    title: 'Tata Computer Systems Founded',
    description: 'Tata Consultancy Services was established in 1968 as a division of Tata Sons Limited, originally known as Tata Computer Systems. F.C. Kohli assembled a young team of US-returned IT professionals at a time when computing was virtually unknown in India. The concept itself was brand new — as N. Chandrasekaran later reflected, "if we rewind to 1968, the concept of computing itself was brand new." This marked the birth of what would become India\'s IT industry.',
    category: 'History',
    decadeGroup: '1960s',
    importanceLevel: 'milestone'
  },
  {
    year: 1971,
    title: 'First Overseas Project — Iranian Electric Utility',
    description: 'TCS won its first overseas assignment in 1971 — a project for an electric utility company in Iran. This was the pioneering moment that proved Indian software professionals could deliver quality work for international clients, effectively inaugurating India\'s software export story. F.C. Kohli personally drove this effort to demonstrate the viability of offshore services.',
    category: 'Business',
    decadeGroup: '1970s',
    importanceLevel: 'major'
  },
  {
    year: 1973,
    title: 'Burroughs Corporation Partnership',
    description: 'TCS partnered with Burroughs Corporation (then the world\'s second-largest computer company after IBM) to sell and service Burroughs systems in India and develop software for their machines worldwide. F.C. Kohli personally visited Burroughs multiple times in 1973-74 to convince them to experiment with subcontracting software development. This landmark deal validated the offshore software model.',
    category: 'Business',
    decadeGroup: '1970s',
    importanceLevel: 'milestone'
  },
  {
    year: 1974,
    title: 'First Full Software Development Lifecycle Project',
    description: 'TCS delivered a financial accounting solution for a housing society in the UK on behalf of Burroughs — its first complete software development lifecycle project from requirements to deployment. This demonstrated TCS\'s capability to handle end-to-end software projects for international markets.',
    category: 'Technology',
    decadeGroup: '1970s',
    importanceLevel: 'major'
  },
  {
    year: 1975,
    title: 'F.C. Kohli\'s Vision for IT in Nation-Building',
    description: 'At a time when IT was a little-known concept in India, F.C. Kohli addressed the Computer Society of India, prophesying the role technology could play in building the nation. He drew parallels to the Industrial Revolution, declaring that India must not miss the coming information revolution. This speech galvanized the nascent Indian tech community.',
    category: 'History',
    decadeGroup: '1970s',
    importanceLevel: 'minor'
  },
  {
    year: 1981,
    title: 'TRDDC Research Center Established',
    description: 'TCS established the Tata Research Development and Design Centre (TRDDC) in Pune in 1981. In its early years, the lab built an award-winning TB testing kit, eco-friendly cements using recyclable waste, and participated in Indo-US collaborative software technology projects. TRDDC became TCS\'s innovation engine for decades.',
    category: 'Technology',
    decadeGroup: '1980s',
    importanceLevel: 'major'
  },
  {
    year: 1981,
    title: 'First International Office Opened',
    description: 'TCS established its first permanent office outside India, marking the transition from project-based overseas work to a sustained global presence. This physical footprint enabled deeper client relationships and local market expertise.',
    category: 'Business',
    decadeGroup: '1980s',
    importanceLevel: 'major'
  },
  {
    year: 1985,
    title: 'Swiss Banking Solutions — BFSI Expertise Begins',
    description: 'TCS developed sophisticated banking software solutions for Swiss financial institutions in the mid-1980s, beginning its deep specialization in Banking, Financial Services, and Insurance (BFSI). This expertise would eventually lead to the creation of TCS BaNCS and make BFSI TCS\'s largest revenue-generating vertical.',
    category: 'Technology',
    decadeGroup: '1980s',
    importanceLevel: 'major'
  },
  {
    year: 1989,
    title: 'Electronic Commerce and EDI Solutions',
    description: 'Before the World Wide Web existed, TCS developed electronic data interchange (EDI) and early electronic commerce solutions. This forward-looking investment in digital transaction processing positioned TCS to capitalize on the internet revolution of the following decade.',
    category: 'Technology',
    decadeGroup: '1980s',
    importanceLevel: 'minor'
  },
  {
    year: 1992,
    title: 'Global Network Delivery Model Pioneered',
    description: 'TCS formalized its Global Network Delivery Model (GNDM), establishing networked development centers across multiple time zones. This model — enabling 24-hour "follow-the-sun" development — became the operational blueprint not just for TCS but for the entire Indian IT industry\'s offshore services model.',
    category: 'Business',
    decadeGroup: '1990s',
    importanceLevel: 'major'
  },
  {
    year: 1996,
    title: 'S. Ramadorai Becomes CEO',
    description: 'S. Ramadorai succeeded F.C. Kohli as CEO of TCS, inheriting a company with approximately $400 million in revenue and 6,000 employees. His tenure would become the most explosive growth period in TCS history, taking the company to billions in revenue and hundreds of thousands of employees.',
    category: 'History',
    decadeGroup: '1990s',
    importanceLevel: 'major'
  },
  {
    year: 1999,
    title: 'Y2K — TCS Emerges as Global Technology Partner',
    description: 'TCS played a critical role in helping corporations worldwide solve the Year 2000 (Y2K) computer bug, which threatened to crash systems when the calendar rolled from 1999 to 2000. This massive engagement brought TCS unprecedented global visibility, deepened client relationships, and demonstrated India\'s IT capabilities to the world.',
    category: 'Technology',
    decadeGroup: '1990s',
    importanceLevel: 'major'
  },
  {
    year: 2001,
    title: 'TCS BaNCS Core Banking Platform Launched',
    description: 'TCS launched BaNCS, its comprehensive core banking platform, building on over 15 years of BFSI expertise. The platform would grow to serve major banks in 40+ countries, processing billions of transactions and becoming one of the most widely deployed banking solutions globally.',
    category: 'Products',
    decadeGroup: '2000s',
    importanceLevel: 'milestone'
  },
  {
    year: 2002,
    title: 'F.C. Kohli Awarded Padma Bhushan',
    description: 'The Government of India honored F.C. Kohli with the Padma Bhushan — one of the nation\'s highest civilian awards — for his extraordinary contributions to building India\'s $100 billion IT industry. The recognition cemented his legacy as the father of Indian IT.',
    category: 'Awards',
    decadeGroup: '2000s',
    importanceLevel: 'major'
  },
  {
    year: 2004,
    title: 'TCS IPO — India\'s First Billion-Dollar Private Listing',
    description: 'On August 25, 2004, TCS was listed on both the Bombay Stock Exchange and National Stock Exchange at an issue price of Rs 850 per share. The IPO raised approximately Rs 5,420 crore ($1.17 billion), making it India\'s largest private-sector IPO at the time. Shares listed at a 26.6% premium at Rs 1,076. Ratan Tata and S. Ramadorai clicked the mouse to officially list the company.',
    category: 'Business',
    decadeGroup: '2000s',
    importanceLevel: 'milestone'
  },
  {
    year: 2006,
    title: 'TCS Becomes First Indian IT Company to Cross $1 Billion Quarterly Revenue',
    description: 'TCS achieved a significant milestone by becoming the first Indian IT company to cross $1 billion in quarterly revenue. This established TCS as a pioneer in proving that Indian technology companies could compete at the highest global levels.',
    category: 'Business',
    decadeGroup: '2000s',
    importanceLevel: 'major'
  },
  {
    year: 2009,
    title: 'N. Chandrasekaran Appointed CEO',
    description: 'Natarajan Chandrasekaran, who joined TCS in 1987 as an intern, was appointed CEO. His appointment signaled TCS\'s commitment to digital transformation, innovation, and global expansion. He would drive TCS to unprecedented heights over the next eight years.',
    category: 'History',
    decadeGroup: '2000s',
    importanceLevel: 'major'
  },
  {
    year: 2011,
    title: 'TCS iON Digital Platform Launched',
    description: 'TCS launched the iON platform for digital learning, examination, and institutional management. The platform rapidly became India\'s leading digital examination system, conducting tens of millions of competitive exams annually for government recruitment bodies and universities.',
    category: 'Products',
    decadeGroup: '2010s',
    importanceLevel: 'major'
  },
  {
    year: 2014,
    title: 'Market Capitalization Crosses $100 Billion',
    description: 'TCS became one of the few global IT services companies to reach a market capitalization of $100 billion, making it the most valuable Indian company at the time. The stock had delivered over 600% returns to shareholders in the decade since its 2004 IPO listing. This placed TCS among the world\'s top technology firms by valuation.',
    category: 'Business',
    decadeGroup: '2010s',
    importanceLevel: 'milestone'
  },
  {
    year: 2016,
    title: 'ignio Cognitive Automation Platform Launched',
    description: 'TCS launched ignio, a pioneering AI-powered cognitive automation platform that functions as a "virtual engineer" for enterprise IT operations. As one of the earliest enterprise AIOps platforms, ignio demonstrated TCS\'s capability to build cutting-edge product IP alongside its services business.',
    category: 'Products',
    decadeGroup: '2010s',
    importanceLevel: 'major'
  },
  {
    year: 2017,
    title: 'N. Chandrasekaran Becomes Chairman of Tata Sons',
    description: 'N. Chandrasekaran was elevated to Chairman of Tata Sons — the holding company of the entire Tata Group — becoming the youngest person and first professional manager to hold the position. His successor at TCS, Rajesh Gopinathan, continued the digital growth strategy.',
    category: 'History',
    decadeGroup: '2010s',
    importanceLevel: 'major'
  },
  {
    year: 2018,
    title: 'TCS Golden Jubilee — 50 Years, 400,000+ Employees',
    description: 'TCS celebrated its 50th anniversary with a workforce exceeding 400,000 employees operating from 150 locations across 46 countries. The company had grown from a small division with a handful of people to one of the world\'s most valuable and fastest-growing IT services brands.',
    category: 'History',
    decadeGroup: '2010s',
    importanceLevel: 'milestone'
  },
  {
    year: 2020,
    title: 'Secure Borderless Workspaces (SBWS) — Pandemic Response',
    description: 'When COVID-19 struck, TCS deployed its Secure Borderless Workspaces (SBWS) model with extraordinary speed, moving nearly 400,000 employees in India from 285 offices to remote work within weeks — achieving 98% work-from-home. The company also honored all 40,000 graduate job offers despite the uncertainty, demonstrating both organizational agility and values-driven leadership.',
    category: 'Technology',
    decadeGroup: '2020s',
    importanceLevel: 'milestone'
  },
  {
    year: 2021,
    title: 'First Indian IT Company to Hit $200 Billion Market Cap',
    description: 'In September 2021, TCS recorded a market capitalization of US$200 billion, becoming the first Indian IT company to achieve this historic valuation. Annual revenue surpassed $25 billion. TCS was recognized as the second most valuable IT services brand in the world by Brand Finance.',
    category: 'Business',
    decadeGroup: '2020s',
    importanceLevel: 'milestone'
  },
  {
    year: 2023,
    title: 'K. Krithivasan Appointed CEO — AI-First Strategy',
    description: 'K. Krithivasan assumed the role of CEO and Managing Director in June 2023, bringing 34+ years of TCS experience and deep BFSI expertise. He immediately signaled an AI-first strategic direction, accelerating generative AI investments and declaring the ambition to build the world\'s largest AI-trained workforce.',
    category: 'History',
    decadeGroup: '2020s',
    importanceLevel: 'major'
  },
  {
    year: 2024,
    title: 'TCS AI WisdomNext Platform & 300K+ AI-Trained Employees',
    description: 'TCS launched AI WisdomNext — an industry-first generative AI aggregation platform that enables enterprises to experiment across vendor, internal, and open-source LLM models with governance guardrails. The company also reported reskilling 300,000+ employees in AI, machine learning, and generative AI skills, making it one of the largest corporate AI upskilling initiatives globally.',
    category: 'Technology',
    decadeGroup: '2020s',
    importanceLevel: 'milestone'
  },
  {
    year: 2025,
    title: 'TCS Crosses $30 Billion Revenue — AI Revenue at $2.3 Billion',
    description: 'TCS crossed the $30 billion annual revenue milestone in FY2025 with 607,000+ employees — making it India\'s largest private sector employer. Annualized AI services revenue surpassed $2.3 billion (up from $1.5 billion just a year prior), with generative and agentic AI revenue tripling year-over-year. N. Chandrasekaran called Gen AI a "civilisational shift" and announced plans to build an AI-human workforce of the future.',
    category: 'Business',
    decadeGroup: '2020s',
    importanceLevel: 'milestone'
  }
];


const quotes = [
  {
    type: 'quote',
    text: 'Many years ago, there was an industrial revolution; we missed it for reasons beyond our control. Today there is a new revolution — the information revolution. We cannot afford to miss it.',
    author: 'F.C. Kohli',
    context: 'Address to the Computer Society of India, 1975'
  },
  {
    type: 'quote',
    text: 'It is taken for granted now, but if we rewind to 1968, the concept of computing itself was brand new.',
    author: 'N. Chandrasekaran',
    context: 'Reflecting on TCS\'s founding, Tata.com interview'
  },
  {
    type: 'quote',
    text: 'Software is going to be the means of transforming India.',
    author: 'F.C. Kohli',
    context: 'Vision for India\'s technology future'
  },
  {
    type: 'stat',
    text: '607,000+ employees across 150 locations in 46 countries',
    author: '',
    context: 'TCS global workforce scale as of March 2025 (India\'s largest private sector employer)'
  },
  {
    type: 'stat',
    text: '$30+ billion in annual revenue (FY2025)',
    author: '',
    context: 'TCS revenue milestone, per TCS Q4 FY2025 press release'
  },
  {
    type: 'stat',
    text: '$2.3 billion annualized AI services revenue (Q4 FY2026)',
    author: '',
    context: 'AI revenue growing at 17%+ sequentially, per TCS quarterly results'
  },
  {
    type: 'stat',
    text: '300,000+ employees reskilled in AI, ML, and Generative AI',
    author: '',
    context: 'One of the largest corporate AI upskilling initiatives globally'
  },
  {
    type: 'theme',
    text: 'Building on Belief — the conviction that with the right talent, training, and trust, technology can solve any challenge and transform any industry.',
    author: 'TCS Corporate Philosophy',
    context: 'Core organizational theme reflecting Tata values'
  },
  {
    type: 'quote',
    text: 'Generative AI is a civilisational shift. We are building an AI-human workforce of the future.',
    author: 'N. Chandrasekaran',
    context: 'On TCS AI strategy, 2025'
  },
  {
    type: 'stat',
    text: 'First Indian IT company to reach $200 billion market capitalization (September 2021)',
    author: '',
    context: 'Historic valuation milestone, per Wikipedia and multiple financial sources'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Promise.all([
      Pioneer.deleteMany({}),
      TimelineEvent.deleteMany({}),
      Product.deleteMany({}),
      Quote.deleteMany({}),
      Admin.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert seed data
    const insertedPioneers = await Pioneer.insertMany(pioneers);
    console.log(`Inserted ${insertedPioneers.length} pioneers`);

    // Link pioneers to timeline events
    const kohli = insertedPioneers.find(p => p.name === 'F.C. Kohli');
    const jrd = insertedPioneers.find(p => p.name === 'J.R.D. Tata');
    const chandra = insertedPioneers.find(p => p.name === 'N. Chandrasekaran');
    const rama = insertedPioneers.find(p => p.name === 'S. Ramadorai');
    const gopi = insertedPioneers.find(p => p.name === 'Rajesh Gopinathan');
    const krithi = insertedPioneers.find(p => p.name === 'K. Krithivasan');

    // Add pioneer references to timeline events (by index)
    timelineEvents[0].relatedPioneerIds = [jrd._id, kohli._id]; // 1968 founding
    timelineEvents[1].relatedPioneerIds = [kohli._id]; // 1971 first overseas
    timelineEvents[2].relatedPioneerIds = [kohli._id]; // 1973 Burroughs
    timelineEvents[3].relatedPioneerIds = [kohli._id]; // 1974 first SDLC project
    timelineEvents[4].relatedPioneerIds = [kohli._id]; // 1975 CSI speech
    timelineEvents[5].relatedPioneerIds = [kohli._id]; // 1981 TRDDC
    timelineEvents[9].relatedPioneerIds = [kohli._id]; // 1992 GNDM
    timelineEvents[10].relatedPioneerIds = [rama._id]; // 1996 Ramadorai CEO
    timelineEvents[11].relatedPioneerIds = [rama._id]; // 1999 Y2K
    timelineEvents[13].relatedPioneerIds = [kohli._id]; // 2002 Padma Bhushan
    timelineEvents[14].relatedPioneerIds = [rama._id]; // 2004 IPO
    timelineEvents[16].relatedPioneerIds = [chandra._id]; // 2009 Chandra CEO
    timelineEvents[18].relatedPioneerIds = [chandra._id]; // 2014 $100B
    timelineEvents[20].relatedPioneerIds = [chandra._id]; // 2017 Chairman
    timelineEvents[21].relatedPioneerIds = [chandra._id]; // 2018 golden jubilee
    timelineEvents[22].relatedPioneerIds = [gopi._id]; // 2020 SBWS
    timelineEvents[23].relatedPioneerIds = [gopi._id]; // 2021 $200B
    timelineEvents[24].relatedPioneerIds = [krithi._id]; // 2023 new CEO
    timelineEvents[25].relatedPioneerIds = [krithi._id]; // 2024 WisdomNext
    timelineEvents[26].relatedPioneerIds = [krithi._id, chandra._id]; // 2025 $30B

    const insertedEvents = await TimelineEvent.insertMany(timelineEvents);
    console.log(`Inserted ${insertedEvents.length} timeline events`);

    const insertedProducts = await Product.insertMany(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    const insertedQuotes = await Quote.insertMany(quotes);
    console.log(`Inserted ${insertedQuotes.length} quotes`);

    // Create default admin
    const admin = await Admin.create({
      email: 'admin@tcs-pioneers.com',
      password: 'admin123',
      name: 'Admin User'
    });
    console.log(`Created admin user: ${admin.email}`);

    console.log('\n=== Seed completed successfully ===');
    console.log('Admin login: admin@tcs-pioneers.com / admin123');
    console.log('\nData sources (all publicly available):');
    console.log('- tata.com (TCS Timeline, Five Decades, FC Kohli profile, SBWS, WisdomNext)');
    console.log('- Wikipedia (Tata Consultancy Services, Subramanian Ramadorai)');
    console.log('- economictimes.com (TCS IPO, quarterly results, AI revenue)');
    console.log('- financialexpress.com (20 Years of TCS IPO)');
    console.log('- businessoutreach.in (TCS AI-Driven Enterprise Growth)');
    console.log('- ndtv.com (TCS Generative AI workforce)');
    console.log('- businesstoday.in (55-year journey)');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
