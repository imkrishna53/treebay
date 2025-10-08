// components/Navigation.jsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, FlaskConical } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link  } from "react-router-dom";
import { useLocation } from 'wouter';
import LogoImage from '@/assets/images/logo.png';
// Animation variants (same as before)
const menuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const navItemVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

const underlineVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: { 
    width: "100%", 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

interface Service {
  _id: string;
  title: string;
  slug: string;
}

export default function Navigation() {
  const [location] = useLocation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/services?fields=title,slug`);
      const servicesData = await response.json();
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path: string) => location === path;

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2 hover-elevate rounded-md px-3 py-2">
               <img src={LogoImage}  alt="TreeBay Technologies Logo" className="h-8 w-auto"/>
              <span className="text-xl font-bold text-foreground">TreeBay Technologies</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Home Link */}
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative"
            >
              <Link to="/" className="block px-4 py-2 rounded-md">
                <span className={`relative ${isActive('/') ? 'text-primary font-medium' : 'text-foreground'}`}>
                  Home
                  {isActive('/') && (
                    <motion.div
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </span>
              </Link>
            </motion.div>
            
            {/* Dynamic Services Dropdown */}
            <motion.div 
              className="relative"
              variants={navItemVariants}
              whileHover="hover"
            >
              <motion.button
                className="flex items-center px-4 py-2 rounded-md hover-elevate"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                data-testid="button-services-menu"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-foreground">Services</span>
                <motion.div
                  animate={{ rotate: isServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ChevronDown className="ml-1 h-4 w-4" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute top-full left-0 mt-1 w-48 bg-popover border border-popover-border rounded-md shadow-lg z-10 overflow-hidden"
                  >
                    {loading ? (
                      <div className="px-4 py-3 text-sm text-muted-foreground">
                        Loading services...
                      </div>
                    ) : services.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-muted-foreground">
                        No services available
                      </div>
                    ) : (
                      <>
                        {services.map((service, index) => (
                          <motion.div
                            key={service._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          >
                            <Link
                              to={`/services/${service.slug}`}
                              className="block px-4 py-3 text-sm text-popover-foreground hover:text-primary transition-colors"
                              onClick={() => setIsServicesOpen(false)}
                              data-testid={`link-service-${service.slug}`}
                            >
                              {service.title}
                            </Link>
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: services.length * 0.1 }}
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          className="border-t border-border"
                        >
                          <Link
                            to="/services"
                            className="block px-4 py-3 text-sm font-semibold text-popover-foreground hover:text-primary transition-colors"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            View All Services
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Contact Link */}
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative"
            >
              <Link to="/contact" className="block px-4 py-2 rounded-md">
                <span className={`relative ${isActive('/contact') ? 'text-primary font-medium' : 'text-foreground'}`}>
                  Contact
                  {isActive('/contact') && (
                    <motion.div
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </span>
              </Link>
            </motion.div>
            
            {/* About Link */}
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative"
            >
              <Link to="/aboutus" className="block px-4 py-2 rounded-md">
                <span className={`relative ${isActive('/aboutus') ? 'text-primary font-medium' : 'text-foreground'}`}>
                  About
                  {isActive('/aboutus') && (
                    <motion.div
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </span>
              </Link>
            </motion.div>

            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <motion.div
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {/* Home */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link 
                  to="/" 
                  className="block px-4 py-3 text-foreground hover-elevate rounded-md hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </motion.div>
              
              {/* Services */}
              <div className="border-l-2 border-primary/20 pl-4 ml-4">
                <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Services</p>
                {loading ? (
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    Loading services...
                  </div>
                ) : services.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    No services available
                  </div>
                ) : (
                  services.map((service, index) => (
                    <motion.div
                      key={service._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (index * 0.05) }}
                    >
                      <Link
                        to={`/services/${service.slug}`}
                        className="block px-4 py-3 text-foreground hover-elevate rounded-md hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                        data-testid={`link-mobile-service-${service.slug}`}
                      >
                        {service.title}
                      </Link>
                    </motion.div>
                  ))
                )}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    to="/services" 
                    className="block px-4 py-3 text-foreground hover-elevate rounded-md hover:text-primary transition-colors font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View All Services
                  </Link>
                </motion.div>
              </div>
              
              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/contact" 
                  className="block px-4 py-3 text-foreground hover-elevate rounded-md hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>

              {/* About */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link 
                  to="/aboutus" 
                  className="block px-4 py-3 text-foreground hover-elevate rounded-md hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}