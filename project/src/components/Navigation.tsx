import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Zap, 
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLandingPage = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrollY > 50 || !isLandingPage
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">InnovateTech</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isLandingPage ? (
              <>
                <button onClick={() => scrollToSection('home')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection('features')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Features
                </button>
                <button onClick={() => scrollToSection('team')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Team
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact Us
                </button>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
                <Link to="/analytics" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Analytics
                </Link>
                <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Projects
                </Link>
                <Link to="/team" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Team
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/settings" className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.firstName}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-gray-900 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-4 py-2 space-y-2">
            {isLandingPage ? (
              <>
                <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">
                  About
                </button>
                <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">
                  Features
                </button>
                <button onClick={() => scrollToSection('team')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">
                  Team
                </button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">
                  Contact Us
                </button>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="block w-full text-left py-2 text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/analytics" className="block w-full text-left py-2 text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Analytics
                </Link>
                <Link to="/projects" className="block w-full text-left py-2 text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Projects
                </Link>
                <Link to="/team" className="block w-full text-left py-2 text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Team
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/settings" className="block w-full text-left py-2 text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600 dark:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block w-full text-left py-2 text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block w-full text-left py-2 bg-blue-600 text-white rounded-lg px-4 mt-2" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;