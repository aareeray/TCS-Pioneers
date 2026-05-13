import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiTag } from 'react-icons/hi'
import { getPioneers } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function PioneerCard({ pioneer, index }) {
  const [ref, isVisible] = useScrollAnimation(0.1)

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2)
  }

  const bgColors = [
    'from-blue-500 to-blue-700',
    'from-purple-500 to-purple-700',
    'from-teal-500 to-teal-700',
    'from-indigo-500 to-indigo-700',
    'from-rose-500 to-rose-700',
    'from-amber-500 to-amber-700',
  ]

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="card card-hover h-full flex flex-col">
        {/* Avatar */}
        <div className={`h-32 bg-gradient-to-br ${bgColors[index % bgColors.length]} flex items-center justify-center`}>
          <span className="text-4xl font-bold text-white/90">{getInitials(pioneer.name)}</span>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-tcs-blue mb-1">{pioneer.name}</h3>
          <p className="text-sm text-tcs-accent font-medium mb-1">{pioneer.roleTitle}</p>
          <p className="text-xs text-gray-500 mb-3">{pioneer.activeYears}</p>

          {/* Key contributions */}
          <ul className="space-y-1.5 mb-4 flex-1">
            {pioneer.keyContributions.slice(0, 3).map((contribution, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-tcs-accent mt-1.5 flex-shrink-0" />
                {contribution}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pioneer.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>

          <Link
            to={`/pioneers/${pioneer._id}`}
            className="inline-flex items-center gap-1 text-tcs-accent font-medium text-sm hover:gap-2 transition-all"
          >
            Read full story <HiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Pioneers() {
  const [pioneers, setPioneers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState('All')

  useEffect(() => {
    fetchPioneers()
  }, [selectedTag])

  const fetchPioneers = async () => {
    setLoading(true)
    try {
      const params = {}
      if (selectedTag !== 'All') params.tag = selectedTag
      const res = await getPioneers(params)
      setPioneers(res.data)
    } catch (err) {
      console.error('Error fetching pioneers:', err)
    } finally {
      setLoading(false)
    }
  }

  const allTags = ['All', 'founder', 'CEO', 'chairman', 'pioneer', 'digital transformation', 'AI', 'growth']

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Pioneers & Leaders
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Meet the visionary leaders who shaped TCS from a small consulting division into a global technology powerhouse.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <HiTag className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${selectedTag === tag
                    ? 'bg-tcs-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pioneer Grid */}
      <section className="py-16 gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner text="Loading pioneers..." />
          ) : pioneers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No pioneers found for the selected filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pioneers.map((pioneer, index) => (
                <PioneerCard key={pioneer._id} pioneer={pioneer} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
