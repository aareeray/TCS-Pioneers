import { Link } from 'react-router-dom'
import { HiHeart } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="bg-tcs-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-tcs-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">TCS</span>
              </div>
              <span className="font-display font-bold text-lg">Pioneers of TCS</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              An interactive journey through the history, leaders, products, and global impact of Tata Consultancy Services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/timeline" className="text-gray-400 hover:text-white transition-colors">Timeline</Link></li>
              <li><Link to="/pioneers" className="text-gray-400 hover:text-white transition-colors">Pioneers</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/impact" className="text-gray-400 hover:text-white transition-colors">Impact & Future</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About This Project</Link></li>
              <li><a href="https://www.tcs.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">TCS Official Site</a></li>
              <li><Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">About</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              This is a student portfolio project built with the MERN stack. All content is based on publicly available information about TCS.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Pioneers of TCS. Built with the MERN Stack.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 sm:mt-0">
            Made with <HiHeart className="w-4 h-4 text-red-400 mx-1" /> for learning
          </p>
        </div>
      </div>
    </footer>
  )
}
