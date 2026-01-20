import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUp,
  ArrowUpRight,
  ChevronRight,
  Copy,
  ExternalLink,
  Github,
  Layout,
  Linkedin, Mail,
  Menu,
  MessageCircle,
  Server,
  Smartphone, Terminal,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { ThemeToggle } from './components/ThemeToggle';
import { ExperienceItem, NavLink, Skill } from './types';

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

// UPDATED: Added IDs and Featured boolean for the new layout logic
const PROJECTS = [
  {
    id: 1,
    title: "SENERATH PHARMACY",
    category: "ENTERPRISE",
    description: "Comprehensive management suite for high-volume pharmacies featuring real-time inventory synchronization.",
    tech: ["React", "PostgreSQL", "Spring Boot"],
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/21daf6206621873.66cf6dbb8c24f.png?q=80&w=1200&auto=format&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "FLEET TRACKING",
    category: "LOGISTICS",
    description: "Real-time vehicle monitoring interface utilizing Google Maps API and WebSocket integration.",
    tech: ["React", "Firebase", "Google Maps"],
    image: "https://th.bing.com/th/id/R.c55e51265b71a0b554f38848d3057b27?rik=9MG3FyMQ2i%2bc%2bg&pid=ImgRaw&r=0?q=80&w=1200&auto=format&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "LANDSLIDE WARNING",
    category: "IOT / EMBEDDED",
    description: "Automated alert system processing data from hardware sensors to detect environmental anomalies.",
    tech: ["C++", "IoT Sensors", "Data Analysis"],
    image: "https://i.ytimg.com/vi/5wjgNQAs8Mw/maxresdefault.jpg?q=80&w=1200&auto=format&fit=crop",
    featured: true
  },
  {
    id: 4,
    title: "NATO MINI MART",
    category: "E-COMMERCE",
    description: "Digital transformation project migrating a physical retail store to a custom web platform.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    image: "https://tse2.mm.bing.net/th/id/OIP.H8W2js8zv6YDePBJ776v0AAAAA?w=412&h=480&rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=1200&auto=format&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "Pizza Mania Mobile",
    category: "MOBILE APP",
    description: "Mobile application redesign focusing on user experience and order flow optimization.",
    tech: ["XML", "JAVA", "SQLite"],
    image: "https://cdn.dribbble.com/users/6835304/screenshots/17832684/pizza_hut_-_mobile_app_redesign.png?q=80&w=1200&auto=format&fit=crop",
    featured: true
  },
  {
    id: 6,
    title: "Pizza Mania Admin",
    category: "ENTERPRISE",
    description: "Backend administration panel for managing orders and menu items.",
    tech: ["XML", "JAVA", "SQLite"],
    image: "https://cdn.dribbble.com/users/6835304/screenshots/17832684/pizza_hut_-_mobile_app_redesign.png?q=80&w=1200&auto=format&fit=crop",
    featured: false
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

  // --- NEW: Projects Section State ---
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('FEATURED');

  const filteredProjects = filter === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.featured);

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

        {/* --- REPLACED: My Works Section (Grid + Popout) --- */}
        <section id="projects" className="py-24 bg-[#111] text-white relative overflow-hidden">
          <div className="container mx-auto px-6">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-2">Check it Out</h2>
                <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">
                  Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Projects</span>
                </h1>
              </div>
              
              <div className="flex gap-4 text-sm font-bold tracking-wider mt-6 md:mt-0">
                <span className="text-gray-500">View:</span>
                <button 
                  onClick={() => setFilter('FEATURED')} 
                  className={`${filter === 'FEATURED' ? 'text-white border-b-2 border-green-500' : 'text-gray-500 hover:text-white'} transition-colors`}
                >
                  FEATURED
                </button>
                <span className="text-gray-700">|</span>
                <button 
                  onClick={() => setFilter('ALL')} 
                  className={`${filter === 'ALL' ? 'text-white border-b-2 border-green-500' : 'text-gray-500 hover:text-white'} transition-colors`}
                >
                  ALL
                </button>
              </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layoutId={`card-${project.id}`} // KEY for smooth transition
                    onClick={() => setSelectedProject(project)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-gray-900 border border-white/5 shadow-xl"
                  >
                    {/* Background Image */}
                    <motion.img 
                      layoutId={`image-${project.id}`}
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Featured Ribbon */}
                    {project.featured && (
                      <div className="absolute top-4 right-[-30px] rotate-45 bg-yellow-400 text-black text-[10px] font-bold py-1 px-10 shadow-lg z-10">
                        FEATURED
                      </div>
                    )}

                    {/* Content Details (Card) */}
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <motion.p 
                        layoutId={`cat-${project.id}`}
                        className="text-green-400 text-xs font-bold tracking-widest uppercase mb-2"
                      >
                        {project.category}
                      </motion.p>
                      <motion.h3 
                        layoutId={`title-${project.id}`}
                        className="text-2xl font-bold uppercase tracking-tight text-white mb-1 group-hover:text-green-400 transition-colors"
                      >
                        {project.title}
                      </motion.h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* THE POP-OUT MODAL */}
          <AnimatePresence>
            {selectedProject && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                {/* Backdrop */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                {/* Modal Content */}
                <motion.div
                  layoutId={`card-${selectedProject.id}`}
                  className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Left: Image Section */}
                  <div className="w-full md:w-3/5 relative h-64 md:h-auto">
                    <motion.img 
                      layoutId={`image-${selectedProject.id}`}
                      src={selectedProject.image} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent md:bg-gradient-to-r" />
                  </div>

                  {/* Right: Details Section */}
                  <div className="w-full md:w-2/5 p-8 flex flex-col justify-center bg-zinc-900">
                    <motion.p 
                      layoutId={`cat-${selectedProject.id}`}
                      className="text-green-400 text-sm font-bold tracking-widest uppercase mb-3"
                    >
                      {selectedProject.category}
                    </motion.p>

                    <motion.h2 
                      layoutId={`title-${selectedProject.id}`}
                      className="text-4xl font-display font-bold text-white mb-6 uppercase leading-none"
                    >
                      {selectedProject.title}
                    </motion.h2>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-400 leading-relaxed mb-8"
                    >
                      {selectedProject.description}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mb-8"
                    >
                      {selectedProject.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                          {t}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex gap-4"
                    >
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
                        View Live <ExternalLink size={18} />
                      </button>
                      <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        Code <Github size={18} />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
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
        <footer id="contact" className="bg-slate-900 dark:bg-[#050b0e] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/10">
            
           {/* Background Grid Pattern */}
           <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]"></div>
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/80 dark:to-[#050b0e] pointer-events-none"></div>

           <div className="container mx-auto px-6 relative z-10">
             
             <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-24">
                {/* Left Column: Call to Action */}
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wa-green/10 border border-wa-green/20 text-wa-green text-xs font-bold uppercase tracking-widest">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wa-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-wa-green"></span>
                    </span>
                    Available for Work
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                    HAVE AN IDEA? <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-wa-green to-teal-400">
                      LET'S BUILD IT.
                    </span>
                  </h2>

                  <p className="text-slate-400 max-w-md text-lg leading-relaxed">
                    Currently specializing in enterprise architecture and high-performance web applications. Open to freelance and full-time opportunities.
                  </p>
                </div>

               {/* Right Column: Interactive Contact */}
                <div className="flex flex-col justify-center space-y-8">
                   {/* Email Copy Box */}
                   <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-wa-green/50 transition-colors group">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Drop me a line</div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xl md:text-2xl font-mono text-white group-hover:text-wa-green transition-colors">
                          sasuduln@gmail.com
                        </span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText('sasuduln@gmail.com');
                          }}
                          className="p-3 bg-white/10 hover:bg-wa-green hover:text-wa-dark rounded-xl transition-all active:scale-95"
                          aria-label="Copy Email"
                        >
                          <Copy size={20} />
                        </button>
                      </div>
                   </div>

                   {/* Social Links Grid */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { icon: <Github size={24} />, label: "GitHub", href: "https://github.com/Sasudul" },
                        { icon: <Linkedin size={24} />, label: "LinkedIn", href: "https://www.linkedin.com/in/sasundul/" },
                        { icon: <MessageCircle size={24} />, label: "WhatsApp", href: "https://wa.me/940629020" },
                        { icon: <Mail size={24} />, label: "Email", href: "mailto:sasuduln@gmail.com" }
                      ].map((social, idx) => (
                        <a 
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all group"
                        >
                          <span className="text-slate-400 group-hover:text-wa-green transition-colors">{social.icon}</span>
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{social.label}</span>
                        </a>
                      ))}
                   </div>
                </div>
             </div>

             {/* Footer Bottom Bar */}
             <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                 <span className="text-2xl font-display font-bold italic text-white tracking-tighter">SW</span>
                 <p className="text-sm text-slate-500 font-mono uppercase">
                   © 2025 Sasundul Wanasinghe. All rights reserved.
                 </p>
               </div>
               
               <button 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-wa-green transition-colors"
               >
                 Back to Top <ArrowUp size={16} />
               </button>
             </div>

           </div>
        </footer>
      </div>
    </>
  );
};

export default App;