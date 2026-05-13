import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiMenu, HiX, HiSearch } from 'react-icons/hi'
import SearchModal from './SearchModal'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/pioneers', label: 'Pioneers' },
  { path: '/products', label: 'Products' },
  { path: '/impact', label: 'Impact' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-tcs-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">TCS</span>
              </div>
              <span className="font-display font-bold text-lg text-tcs-blue hidden sm:block">
                Pioneers of TCS
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(link.path)
                      ? 'bg-tcs-accent/10 text-tcs-accent'
                      : 'text-gray-600 hover:text-tcs-accent hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-tcs-accent rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <HiSearch className="w-5 h-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-tcs-accent rounded-lg"
                aria-label="Toggle menu"
              >
                {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.path)
                      ? 'bg-tcs-accent/10 text-tcs-accent'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
