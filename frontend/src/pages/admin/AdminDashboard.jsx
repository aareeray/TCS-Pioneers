import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getPioneers, getTimelineEvents, getProducts } from '../../services/api'
import { HiUserGroup, HiClock, HiCube, HiLogout, HiPencil } from 'react-icons/hi'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function AdminDashboard() {
  const { admin, logout, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ pioneers: 0, events: 0, products: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login')
    }
  }, [authLoading, isAuthenticated, navigate])

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats()
    }
  }, [isAuthenticated])

  const fetchStats = async () => {
    try {
      const [p, e, pr] = await Promise.all([
        getPioneers(),
        getTimelineEvents(),
        getProducts()
      ])
      setStats({ pioneers: p.data.length, events: e.data.length, products: pr.data.length })
    } catch (err) {
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  if (authLoading) return <LoadingSpinner />
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-tcs-blue">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {admin?.name || 'Admin'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <HiLogout className="w-5 h-5" /> Logout
          </button>
        </div>

        {/* Stats */}
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="card p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <HiUserGroup className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-tcs-blue">{stats.pioneers}</p>
                <p className="text-sm text-gray-500">Pioneers</p>
              </div>
            </div>
            <div className="card p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <HiClock className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-tcs-blue">{stats.events}</p>
                <p className="text-sm text-gray-500">Timeline Events</p>
              </div>
            </div>
            <div className="card p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <HiCube className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-tcs-blue">{stats.products}</p>
                <p className="text-sm text-gray-500">Products</p>
              </div>
            </div>
          </div>
        )}

        {/* Management Links */}
        <h2 className="text-xl font-bold text-tcs-blue mb-4">Manage Content</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <Link to="/admin/pioneers" className="card p-6 hover:shadow-lg transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-tcs-blue group-hover:text-tcs-accent transition-colors">Pioneers</h3>
                <p className="text-sm text-gray-500 mt-1">Add, edit, or remove pioneer profiles</p>
              </div>
              <HiPencil className="w-5 h-5 text-gray-400 group-hover:text-tcs-accent transition-colors" />
            </div>
          </Link>
          <Link to="/admin/timeline" className="card p-6 hover:shadow-lg transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-tcs-blue group-hover:text-tcs-accent transition-colors">Timeline Events</h3>
                <p className="text-sm text-gray-500 mt-1">Manage historical timeline entries</p>
              </div>
              <HiPencil className="w-5 h-5 text-gray-400 group-hover:text-tcs-accent transition-colors" />
            </div>
          </Link>
          <Link to="/admin/products" className="card p-6 hover:shadow-lg transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-tcs-blue group-hover:text-tcs-accent transition-colors">Products</h3>
                <p className="text-sm text-gray-500 mt-1">Manage product and platform listings</p>
              </div>
              <HiPencil className="w-5 h-5 text-gray-400 group-hover:text-tcs-accent transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
