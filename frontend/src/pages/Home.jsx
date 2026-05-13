import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiClock, HiUserGroup, HiCube, HiGlobe } from 'react-icons/hi'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { getPioneers, getTimelineEvents, getProducts } from '../services/api'

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation(0.1)
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  )
}

export default function Home() {
  const [stats, setStats] = useState({ pioneers: 0, events: 0, products: 0 })

  useEffect(() => {
    Promise.all([
      getPioneers().catch(() => ({ data: [] })),
      getTimelineEvents().catch(() => ({ data: [] })),
      getProducts().catch(() => ({ data: [] }))
    ]).then(([p, e, pr]) => {
      setStats({
        pioneers: p.data.length,
        events: e.data.length,
        products: pr.data.length
      })
    })
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero text-white min-h-[85vh] flex items-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-tcs-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Since 1968 · Part of the Tata Group
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 animate-slide-up">
              Pioneers of{' '}
              <span className="text-tcs-accent">TCS</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Explore the incredible journey of Tata Consultancy Services — from its founding in 1968 
              as part of the Tata Group to becoming one of the world's leading IT services companies, 
              shaping the global technology landscape.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/timeline" className="btn-primary flex items-center gap-2">
                Explore Timeline <HiArrowRight />
              </Link>
              <Link to="/pioneers" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-tcs-blue">
                Meet the Pioneers
              </Link>
              <Link to="/products" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-tcs-blue">
                See Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: HiClock, label: 'Founded', value: '1968', color: 'text-blue-600' },
              { icon: HiUserGroup, label: 'Key Pioneers', value: `${stats.pioneers}+`, color: 'text-purple-600' },
              { icon: HiCube, label: 'Products', value: `${stats.products}+`, color: 'text-green-600' },
              { icon: HiGlobe, label: 'Countries', value: '46', color: 'text-amber-600' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl md:text-3xl font-bold text-tcs-blue">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Cards */}
      <AnimatedSection>
        <section className="py-20 gradient-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">The TCS Story</h2>
              <p className="section-subtitle">
                From a small division of Tata Sons to a global technology leader
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card card-hover p-8">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <HiClock className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-tcs-blue mb-3">Founded: 1968</h3>
                <p className="text-gray-600 leading-relaxed">
                  Established as a division of Tata Sons, TCS was one of India's first ventures into 
                  the technology services space, guided by the vision of the Tata Group.
                </p>
                <Link to="/timeline" className="inline-flex items-center gap-1 text-tcs-accent font-medium mt-4 hover:gap-2 transition-all">
                  View Timeline <HiArrowRight />
                </Link>
              </div>

              <div className="card card-hover p-8">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-5">
                  <HiUserGroup className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-tcs-blue mb-3">F.C. Kohli – Father of Indian IT</h3>
                <p className="text-gray-600 leading-relaxed">
                  F.C. Kohli, founding CEO of TCS, is widely regarded as the father of the Indian IT industry. 
                  His vision transformed TCS and India's technology landscape.
                </p>
                <Link to="/pioneers" className="inline-flex items-center gap-1 text-tcs-accent font-medium mt-4 hover:gap-2 transition-all">
                  Meet Pioneers <HiArrowRight />
                </Link>
              </div>

              <div className="card card-hover p-8">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                  <HiGlobe className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-tcs-blue mb-3">Global IT Services & Products</h3>
                <p className="text-gray-600 leading-relaxed">
                  Today TCS operates from 150 locations across 46 countries with 607,000+ employees. Platforms like TCS BaNCS, 
                  TCS iON, and AI WisdomNext serve enterprises worldwide. Revenue exceeds $30 billion annually.
                </p>
                <Link to="/products" className="inline-flex items-center gap-1 text-tcs-accent font-medium mt-4 hover:gap-2 transition-all">
                  See Products <HiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Vision Quote */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-tcs-accent/20 font-serif">"</div>
              <blockquote className="text-2xl md:text-3xl font-display text-tcs-blue leading-relaxed italic pt-8">
                Many years ago, there was an industrial revolution; we missed it. Today there is a new revolution — the information revolution. We cannot afford to miss it.
              </blockquote>
              <cite className="block mt-6 text-lg text-gray-500 not-italic">
                — F.C. Kohli, Founding CEO of TCS (Address to Computer Society of India, 1975)
              </cite>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 gradient-hero text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Explore the Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Discover over five decades of innovation, leadership, and global impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/timeline" className="btn-primary">
                Start with the Timeline
              </Link>
              <Link to="/impact" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-tcs-blue">
                See Global Impact
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
