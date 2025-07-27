import React from 'react';
import { motion } from 'framer-motion';
import { useDesign } from '../context/DesignContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiAlertCircle, FiCheckCircle, FiX, FiInfo, FiAlertTriangle, FiMenu, FiChevronDown, FiChevronUp, 
  FiPlus, FiMinus, FiChevronRight, FiSearch, FiSend, FiCalendar, FiUser, FiMail, FiLock, 
  FiUpload, FiDownload, FiTrash2, FiEdit, FiSave, FiEye, FiEyeOff, FiToggleLeft, FiToggleRight,
  FiStar
} = FiIcons;

const UiComponents = () => {
  const { getDesignClasses } = useDesign();
  
  // State for interactive components
  const [activeTab, setActiveTab] = React.useState(0);
  const [accordionOpen, setAccordionOpen] = React.useState([true, false, false]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [rangeValue, setRangeValue] = React.useState(50);
  const [toggles, setToggles] = React.useState({
    toggle1: true,
    toggle2: false,
    toggle3: true,
  });
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const toggleAccordion = (index) => {
    const newAccordionOpen = [...accordionOpen];
    newAccordionOpen[index] = !newAccordionOpen[index];
    setAccordionOpen(newAccordionOpen);
  };

  const handleToggle = (name) => {
    setToggles({
      ...toggles,
      [name]: !toggles[name]
    });
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">UI Components</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Explore a variety of UI components with the selected design style and color scheme
          </p>
        </motion.div>

        {/* Buttons */}
        <ComponentSection title="Buttons">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Standard Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 rounded-lg bg-current text-white">Primary</button>
                <button className="px-4 py-2 rounded-lg border-2 border-current">Secondary</button>
                <button className="px-4 py-2 rounded-lg bg-opacity-10 bg-current">Tertiary</button>
                <button className="px-4 py-2 rounded-lg opacity-50" disabled>Disabled</button>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-2 py-1 text-xs rounded-lg bg-current text-white">Small</button>
                <button className="px-4 py-2 rounded-lg bg-current text-white">Medium</button>
                <button className="px-6 py-3 text-lg rounded-lg bg-current text-white">Large</button>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Icon Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button className="p-2 rounded-lg bg-current text-white">
                  <SafeIcon icon={FiPlus} className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg border-2 border-current flex items-center gap-2">
                  <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  <span>Download</span>
                </button>
                <button className="p-2 rounded-full bg-current text-white">
                  <SafeIcon icon={FiEdit} className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-opacity-10 bg-current flex items-center gap-2">
                  <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Form Elements */}
        <ComponentSection title="Form Elements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Text Inputs</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Standard Input</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                    placeholder="Enter your name" 
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">With Icon</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 pl-10 rounded-lg border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                      placeholder="Search..." 
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SafeIcon icon={FiSearch} className="w-5 h-5 opacity-50" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Password</label>
                  <div className="relative">
                    <input 
                      type={passwordVisible ? "text" : "password"} 
                      className="w-full px-4 py-2 pr-10 rounded-lg border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                      placeholder="Enter password" 
                    />
                    <button 
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      <SafeIcon icon={passwordVisible ? FiEyeOff : FiEye} className="w-5 h-5 opacity-50" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Selection & Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Checkbox</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                        defaultChecked 
                      />
                      <label className="ml-2">Option 1</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                      />
                      <label className="ml-2">Option 2</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Radio</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="radio-group" 
                        className="w-5 h-5 rounded-full border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                        defaultChecked 
                      />
                      <label className="ml-2">Option A</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="radio-group" 
                        className="w-5 h-5 rounded-full border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                      />
                      <label className="ml-2">Option B</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Range ({rangeValue}%)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                    className="w-full h-2 bg-opacity-20 bg-current rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Toggle Switches</h3>
              <div className="space-y-4">
                {Object.keys(toggles).map((key) => (
                  <div key={key} className="flex items-center justify-between">
                    <span>{key.replace('toggle', 'Option ')}</span>
                    <button 
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${toggles[key] ? 'bg-current' : 'bg-gray-300'}`}
                      onClick={() => handleToggle(key)}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${toggles[key] ? 'translate-x-6' : 'translate-x-0'}`} 
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Select & Textarea</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Select</label>
                  <select className="w-full px-4 py-2 rounded-lg border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100">
                    <option>Select an option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Textarea</label>
                  <textarea 
                    className="w-full px-4 py-2 rounded-lg border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                    placeholder="Enter your message"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Cards */}
        <ComponentSection title="Cards">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${getDesignClasses()} p-6`}>
              <div className="h-40 bg-opacity-10 bg-current rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
              <p className="opacity-70 mb-4">This is a simple card with an image placeholder, heading and some text content.</p>
              <button className="px-4 py-2 rounded-lg bg-current text-white">Read More</button>
            </div>

            <div className={`${getDesignClasses()} overflow-hidden`}>
              <div className="h-40 bg-opacity-10 bg-current"></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Featured Card</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-opacity-10 bg-current">New</span>
                </div>
                <p className="opacity-70 mb-4">A featured card with a badge and image that extends to the edges.</p>
                <div className="flex justify-between items-center">
                  <button className="px-4 py-2 rounded-lg bg-current text-white">View</button>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                    <SafeIcon icon={FiStar} className="w-4 h-4 opacity-30" />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-6`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-opacity-10 bg-current flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold">Profile Card</h3>
                  <p className="opacity-70 text-sm">User information</p>
                </div>
              </div>
              <p className="opacity-70 mb-4">A card displaying user profile information with avatar and details.</p>
              <div className="flex justify-between">
                <button className="px-3 py-1 text-sm rounded-lg border border-current">Follow</button>
                <button className="px-3 py-1 text-sm rounded-lg bg-opacity-10 bg-current">Message</button>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Alerts */}
        <ComponentSection title="Alerts & Notifications">
          <div className="space-y-4">
            <div className={`${getDesignClasses()} p-4 flex items-start border-l-4 border-green-500`}>
              <SafeIcon icon={FiCheckCircle} className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Success Alert</h4>
                <p className="opacity-70">Your changes have been saved successfully.</p>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-4 flex items-start border-l-4 border-blue-500`}>
              <SafeIcon icon={FiInfo} className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Information Alert</h4>
                <p className="opacity-70">The system will be under maintenance on Saturday.</p>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-4 flex items-start border-l-4 border-yellow-500`}>
              <SafeIcon icon={FiAlertTriangle} className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Warning Alert</h4>
                <p className="opacity-70">Your subscription will expire in 3 days. Please renew it.</p>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-4 flex items-start border-l-4 border-red-500`}>
              <SafeIcon icon={FiAlertCircle} className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Error Alert</h4>
                <p className="opacity-70">There was a problem processing your request. Please try again.</p>
              </div>
              <button className="ml-auto">
                <SafeIcon icon={FiX} className="w-5 h-5 opacity-50" />
              </button>
            </div>

            <div className={`${getDesignClasses()} p-4 rounded-lg shadow-lg max-w-sm mx-auto`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">New Message</h4>
                <span className="text-xs opacity-50">Just now</span>
              </div>
              <p className="opacity-70 mb-3">You received a new message from Sarah Johnson.</p>
              <div className="flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm rounded-lg bg-opacity-10 bg-current">Ignore</button>
                <button className="px-3 py-1 text-sm rounded-lg bg-current text-white">View</button>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Navigation */}
        <ComponentSection title="Navigation Components">
          <div className="space-y-6">
            {/* Tabs */}
            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Tabs</h3>
              <div className="border-b border-opacity-20 border-current">
                <div className="flex space-x-4">
                  {['Overview', 'Features', 'Pricing', 'FAQ'].map((tab, index) => (
                    <button
                      key={tab}
                      className={`pb-2 px-1 ${activeTab === index ? 'border-b-2 border-current font-medium' : 'opacity-70'}`}
                      onClick={() => setActiveTab(index)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <p className="opacity-70">
                  {activeTab === 0 && "This is the overview tab content. It provides general information."}
                  {activeTab === 1 && "The features tab lists all available features and capabilities."}
                  {activeTab === 2 && "Pricing information is displayed here with different plan options."}
                  {activeTab === 3 && "Frequently asked questions and their answers can be found here."}
                </p>
              </div>
            </div>

            {/* Accordion */}
            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Accordion</h3>
              <div className="space-y-2">
                {['What is this service?', 'How do I get started?', 'What are the payment options?'].map((question, index) => (
                  <div key={question} className={`border border-opacity-20 border-current rounded-lg ${accordionOpen[index] ? 'bg-opacity-5 bg-current' : ''}`}>
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="font-medium">{question}</span>
                      <SafeIcon icon={accordionOpen[index] ? FiChevronUp : FiChevronDown} className="w-5 h-5" />
                    </button>
                    {accordionOpen[index] && (
                      <div className="px-4 pb-3 opacity-70">
                        <p>
                          {index === 0 && "This service provides a comprehensive solution for managing your subscriptions and tracking usage."}
                          {index === 1 && "Getting started is easy. Just sign up for an account and follow the onboarding wizard."}
                          {index === 2 && "We accept all major credit cards, PayPal, and bank transfers. Monthly or annual billing is available."}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dropdown */}
            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Dropdown</h3>
              <div className="relative">
                <button
                  className="px-4 py-2 rounded-lg border-2 border-opacity-20 border-current flex items-center justify-between min-w-[200px]"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>Select Option</span>
                  <SafeIcon icon={dropdownOpen ? FiChevronUp : FiChevronDown} className="w-5 h-5 ml-2" />
                </button>
                {dropdownOpen && (
                  <div className={`absolute z-10 mt-1 w-full ${getDesignClasses()} shadow-lg rounded-lg overflow-hidden`}>
                    {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                      <button
                        key={option}
                        className="w-full text-left px-4 py-2 hover:bg-opacity-10 hover:bg-current"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Breadcrumbs</h3>
              <nav className="flex">
                <ol className="flex items-center space-x-2">
                  <li>
                    <a href="#" className="opacity-70 hover:opacity-100">Home</a>
                  </li>
                  <li className="flex items-center">
                    <SafeIcon icon={FiChevronRight} className="w-4 h-4 mx-1 opacity-50" />
                    <a href="#" className="opacity-70 hover:opacity-100">Products</a>
                  </li>
                  <li className="flex items-center">
                    <SafeIcon icon={FiChevronRight} className="w-4 h-4 mx-1 opacity-50" />
                    <span className="font-medium">Current Page</span>
                  </li>
                </ol>
              </nav>
            </div>

            {/* Pagination */}
            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Pagination</h3>
              <div className="flex justify-center">
                <nav className="flex items-center space-x-1">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-opacity-20 border-current opacity-50">
                    <SafeIcon icon={FiChevronRight} className="w-5 h-5 transform rotate-180" />
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                        page === 3 ? 'bg-current text-white' : 'border border-opacity-20 border-current'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-opacity-20 border-current">
                    <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Modal */}
        <ComponentSection title="Modal & Dialog">
          <div className={`${getDesignClasses()} p-6 text-center`}>
            <h3 className="text-lg font-semibold mb-4">Modal Dialog</h3>
            <button
              className="px-4 py-2 rounded-lg bg-current text-white"
              onClick={() => setModalOpen(true)}
            >
              Open Modal
            </button>

            {modalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setModalOpen(false)}></div>
                <div className={`${getDesignClasses()} p-6 w-full max-w-md relative z-10`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Modal Title</h3>
                    <button onClick={() => setModalOpen(false)}>
                      <SafeIcon icon={FiX} className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mb-6">
                    <p className="opacity-70">
                      This is a modal dialog that appears on top of the main content.
                      It's useful for focused interactions and confirmations.
                    </p>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      className="px-4 py-2 rounded-lg border border-current"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg bg-current text-white"
                      onClick={() => setModalOpen(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ComponentSection>

        {/* Progress & Loaders */}
        <ComponentSection title="Progress & Loaders">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Progress Bars</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Basic (75%)</span>
                    <span className="text-sm">75%</span>
                  </div>
                  <div className="w-full h-2 bg-opacity-10 bg-current rounded-full">
                    <div className="h-2 bg-current rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">With Steps</span>
                  </div>
                  <div className="w-full h-2 bg-opacity-10 bg-current rounded-full flex">
                    <div className="h-2 bg-current rounded-l-full" style={{ width: '33%' }}></div>
                    <div className="h-2 bg-opacity-50 bg-current" style={{ width: '33%' }}></div>
                    <div className="h-2 bg-opacity-20 bg-current rounded-r-full" style={{ width: '34%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs opacity-70">
                    <span>Step 1</span>
                    <span>Step 2</span>
                    <span>Step 3</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Animated (40%)</span>
                  </div>
                  <div className="w-full h-2 bg-opacity-10 bg-current rounded-full overflow-hidden">
                    <div className="h-2 bg-current rounded-full animate-pulse" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${getDesignClasses()} p-6`}>
              <h3 className="text-lg font-semibold mb-4">Loading Spinners</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-opacity-20 border-current border-t-current rounded-full animate-spin"></div>
                  <span className="mt-2 text-sm">Basic</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center animate-pulse">
                    <div className="w-8 h-8 bg-current rounded-full opacity-75"></div>
                  </div>
                  <span className="mt-2 text-sm">Pulse</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-8 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-8 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-8 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="mt-2 text-sm">Bounce</span>
                </div>
              </div>
            </div>
          </div>
        </ComponentSection>
      </div>
    </section>
  );
};

// Helper component for sections
const ComponentSection = ({ title, children }) => {
  const { getDesignClasses } = useDesign();
  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <h3 className="text-2xl font-bold mb-6 pb-2 border-b border-opacity-20 border-current">{title}</h3>
      {children}
    </motion.div>
  );
};

export default UiComponents;