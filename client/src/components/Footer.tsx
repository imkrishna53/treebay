import { Link } from 'wouter';
import { FlaskConical, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoImage from '@/assets/images/logo.png';

const services = [
  { name: 'Ethanol', path: '/services/ethanol' },
  { name: 'Isobutanol', path: '/services/isobutanol' },
  { name: 'Hydrogen Energy', path: '/services/hydrogen' },
  { name: 'Biogas (FAME)', path: '/services/biogas' }
];

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Quality Standards', path: '/quality' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Careers', path: '/careers' }
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
               <img src={LogoImage}  alt="TreeBay Technologies Logo" className="h-8 w-auto"/>
              <span className="text-xl font-bold text-foreground">TreeBay Technologies</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Leading provider of premium chemical services and sustainable energy solutions. 
              Committed to quality, innovation, and environmental responsibility.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-linkedin">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link 
                    href={service.path} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    data-testid={`link-footer-${service.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Company</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">connect@treebaytechnology.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">+919871599470</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    1234 Chemical Park Drive<br />
                    Industrial District, TX 75001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-card-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 TreeBay Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/safety" className="text-muted-foreground hover:text-primary transition-colors">
                Safety Standards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}