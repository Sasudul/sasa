import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Smartphone,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';

// --- Components ---

// 1. Navigation with Glassmorphism
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          SW.
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-slate-300 hover:text-cyan-400 transition-colors font-medium text-sm tracking-wide"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-100">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-slate-900 border-t border-slate-800"
        >
          <div className="flex flex-col p-6 space-y-4">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// 2. Hero Section
const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-400/10 rounded-full border border-cyan-400/20">
            Available for Hire
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 leading-tight mb-6">
            Sasundul <br />
            <span className="text-slate-500">Wanasinghe</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
            A Full-Stack Developer and UI/UX enthusiast transforming complex problems into elegant, user-centric digital solutions. Specializing in React, Spring Boot, and Mobile Architecture.
          </p>
          
          <div className="flex gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-colors"
            >
              View Work
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-3 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 rounded-lg transition-colors flex items-center gap-2"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        {/* Hero Visual / Abstract Code Representation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="text-pink-400">const <span className="text-blue-400">developer</span> = <span className="text-yellow-300">{`{`}</span></div>
              <div className="pl-4 text-slate-300">name: <span className="text-green-400">'Sasundul'</span>,</div>
              <div className="pl-4 text-slate-300">skills: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Java'</span>, <span className="text-green-400">'Spring'</span>],</div>
              <div className="pl-4 text-slate-300">location: <span className="text-green-400">'Sri Lanka'</span>,</div>
              <div className="pl-4 text-slate-300">hardWorker: <span className="text-blue-400">true</span></div>
              <div className="text-yellow-300">{`}`}</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-20 -z-10 transform translate-x-4 translate-y-4" />
        </motion.div>
      </div>
    </section>
  );
};

// 3. Skills Section
const Skills = () => {
  const skills = [
    { name: 'React.js', icon: <Code2 />, level: 'Advanced' },
    { name: 'Spring Boot', icon: <Database />, level: 'Advanced' },
    { name: 'Java', icon: <Cpu />, level: 'Advanced' },
    { name: 'Tailwind CSS', icon: <Code2 />, level: 'Advanced' },
    { name: 'PostgreSQL', icon: <Database />, level: 'Intermediate' },
    { name: 'Android Dev', icon: <Smartphone />, level: 'Intermediate' },
  ];

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Technical Arsenal</h2>
          <p className="text-slate-400">Tools and technologies I use to bring ideas to life</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.4)' }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col items-center justify-center gap-3 group cursor-default"
            >
              <div className="text-cyan-500 group-hover:text-cyan-400 transition-colors">
                {skill.icon}
              </div>
              <span className="font-medium text-slate-300">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Featured Projects (Bento Grid)
const Projects = () => {
  const projects = [
    {
      title: "Senerath Pharmacy System",
      category: "Full Stack Development",
      description: "A comprehensive management system featuring real-time inventory sync, sales analytics, and prescription uploads.",
      tech: ["React", "PostgreSQL", "Tailwind", "REST API"],
      size: "col-span-1 md:col-span-2 row-span-2",
      gradient: "from-blue-600/20 to-cyan-500/20",
      image: "/api/placeholder/800/600" // Placeholder for project image
    },
    {
      title: "Fleet Tracking System",
      category: "Logistics Tech",
      description: "Real-time vehicle monitoring using Google Maps API and Firebase synchronization.",
      tech: ["Spring Boot", "React", "Firebase", "Google Maps"],
      size: "col-span-1 md:col-span-1 row-span-1",
      gradient: "from-purple-600/20 to-pink-500/20",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Landslide Alert IOT",
      category: "Internet of Things",
      description: "Automated alert system using hardware sensors to detect environmental anomalies.",
      tech: ["C++", "Sensors", "Data Analysis", "Embedded"],
      size: "col-span-1 md:col-span-1 row-span-1",
      gradient: "from-emerald-600/20 to-teal-500/20",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Nato Mini Mart",
      category: "E-Commerce",
      description: "Transitioned a physical retail store to an online model with a custom PHP backend.",
      tech: ["PHP", "SQL", "JavaScript", "Bootstrap"],
      size: "col-span-1 md:col-span-2 row-span-1",
      gradient: "from-orange-600/20 to-amber-500/20",
      image: "/api/placeholder/800/300"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Featured Work</h2>
            <p className="text-slate-400">A selection of recent development projects</p>
          </div>
          <a href="https://github.com/Sasudul" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            View Github <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className={`relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 ${project.size}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-2 block">{project.category}</span>
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Timeline / About
const Experience = () => {
  const events = [
    {
      year: '2027 (Expected)',
      title: 'BSc (Hons) Computer Science',
      org: 'National Institute of Business Management',
      desc: 'Specializing in Software Engineering.'
    },
    {
      year: 'Nov 2025 - Present',
      title: 'Team Lead - Pharmacy System',
      org: 'Senerath Pharmacy Project',
      desc: 'Leading development of a full-scale React/PostgreSQL solution.'
    },
    {
      year: 'Aug 2024 - Jan 2025',
      title: 'Team Lead - E-Commerce',
      org: 'Nato Mini Mart Project',
      desc: 'Directed the transition from physical retail to online platform.'
    },
    {
      year: '2023',
      title: 'Certificate in Software Engineering',
      org: 'National Institute of Business Management',
      desc: 'Foundation in programming logic and SDLC.'
    }
  ];

  return (
    <section id="experience" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">My Journey</h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {events.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 group-hover:bg-cyan-500/20 group-hover:border-cyan-500 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-slate-900">
                <div className="w-2 h-2 bg-cyan-500 rounded-full" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-100">{event.title}</h3>
                  <time className="text-xs font-medium text-cyan-400">{event.year}</time>
                </div>
                <div className="text-sm font-medium text-slate-500 mb-2">{event.org}</div>
                <p className="text-slate-400 text-sm">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Footer / Contact
const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800 pt-20 pb-10">
      <div className="container mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-100 mb-6">Let's Build Something Together</h2>
          <p className="text-slate-400 mb-8">
            Currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href="mailto:sasuduln@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-colors">
            <Mail size={20} /> Say Hello
          </a>
        </motion.div>

        <div className="flex justify-center gap-8 mb-12">
          <a href="https://github.com/Sasudul" className="text-slate-400 hover:text-white transition-colors">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/sasudul-wanasinghe" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Download size={24} />
          </a>
        </div>

        <div className="text-slate-600 text-sm border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Sasundul Wanasinghe. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1"><MapPin size={14} /> Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 font-sans">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Footer />
    </div>
  );
};

export default App;