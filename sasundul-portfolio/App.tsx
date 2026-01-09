import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Github,
  Layout,
  Linkedin, Mail,
  MapPin,
  Menu,
  Server,
  Smartphone, Terminal,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { ThemeToggle } from './components/ThemeToggle';
import { ExperienceItem, NavLink, Project, Skill } from './types';

// --- Data Constants ---
const PROFILE_IMAGE_URL = "https://avatars.githubusercontent.com/u/158804448?s=400&u=8edbb46c2957de94b2e962060f06cccea207867c&v=4";

const NAV_LINKS: NavLink[] = [
  { name: 'HOME', href: '#home' },
  { name: 'WORK', href: '#projects' },
  { name: 'EXPERTISE', href: '#skills' },
  { name: 'JOURNEY', href: '#experience' },
];

const SKILLS: Skill[] = [
  { name: 'React.js', level: 'Advanced', category: 'Frontend' },
  { name: 'TypeScript', level: 'Intermediate', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 'Advanced', category: 'Frontend' },
  { name: 'Spring Boot', level: 'Advanced', category: 'Backend' },
  { name: 'Java', level: 'Advanced', category: 'Backend' },
  { name: 'PostgreSQL', level: 'Intermediate', category: 'Backend' },
  { name: 'React-Native', level: 'Intermediate', category: 'Mobile' },
  { name: 'Docker', level: 'Basics', category: 'Tools' },
];

/// Hariyata Dammoth 
// const SKILLS: Skill[] = [
//   // Programming Languages
//   { name: 'Java', level: 'Advanced', category: 'Programming Languages' },
//   { name: 'JavaFX', level: 'Intermediate', category: 'Programming Languages' },
//   { name: 'JavaScript', level: 'Advanced', category: 'Programming Languages' },
//   { name: 'HTML5', level: 'Advanced', category: 'Programming Languages' },
//   { name: 'CSS3', level: 'Advanced', category: 'Programming Languages' },
//   { name: 'PHP', level: 'Intermediate', category: 'Programming Languages' },
//   { name: 'SQL', level: 'Advanced', category: 'Programming Languages' },
//   { name: 'PL/SQL', level: 'Intermediate', category: 'Programming Languages' },
//   { name: 'C++', level: 'Intermediate', category: 'Programming Languages' },
//   { name: 'C#', level: 'Intermediate', category: 'Programming Languages' },
//   { name: 'Python', level: 'Beginner', category: 'Programming Languages' },
//   { name: 'Rust', level: 'Beginner', category: 'Programming Languages' },

//   // Frameworks & APIs
//   { name: 'React.js', level: 'Advanced', category: 'Frameworks & APIs' },
//   { name: 'Angular', level: 'Intermediate', category: 'Frameworks & APIs' },
//   { name: 'Bootstrap', level: 'Advanced', category: 'Frameworks & APIs' },
//   { name: 'Tailwind CSS', level: 'Advanced', category: 'Frameworks & APIs' },
//   { name: 'Spring Boot', level: 'Advanced', category: 'Frameworks & APIs' },
//   { name: 'Node.js', level: 'Intermediate', category: 'Frameworks & APIs' },
//   { name: 'ORDS', level: 'Intermediate', category: 'Frameworks & APIs' },
//   { name: 'FastAPI', level: 'Intermediate', category: 'Frameworks & APIs' },
//   { name: 'RESTful API', level: 'Advanced', category: 'Frameworks & APIs' },

//   // Databases
//   { name: 'MySQL', level: 'Advanced', category: 'Databases' },
//   { name: 'MS SQL Server', level: 'Intermediate', category: 'Databases' },
//   { name: 'PostgreSQL', level: 'Intermediate', category: 'Databases' },
//   { name: 'MongoDB', level: 'Intermediate', category: 'Databases' },
//   { name: 'Firebase', level: 'Intermediate', category: 'Databases' },
//   { name: 'Supabase', level: 'Intermediate', category: 'Databases' },

//   // Mobile Development
//   { name: 'Android (Java)', level: 'Intermediate', category: 'Mobile Development' },
//   { name: 'XML', level: 'Intermediate', category: 'Mobile Development' },
//   { name: 'Kotlin', level: 'Intermediate', category: 'Mobile Development' },
//   { name: 'React Native', level: 'Intermediate', category: 'Mobile Development' },
//   { name: 'Flutter', level: 'Beginner', category: 'Mobile Development' },

//   // Tools & Platforms
//   { name: 'GitHub', level: 'Advanced', category: 'Tools' },
//   { name: 'Docker', level: 'Basics', category: 'Tools' },
//   { name: 'Jira', level: 'Intermediate', category: 'Tools' },
//   { name: 'Postman', level: 'Advanced', category: 'Tools' },
//   { name: 'VS Code', level: 'Advanced', category: 'Tools' },
//   { name: 'Visual Studio', level: 'Intermediate', category: 'Tools' },
//   { name: 'Android Studio', level: 'Advanced', category: 'Tools' },
//   { name: 'IntelliJ IDEA', level: 'Advanced', category: 'Tools' },
//   { name: 'Figma', level: 'Intermediate', category: 'Tools' },
//   { name: 'Unity', level: 'Beginner', category: 'Tools' },
// ];

cconst PROJECTS: Project[] = [
  {
    title: "SENERATH PHARMACY",
    category: "ENTERPRISE",
    description: "Comprehensive management suite for high-volume pharmacies featuring real-time inventory synchronization.",
    tech: ["React", "PostgreSQL", "Spring Boot"],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "FLEET TRACKING",
    category: "LOGISTICS",
    description: "Real-time vehicle monitoring interface utilizing Google Maps API and WebSocket integration.",
    tech: ["React", "Firebase", "Google Maps"],
    image: "https://images.unsplash.com/photo-1509100194014-d49809396daa?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "LANDSLIDE WARNING",
    category: "IOT / EMBEDDED",
    description: "Automated alert system processing data from hardware sensors to detect environmental anomalies.",
    tech: ["C++", "IoT Sensors", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1524169358666-79f22534bc6e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "NATO MINI MART",
    category: "E-COMMERCE",
    description: "Digital transformation project migrating a physical retail store to a custom web platform.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    image: "https://images.unsplash.com/photo-1534452203294-49c8ad160ee2?q=80&w=1200&auto=format&fit=crop"
  }
];

const EXPERIENCE: ExperienceItem[] = [
  {
    year: '2025 - Present',
    title: 'Lead Developer',
    org: 'Senerath Pharmacy Project',
    desc: 'Architecting full-stack solutions and leading development teams.'
  },
  {
    year: '2024 - 2025',
    title: 'Project Lead',
    org: 'Nato Mini Mart',
    desc: 'Directed technical transition from physical to digital retail.'
  },
  {
    year: '2023',
    title: 'Software Eng.',
    org: 'NIBM',
    desc: 'Foundational certification in OOP and SDLC methodologies.'
  },
  {
    year: 'Expected 2027',
    title: 'BSc Comp Sci',
    org: 'NIBM',
    desc: 'Focusing on Distributed Systems and Software Engineering.'
  }
];

// --- Sub-Components ---

const Marquee = () => (
  <div className="relative flex overflow-hidden bg-wa-green py-3 md:py-4 transform -skew-y-2 border-y-4 border-black dark:border-white">
    <div className="animate-marquee whitespace-nowrap flex gap-8 md:gap-12">
      {[...Array(8)].map((_, i) => (
        <span key={i} className="text-xl md:text-3xl font-display font-bold text-wa-dark uppercase tracking-widest flex items-center gap-8">
          Full Stack Developer <span className="text-white text-2xl">•</span>
          UI/UX Designer <span className="text-white text-2xl">•</span>
          Mobile Apps <span className="text-white text-2xl">•</span>
        </span>
      ))}
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-wa-dark/95 backdrop-blur-sm py-4 border-b border-gray-200 dark:border-white/10' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-display font-bold tracking-tighter italic text-slate-900 dark:text-white flex items-center gap-1 group">
          <span className="text-wa-green group-hover:translate-x-1 transition-transform">SW</span>
          <span className="hidden md:inline text-base font-sans font-normal tracking-wide opacity-70">/ PORTFOLIO</span>
        </a>

        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-gray-400 hover:text-wa-green dark:hover:text-wa-green transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wa-green transition-all group-hover:w-full"></span>
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white p-1">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-wa-green dark:bg-wa-dark border-b border-black/10 dark:border-white/10"
          >
            <div className="flex flex-col p-8 space-y-6 items-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-bold uppercase text-wa-dark dark:text-white hover:text-white dark:hover:text-wa-green transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <SplashScreen key="splash" />}
      </AnimatePresence>

      <div className={`min-h-screen bg-wa-light dark:bg-wa-dark transition-colors duration-500 overflow-x-hidden ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />

        {/* Hero Section  */}
        <section id="home" className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-12 md:pt-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-wa-green/5 dark:bg-wa-green/10 -skew-x-12 transform origin-top pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }} 
              className="flex-1 md:pr-12 w-full"
            >
              {/* Responsive  */}
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] text-slate-900 dark:text-white mb-6">
                SASUNDUL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wa-green to-wa-teal">WANASINGHE</span>
              </h1>
              
              <div className="flex flex-wrap gap-2 md:gap-4 mb-8 md:mb-10">
                <span className="px-3 py-1 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs md:text-sm">
                  Developer
                </span>
                <span className="px-3 py-1 bg-wa-green text-wa-dark font-bold uppercase tracking-widest text-xs md:text-sm">
                  Designer
                </span>
                <span className="px-3 py-1 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs md:text-sm">
                  Creator
                </span>
              </div>

              <p className="text-base md:text-xl text-slate-600 dark:text-wa-gray max-w-lg leading-relaxed mb-8 md:mb-10 border-l-4 border-wa-green pl-6">
                Building robust digital architectures with a focus on speed, precision, and aesthetic excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a href="#projects" className="group flex items-center gap-2 text-base md:text-lg font-bold uppercase tracking-wider hover:text-wa-green transition-colors">
                  Selected Works <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="group flex items-center gap-2 text-base md:text-lg font-bold uppercase tracking-wider hover:text-wa-green transition-colors">
                  Contact Me <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              style={{ y }}
              className="relative w-full max-w-[320px] md:max-w-lg md:w-1/2 aspect-[4/5] md:aspect-square mt-8 md:mt-0"
            >
              <div className="absolute inset-0 border-4 border-slate-900 dark:border-white transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 z-0"></div>
              <div className="absolute inset-0 bg-wa-green transform -translate-x-3 -translate-y-3 md:-translate-x-4 md:-translate-y-4 z-0 opacity-20 dark:opacity-10"></div>
              
              <div className="relative h-full w-full bg-wa-card overflow-hidden z-10 grayscale-0 hover:grayscale transition-all duration-700">
                <img 
                  src={PROFILE_IMAGE_URL} 
                  alt="Sasundul" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wa-dark via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Stats */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20">
                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-0">01+</div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-wa-green">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </section>

        <Marquee />

        {/* My Works Section */}
        <section id="projects" className="py-24 md:py-32 relative bg-white dark:bg-wa-dark">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <div>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-2">
                  MY <span className="text-wa-green">WORKS</span>
                </h2>
                <div className="h-2 w-24 bg-wa-green"></div>
              </div>
              <p className="text-slate-600 dark:text-wa-gray max-w-sm text-right">
                A showcase of high-performance applications and digital experiences developed with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {PROJECTS.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="group relative"
                >
                  {/* Card Container with Tilt Effect Mockup */}
                  <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-wa-card rounded-xl overflow-hidden mb-8 perspective-1000 group-hover:shadow-2xl group-hover:shadow-wa-green/20 transition-all duration-500">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#25D366_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    {/* The "Elevated" Preview Image */}
                    <div className="absolute inset-8 transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700 ease-out origin-bottom">
                       <div className="w-full h-full relative rounded-lg overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-slate-800">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Screen Reflection Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                       </div>
                    </div>

                    {/* Overlay Tag */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="bg-wa-green text-wa-dark font-bold text-xs px-3 py-1 uppercase tracking-wider rounded-sm">
                        {project.category}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white group-hover:text-wa-green transition-colors flex items-center gap-3">
                      {project.title}
                      <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1" />
                    </h3>
                    <p className="text-slate-600 dark:text-wa-gray line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-white/10 px-2 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section*/}
        <section id="skills" className="py-24 bg-slate-50 dark:bg-[#091014] border-y border-slate-200 dark:border-white/5">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-16 text-center uppercase">
              Technical <span className="text-outline">Specs</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {SKILLS.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-wa-card p-6 border-l-4 border-wa-green hover:bg-wa-green/10 transition-colors group"
                >
                  <div className="mb-4 text-slate-400 dark:text-wa-gray group-hover:text-wa-green transition-colors">
                     {skill.category === 'Frontend' ? <Layout size={32} /> :
                     skill.category === 'Backend' ? <Server size={32} /> :
                     skill.category === 'Mobile' ? <Smartphone size={32} /> :
                     <Terminal size={32} />}
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white uppercase mb-1">{skill.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase">{skill.category}</span>
                    <span className="text-xs font-bold text-wa-green">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 bg-white dark:bg-wa-dark">
          <div className="container mx-auto px-6">
             <div className="grid md:grid-cols-2 gap-16">
               <div className="sticky top-32 h-fit">
                  <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6 uppercase leading-none">
                    Career <br/><span className="text-wa-green">Trajectory</span>
                  </h2>
                  <p className="text-slate-600 dark:text-wa-gray text-lg max-w-sm">
                    A timeline of professional milestones and educational achievements.
                  </p>
               </div>

               <div className="space-y-12 relative border-l border-dashed border-slate-300 dark:border-white/20 ml-3 md:ml-0 pl-12">
                  {EXPERIENCE.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative"
                    >
                      {/* Dot */}
                      <span className="absolute -left-[54px] top-2 h-4 w-4 rounded-full bg-wa-green ring-4 ring-white dark:ring-wa-dark"></span>
                      
                      <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase mb-1">
                        {item.title}
                      </h3>
                      <div className="text-wa-green font-bold text-sm uppercase tracking-wide mb-3">{item.org}</div>
                      <p className="text-slate-600 dark:text-wa-gray">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
               </div>
             </div>
          </div>
        </section>

        {/* Contact / Footer */}
        <footer id="contact" className="bg-slate-900 dark:bg-[#050b0e] text-white py-24 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
           
           <div className="container mx-auto px-6 relative z-10 text-center">
              <h2 className="text-6xl md:text-9xl font-display font-bold text-white/10 uppercase mb-8 select-none">
                Let's Talk
              </h2>
              
              <div className="max-w-2xl mx-auto -mt-12 md:-mt-24 relative">
                 <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
                   READY TO START YOUR NEXT PROJECT?
                 </h3>
                 <a 
                  href="mailto:sasuduln@gmail.com" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-wa-green hover:bg-wa-teal text-wa-dark font-bold uppercase tracking-widest text-sm transition-all hover:scale-105"
                 >
                   <Mail size={18} /> Send an Email
                 </a>
              </div>

              <div className="mt-24 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6">
                <div className="text-sm text-gray-500 font-mono uppercase">
                  © 2025 Sasundul Wanasinghe
                </div>
                
                <div className="flex gap-6">
                   <a href="#" className="text-gray-400 hover:text-wa-green transition-colors"><Github /></a>
                   <a href="#" className="text-gray-400 hover:text-wa-green transition-colors"><Linkedin /></a>
                   <a href="#" className="text-gray-400 hover:text-wa-green transition-colors"><MapPin /></a>
                </div>
              </div>
           </div>
        </footer>
      </div>
    </>
  );
};

export default App;