import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, History, User, CreditCard } from 'lucide-react';
import { googleLogout } from "@react-oauth/google";
import logo from '../assets/logo.png';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout();
    navigate("/");
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/banking', icon: CreditCard, label: 'Banking' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">

            <img
              src={logo}
              alt="Logo"
              className="w-7 h-7 rounded-lg" 
            />

            <span className="font-bold text-xl text-gray-800">ReceiptMe</span>
          </div>
          
          <div className="flex space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
          
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;