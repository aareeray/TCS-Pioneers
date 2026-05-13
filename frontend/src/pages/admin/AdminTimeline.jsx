import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getTimelineEvents, createTimelineEvent, updateTimelineEvent, deleteTimelineEvent } from '../../services/api'
import { HiPlus, HiPencil, HiTrash, HiX, HiArrowLeft } from 'react-icons/hi'
import LoadingSpinner from '../../components/LoadingSpinner'

const categories = ['History', 'Technology', 'Business', 'Awards', 'Products']
const importanceLevels = ['major', 'minor', 'milestone']
const decadeOptions = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s']

const emptyForm = {
  year: '', title: '', description: '', category: 'History',
  decadeGroup: '1960s', importanceLevel: 'minor'
}

export default function AdminTimeline() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
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
      const res = await getTimelineEvents()
      setEvents(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (event) => {
    setForm({
      year: event.year,
      title: event.title,
      description: event.description,
      category: event.category,
      decadeGroup: event.decadeGroup,
      importanceLevel: event.importanceLevel
    })
    setEditingId(event._id)
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
    if (!window.confirm('Are you sure you want to delete this event?')) return
    try {
      await deleteTimelineEvent(id)
      setEvents(events.filter(e => e._id !== id))
    } catch (err) {
      alert('Error deleting: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const data = { ...form, year: Number(form.year) }

    try {
      if (editingId) {
        const res = await updateTimelineEvent(editingId, data)
        setEvents(events.map(ev => ev._id === editingId ? res.data : ev))
      } else {
        const res = await createTimelineEvent(data)
        setEvents([...events, res.data])
      }
      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving event')
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
            <h1 className="text-2xl font-display font-bold text-tcs-blue">Manage Timeline Events</h1>
          </div>
          <button onClick={handleCreate} className="btn-primary flex items-center gap-2 text-sm">
            <HiPlus className="w-4 h-4" /> Add Event
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-tcs-blue">
                  {editingId ? 'Edit Event' : 'Add New Event'}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                    <input type="number" value={form.year} onChange={e => setForm({...form, year: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Decade Group *</label>
                    <select value={form.decadeGroup} onChange={e => setForm({...form, decadeGroup: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none">
                      {decadeOptions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none" rows={4} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Importance</label>
                    <select value={form.importanceLevel} onChange={e => setForm({...form, importanceLevel: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-tcs-accent focus:outline-none">
                      {importanceLevels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
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
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Year</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Importance</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {events.map(event => (
                    <tr key={event._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-tcs-accent">{event.year}</td>
                      <td className="px-4 py-3 text-tcs-blue font-medium">{event.title}</td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                        <span className="chip-blue text-xs">{event.category}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell capitalize">{event.importanceLevel}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleEdit(event)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded">
                          <HiPencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(event._id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded ml-1">
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
