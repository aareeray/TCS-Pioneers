const mongoose = require('mongoose');
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
    roleTitle: 'Chairman, Tata Group',
    activeYears: '1938–1991',
    shortBio: 'Jehangir Ratanji Dadabhoy Tata was the visionary chairman of the Tata Group who laid the strategic groundwork for the group\'s diversification into technology and services. Under his leadership, the Tata Group expanded across industries, and his forward-thinking philosophy enabled the creation of TCS as one of India\'s first software services ventures. His belief in nation-building through enterprise set the cultural tone for TCS\'s mission-driven approach.',
    keyContributions: [
      'Led Tata Group diversification into technology',
      'Championed the founding of TCS in 1968',
      'Established a culture of ethics and nation-building',
      'Pioneered Indian industrialization in aviation and steel'
    ],
    portraitImageUrl: '',
    tags: ['chairman', 'founder', 'visionary', 'Tata Group'],
    priority: 10
  },
  {
    name: 'F.C. Kohli',
    roleTitle: 'Founding CEO & Father of Indian IT',
    activeYears: '1968–1996',
    shortBio: 'Faqir Chand Kohli is widely regarded as the father of the Indian IT industry. As the founding CEO of TCS, he transformed the company from a small consulting division into a global technology powerhouse. His vision for leveraging India\'s intellectual capital in software development shaped not only TCS but the entire trajectory of India\'s technology sector. He championed computer literacy, software engineering practices, and the export of Indian talent worldwide.',
    keyContributions: [
      'Founded and built TCS from inception to global scale',
      'Pioneered India\'s software export industry',
      'Advocated for computer literacy across India',
      'Established TCS\'s early international client relationships',
      'Mentored a generation of IT leaders'
    ],
    portraitImageUrl: '',
    tags: ['founder', 'CEO', 'pioneer', 'IT industry'],
    priority: 9
  },
  {
    name: 'S. Ramadorai',
    roleTitle: 'CEO & Vice Chairman',
    activeYears: '1996–2009',
    shortBio: 'Subramanian Ramadorai served as CEO of TCS during a transformative period that saw the company become publicly listed and grow into one of the world\'s largest IT services firms. He oversaw TCS\'s IPO in 2004, expanded global delivery operations, and built a world-class organizational structure. His leadership established TCS as a trusted partner for Fortune 500 companies across banking, insurance, and manufacturing.',
    keyContributions: [
      'Led TCS through its landmark IPO in 2004',
      'Scaled global delivery model across continents',
      'Built partnerships with major international corporations',
      'Grew TCS revenue from hundreds of millions to billions'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'growth', 'IPO', 'global expansion'],
    priority: 8
  },
  {
    name: 'N. Chandrasekaran',
    roleTitle: 'CEO (2009–2017) & Chairman, Tata Sons',
    activeYears: '2009–present',
    shortBio: 'Natarajan Chandrasekaran led TCS as CEO from 2009 to 2017, driving digital transformation and making TCS the most valuable Indian company by market capitalization. He championed cloud computing, analytics, and automation, positioning TCS at the forefront of the digital revolution. He later became Chairman of Tata Sons in 2017, overseeing the entire Tata Group\'s strategic direction toward technology and sustainability.',
    keyContributions: [
      'Grew TCS to become India\'s most valuable company',
      'Drove digital and cloud transformation strategy',
      'Expanded TCS workforce to over 400,000 employees',
      'Became Chairman of Tata Sons in 2017',
      'Championed innovation labs and research initiatives'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'chairman', 'digital transformation', 'growth'],
    priority: 7
  },
  {
    name: 'Rajesh Gopinathan',
    roleTitle: 'CEO & Managing Director',
    activeYears: '2017–2023',
    shortBio: 'Rajesh Gopinathan served as CEO and Managing Director of TCS from 2017 to 2023, continuing the company\'s growth trajectory while navigating global challenges including the pandemic. He led TCS\'s pivot to a distributed work model, advanced AI and machine learning capabilities, and strengthened the company\'s position in cloud and cybersecurity. Under his leadership, TCS surpassed $25 billion in annual revenue.',
    keyContributions: [
      'Led TCS through pandemic-era transformation',
      'Achieved $25 billion+ annual revenue milestone',
      'Advanced AI and machine learning capabilities',
      'Strengthened cloud and cybersecurity offerings',
      'Managed transition to hybrid work model'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'AI', 'cloud', 'pandemic leadership'],
    priority: 6
  },
  {
    name: 'K. Krithivasan',
    roleTitle: 'CEO & Managing Director',
    activeYears: '2023–present',
    shortBio: 'K. Krithivasan became CEO and Managing Director of TCS in 2023, bringing deep expertise in banking, financial services, and digital transformation. He has been driving TCS\'s generative AI strategy, large-scale reskilling programs, and next-generation platform development. His leadership focuses on making TCS\'s workforce AI-ready while maintaining the company\'s culture of continuous learning and client-centricity.',
    keyContributions: [
      'Leading TCS into the generative AI era',
      'Driving large-scale workforce reskilling for AI readiness',
      'Expanding next-generation platform capabilities',
      'Strengthening BFSI (Banking & Financial Services) vertical',
      'Continuing TCS\'s growth and innovation agenda'
    ],
    portraitImageUrl: '',
    tags: ['CEO', 'AI', 'reskilling', 'current leader'],
    priority: 5
  }
];

const products = [
  {
    name: 'TCS BaNCS',
    domain: 'Banking & Financial Services',
    launchPeriod: '2000s',
    description: 'TCS BaNCS is a comprehensive core banking and financial services platform that powers banks, capital markets, and insurance companies worldwide. It provides end-to-end solutions for retail and corporate banking, payments, wealth management, and regulatory compliance.',
    impactHighlights: [
      'Serves major banks across 40+ countries',
      'Handles billions of transactions annually',
      'Supports retail, corporate, and universal banking',
      'Recognized as a global leader in core banking transformation'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-bancs',
    featured: true
  },
  {
    name: 'TCS iON',
    domain: 'Education & Assessment',
    launchPeriod: '2010s',
    description: 'TCS iON is a digital platform providing solutions for learning management, examination delivery, and institutional administration. It has been instrumental in digitizing large-scale competitive examinations in India and offering corporate training solutions globally.',
    impactHighlights: [
      'Conducts millions of online examinations annually',
      'Digital learning platform for institutions and corporates',
      'Supports government examination bodies across India',
      'Enables remote proctoring and assessment analytics'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-ion',
    featured: true
  },
  {
    name: 'TCS HOBS',
    domain: 'Telecom & Media',
    launchPeriod: '2010s',
    description: 'TCS HOBS (Hosted OSS/BSS) is a comprehensive digital platform for telecom operators, enabling revenue management, customer experience management, and network operations. It helps telecom companies transform their business support systems for the digital era.',
    impactHighlights: [
      'Serves leading telecom operators globally',
      'Enables 5G-ready business transformation',
      'Supports subscription and usage-based billing',
      'Manages complex partner ecosystems'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-hobs',
    featured: true
  },
  {
    name: 'TCS MasterCraft',
    domain: 'Enterprise Automation',
    launchPeriod: '2000s',
    description: 'TCS MasterCraft is a suite of enterprise automation tools designed to accelerate software development, testing, and data management. It helps organizations modernize legacy applications and automate DevOps processes at scale.',
    impactHighlights: [
      'Automates code generation and testing',
      'Accelerates legacy modernization projects',
      'Reduces development cycle time significantly',
      'Used by Fortune 500 enterprises worldwide'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-mastercraft',
    featured: false
  },
  {
    name: 'TCS ADD (Advanced Drug Development)',
    domain: 'Life Sciences & Healthcare',
    launchPeriod: '2010s',
    description: 'TCS ADD is a clinical trial management and drug development platform that helps pharmaceutical companies streamline regulatory compliance, trial management, and pharmacovigilance. It leverages AI and analytics for faster drug discovery.',
    impactHighlights: [
      'Accelerates drug development timelines',
      'Supports clinical trial management and compliance',
      'Uses AI for safety signal detection',
      'Serves global pharmaceutical companies'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/industries/life-sciences-healthcare',
    featured: false
  },
  {
    name: 'ignio',
    domain: 'AI & Cognitive Automation',
    launchPeriod: '2010s',
    description: 'ignio is TCS\'s AI-powered cognitive automation platform that acts as a virtual engineer for enterprise IT operations. It autonomously manages infrastructure, applications, and business processes using machine learning and cognitive intelligence.',
    impactHighlights: [
      'Autonomous IT operations management',
      'Reduces incident resolution time dramatically',
      'Self-healing capabilities for infrastructure',
      'Named a leader in AIOps by industry analysts'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/ignio',
    featured: true
  },
  {
    name: 'TCS OmniStore',
    domain: 'Retail & Commerce',
    launchPeriod: '2020s',
    description: 'TCS OmniStore is a unified commerce platform that enables retailers to deliver seamless omnichannel customer experiences. It integrates physical and digital retail operations, supporting everything from point-of-sale to e-commerce.',
    impactHighlights: [
      'Unifies online and in-store shopping experiences',
      'Cloud-native, API-first architecture',
      'Supports major global retailers',
      'Enables personalized customer journeys'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/tcs-omnistore',
    featured: false
  },
  {
    name: 'Quartz - Smart Ledgers',
    domain: 'Blockchain & Digital Assets',
    launchPeriod: '2020s',
    description: 'Quartz is TCS\'s blockchain platform for smart ledgers and digital assets, designed for financial services. It enables tokenization, decentralized finance solutions, and cross-border payment infrastructure using distributed ledger technology.',
    impactHighlights: [
      'Enables asset tokenization for financial institutions',
      'Supports multi-party distributed ledger networks',
      'Powers cross-border payment solutions',
      'Facilitates CBDC (Central Bank Digital Currency) pilots'
    ],
    officialUrl: 'https://www.tcs.com/what-we-do/products-platforms/quartz',
    featured: false
  }
];

const timelineEvents = [
  {
    year: 1968,
    title: 'TCS Founded as Tata Computer Systems',
    description: 'Tata Consultancy Services was established in 1968 as a division of Tata Sons, making it one of India\'s earliest entrants into the technology services industry. F.C. Kohli was appointed as the first general manager, setting the stage for what would become India\'s largest IT company.',
    category: 'History',
    decadeGroup: '1960s',
    importanceLevel: 'milestone'
  },
  {
    year: 1971,
    title: 'First International Client Engagement',
    description: 'TCS secured its first international assignment by providing punch card services for a UK-based client. This marked the beginning of India\'s software export industry and demonstrated the viability of offshore services delivery from India.',
    category: 'Business',
    decadeGroup: '1970s',
    importanceLevel: 'major'
  },
  {
    year: 1974,
    title: 'Hospital Information System for Indian Railways',
    description: 'TCS developed an advanced hospital information system, showcasing early capabilities in building large-scale software solutions for domestic clients. This project demonstrated TCS\'s ability to handle complex institutional requirements.',
    category: 'Technology',
    decadeGroup: '1970s',
    importanceLevel: 'minor'
  },
  {
    year: 1979,
    title: 'Establishment of TCS Research Center',
    description: 'TCS established a dedicated research wing to focus on emerging technologies and software methodologies. This investment in R&D would later fuel innovations across databases, AI, and distributed computing.',
    category: 'Technology',
    decadeGroup: '1970s',
    importanceLevel: 'major'
  },
  {
    year: 1981,
    title: 'TCS Opens First International Office',
    description: 'TCS expanded globally by opening its first international office, establishing a physical presence in overseas markets. This enabled closer collaboration with international clients and marked TCS\'s shift toward a global delivery model.',
    category: 'Business',
    decadeGroup: '1980s',
    importanceLevel: 'major'
  },
  {
    year: 1985,
    title: 'Swiss Banking Software Development',
    description: 'TCS developed banking software solutions for Swiss financial institutions, building early expertise in the BFSI sector that would become its strongest vertical. This cemented TCS\'s reputation for handling complex financial systems.',
    category: 'Technology',
    decadeGroup: '1980s',
    importanceLevel: 'minor'
  },
  {
    year: 1989,
    title: 'E-Commerce Solution Development',
    description: 'In the pre-internet era, TCS developed electronic data interchange and early e-commerce solutions, demonstrating foresight in digital commerce. These early investments positioned TCS well for the internet revolution of the 1990s.',
    category: 'Technology',
    decadeGroup: '1980s',
    importanceLevel: 'minor'
  },
  {
    year: 1992,
    title: 'Global Network Delivery Model Formalized',
    description: 'TCS pioneered its Global Network Delivery Model, establishing development centers across multiple countries. This distributed approach allowed round-the-clock development and became the blueprint for the Indian IT industry.',
    category: 'Business',
    decadeGroup: '1990s',
    importanceLevel: 'major'
  },
  {
    year: 1995,
    title: 'TCS Crosses 10,000 Employees',
    description: 'TCS\'s workforce grew beyond 10,000 employees, reflecting rapid expansion driven by the global software outsourcing boom. The company invested heavily in training infrastructure to maintain quality at scale.',
    category: 'History',
    decadeGroup: '1990s',
    importanceLevel: 'minor'
  },
  {
    year: 1999,
    title: 'Y2K Solutions and Global Recognition',
    description: 'TCS played a pivotal role in helping global corporations address the Year 2000 (Y2K) problem, solidifying its reputation as a trusted technology partner. This engagement brought TCS unprecedented visibility in international markets.',
    category: 'Technology',
    decadeGroup: '1990s',
    importanceLevel: 'major'
  },
  {
    year: 2001,
    title: 'TCS BaNCS Platform Launched',
    description: 'TCS launched BaNCS, its flagship core banking platform designed to modernize bank operations globally. BaNCS would go on to become one of the most widely adopted banking solutions, serving financial institutions across dozens of countries.',
    category: 'Products',
    decadeGroup: '2000s',
    importanceLevel: 'milestone'
  },
  {
    year: 2004,
    title: 'TCS Initial Public Offering (IPO)',
    description: 'TCS went public with its landmark IPO on the Bombay Stock Exchange and National Stock Exchange of India. The listing was one of the largest IPOs in Indian history at that time, raising significant capital and establishing TCS as a blue-chip investment.',
    category: 'Business',
    decadeGroup: '2000s',
    importanceLevel: 'milestone'
  },
  {
    year: 2005,
    title: 'Workforce Surpasses 50,000',
    description: 'TCS crossed the 50,000-employee mark, establishing itself as one of the world\'s largest IT employers. The company\'s training and development programs became models for the industry.',
    category: 'History',
    decadeGroup: '2000s',
    importanceLevel: 'minor'
  },
  {
    year: 2008,
    title: 'Revenue Exceeds $5 Billion',
    description: 'TCS achieved a major revenue milestone by surpassing $5 billion in annual revenue, demonstrating the success of its global delivery model and diversified service portfolio across industries.',
    category: 'Business',
    decadeGroup: '2000s',
    importanceLevel: 'major'
  },
  {
    year: 2011,
    title: 'TCS iON Platform Launch',
    description: 'TCS launched its iON platform, targeting education, examination management, and institutional administration. The platform would become instrumental in digitizing large-scale examinations across India.',
    category: 'Products',
    decadeGroup: '2010s',
    importanceLevel: 'major'
  },
  {
    year: 2013,
    title: 'TCS Innovation Labs Expansion',
    description: 'TCS expanded its network of innovation labs focusing on emerging technologies like IoT, AI, and blockchain. These labs became engines for co-innovation with clients and academic institutions globally.',
    category: 'Technology',
    decadeGroup: '2010s',
    importanceLevel: 'minor'
  },
  {
    year: 2014,
    title: 'Market Capitalization Exceeds $100 Billion',
    description: 'TCS became one of the few global IT companies to reach $100 billion in market capitalization, making it the most valuable Indian company at the time and placing it among the world\'s top technology firms.',
    category: 'Business',
    decadeGroup: '2010s',
    importanceLevel: 'milestone'
  },
  {
    year: 2016,
    title: 'ignio Cognitive Automation Platform',
    description: 'TCS launched ignio, an AI-powered cognitive automation platform designed to autonomously manage enterprise IT operations. This marked TCS\'s push into the AIOps space and demonstrated its product innovation capabilities.',
    category: 'Products',
    decadeGroup: '2010s',
    importanceLevel: 'major'
  },
  {
    year: 2018,
    title: 'TCS Celebrates 50 Years',
    description: 'TCS celebrated its golden jubilee with a workforce exceeding 400,000 employees across 46 countries. The milestone highlighted five decades of growth from a small consulting division to one of the world\'s most valuable IT companies.',
    category: 'History',
    decadeGroup: '2010s',
    importanceLevel: 'milestone'
  },
  {
    year: 2020,
    title: 'Secure Borderless Workspaces (SBWS)',
    description: 'In response to the global pandemic, TCS launched its Secure Borderless Workspaces model, enabling 95% of employees to work remotely within weeks. This demonstrated TCS\'s organizational agility and set new standards for enterprise work models.',
    category: 'Technology',
    decadeGroup: '2020s',
    importanceLevel: 'major'
  },
  {
    year: 2021,
    title: 'Revenue Surpasses $25 Billion',
    description: 'TCS crossed $25 billion in annual revenue, driven by digital transformation demand and cloud adoption. The company strengthened its position as a top-3 global IT services company by revenue.',
    category: 'Business',
    decadeGroup: '2020s',
    importanceLevel: 'major'
  },
  {
    year: 2022,
    title: 'Major AI and Cloud Investments',
    description: 'TCS announced significant investments in AI, generative AI, and cloud-native solutions. The company began training hundreds of thousands of employees in AI skills as part of its workforce transformation initiative.',
    category: 'Technology',
    decadeGroup: '2020s',
    importanceLevel: 'major'
  },
  {
    year: 2023,
    title: 'K. Krithivasan Appointed CEO',
    description: 'K. Krithivasan took over as CEO and Managing Director, bringing deep BFSI expertise and a focus on generative AI strategy. Under his leadership, TCS accelerated its AI-first approach and large-scale reskilling programs.',
    category: 'History',
    decadeGroup: '2020s',
    importanceLevel: 'major'
  },
  {
    year: 2024,
    title: 'AI-Ready Workforce and Gen AI Integration',
    description: 'TCS reported training over 150,000 employees in generative AI skills, making it one of the largest corporate AI upskilling initiatives globally. The company integrated AI across its service offerings and product platforms.',
    category: 'Technology',
    decadeGroup: '2020s',
    importanceLevel: 'milestone'
  },
  {
    year: 2025,
    title: 'Next-Generation Platform Evolution',
    description: 'TCS continues to evolve its platform strategy with investments in quantum computing research, sustainable technology solutions, and advanced AI-driven automation. The company remains focused on being a growth partner for global enterprises.',
    category: 'Technology',
    decadeGroup: '2020s',
    importanceLevel: 'minor'
  }
];

const quotes = [
  {
    type: 'quote',
    text: 'The key to success is to keep growing in all areas of life - mental, emotional, spiritual, as well as physical.',
    author: 'J.R.D. Tata',
    context: 'On continuous growth and development'
  },
  {
    type: 'quote',
    text: 'Software is going to be the means of transforming India.',
    author: 'F.C. Kohli',
    context: 'Vision for India\'s technology future'
  },
  {
    type: 'stat',
    text: '600,000+ employees across 55+ countries',
    author: '',
    context: 'TCS global workforce scale'
  },
  {
    type: 'stat',
    text: 'Over $28 billion in annual revenue',
    author: '',
    context: 'TCS revenue scale'
  },
  {
    type: 'theme',
    text: 'Building on Belief - the idea that with the right talent, training, and trust, technology can solve any challenge.',
    author: 'TCS Philosophy',
    context: 'Core organizational theme'
  },
  {
    type: 'quote',
    text: 'Digital is not just about technology. It is about reimagining business and creating value.',
    author: 'N. Chandrasekaran',
    context: 'On digital transformation'
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
    const krithi = insertedPioneers.find(p => p.name === 'K. Krithivasan');

    // Add pioneer references to timeline events
    timelineEvents[0].relatedPioneerIds = [jrd._id, kohli._id]; // 1968 founding
    timelineEvents[1].relatedPioneerIds = [kohli._id]; // First international client
    timelineEvents[7].relatedPioneerIds = [kohli._id]; // Global delivery model
    timelineEvents[9].relatedPioneerIds = [rama._id]; // Y2K
    timelineEvents[11].relatedPioneerIds = [rama._id]; // IPO
    timelineEvents[16].relatedPioneerIds = [chandra._id]; // $100B market cap
    timelineEvents[22].relatedPioneerIds = [krithi._id]; // New CEO

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
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
