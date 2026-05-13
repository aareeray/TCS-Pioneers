import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiArrowLeft, HiCalendar, HiStar } from 'react-icons/hi'
import { getPioneerById, getTimelineEvents } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

export default function PioneerDetail() {
  const { id } = useParams()
  const [pioneer, setPioneer] = useState(null)
  const [relatedEvents, setRelatedEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPioneer()
  }, [id])

  const fetchPioneer = async () => {
    setLoading(true)
    try {
      const res = await getPioneerById(id)
      setPioneer(res.data)

      // Fetch related timeline events
      const eventsRes = await getTimelineEvents()
      const related = eventsRes.data.filter(e =>
        e.relatedPioneerIds && e.relatedPioneerIds.some(p =>
          (typeof p === 'object' ? p._id : p) === id
        )
      )
      setRelatedEvents(related)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner text="Loading pioneer details..." />
  if (!pioneer) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <p className="text-gray-500 text-lg">Pioneer not found</p>
      <Link to="/pioneers" className="btn-primary mt-4 inline-block">Back to Pioneers</Link>
    </div>
  )

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/pioneers" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors">
            <HiArrowLeft /> Back to Pioneers
          </Link>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-white/80">{getInitials(pioneer.name)}</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{pioneer.name}</h1>
              <p className="text-tcs-accent text-lg font-medium">{pioneer.roleTitle}</p>
              <p className="text-gray-300 flex items-center gap-2 mt-1">
                <HiCalendar className="w-4 h-4" /> {pioneer.activeYears}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-tcs-blue mb-4">Biography</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{pioneer.shortBio}</p>
              </div>

              {/* Related Timeline */}
              {relatedEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-tcs-blue mb-4">Key Timeline Events</h2>
                  <div className="space-y-3">
                    {relatedEvents.map(event => (
                      <div key={event._id} className="card p-4 border-l-4 border-tcs-accent">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-tcs-accent">{event.year}</span>
                          {event.importanceLevel === 'milestone' && <HiStar className="w-4 h-4 text-amber-500" />}
                        </div>
                        <h4 className="font-semibold text-tcs-blue">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-tcs-blue mb-3">Key Contributions</h3>
                <ul className="space-y-2">
                  {pioneer.keyContributions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-tcs-accent mt-2 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-tcs-blue mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {pioneer.tags.map((tag, i) => (
                    <span key={i} className="chip-blue text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
