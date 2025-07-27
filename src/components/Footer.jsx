import React from 'react';
import { motion } from 'framer-motion';
import { useDesign } from '../context/DesignContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiGithub, FiInstagram } = FiIcons;

const Footer = () => {
  const { getDesignClasses } = useDesign();

  const footerSections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'API Docs', 'Integrations', 'Security']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Press', 'Partners']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact', 'Status', 'Community', 'Resources']
    },
    {
      title: 'Legal',
      links: ['Privacy', 'Terms', 'Cookie Policy', 'GDPR', 'Compliance']
    }
  ];

  const socialLinks = [
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiInstagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className={`${getDesignClasses()} py-16 px-6 mt-16`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiZap} className="w-8 h-8" />
                <span className="text-2xl font-bold">PlanForge</span>
              </div>
              <p className="opacity-80 mb-6">
                Empowering teams to build better products with our comprehensive subscription platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5" />
                <span>hello@planforge.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5" />
                <span>San Francisco, CA</span>
              </div>
            </motion.div>
          </div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-t border-opacity-20 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="opacity-60 mb-4 md:mb-0">
              © 2024 PlanForge. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;