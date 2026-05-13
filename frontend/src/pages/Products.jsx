import { useState, useEffect } from 'react'
import { HiExternalLink, HiFilter, HiStar } from 'react-icons/hi'
import { getProducts } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const domains = ['All', 'Banking & Financial Services', 'Education & Assessment', 'Telecom & Media', 'Enterprise Automation', 'Life Sciences & Healthcare', 'AI & Cognitive Automation', 'Retail & Commerce', 'Blockchain & Digital Assets']
const periods = ['All', '2000s', '2010s', '2020s']

const domainColors = {
  'Banking & Financial Services': 'from-blue-500 to-blue-700',
  'Education & Assessment': 'from-green-500 to-green-700',
  'Telecom & Media': 'from-purple-500 to-purple-700',
  'Enterprise Automation': 'from-indigo-500 to-indigo-700',
  'Life Sciences & Healthcare': 'from-rose-500 to-rose-700',
  'AI & Cognitive Automation': 'from-cyan-500 to-cyan-700',
  'Retail & Commerce': 'from-amber-500 to-amber-700',
  'Blockchain & Digital Assets': 'from-teal-500 to-teal-700',
}

function ProductCard({ product, index }) {
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="card card-hover h-full flex flex-col">
        <div className={`h-3 bg-gradient-to-r ${domainColors[product.domain] || 'from-gray-400 to-gray-600'}`} />
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-tcs-blue flex items-center gap-2">
                {product.name}
                {product.featured && <HiStar className="w-5 h-5 text-amber-500" />}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="chip-blue text-xs">{product.domain}</span>
                <span className="text-xs text-gray-500">{product.launchPeriod}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
            {product.description}
          </p>

          {/* Impact Highlights */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Impact</h4>
            <ul className="space-y-1.5">
              {product.impactHighlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {product.officialUrl && (
            <a
              href={product.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-tcs-accent font-medium text-sm hover:underline"
            >
              Learn more <HiExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [selectedPeriod, setSelectedPeriod] = useState('All')

  useEffect(() => {
    fetchProducts()
  }, [selectedDomain, selectedPeriod])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (selectedDomain !== 'All') params.domain = selectedDomain
      if (selectedPeriod !== 'All') params.launchPeriod = selectedPeriod
      const res = await getProducts(params)
      setProducts(res.data)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Products & Platforms
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            TCS is not just services — discover the innovative platforms and products that power industries worldwide.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <HiFilter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-500 flex-shrink-0">Domain:</span>
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all
                  ${selectedDomain === d
                    ? 'bg-tcs-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 ml-7">Period:</span>
            {periods.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  ${selectedPeriod === p
                    ? 'bg-tcs-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner text="Loading products..." />
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found for the selected filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
