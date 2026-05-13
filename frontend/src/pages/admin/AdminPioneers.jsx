import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getPioneers, createPioneer, updatePioneer, deletePioneer } from '../../services/api'
import { HiPlus, HiPencil, HiTrash, HiX, HiArrowLeft } from 'react-icons/hi'
import LoadingSpinner from '../../components/LoadingSpinner'

const emptyForm = {
  name: '', roleTitle: '', activeYears: '', shortBio: '',
  keyContributions: '', tags: '', priority: 0
}

export default function AdminPioneers() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [pioneers, setPioneers] = useState([])
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
      const res = await getPioneers()
      setPioneers(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (pioneer) => {
    setForm({
      name: pioneer.name,
      roleTitle: pioneer.roleTitle,
      activeYears: pioneer.activeYears,
      shortBio: pioneer.shortBio,
      keyContributions: pioneer.keyContributions.join('\n'),
      tags: pioneer.tags.join(', '),
      priority: pioneer.priority
    })
    setEditingId(pioneer._id)
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
    if (!window.confirm('Are you sure you want to delete this pioneer?')) return
    try {
      await deletePioneer(id)
      setPioneers(pioneers.filter(p => p._id !== id))
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
      keyContributions: form.keyContributions.split('\n').filter(s => s.trim()),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      priority: Number(form.priority)
    }

    try {
      if (editingId) {
        const res = await updatePioneer(editingId, data)
        setPioneers(pioneers.map(p => p._id === editingId ? res.data : p))
      } else {
        const res = await createPioneer(data)
        setPioneers([...pioneers, res.data])
      }
      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving pioneer')
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
            <h1 className="text-2xl font-display font-bold text-tcs-blue">Manage Pioneers</h1>
          </div>
          <button onClick={handleCreate} className="btn-primary flex items-center gap-2 text-sm">
            <HiPlus className="w-4 h-4" /> Add Pioneer
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-tcs-blue">
                  {editingId ? 'Edit Pioneer' : 'Add New Pioneer'}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role Title *</label>
                    <input type="text" value={form.roleTitle} onChange={e => setForm({...form, roleTitle: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Active Years *</label>
                    <input type="text" value={form.activeYears} onChange={e => setForm({...form, activeYears: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" placeholder="e.g. 1968–1996" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <input type="number" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio *</label>
                  <textarea value={form.shortBio} onChange={e => setForm({...form, shortBio: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" rows={4} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Contributions (one per line)</label>
                  <textarea value={form.keyContributions} onChange={e => setForm({...form, keyContributions: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" rows={4} placeholder="Each contribution on a new line" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                  <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" placeholder="e.g. founder, CEO, pioneer" />
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
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Years</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Priority</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pioneers.map(pioneer => (
                    <tr key={pioneer._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-tcs-blue">{pioneer.name}</td>
                      <td className="px-4 py-3 text-gray-600">{pioneer.roleTitle}</td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{pioneer.activeYears}</td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{pioneer.priority}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleEdit(pioneer)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded">
                          <HiPencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(pioneer._id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded ml-1">
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
