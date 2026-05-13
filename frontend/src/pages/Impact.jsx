import { HiGlobe, HiAcademicCap, HiHeart, HiLightBulb, HiUserGroup, HiChip } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation(0.1)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Impact() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Impact & Future
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            TCS's global presence, culture of innovation, and vision for an AI-ready future.
          </p>
        </div>
      </section>

      {/* Global Presence */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <HiGlobe className="w-12 h-12 text-tcs-accent mx-auto mb-4" />
              <h2 className="section-title">Global Presence & Scale</h2>
              <p className="section-subtitle">
                One of the world's largest and most respected IT services companies
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '46', label: 'Countries', desc: '150 locations spanning all major markets globally' },
                { value: '607K+', label: 'Employees', desc: 'India\'s largest private sector employer (March 2025)' },
                { value: '$30B+', label: 'Annual Revenue', desc: 'Crossed $30 billion milestone in FY2025' },
                { value: '$2.3B', label: 'AI Revenue', desc: 'Annualized AI services revenue (Q4 FY2026)' },
              ].map((stat, i) => (
                <div key={i} className="card p-6 text-center card-hover">
                  <div className="text-3xl font-bold text-tcs-accent mb-1">{stat.value}</div>
                  <div className="font-semibold text-tcs-blue mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* AI & Reskilling */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-tcs-accent/10 rounded-full text-tcs-accent font-medium text-sm mb-4">
                  <HiChip className="w-4 h-4" /> Future-Ready Workforce
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-tcs-blue mb-6">
                  Reskilling & AI-Ready Initiatives
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  TCS has executed one of the world's largest corporate AI upskilling programs, reskilling 
                  over 300,000 employees in AI, machine learning, and generative AI technologies. With 
                  607,000+ people on its rolls, TCS aims to have the largest AI-trained workforce in the 
                  industry. The company's AI services revenue has grown to $2.3 billion annualized, with 
                  generative and agentic AI revenue tripling year-over-year.
                </p>
                <ul className="space-y-3">
                  {[
                    '300,000+ employees reskilled in AI/ML and Generative AI',
                    'TCS AI WisdomNext — industry-first GenAI aggregation platform launched',
                    'AI services revenue crossed $2.3 billion annualized (Q4 FY2026)',
                    'Partnership with Nvidia for enterprise AI deployment platform',
                    'Building AI-human workforce with agentic AI capabilities'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-tcs-accent mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: HiLightBulb, title: 'Innovation Labs', desc: 'Global network of research centers' },
                  { icon: HiAcademicCap, title: 'Learning Programs', desc: 'Continuous upskilling for all' },
                  { icon: HiChip, title: 'AI Integration', desc: 'AI-first approach across services' },
                  { icon: HiUserGroup, title: 'Talent Development', desc: 'Building next-gen tech leaders' },
                ].map((item, i) => (
                  <div key={i} className="card p-5 text-center">
                    <item.icon className="w-8 h-8 text-tcs-accent mx-auto mb-2" />
                    <h4 className="font-semibold text-tcs-blue text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Culture & Values */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <HiHeart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h2 className="section-title">Culture & Values</h2>
              <p className="section-subtitle">
                Rooted in Tata Group's legacy of trust, ethics, and nation-building
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Trust & Integrity',
                  desc: 'Guided by the Tata Code of Conduct, TCS maintains the highest standards of ethics and transparency in all business relationships.',
                  color: 'bg-blue-100 text-blue-700'
                },
                {
                  title: 'Sustainability',
                  desc: 'Committed to environmental responsibility through green IT initiatives, carbon neutrality goals, and sustainable business practices.',
                  color: 'bg-green-100 text-green-700'
                },
                {
                  title: 'Community Impact',
                  desc: 'Through CSR initiatives like TCS literacy programs and STEM education outreach, TCS contributes to communities worldwide.',
                  color: 'bg-purple-100 text-purple-700'
                }
              ].map((value, i) => (
                <div key={i} className="card p-8 text-center card-hover">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${value.color} mb-4`}>
                    <HiHeart className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-tcs-blue mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Student CTA */}
      <AnimatedSection>
        <section className="py-20 gradient-hero text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Where Do You Fit in This Story?
            </h2>
            <p className="text-xl text-gray-300 mb-4 leading-relaxed">
              TCS's journey from 1968 to today shows the power of vision, perseverance, and continuous 
              learning. As a student or aspiring technologist, you are part of the next chapter.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Whether you're interested in AI, cloud computing, sustainable tech, or digital transformation — 
              the future is being built by people just like you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/pioneers" className="btn-primary">
                Get Inspired by Pioneers
              </Link>
              <Link to="/timeline" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-tcs-blue">
                See the Full Journey
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
