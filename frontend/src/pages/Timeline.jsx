import { useState, useEffect } from 'react'
import { HiFilter, HiCalendar, HiStar, HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { getTimelineEvents } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const decades = ['All', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s']
const categories = ['All', 'History', 'Technology', 'Business', 'Awards', 'Products']

const categoryColors = {
  History: 'bg-blue-100 text-blue-800',
  Technology: 'bg-green-100 text-green-800',
  Business: 'bg-purple-100 text-purple-800',
  Awards: 'bg-amber-100 text-amber-800',
  Products: 'bg-rose-100 text-rose-800'
}

const importanceStyles = {
  milestone: 'border-l-4 border-tcs-accent bg-gradient-to-r from-blue-50 to-white',
  major: 'border-l-4 border-blue-300',
  minor: 'border-l-4 border-gray-200'
}

function TimelineCard({ event, index }) {
  const [expanded, setExpanded] = useState(false)
  const [ref, isVisible] = useScrollAnimation(0.1)
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-8 md:mb-12 transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <div className={`w-4 h-4 rounded-full border-4 border-white shadow-md
          ${event.importanceLevel === 'milestone' ? 'bg-tcs-accent w-6 h-6' :
            event.importanceLevel === 'major' ? 'bg-blue-400' : 'bg-gray-400'}`}
        />
      </div>

      {/* Mobile dot */}
      <div className="md:hidden absolute left-[20px] -translate-x-1/2 z-10">
        <div className={`w-3 h-3 rounded-full border-3 border-white shadow
          ${event.importanceLevel === 'milestone' ? 'bg-tcs-accent w-4 h-4' : 'bg-blue-400'}`}
        />
      </div>

      {/* Card */}
      <div className={`w-full md:w-[45%] ml-10 md:ml-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <div
          className={`card p-5 cursor-pointer hover:shadow-lg transition-all ${importanceStyles[event.importanceLevel]}`}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-tcs-accent">{event.year}</span>
                {event.importanceLevel === 'milestone' && (
                  <HiStar className="w-4 h-4 text-amber-500" />
                )}
                <span className={`chip text-xs ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}`}>
                  {event.category}
                </span>
              </div>
              <h3 className="font-bold text-tcs-blue text-lg">{event.title}</h3>
            </div>
            <button className="mt-1 text-gray-400 hover:text-tcs-accent">
              {expanded ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {expanded && (
            <div className="mt-3 animate-fade-in">
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
              {event.relatedPioneerIds && event.relatedPioneerIds.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {event.relatedPioneerIds.map((pioneer, i) => (
                    <span key={i} className="chip-blue text-xs">
                      {typeof pioneer === 'object' ? pioneer.name : 'Pioneer'}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDecade, setSelectedDecade] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchEvents()
  }, [selectedDecade, selectedCategory])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const params = {}
      if (selectedDecade !== 'All') params.decade = selectedDecade
      if (selectedCategory !== 'All') params.category = selectedCategory
      const res = await getTimelineEvents(params)
      setEvents(res.data)
    } catch (err) {
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  const groupedByDecade = events.reduce((acc, event) => {
    if (!acc[event.decadeGroup]) acc[event.decadeGroup] = []
    acc[event.decadeGroup].push(event)
    return acc
  }, {})

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            TCS Timeline
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            From 1968 to the present — explore over five decades of innovation, growth, and transformation.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <HiCalendar className="w-5 h-5 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {decades.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDecade(d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                      ${selectedDecade === d
                        ? 'bg-tcs-accent text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <HiFilter className="w-5 h-5 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                      ${selectedCategory === c
                        ? 'bg-tcs-accent text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner text="Loading timeline events..." />
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found for the selected filters.</p>
            </div>
          ) : (
            <div className="relative">
              {Object.entries(groupedByDecade).map(([decade, decadeEvents]) => (
                <div key={decade} className="mb-16">
                  <div className="text-center mb-8">
                    <span className="inline-flex items-center px-6 py-2 bg-tcs-blue text-white rounded-full font-bold text-lg">
                      {decade}
                    </span>
                  </div>
                  <div className="timeline-line relative">
                    {decadeEvents.map((event, index) => (
                      <TimelineCard key={event._id} event={event} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
