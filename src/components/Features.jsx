import React, {useState, useContext} from 'react';
import {motion} from 'framer-motion';
import {useDesign} from '../context/DesignContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiBarChart3, FiUsers, FiShield, FiSmartphone, FiGlobe, FiHeadphones, FiZap, FiTool, FiCloud, FiChevronDown, FiChevronUp, FiSearch, FiFilter, FiX, FiPlus, FiMinus, FiCheckCircle, FiAlertTriangle, FiStar} = FiIcons;

const Features = ({setCurrentSection}) => {
  const {getDesignClasses} = useDesign();
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const featureCategories = [
    'All',
    'Analytics',
    'Collaboration',
    'Security',
    'Mobile',
    'Integration'
  ];

  const features = [
    {
      icon: FiBarChart3,
      title: 'Advanced Analytics',
      description: 'Get detailed insights into your performance with real-time analytics and reporting.',
      category: 'Analytics',
      details: [
        'Real-time dashboard with customizable widgets',
        'Export reports in multiple formats (PDF, CSV, Excel)',
        'Custom report builder with drag-and-drop interface',
        'Automated email reports on schedule',
        'Data visualization with charts and graphs'
      ]
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team using our collaborative tools and shared workspaces.',
      category: 'Collaboration',
      details: [
        'Real-time document collaboration',
        'Team chat and messaging',
        'Project management tools',
        'Task assignments and tracking',
        'Shared calendars and scheduling'
      ]
    },
    {
      icon: FiShield,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and compliance certifications.',
      category: 'Security',
      details: [
        'End-to-end encryption for all data',
        'Two-factor authentication',
        'Role-based access control',
        'Compliance with GDPR, HIPAA, and SOC2',
        'Regular security audits and penetration testing'
      ]
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Apps',
      description: 'Access your work from anywhere with our native iOS and Android applications.',
      category: 'Mobile',
      details: [
        'Native iOS and Android applications',
        'Offline mode with data synchronization',
        'Push notifications for important updates',
        'Biometric authentication',
        'Mobile-optimized interface'
      ]
    },
    {
      icon: FiGlobe,
      title: 'Global CDN',
      description: 'Lightning-fast performance worldwide with our distributed content delivery network.',
      category: 'Performance',
      details: [
        'Content delivery across 200+ locations worldwide',
        'Automatic failover and redundancy',
        'Edge caching for faster access',
        'DDoS protection',
        'Real-time traffic analytics'
      ]
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      description: 'Get help when you need it with our round-the-clock customer support team.',
      category: 'Support',
      details: [
        'Available 24/7 via chat, email, and phone',
        'Dedicated support agents for enterprise plans',
        'Comprehensive knowledge base',
        'Video tutorials and webinars',
        'Priority support queue for urgent issues'
      ]
    },
    {
      icon: FiZap,
      title: 'API Integration',
      description: 'Connect with your favorite tools using our comprehensive REST API and webhooks.',
      category: 'Integration',
      details: [
        'RESTful API with comprehensive documentation',
        'Webhook support for real-time events',
        'OAuth 2.0 authentication',
        'Rate limiting and usage monitoring',
        'Pre-built integrations with popular services'
      ]
    },
    {
      icon: FiTool,
      title: 'Customization',
      description: 'Tailor the platform to your needs with custom fields, workflows, and branding.',
      category: 'Customization',
      details: [
        'Custom fields and data structures',
        'Workflow automation builder',
        'White-labeling and branding options',
        'Custom domain support',
        'Template library for quick setup'
      ]
    },
    {
      icon: FiCloud,
      title: 'Cloud Storage',
      description: 'Secure cloud storage with automatic backups and version control for all your files.',
      category: 'Storage',
      details: [
        'Unlimited storage for enterprise plans',
        'Automatic daily backups',
        'File versioning and history',
        'Secure file sharing with permissions',
        'Integration with Google Drive, Dropbox, and OneDrive'
      ]
    }
  ];

  const toggleFeatureExpansion = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  const handleFilterChange = (category) => {
    if (category === 'All') {
      setActiveFilters([]);
    } else if (activeFilters.includes(category)) {
      setActiveFilters(activeFilters.filter(cat => cat !== category));
    } else {
      setActiveFilters([...activeFilters, category]);
    }
  };

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(feature.category);
    return matchesSearch && matchesFilter;
  });

  const handleFeatureAction = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleViewPricingPlans = () => {
    if (setCurrentSection) {
      setCurrentSection('plans');
    }
  };

  // Handle dropdown click to prevent closing
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section id="features" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {showNotification && (
          <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            className={`fixed top-4 right-4 z-50 ${getDesignClasses()} p-4 flex items-center border-l-4 border-green-500 max-w-md`}
          >
            <SafeIcon icon={FiCheckCircle} className="w-6 h-6 text-green-500 mr-3" />
            <div>
              <h4 className="font-medium">Feature activated!</h4>
              <p className="opacity-70">You can now use this feature in your workspace.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="ml-auto">
              <SafeIcon icon={FiX} className="w-5 h-5 opacity-50" />
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{y: 50, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Everything you need to succeed, built with the latest technology and best practices.
          </p>
        </motion.div>

        <div className="mb-12">
          <div className={`${getDesignClasses()} p-6 mb-8`}>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search input */}
              <div className="w-full md:w-2/3 relative">
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                />
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5 opacity-50" />
                  </button>
                )}
              </div>

              {/* Filter dropdown */}
              <div className="w-full md:w-1/3 relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 border-opacity-20 border-current"
                >
                  <div className="flex items-center">
                    <SafeIcon icon={FiFilter} className="w-5 h-5 mr-2" />
                    <span>
                      {activeFilters.length === 0 ? 'All Categories' : `${activeFilters.length} selected`}
                    </span>
                  </div>
                  <SafeIcon icon={showFilterDropdown ? FiChevronUp : FiChevronDown} className="w-5 h-5" />
                </button>

                {showFilterDropdown && (
                  <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    className={`absolute z-20 mt-2 w-full ${getDesignClasses()} rounded-lg shadow-lg overflow-hidden`}
                    onClick={handleDropdownClick}
                  >
                    <div className="p-3 max-h-60 overflow-y-auto">
                      {featureCategories.map((category) => (
                        <button
                          key={category}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFilterChange(category);
                          }}
                          className="w-full flex items-center justify-between p-2 hover:bg-opacity-10 hover:bg-current rounded-lg"
                        >
                          <span>{category}</span>
                          {((category === 'All' && activeFilters.length === 0) ||
                            (category !== 'All' && activeFilters.includes(category))) ? (
                            <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                          ) : null}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-opacity-20 border-current p-3 flex justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveFilters([]);
                        }}
                        className="text-sm opacity-70"
                      >
                        Clear all
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFilterDropdown(false);
                        }}
                        className="text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Results count */}
            <div className="flex justify-between items-center">
              <p className="text-sm opacity-70">
                {filteredFeatures.length} {filteredFeatures.length === 1 ? 'feature' : 'features'} found
              </p>
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-sm flex items-center opacity-70 hover:opacity-100"
                >
                  <span>Clear filters</span>
                  <SafeIcon icon={FiX} className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          </div>

          {filteredFeatures.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{y: 50, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  viewport={{once: true}}
                  transition={{delay: index * 0.1, duration: 0.6}}
                  whileHover={{y: expandedFeature === index ? 0 : -5}}
                  className={`${getDesignClasses()} p-6`}
                >
                  <motion.div
                    initial={{scale: 0}}
                    whileInView={{scale: 1}}
                    viewport={{once: true}}
                    transition={{delay: index * 0.1 + 0.2, duration: 0.4}}
                    className="mb-4"
                  >
                    <SafeIcon icon={feature.icon} className="w-12 h-12 mx-auto" />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                  <p className="opacity-80 text-center mb-4">{feature.description}</p>

                  <div>
                    <button
                      onClick={() => toggleFeatureExpansion(index)}
                      className="w-full flex items-center justify-between py-2 border-t border-opacity-20 border-current"
                    >
                      <span className="font-medium">
                        {expandedFeature === index ? 'Hide details' : 'Show details'}
                      </span>
                      <SafeIcon icon={expandedFeature === index ? FiChevronUp : FiChevronDown} className="w-5 h-5" />
                    </button>

                    {expandedFeature === index && (
                      <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        className="pt-4"
                      >
                        <ul className="space-y-2">
                          {feature.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start">
                              <SafeIcon icon={FiCheckCircle} className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex justify-center">
                          <button
                            onClick={handleFeatureAction}
                            className="px-4 py-2 rounded-lg bg-current text-white flex items-center"
                          >
                            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                            <span>Activate Feature</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={`${getDesignClasses()} p-8 text-center`}>
              <SafeIcon icon={FiAlertTriangle} className="w-12 h-12 mx-auto opacity-50 mb-4" />
              <h3 className="text-xl font-medium mb-2">No features found</h3>
              <p className="opacity-70 mb-4">
                No features match your current search and filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilters([]);
                }}
                className="px-4 py-2 rounded-lg border border-current"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Feature comparison section */}
        <motion.div
          initial={{y: 50, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{once: true}}
          transition={{delay: 0.2, duration: 0.6}}
          className="mt-16"
        >
          <div className={`${getDesignClasses()} p-8`}>
            <h3 className="text-2xl font-bold mb-6 text-center">Compare Feature Availability</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-opacity-20 border-current">
                    <th className="text-left p-3">Feature</th>
                    <th className="text-center p-3">Starter</th>
                    <th className="text-center p-3">Professional</th>
                    <th className="text-center p-3">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-opacity-5 bg-current' : ''}>
                      <td className="p-3">
                        <div className="flex items-center">
                          <SafeIcon icon={feature.icon} className="w-5 h-5 mr-3 opacity-70" />
                          <span>{feature.title}</span>
                        </div>
                      </td>
                      <td className="text-center p-3">
                        {index < 3 ? (
                          <SafeIcon icon={FiCheckCircle} className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          <SafeIcon icon={FiX} className="w-5 h-5 mx-auto opacity-40" />
                        )}
                      </td>
                      <td className="text-center p-3">
                        {index < 6 ? (
                          <SafeIcon icon={FiCheckCircle} className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          <div className="flex justify-center">
                            {index === 6 ? (
                              <div className="flex items-center">
                                <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                                <span className="ml-1 text-xs">Limited</span>
                              </div>
                            ) : (
                              <SafeIcon icon={FiX} className="w-5 h-5 opacity-40" />
                            )}
                          </div>
                        )}
                      </td>
                      <td className="text-center p-3">
                        <SafeIcon icon={FiCheckCircle} className="w-5 h-5 mx-auto text-green-500" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={handleViewPricingPlans}
                className="px-6 py-2 rounded-lg bg-current text-white flex items-center"
              >
                <span>View Pricing Plans</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feature ratings */}
        <motion.div
          initial={{y: 50, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{once: true}}
          transition={{delay: 0.4, duration: 0.6}}
          className="mt-16"
        >
          <div className={`${getDesignClasses()} p-8`}>
            <h3 className="text-2xl font-bold mb-6 text-center">Feature Ratings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.slice(0, 6).map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b border-opacity-10 border-current">
                  <div className="flex items-center">
                    <SafeIcon icon={feature.icon} className="w-5 h-5 mr-3 opacity-70" />
                    <span>{feature.title}</span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <SafeIcon
                        key={i}
                        icon={FiStar}
                        className={`w-4 h-4 ${i < 4 + Math.floor(Math.random() * 2) ? 'text-yellow-400' : 'opacity-30'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;