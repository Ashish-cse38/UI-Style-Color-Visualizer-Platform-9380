import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDesign } from '../context/DesignContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiCheck, FiStar, FiZap, FiTrendingUp, FiShield, FiCrown, FiToggleLeft, 
  FiToggleRight, FiHelpCircle, FiX, FiCheckCircle, FiInfo, FiAlertTriangle
} = FiIcons;

const SubscriptionPlans = ({ setCurrentSection }) => {
  const { getDesignClasses } = useDesign();
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [notification, setNotification] = useState(null);

  const billingOptions = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly', discount: '20% off' }
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: yearlyBilling ? '$7' : '$9',
      period: yearlyBilling ? '/month, billed yearly' : '/month',
      description: 'Perfect for individuals getting started',
      icon: FiZap,
      features: [
        'Up to 5 projects',
        'Basic analytics',
        'Email support',
        '1GB storage',
        'Mobile app access'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: yearlyBilling ? '$23' : '$29',
      period: yearlyBilling ? '/month, billed yearly' : '/month',
      description: 'Ideal for growing businesses',
      icon: FiTrendingUp,
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '50GB storage',
        'Team collaboration',
        'Custom integrations',
        'Advanced security'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: yearlyBilling ? '$79' : '$99',
      period: yearlyBilling ? '/month, billed yearly' : '/month',
      description: 'For large organizations',
      icon: FiCrown,
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom branding',
        'Unlimited storage',
        'Advanced permissions',
        'SSO integration',
        'Custom contracts',
        '24/7 phone support'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    setNotification({
      type: 'success',
      message: `You've selected the ${plans.find(p => p.id === planId).name} plan!`
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const featureComparison = [
    { name: 'Number of projects', starter: '5', professional: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Storage space', starter: '1GB', professional: '50GB', enterprise: 'Unlimited' },
    { name: 'User seats', starter: '1', professional: 'Up to 10', enterprise: 'Unlimited' },
    { name: 'Analytics', starter: 'Basic', professional: 'Advanced', enterprise: 'Enterprise-grade' },
    { name: 'API access', starter: 'Limited', professional: 'Full access', enterprise: 'Customizable' },
    { name: 'Support', starter: 'Email only', professional: 'Priority', enterprise: 'Dedicated' },
    { name: 'Custom branding', starter: false, professional: false, enterprise: true },
    { name: 'SSO integration', starter: false, professional: false, enterprise: true },
    { name: 'Custom contracts', starter: false, professional: false, enterprise: true },
  ];

  return (
    <section id="plans" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 
              notification.type === 'error' ? 'bg-red-100 border-l-4 border-red-500' : 
              'bg-blue-100 border-l-4 border-blue-500'
            } flex items-center max-w-md`}
          >
            <SafeIcon 
              icon={
                notification.type === 'success' ? FiCheckCircle : 
                notification.type === 'error' ? FiX : 
                FiInfo
              } 
              className={`w-5 h-5 mr-3 ${
                notification.type === 'success' ? 'text-green-500' : 
                notification.type === 'error' ? 'text-red-500' : 
                'text-blue-500'
              }`}
            />
            <p>{notification.message}</p>
            <button 
              onClick={() => setNotification(null)}
              className="ml-auto"
            >
              <SafeIcon icon={FiX} className="w-4 h-4 opacity-50" />
            </button>
          </motion.div>
        )}
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto mb-8">
            Select the plan that fits your needs. Upgrade or downgrade at any time.
          </p>

          {/* Billing toggle */}
          <div className={`${getDesignClasses()} inline-flex p-1 rounded-lg mb-8`}>
            <div className="flex items-center justify-center">
              {billingOptions.map((option) => (
                <button
                  key={option.id}
                  className={`relative px-6 py-2 rounded-lg transition-all duration-200 ${
                    (option.id === 'yearly' && yearlyBilling) || (option.id === 'monthly' && !yearlyBilling)
                      ? 'bg-current text-white'
                      : ''
                  }`}
                  onClick={() => setYearlyBilling(option.id === 'yearly')}
                >
                  <span>{option.label}</span>
                  {option.discount && (
                    <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {option.discount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Compare plans button */}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center mx-auto mb-8 space-x-2 px-4 py-2 rounded-lg border border-current hover:bg-opacity-5 hover:bg-current transition-colors"
          >
            <SafeIcon icon={showComparison ? FiX : FiInfo} className="w-4 h-4" />
            <span>{showComparison ? 'Hide comparison' : 'Compare all features'}</span>
          </button>

          {/* Feature comparison table */}
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`${getDesignClasses()} p-6 mb-12 overflow-x-auto`}
            >
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-opacity-20 border-current">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Starter</th>
                    <th className="text-center py-3 px-4">Professional</th>
                    <th className="text-center py-3 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((feature, idx) => (
                    <tr 
                      key={feature.name} 
                      className={idx % 2 === 0 ? 'bg-opacity-5 bg-current' : ''}
                    >
                      <td className="py-3 px-4 relative">
                        <div className="flex items-center">
                          <span>{feature.name}</span>
                          <button 
                            className="ml-2 focus:outline-none"
                            onMouseEnter={() => setShowTooltip(feature.name)}
                            onMouseLeave={() => setShowTooltip(null)}
                          >
                            <SafeIcon icon={FiHelpCircle} className="w-4 h-4 opacity-50" />
                          </button>
                          
                          {showTooltip === feature.name && (
                            <div className="absolute left-0 top-full mt-2 z-10 p-3 rounded-lg bg-gray-800 text-white text-sm w-48">
                              More information about {feature.name.toLowerCase()}.
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        {feature.starter === false ? (
                          <span className="inline-block w-5 h-5 text-red-500">—</span>
                        ) : feature.starter === true ? (
                          <SafeIcon icon={FiCheck} className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          feature.starter
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        {feature.professional === false ? (
                          <span className="inline-block w-5 h-5 text-red-500">—</span>
                        ) : feature.professional === true ? (
                          <SafeIcon icon={FiCheck} className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          feature.professional
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        {feature.enterprise === false ? (
                          <span className="inline-block w-5 h-5 text-red-500">—</span>
                        ) : feature.enterprise === true ? (
                          <SafeIcon icon={FiCheck} className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          feature.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`relative ${getDesignClasses()} p-8 ${selectedPlan === plan.id ? 'ring-4 ring-current ring-opacity-50' : ''} ${plan.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <SafeIcon icon={FiStar} className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <SafeIcon icon={plan.icon} className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="opacity-80 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-lg opacity-80 ml-1">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.1) + (featureIndex * 0.05), duration: 0.4 }}
                    className="flex items-center"
                  >
                    <SafeIcon icon={FiCheck} className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border-2 border-current hover:bg-current hover:text-white'
                }`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {selectedPlan === plan.id ? 'Selected' : plan.popular ? 'Start Free Trial' : 'Choose Plan'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <div className={`${getDesignClasses()} p-6 flex flex-col md:flex-row items-center gap-6`}>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">Need a custom plan?</h3>
              <p className="opacity-80 mb-4">
                Our enterprise solutions can be tailored to your organization's specific needs.
                Get in touch with our sales team for a personalized quote.
              </p>
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                  <span>Custom SLAs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                  <span>Volume discounts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                  <span>Dedicated support</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              <button 
                className="px-6 py-3 rounded-lg bg-current text-white font-semibold"
                onClick={() => setCurrentSection && setCurrentSection('features')}
              >
                Explore Features
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg opacity-80 mb-4">All plans include a 14-day free trial</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-60">
            <div className="flex items-center">
              <SafeIcon icon={FiShield} className="w-4 h-4 mr-2" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center">
              <SafeIcon icon={FiCheck} className="w-4 h-4 mr-2" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center">
              <SafeIcon icon={FiAlertTriangle} className="w-4 h-4 mr-2" />
              <span>No Credit Card Required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;