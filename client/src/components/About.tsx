import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Target, Leaf, Award, Shield, Globe } from 'lucide-react';
import { Link } from 'wouter';
import aboutHero from '@assets/generated_images/Chemistry_team_collaboration_86ba8fa9.png';
import { motion } from 'framer-motion';
import TypedText from '@/components/TypedText';

const values = [
  { 
    icon: Shield, 
    title: 'Quality & Safety',
    description: 'Rigorous quality control and safety protocols in every process'
  },
  { 
    icon: Leaf, 
    title: 'Sustainability',
    description: 'Eco-friendly processes and sustainable feedstock sourcing'
  },
  { 
    icon: Target, 
    title: 'Innovation',
    description: 'Continuous R&D to advance ethanol production technology'
  },
  { 
    icon: Globe, 
    title: 'Global Standards',
    description: 'Meeting international quality and environmental standards'
  }
];

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief Executive Officer',
    expertise: 'Chemical Engineering, 15+ years industry experience'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Production',
    expertise: 'Process Engineering, Ethanol Specialist'
  },
  {
    name: 'Elena Petrova',
    role: 'Sustainability Director',
    expertise: 'Environmental Science, Green Technology'
  },
  {
    name: 'David Kim',
    role: 'Quality Assurance',
    expertise: 'Chemistry, Quality Systems Management'
  }
];

const milestones = [
  { year: '2008', event: 'Company Founded' },
  { year: '2012', event: 'First Industrial Plant' },
  { year: '2015', event: 'ISO 9001 Certified' },
  { year: '2018', event: 'Sustainable Feedstock Initiative' },
  { year: '2021', event: 'Global Expansion' },
  { year: '2023', event: 'Advanced Distillation Technology' }
];

export default function About() {
  const missionStrings = [
    'Innovation...',
    'Quality...',
    'Sustainability...',
    'Excellence...'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={aboutHero} 
            alt="TreeBay Technologies team collaboration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${20 + (i * 7)}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: '5s'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                About
                <span className="text-primary block">
                  TreeBay Technologies
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                For over 15 years, we've been at the forefront of industrial ethanol 
                production, combining cutting-edge technology with sustainable practices 
                to deliver premium solutions worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="group">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg">
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border/30"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">Our Mission</h3>
                <p className="text-lg text-muted-foreground">
                  To revolutionize industrial ethanol production through&nbsp; 
                  <span className="text-primary font-medium">
                    <TypedText id="mission-typed" strings={missionStrings} />
                  </span>
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">99.8%</div>
                    <div className="text-sm text-muted-foreground">Purity Rate</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our operations and define our commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 border border-border/30 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experts driving innovation and excellence at TreeBay Technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <Users className="h-12 w-12 text-primary/60" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.expertise}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our commitment to excellence and innovation
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-background rounded-2xl p-6 border border-border/30 shadow-sm">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {milestone.year}
                      </div>
                      <p className="text-foreground text-lg">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Award className="h-16 w-16 text-primary mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trust TreeBay Technologies for their industrial ethanol needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Start a Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services/ethanol">
                <Button variant="outline" size="lg">
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}