import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  PencilIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Search', href: '/search' },
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200 dark:bg-neutral-900/80 dark:border-neutral-700">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold font-serif text-neutral-900 dark:text-white hover:text-primary-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span>Blog</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'nav-link',
                  isActivePath(item.href) && 'nav-link-active'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/search')}
              className="p-2"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Button>

            {user ? (
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  onClick={() => navigate('/create')}
                  icon={<PencilIcon className="h-4 w-4" />}
                >
                  Write
                </Button>
                
                <div className="relative group">
                  <Avatar
                    src={user.avatar}
                    name={`${user.firstName} ${user.lastName}`}
                    className="cursor-pointer"
                  />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b border-neutral-200 dark:border-neutral-700">
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Get started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                      isActivePath(item.href)
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Theme
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="p-2"
                  >
                    {isDark ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <Avatar
                        src={user.avatar}
                        name={`${user.firstName} ${user.lastName}`}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white text-sm">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate('/create');
                        setIsMenuOpen(false);
                      }}
                      icon={<PencilIcon className="h-4 w-4" />}
                    >
                      Write a post
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          navigate('/profile');
                          setIsMenuOpen(false);
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="flex-1"
                        onClick={handleLogout}
                      >
                        Sign out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign in
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                    >
                      Get started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}