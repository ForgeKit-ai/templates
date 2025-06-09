import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg serif">B</span>
            </div>
            <span className="text-2xl font-bold serif text-neutral-900">Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-neutral-700 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-neutral-700 hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            {isAuthenticated && (
              <Link 
                to="/create" 
                className="text-neutral-700 hover:text-primary transition-colors font-medium"
              >
                Write
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary transition-colors"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.fullName} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                      <span className="text-neutral-600 font-medium text-sm">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="font-medium">{user?.firstName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="btn btn-ghost text-sm"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <svg 
              className="w-6 h-6 text-neutral-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-neutral-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-neutral-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/create" 
                  className="text-neutral-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Write
                </Link>
              )}
              
              <div className="pt-4 border-t border-neutral-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 text-neutral-700 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.fullName} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                          <span className="text-neutral-600 font-medium text-sm">
                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="font-medium">{user?.fullName}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn btn-ghost text-sm w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      className="btn btn-ghost text-sm w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="btn btn-primary text-sm w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;