import { HiCode, HiDatabase, HiDesktopComputer, HiServer } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About This Project
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            A student portfolio project built with the MERN stack, showcasing TCS's remarkable journey.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Overview */}
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-2xl font-display font-bold text-tcs-blue mb-4">Project Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>"Pioneers of TCS"</strong> is an interactive web application that serves as a research-driven 
              storytelling platform about Tata Consultancy Services. It showcases TCS's history, key leaders, 
              products, and global impact through an engaging, modern interface.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              This project demonstrates full-stack development skills using the MERN (MongoDB, Express, React, Node.js) 
              stack, including database modeling, RESTful API design, responsive UI development, and admin content management.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-tcs-blue mb-6">Tech Stack</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <HiDesktopComputer className="w-8 h-8 text-blue-600" />
                  <h3 className="font-bold text-lg text-tcs-blue">Frontend</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>React 18 with Vite</li>
                  <li>React Router for navigation</li>
                  <li>Tailwind CSS for styling</li>
                  <li>Framer Motion for animations</li>
                  <li>Chart.js for data visualization</li>
                  <li>React Icons for iconography</li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <HiServer className="w-8 h-8 text-green-600" />
                  <h3 className="font-bold text-lg text-tcs-blue">Backend</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>Node.js with Express</li>
                  <li>RESTful API architecture</li>
                  <li>JWT authentication</li>
                  <li>Express Validator for input validation</li>
                  <li>bcrypt.js for password hashing</li>
                  <li>CORS middleware</li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <HiDatabase className="w-8 h-8 text-purple-600" />
                  <h3 className="font-bold text-lg text-tcs-blue">Database</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>MongoDB (Atlas or local)</li>
                  <li>Mongoose ODM</li>
                  <li>Indexed text search</li>
                  <li>Reference-based relationships</li>
                  <li>Schema validation</li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <HiCode className="w-8 h-8 text-amber-600" />
                  <h3 className="font-bold text-lg text-tcs-blue">Features</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>Responsive design (mobile-first)</li>
                  <li>Global search across all content</li>
                  <li>Admin CMS with CRUD operations</li>
                  <li>Interactive timeline with filters</li>
                  <li>Scroll-triggered animations</li>
                  <li>Accessible, semantic HTML</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Model */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-tcs-blue mb-6">Data Collections</h2>
            <div className="space-y-4">
              {[
                { name: 'Pioneers', desc: 'Key leaders and figures in TCS history with biographies and contributions', count: '6 records' },
                { name: 'Timeline Events', desc: 'Major events from 1968 to 2025, fact-checked against official sources', count: '27 records' },
                { name: 'Products', desc: 'TCS platforms and product offerings across industries', count: '8 records' },
                { name: 'Quotes', desc: 'Verified quotes, themes, and statistics from official sources', count: '10 records' },
              ].map((col, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-tcs-accent mt-2 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-tcs-blue">{col.name}</h4>
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{col.count}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{col.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Extend */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-tcs-blue mb-6">How to Extend</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-tcs-accent">1.</span>
                  Add more pioneers through the Admin panel or by editing the seed data.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-tcs-accent">2.</span>
                  Create new timeline events to cover additional milestones.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-tcs-accent">3.</span>
                  Add new product entries as TCS launches new platforms.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-tcs-accent">4.</span>
                  Extend the API with new endpoints for quotes, stats, or themes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-tcs-accent">5.</span>
                  Add image uploads for pioneer portraits using cloud storage.
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-tcs-blue mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              This is an educational student portfolio project. All content is based on publicly available 
              information about TCS. This project is not affiliated with, endorsed by, or connected to 
              Tata Consultancy Services Limited in any way. All trademarks belong to their respective owners.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Start exploring the content:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/timeline" className="btn-primary text-sm">Timeline</Link>
              <Link to="/pioneers" className="btn-primary text-sm">Pioneers</Link>
              <Link to="/products" className="btn-primary text-sm">Products</Link>
              <Link to="/impact" className="btn-primary text-sm">Impact</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
