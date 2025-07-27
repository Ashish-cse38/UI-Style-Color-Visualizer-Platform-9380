import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDesign } from '../context/DesignContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiMenu, FiX, FiLayout, FiStar, FiUsers, FiSearch, FiUser, FiShoppingCart, FiChevronDown, FiSettings } = FiIcons;

const Header = ({ currentSection, setCurrentSection }) => {
  const { getDesignClasses } = useDesign();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const navItems = [
    { id: "plans", name: "Plans", icon: FiLayout },
    { id: "features", name: "Features", icon: FiStar },
    { id: "testimonials", name: "Reviews", icon: FiUsers }
  ];

  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`${getDesignClasses()} p-6 sticky top-0 z-30`}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <SafeIcon icon={FiZap} className="w-8 h-8" />
            <span className="text-2xl font-bold">PlanForge</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover:opacity-80 transition-opacity flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  currentSection === item.id ? "nav-active" : ""
                }`}
              >
                <SafeIcon 
                  icon={item.icon} 
                  className={`w-4 h-4 ${currentSection === item.id ? "text-primary" : ""}`} 
                />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-opacity-10 hover:bg-current rounded-full"
              >
                <SafeIcon icon={FiSearch} className="w-5 h-5" />
              </button>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`absolute right-0 mt-2 w-64 ${getDesignClasses()} p-2 rounded-lg shadow-lg`}
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-8 pr-4 py-2 rounded-lg border border-opacity-20 border-current"
                      autoFocus
                    />
                    <SafeIcon icon={FiSearch} className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center space-x-1 p-2 hover:bg-opacity-10 hover:bg-current rounded-lg"
              >
                <SafeIcon icon={FiUser} className="w-5 h-5" />
                <span className="hidden lg:inline">Account</span>
                <SafeIcon icon={FiChevronDown} className="w-4 h-4" />
              </button>
              {accountDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`absolute right-0 mt-2 w-48 ${getDesignClasses()} rounded-lg shadow-lg overflow-hidden`}
                >
                  <div className="p-4 border-b border-opacity-20 border-current">
                    <p className="font-medium">Welcome!</p>
                    <p className="text-sm opacity-70">user@example.com</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 hover:bg-opacity-10 hover:bg-current">Profile</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-opacity-10 hover:bg-current">Settings</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-opacity-10 hover:bg-current">Subscriptions</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-opacity-10 hover:bg-current text-red-500">Sign Out</button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Cart Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
                className="p-2 hover:bg-opacity-10 hover:bg-current rounded-full relative"
              >
                <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">2</span>
              </button>
              {cartDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`absolute right-0 mt-2 w-72 ${getDesignClasses()} rounded-lg shadow-lg`}
                >
                  <div className="p-4 border-b border-opacity-20 border-current">
                    <h3 className="font-medium">Your Cart (2)</h3>
                  </div>
                  <div className="py-2 max-h-60 overflow-y-auto">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex items-center p-3 border-b border-opacity-10 border-current">
                        <div className="w-10 h-10 bg-opacity-10 bg-current rounded-md flex items-center justify-center">
                          <SafeIcon icon={FiLayout} className="w-5 h-5" />
                        </div>
                        <div className="ml-3 flex-grow">
                          <p className="font-medium">Professional Plan</p>
                          <p className="text-sm opacity-70">Monthly subscription</p>
                        </div>
                        <p className="font-medium">$29</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <span>Total</span>
                      <span className="font-medium">$58</span>
                    </div>
                    <button className="w-full py-2 rounded-lg bg-current text-white">Checkout</button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`hover:opacity-80 transition-opacity flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    currentSection === item.id ? "nav-active" : ""
                  }`}
                >
                  <SafeIcon 
                    icon={item.icon} 
                    className={`w-4 h-4 ${currentSection === item.id ? "text-primary" : ""}`} 
                  />
                  <span>{item.name}</span>
                </button>
              ))}
              <div className="pt-2 border-t border-opacity-20 border-current">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-opacity-20 border-current"
                  />
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                </div>
              </div>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-opacity-10 hover:bg-current">
                <SafeIcon icon={FiUser} className="w-5 h-5" />
                <span>Account</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-opacity-10 hover:bg-current">
                <div className="relative">
                  <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">2</span>
                </div>
                <span>Cart</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;