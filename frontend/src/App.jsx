import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Pioneers from './pages/Pioneers'
import PioneerDetail from './pages/PioneerDetail'
import Products from './pages/Products'
import Impact from './pages/Impact'
import About from './pages/About'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPioneers from './pages/admin/AdminPioneers'
import AdminTimeline from './pages/admin/AdminTimeline'
import AdminProducts from './pages/admin/AdminProducts'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/pioneers" element={<Pioneers />} />
              <Route path="/pioneers/:id" element={<PioneerDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/pioneers" element={<AdminPioneers />} />
              <Route path="/admin/timeline" element={<AdminTimeline />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
