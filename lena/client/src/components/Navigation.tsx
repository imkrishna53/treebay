import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, FlaskConical } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const services = [
  { name: 'Ethanol', path: '/services/ethanol' },
  { name: 'Isobutanol', path: '/services/isobutanol' },
  { name: 'Hydrogen Energy', path: '/services/hydrogen' },
  { name: 'Biogas (FAME)', path: '/services/biogas' }
];

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-elevate rounded-md px-3 py-2">
            <FlaskConical className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">ChemFlow Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-4 py-2 rounded-md hover-elevate">
              <span className={location === '/' ? 'text-primary font-medium' : 'text-foreground'}>
                Home
              </span>
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 rounded-md hover-elevate"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                data-testid="button-services-menu"
              >
                <span className="text-foreground">Services</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-popover-border rounded-md shadow-md z-10">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      href={service.path}
                      className="block px-4 py-3 text-sm text-popover-foreground hover-elevate first:rounded-t-md last:rounded-b-md"
                      onClick={() => setIsServicesOpen(false)}
                      data-testid={`link-service-${service.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/contact" className="px-4 py-2 rounded-md hover-elevate">
              <span className={location === '/contact' ? 'text-primary font-medium' : 'text-foreground'}>
                Contact
              </span>
            </Link>
            
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-2 space-y-1">
            <Link 
              href="/" 
              className="block px-4 py-3 text-foreground hover-elevate rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {services.map((service) => (
              <Link
                key={service.path}
                href={service.path}
                className="block px-4 py-3 text-foreground hover-elevate rounded-md"
                onClick={() => setIsMenuOpen(false)}
                data-testid={`link-mobile-service-${service.name.toLowerCase().replace(' ', '-')}`}
              >
                {service.name}
              </Link>
            ))}
            
            <Link 
              href="/contact" 
              className="block px-4 py-3 text-foreground hover-elevate rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}