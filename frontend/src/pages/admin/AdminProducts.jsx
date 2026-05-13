import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/api'
import { HiPlus, HiPencil, HiTrash, HiX, HiArrowLeft } from 'react-icons/hi'
import LoadingSpinner from '../../components/LoadingSpinner'

const emptyForm = {
  name: '', domain: '', launchPeriod: '2020s', description: '',
  impactHighlights: '', officialUrl: '', featured: false
}

export default function AdminProducts() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate('/admin/login')
  }, [authLoading, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) fetchData()
  }, [isAuthenticated])

  const fetchData = async () => {
    try {
      const res = await getProducts()
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      domain: product.domain,
      launchPeriod: product.launchPeriod,
      description: product.description,
      impactHighlights: product.impactHighlights.join('\n'),
      officialUrl: product.officialUrl || '',
      featured: product.featured
    })
    setEditingId(product._id)
    setShowForm(true)
    setError('')
  }

  const handleCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
    setError('')
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p._id !== id))
    } catch (err) {
      alert('Error deleting: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const data = {
      ...form,
      impactHighlights: form.impactHighlights.split('\n').filter(s => s.trim())
    }

    try {
      if (editingId) {
        const res = await updateProduct(editingId, data)
        setProducts(products.map(p => p._id === editingId ? res.data : p))
      } else {
        const res = await createProduct(data)
        setProducts([...products, res.data])
      }
      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving product')
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || !isAuthenticated) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 hover:bg-gray-200 rounded-lg">
              <HiArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-display font-bold text-tcs-blue">Manage Products</h1>
          </div>
          <button onClick={handleCreate} className="btn-primary flex items-center gap-2 text-sm">
            <HiPlus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-tcs-blue">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domain *</label>
                    <input type="text" value={form.domain} onChange={e => setForm({...form, domain: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Launch Period *</label>
                    <select value={form.launchPeriod} onChange={e => setForm({...form, launchPeriod: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none">
                      <option value="2000s">2000s</option>
                      <option value="2010s">2010s</option>
                      <option value="2020s">2020s</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})}
                        className="w-4 h-4 text-tcs-accent rounded" />
                      <span className="text-sm font-medium text-gray-700">Featured product</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" rows={3} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impact Highlights (one per line)</label>
                  <textarea value={form.impactHighlights} onChange={e => setForm({...form, impactHighlights: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" rows={4} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Official URL</label>
                  <input type="url" value={form.officialUrl} onChange={e => setForm({...form, officialUrl: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" placeholder="https://..." />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                    {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? <LoadingSpinner /> : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Domain</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Period</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Featured</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(product => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-tcs-blue">{product.name}</td>
                      <td className="px-4 py-3 text-gray-600">{product.domain}</td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{product.launchPeriod}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {product.featured ? <span className="chip-green text-xs">Yes</span> : <span className="text-gray-400">No</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleEdit(product)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded">
                          <HiPencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded ml-1">
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
