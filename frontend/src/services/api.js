import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
    }
    return Promise.reject(error)
  }
)

// Public API calls
export const getPioneers = (params) => api.get('/pioneers', { params })
export const getPioneerById = (id) => api.get(`/pioneers/${id}`)
export const getTimelineEvents = (params) => api.get('/timelineEvents', { params })
export const getTimelineEventById = (id) => api.get(`/timelineEvents/${id}`)
export const getProducts = (params) => api.get('/products', { params })
export const getProductById = (id) => api.get(`/products/${id}`)
export const globalSearch = (query) => api.get('/search', { params: { q: query } })

// Admin API calls
export const adminLogin = (credentials) => api.post('/admin/login', credentials)
export const getAdminProfile = () => api.get('/admin/profile')

// Admin CRUD - Pioneers
export const createPioneer = (data) => api.post('/pioneers', data)
export const updatePioneer = (id, data) => api.put(`/pioneers/${id}`, data)
export const deletePioneer = (id) => api.delete(`/pioneers/${id}`)

// Admin CRUD - Timeline Events
export const createTimelineEvent = (data) => api.post('/timelineEvents', data)
export const updateTimelineEvent = (id, data) => api.put(`/timelineEvents/${id}`, data)
export const deleteTimelineEvent = (id) => api.delete(`/timelineEvents/${id}`)

// Admin CRUD - Products
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

export default api
