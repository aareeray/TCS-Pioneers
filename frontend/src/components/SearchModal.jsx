import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiSearch, HiX } from 'react-icons/hi'
import { globalSearch } from '../services/api'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
    if (!isOpen) {
      setQuery('')
      setResults(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length < 2) {
      setResults(null)
      return
    }

    const debounce = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await globalSearch(query)
        setResults(res.data)
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [query])

  const handleNavigate = (path) => {
    navigate(path)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[70vh] overflow-hidden animate-scale-in">
        {/* Search input */}
        <div className="flex items-center border-b border-gray-200 px-4">
          <HiSearch className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pioneers, events, products..."
            className="flex-1 px-4 py-4 text-lg outline-none"
          />
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <HiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[50vh] p-4">
          {loading && (
            <div className="text-center py-8 text-gray-500">Searching...</div>
          )}

          {results && !loading && results.totalResults === 0 && (
            <div className="text-center py-8 text-gray-500">
              No results found for "{query}"
            </div>
          )}

          {results && !loading && results.totalResults > 0 && (
            <div className="space-y-4">
              {results.pioneers.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Pioneers</h3>
                  {results.pioneers.map(p => (
                    <button
                      key={p._id}
                      onClick={() => handleNavigate(`/pioneers/${p._id}`)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-tcs-blue">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.roleTitle} · {p.activeYears}</div>
                    </button>
                  ))}
                </div>
              )}

              {results.events.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Timeline Events</h3>
                  {results.events.map(e => (
                    <button
                      key={e._id}
                      onClick={() => handleNavigate('/timeline')}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-tcs-blue">{e.year} – {e.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{e.description}</div>
                    </button>
                  ))}
                </div>
              )}

              {results.products.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Products</h3>
                  {results.products.map(p => (
                    <button
                      key={p._id}
                      onClick={() => handleNavigate('/products')}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-tcs-blue">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.domain} · {p.launchPeriod}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!results && !loading && (
            <div className="text-center py-8 text-gray-400">
              <HiSearch className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Start typing to search across all content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
