import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useDesign} from '../context/DesignContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiStar, FiQuote, FiChevronLeft, FiChevronRight, FiFilter, FiChevronDown, FiCheck, FiX, FiPlay, FiPause} = FiIcons;

const Testimonials = ({setCurrentSection}) => {
  const {getDesignClasses} = useDesign();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  const filterOptions = ['All', 'Startup', 'Enterprise', 'Freelancer', 'Agency', '5-star'];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      content: 'This platform has transformed how we manage our projects. The analytics are incredible and the team collaboration features are exactly what we needed.',
      rating: 5,
      category: 'Startup',
      videoUrl: 'https://example.com/testimonial1.mp4',
      videoThumbnail: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=300&h=200&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCorp',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'The customer support is outstanding. Every question gets answered quickly and the team really cares about helping us succeed.',
      rating: 5,
      category: 'Enterprise'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Designer, CreativeStudio',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'I love how intuitive the interface is. We were able to get our entire team up and running in just a few hours.',
      rating: 5,
      category: 'Agency',
      videoUrl: 'https://example.com/testimonial2.mp4',
      videoThumbnail: 'https://images.unsplash.com/photo-1616587226157-48e49175ee20?w=300&h=200&fit=crop'
    },
    {
      name: 'David Kim',
      role: 'CTO, DataFlow',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'The API integration capabilities are fantastic. We were able to connect all our existing tools seamlessly.',
      rating: 4,
      category: 'Enterprise'
    },
    {
      name: 'Lisa Thompson',
      role: 'Marketing Director, GrowthCo',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      content: 'The analytics dashboard gives us insights we never had before. It\'s helped us make better data-driven decisions.',
      rating: 5,
      category: 'Agency'
    },
    {
      name: 'James Wilson',
      role: 'Founder, StartupLab',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      content: 'Excellent value for money. The features we get for the price point are unmatched in the market.',
      rating: 5,
      category: 'Startup'
    },
    {
      name: 'Alex Morgan',
      role: 'Freelance Developer',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
      content: 'As a freelancer, this tool has helped me stay organized and professional with my clients. The invoicing features are a game-changer.',
      rating: 4,
      category: 'Freelancer'
    },
    {
      name: 'Sophia Nguyen',
      role: 'Digital Nomad',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face',
      content: 'I can work from anywhere and still keep track of all my projects and clients. The mobile app is fantastic!',
      rating: 5,
      category: 'Freelancer'
    }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (activeFilter === 'All') return true;
    if (activeFilter === '5-star') return testimonial.rating === 5;
    return testimonial.category === activeFilter;
  });

  const featuredTestimonials = testimonials.filter(t => t.videoUrl);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowFilterDropdown(false);
    setCurrentSlide(0); // Reset to first slide when filter changes
  };

  const handleVideoToggle = (index) => {
    if (activeVideoIndex === index) {
      setActiveVideoIndex(null);
      setIsVideoPlaying(false);
    } else {
      setActiveVideoIndex(index);
      setIsVideoPlaying(true);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback! Rating: ${feedbackRating}, Comment: ${feedbackText}`);
    setShowFeedbackForm(false);
    setFeedbackText('');
    setFeedbackRating(5);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === Math.ceil(filteredTestimonials.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(filteredTestimonials.length / 3) - 1 : prev - 1
    );
  };

  const handleViewPlans = () => {
    if (setCurrentSection) {
      setCurrentSection('plans');
    }
  };

  return (
    <section id="testimonials" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{y: 50, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Customers Say</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their workflow with our platform.
          </p>
        </motion.div>

        {/* Featured video testimonials */}
        {featuredTestimonials.length > 0 && (
          <motion.div
            initial={{y: 50, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.6}}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Featured Testimonials</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{y: -5}}
                  className={`${getDesignClasses()} overflow-hidden`}
                >
                  <div className="relative">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{backgroundImage: `url(${testimonial.videoThumbnail})`}}
                    ></div>
                    <button
                      onClick={() => handleVideoToggle(index)}
                      className={`absolute inset-0 flex items-center justify-center ${
                        activeVideoIndex === index 
                          ? 'bg-black bg-opacity-50' 
                          : 'bg-black bg-opacity-30 hover:bg-opacity-50'
                      } transition-all duration-300`}
                    >
                      <div className={`w-16 h-16 rounded-full ${
                        activeVideoIndex === index ? 'bg-red-500' : 'bg-white'
                      } flex items-center justify-center`}>
                        <SafeIcon 
                          icon={activeVideoIndex === index && isVideoPlaying ? FiPause : FiPlay} 
                          className="w-6 h-6 text-white" 
                        />
                      </div>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="mb-6">
                      <SafeIcon icon={FiQuote} className="w-8 h-8 opacity-20 mb-2" />
                      <p className="text-lg leading-relaxed">{testimonial.content}</p>
                    </div>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm opacity-70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h3 className="text-2xl font-bold mb-4 md:mb-0">Customer Reviews</h3>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`${getDesignClasses()} px-4 py-2 flex items-center space-x-2 rounded-lg`}
            >
              <SafeIcon icon={FiFilter} className="w-5 h-5" />
              <span>{activeFilter}</span>
              <SafeIcon icon={FiChevronDown} className="w-5 h-5" />
            </button>
            
            {showFilterDropdown && (
              <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                className={`absolute right-0 mt-2 z-10 w-48 ${getDesignClasses()} rounded-lg shadow-lg overflow-hidden`}
              >
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className="w-full text-left px-4 py-2 hover:bg-opacity-10 hover:bg-current flex items-center justify-between"
                  >
                    <span>{filter}</span>
                    {activeFilter === filter && (
                      <SafeIcon icon={FiCheck} className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{y: 50, opacity: 0}}
              whileInView={{y: 0, opacity: 1}}
              viewport={{once: true}}
              transition={{delay: index * 0.1, duration: 0.6}}
              whileHover={{y: -5}}
              className={`${getDesignClasses()} p-6`}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <SafeIcon key={i} icon={FiStar} className="w-5 h-5 opacity-30" />
                ))}
              </div>
              
              <div className="mb-6">
                <SafeIcon icon={FiQuote} className="w-8 h-8 opacity-20 mb-2" />
                <p className="text-lg leading-relaxed">{testimonial.content}</p>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm opacity-70">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating and CTA */}
        <motion.div
          initial={{y: 50, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{once: true}}
          transition={{delay: 0.4, duration: 0.6}}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-lg font-semibold mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <SafeIcon key={i} icon={FiStar} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span>4.9/5 from 2,000+ reviews</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {!showFeedbackForm ? (
              <>
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="px-6 py-3 rounded-lg bg-current text-white"
                >
                  Share Your Experience
                </button>
                <button
                  onClick={handleViewPlans}
                  className="px-6 py-3 rounded-lg border-2 border-current"
                >
                  View Pricing Plans
                </button>
              </>
            ) : (
              <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: 'auto'}}
                className={`${getDesignClasses()} p-6 max-w-xl mx-auto w-full`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Leave Your Feedback</h3>
                  <button onClick={() => setShowFeedbackForm(false)}>
                    <SafeIcon icon={FiX} className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleFeedbackSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Your Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFeedbackRating(rating)}
                          className="focus:outline-none"
                        >
                          <SafeIcon 
                            icon={FiStar} 
                            className={`w-8 h-8 ${
                              rating <= feedbackRating ? 'text-yellow-400' : 'text-gray-300'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Your Experience</label>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-2 border-opacity-20 border-current focus:outline-none focus:border-opacity-100"
                      rows="4"
                      placeholder="Tell us about your experience..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowFeedbackForm(false)}
                      className="px-4 py-2 rounded-lg border border-current"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-current text-white"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;