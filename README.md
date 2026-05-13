# Pioneers of TCS

An interactive MERN (MongoDB, Express, React, Node.js) web application that showcases the history, leaders, products, and global impact of Tata Consultancy Services (TCS).

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## Overview

**Pioneers of TCS** is a research-driven storytelling platform that serves as a mini interactive museum for TCS. It covers:

- **Timeline**: TCS's evolution from 1968 to present (25+ events)
- **Pioneers**: Key leaders who shaped TCS (6 detailed profiles)
- **Products**: Platforms and products across industries (8 products)
- **Impact**: Global presence, culture, and AI-ready initiatives
- **Admin Panel**: Full CRUD content management system

## Tech Stack

### Frontend
- React 18 with Vite
- React Router v6 for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Chart.js for data visualization
- React Icons for iconography
- Axios for API communication

### Backend
- Node.js with Express
- RESTful API architecture
- JWT-based authentication
- bcrypt.js for password hashing
- express-validator for input validation
- CORS middleware

### Database
- MongoDB with Mongoose ODM
- Indexed text search
- Reference-based relationships
- Schema validation

## Project Structure

```
TCS-Pioneers/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Admin authentication
│   │   ├── pioneerController.js
│   │   ├── productController.js
│   │   ├── searchController.js
│   │   └── timelineController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   └── errorHandler.js    # Global error handling
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Pioneer.js
│   │   ├── Product.js
│   │   ├── Quote.js
│   │   └── TimelineEvent.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── pioneerRoutes.js
│   │   ├── productRoutes.js
│   │   ├── searchRoutes.js
│   │   └── timelineRoutes.js
│   ├── seed/
│   │   └── seedData.js        # Database seed script
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SearchModal.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.js
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminLogin.jsx
│   │   │   │   ├── AdminPioneers.jsx
│   │   │   │   ├── AdminProducts.jsx
│   │   │   │   └── AdminTimeline.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Impact.jsx
│   │   │   ├── PioneerDetail.jsx
│   │   │   ├── Pioneers.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Timeline.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/aareeray/TCS-Pioneers.git
cd TCS-Pioneers
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/pioneers-of-tcs
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

### 3. Seed the Database

```bash
npm run seed
```

This creates:
- 6 pioneers (J.R.D. Tata, F.C. Kohli, S. Ramadorai, N. Chandrasekaran, Rajesh Gopinathan, K. Krithivasan)
- 25 timeline events (1968–2025)
- 8 products (TCS BaNCS, iON, HOBS, MasterCraft, ADD, ignio, OmniStore, Quartz)
- 6 quotes/stats
- 1 admin user (admin@tcs-pioneers.com / admin123)

### 4. Start the Backend

```bash
npm run dev    # Development with nodemon
# or
npm start      # Production
```

The API runs at http://localhost:5000

### 5. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file (optional - defaults to proxy):
```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Start the Frontend

```bash
npm run dev
```

The app runs at http://localhost:3000

## API Endpoints

### Public (GET)
| Endpoint | Description |
|----------|-------------|
| `GET /api/pioneers` | List all pioneers (optional: `?tag=founder`) |
| `GET /api/pioneers/:id` | Get pioneer by ID |
| `GET /api/timelineEvents` | List events (optional: `?decade=1970s&category=History`) |
| `GET /api/timelineEvents/:id` | Get event by ID |
| `GET /api/products` | List products (optional: `?domain=Banking`) |
| `GET /api/products/:id` | Get product by ID |
| `GET /api/search?q=query` | Global search across all collections |
| `GET /api/health` | Health check |

### Admin (Protected - requires Bearer token)
| Endpoint | Description |
|----------|-------------|
| `POST /api/admin/login` | Admin login (returns JWT) |
| `GET /api/admin/profile` | Get admin profile |
| `POST /api/pioneers` | Create pioneer |
| `PUT /api/pioneers/:id` | Update pioneer |
| `DELETE /api/pioneers/:id` | Delete pioneer |
| `POST /api/timelineEvents` | Create event |
| `PUT /api/timelineEvents/:id` | Update event |
| `DELETE /api/timelineEvents/:id` | Delete event |
| `POST /api/products` | Create product |
| `PUT /api/products/:id` | Update product |
| `DELETE /api/products/:id` | Delete product |

## MongoDB Collections

| Collection | Fields | Description |
|------------|--------|-------------|
| `pioneers` | name, roleTitle, activeYears, shortBio, keyContributions[], tags[], priority | Key leaders |
| `timelineevents` | year, title, description, category, decadeGroup, importanceLevel, relatedPioneerIds[] | Historical events |
| `products` | name, domain, launchPeriod, description, impactHighlights[], officialUrl, featured | Platforms & products |
| `quotes` | type, text, author, context | Quotes, stats, themes |
| `admins` | email, password (hashed), name | Admin users |

## Features

### Public Site
- **Home**: Hero section, highlight cards, animated stats, quote section
- **Timeline**: Interactive decade-grouped timeline with category/decade filters, expandable cards
- **Pioneers**: Grid view with cards, detailed profile pages with related events
- **Products**: Filterable grid by domain and launch period, impact highlights
- **Impact**: Global presence stats, AI/reskilling section, culture & values
- **About**: Project overview, tech stack details, data model explanation
- **Global Search**: Real-time search across all collections via modal

### Admin Panel
- JWT-based login with demo credentials
- Dashboard with content statistics
- Full CRUD for Pioneers, Timeline Events, and Products
- Form validation and error handling
- Responsive table views with edit/delete actions

### UX/Design
- TCS-inspired blue/white/grey color scheme
- Responsive design (mobile, tablet, desktop)
- Scroll-triggered animations using IntersectionObserver
- Hover effects and smooth transitions
- Semantic HTML with accessibility considerations
- Global search with debounced queries

## Deployment

### Frontend (Vercel/Netlify)
1. Set the build command to `npm run build`
2. Set output directory to `dist`
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Render/Railway)
1. Set start command to `npm start`
2. Set environment variables: `MONGODB_URI`, `JWT_SECRET`, `PORT`, `NODE_ENV=production`

## How to Extend

1. **Add more pioneers**: Use the Admin panel or modify `seed/seedData.js`
2. **Add timeline events**: Create new entries with proper decade/category assignments
3. **Add products**: Include new TCS platforms with domain classification
4. **Add image support**: Integrate cloud storage (Cloudinary/S3) for portrait images
5. **Add charts**: Extend the Impact page with Chart.js visualizations
6. **Add user authentication**: Allow registered users to save favorites

## Disclaimer

This is an educational student portfolio project. All content is based on publicly available information about TCS. This project is not affiliated with, endorsed by, or connected to Tata Consultancy Services Limited. All trademarks belong to their respective owners.

## License

MIT License
