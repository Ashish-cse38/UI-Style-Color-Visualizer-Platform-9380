import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DesignControls from './components/DesignControls';
import SubscriptionPlans from './components/SubscriptionPlans';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { DesignProvider } from './context/DesignContext';
import './App.css';

function App() {
  return (
    <DesignProvider>
      <Router>
        <div className="app-container">
          <MainPage />
        </div>
      </Router>
    </DesignProvider>
  );
}

function MainPage() {
  const [currentSection, setCurrentSection] = useState("plans");
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <DesignControls />
      <Header currentSection={currentSection} setCurrentSection={setCurrentSection} />
      
      <AnimatePresence mode="wait">
        {currentSection === "plans" && (
          <motion.div
            key="plans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SubscriptionPlans setCurrentSection={setCurrentSection} />
          </motion.div>
        )}
        
        {currentSection === "features" && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Features setCurrentSection={setCurrentSection} />
          </motion.div>
        )}
        
        {currentSection === "testimonials" && (
          <motion.div
            key="testimonials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Testimonials setCurrentSection={setCurrentSection} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </motion.div>
  );
}

export default App;