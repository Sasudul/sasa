import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import { ArrowUpRight, Github, Linkedin, MessageCircle } from 'lucide-react';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PROFILE_IMAGE_URL = "https://avatars.githubusercontent.com/u/158804448?s=400&u=8edbb46c2957de94b2e962060f06cccea207867c&v=4";

const PROJECTS = [
  {
    id: 1,
    title: "SENERATH PHARMACY",
    category: "ENTERPRISE",
    tech: "React • PostgreSQL • Spring Boot",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/21daf6206621873.66cf6dbb8c24f.png?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "FLEET TRACKING",
    category: "LOGISTICS",
    tech: "React • Firebase • Google Maps",
    image: "https://th.bing.com/th/id/R.c55e51265b71a0b554f38848d3057b27?rik=9MG3FyMQ2i%2bc%2bg&pid=ImgRaw&r=0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "NATO MINI MART",
    category: "E-COMMERCE",
    tech: "PHP • MySQL • Bootstrap",
    image: "https://tse2.mm.bing.net/th/id/OIP.H8W2js8zv6YDePBJ776v0AAAAA?w=412&h=480&rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=1200&auto=format&fit=crop",
  }
];

const SERVICES = [
  { title: "FRONTEND DEV", desc: "Crafting scalable, high-performance web applications using React and modern toolchains." },
  { title: "BACKEND ARCHITECTURE", desc: "Designing robust server-side infrastructures with Spring Boot." },
  { title: "UI/UX DESIGN", desc: "Translating complex requirements into intuitive, aesthetically pleasing interfaces." },
 { 
    title: "MOBILE DEV", 
    desc: "Developing smooth and efficient mobile applications focused on usability, and seamless user experiences." 
  },
  { 
    title: "Desktop App", 
    desc: "Building reliable desktop software that delivers strong performance, practical functionality, and intuitive user interaction." 
  },
  { 
    title: "SEO Specailist", 
    desc: "Improving website visibility on search engines by optimizing structure, content, and performance for better rankings." 
  }
];

const SplitTextChars = ({ text, className = "", charClass = "char-element" }: { text: string, className?: string, charClass?: string }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className={`inline-block ${charClass}`} 
          style={char === ' ' ? { width: '0.3em' } : {}}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const footerTextRef = useRef<HTMLHeadingElement>(null);
  
  // Custom Cursor Refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {
    // Prevent scroll during loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    
    // --- 1. SPLASH SCREEN (Approx 5 seconds total) ---
    tl.to('.splash-percent', {
      innerHTML: 100,
      duration: 3.5,
      snap: { innerHTML: 1 },
      ease: "power2.inOut"
    })
    .fromTo('.splash-char', {
      y: 150,
      opacity: 0,
      rotationX: -90
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out"
    }, "-=3.5")
    .to('.splash-line', {
      width: "50vw",
      duration: 1.5,
      ease: "power4.inOut"
    }, "-=3.5")
    .to('.splash-char', {
      y: -150,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.in"
    }, "-=0.2")
    .to('.splash-line', {
      scaleX: 0,
      duration: 0.5,
      ease: "power4.in"
    }, "-=0.5")
    .to('.splash-info', {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, "-=0.8")
    .to('.splash-screen', {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
        ScrollTrigger.refresh();
      }
    })

    // --- 2. HERO ENTRY SEQUENCE ---
    .from('.hero-card-container', {
      scale: 0.5,
      opacity: 0,
      rotationY: 45,
      rotationZ: -10,
      y: 100,
      duration: 1.5,
      ease: 'back.out(1.5)',
    }, "-=0.5")
    .from('.hero-char', {
      y: 100,
      opacity: 0,
      rotationX: -90,
      scale: 0.5,
      duration: 1,
      stagger: 0.015,
      ease: 'back.out(1.2)'
    }, "-=1.2")
    .from('.orb-bg', {
      scale: 0,
      opacity: 0,
      duration: 2,
      ease: 'power2.out',
      stagger: 0.2
    }, "-=1.5")
    .from('.spinning-badge', {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1.5,
      ease: 'back.out(1.2)'
    }, "-=1.5")
    .from('.nav-element', {
      y: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    }, "-=1.5");

    // Continuous Orb Floating
    gsap.to('.orb-1', {
      y: "random(-100, 100)",
      x: "random(-100, 100)",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    gsap.to('.orb-2', {
      y: "random(-150, 150)",
      x: "random(-50, 50)",
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Infinite Spin
    gsap.to('.spin-inner', {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'linear'
    });

    // Scroll Triggers for Elements
    gsap.to(cardRef.current, {
      yPercent: 30, // Parallax down on scroll
      ease: 'none',
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Marquee
    gsap.to('.marquee-inner', {
       xPercent: -50,
       ease: 'none',
       duration: 35,
       repeat: -1
    });

    // Project Reveals (Infinite Zoom Parallax)
    const projectCards = gsap.utils.toArray('.project-card');
    projectCards.forEach((card: any) => {
      const img = card.querySelector('.project-img');
      gsap.fromTo(img, 
        { 
          scale: 1.6, 
          yPercent: 40,
          opacity: 0,
          filter: 'brightness(0)' 
        },
        {
          scale: 1,
          yPercent: 0,
          opacity: 1,
          filter: 'brightness(1)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "center center",
            scrub: 1.5
          }
        }
      );
    });

    // Services Stagger (Fixed with fromTo)
    gsap.fromTo('.service-item', 
      {
        y: 100,
        opacity: 0,
      },
      {
       scrollTrigger: {
         trigger: '.services-container',
         start: "top 80%",
       },
       y: 0,
       opacity: 1,
       stagger: 0.15,
       duration: 1.2,
       ease: 'power3.out'
    });

    const revealTexts = gsap.utils.toArray('.reveal-text');
    revealTexts.forEach((el: any) => {
      gsap.fromTo(el, 
        {
          y: 80,
          opacity: 0,
          rotationX: 45,
        },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: 'power3.out'
      });
    });

  }, { scope: containerRef });

  // Custom Cursor Tracking Logic (Runs independent of loading)
  useGSAP(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    // High performance GSAP quickTo setters
    const xMoveCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" });
    const yMoveCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" });
    const xMoveDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.1, ease: "power3" });
    const yMoveDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.1, ease: "power3" });

    // Global Tracker
    const moveCursor = (e: MouseEvent) => {
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
      xMoveDot(e.clientX);
      yMoveDot(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);

    // Magnetic "Snap & Grow" Hover Logic
    const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, .project-card, .spinning-badge, .magnetic');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, { scale: 3, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.5)', duration: 0.3 });
        gsap.to(cursorDotRef.current, { scale: 0, duration: 0.2 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: 'transparent', border: '1px solid rgba(168,144,255,0.5)', duration: 0.3 });
        gsap.to(cursorDotRef.current, { scale: 1, duration: 0.2 });
      });
    });

    // Magnetic Physical Element Pull (Buttons follow mouse)
    const pullElements = document.querySelectorAll('.magnetic');
    pullElements.forEach((el: any) => {
       el.addEventListener('mousemove', (e: MouseEvent) => {
         const rect = el.getBoundingClientRect();
         const h = rect.width / 2;
         const v = rect.height / 2;
         const x = e.clientX - rect.left - h;
         const y = e.clientY - rect.top - v;
         
         gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power2.out' });
       });
       el.addEventListener('mouseleave', () => {
         gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
       });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!cardRef.current || !bgTextRef.current) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5);
    const yPos = (clientY / innerHeight - 0.5);

    // 3D Tilt for Card
    gsap.to(cardRef.current, {
      rotationY: xPos * 40,
      rotationX: -yPos * 40,
      x: xPos * 50,
      y: yPos * 50,
      ease: "power3.out",
      duration: 1,
      transformPerspective: 1000
    });

    // Parallax for Background Text
    gsap.to(bgTextRef.current, {
      xPercent: -50 + (xPos * -15),
      yPercent: -50 + (yPos * -15),
      ease: "power3.out",
      duration: 2
    });
  });

  const handleFooterMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!footerTextRef.current) return;

    const rect = footerTextRef.current.getBoundingClientRect();
    const xPos = ((e.clientX - rect.left) / rect.width) - 0.5;
    const yPos = ((e.clientY - rect.top) / rect.height) - 0.5;

    gsap.to('.footer-word', {
      rotationY: xPos * 60,
      rotationX: -yPos * 60,
      z: 50,
      stagger: 0.05,
      ease: 'power3.out',
      duration: 1,
      transformPerspective: 800
    });
  });

  const handleFooterMouseLeave = contextSafe(() => {
    gsap.to('.footer-word', {
      rotationY: 0,
      rotationX: 0,
      z: 0,
      stagger: 0.05,
      ease: "elastic.out(1, 0.4)",
      duration: 1.5
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!cardRef.current || !bgTextRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.3)",
      duration: 2
    });

    gsap.to(bgTextRef.current, {
      xPercent: -50,
      yPercent: -50,
      ease: "power3.out",
      duration: 2
    });
  });

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div ref={containerRef} className="min-h-screen bg-[#f1f1f1] text-[#000000] font-sans selection:bg-[#000000] selection:text-[#f1f1f1] overflow-x-hidden cursor-none">
        
        {/* SVG Displacement Map for Liquid Hovers */}
        <svg className="hidden">
          <filter id="liquid-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B">
              <animate attributeName="scale" values="0;40;0" dur="2s" repeatCount="indefinite" begin="mouseenter" />
            </feDisplacementMap>
          </filter>
        </svg>

        {/* CUSTOM MAGNETIC CURSOR */}
        <div 
          ref={cursorRef} 
          className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#a890ff]/50 pointer-events-none z-[99999] mix-blend-difference hidden md:block -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div 
          ref={cursorDotRef} 
          className="fixed top-0 left-0 w-2 h-2 bg-[#f1f1f1] rounded-full pointer-events-none z-[99999] mix-blend-difference hidden md:block -translate-x-1/2 -translate-y-1/2"
        ></div>

        {/* SPECTACULAR OUTRO SPLASH SCREEN */}
        <div className="splash-screen fixed inset-0 z-[9999] bg-[#000000] flex flex-col justify-center items-center pointer-events-none">
           {/* Abstract Background for Splash */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 flex items-center justify-center">
              <div className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] bg-[radial-gradient(circle,_rgba(168,144,255,0.4)_0%,_rgba(0,0,0,1)_70%)] animate-pulse rounded-full opacity-60"></div>
           </div>

           {/* Imposing Title */}
           <h1 className="text-[18vw] md:text-[12vw] font-display font-bold uppercase tracking-tighter text-[#f1f1f1] z-10 overflow-hidden flex">
             <SplitTextChars text="SASUNDUL" charClass="splash-char" />
           </h1>
           <div className="splash-line w-0 h-[2px] bg-[#a890ff] z-10 mt-4 rounded-full"></div>

           {/* Loading Text */}
           <div className="absolute bottom-12 w-full px-8 md:px-16 flex justify-between items-center z-10 font-mono text-xs font-bold uppercase tracking-widest text-[#f1f1f1]">
             <div className="splash-info hidden md:block">INITIALIZING PORTFOLIO...</div>
             <div className="splash-info flex items-center gap-2">
               LOADING [<span className="splash-percent text-white text-right">0</span>%]
             </div>
           </div>
        </div>

        {/* Navbar */}
        <nav className="fixed w-full top-0 z-50 px-6 md:px-12 py-6 mix-blend-difference text-[#f1f1f1] flex justify-between items-center pointer-events-none">
          <div className="nav-element text-xl font-display font-bold uppercase tracking-widest pointer-events-auto cursor-pointer">
            Sasundul<span className="text-[#a890ff]">©</span>
          </div>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest hidden md:flex pointer-events-auto">
            <a href="#work" className="nav-element hover:text-[#a890ff] transition-colors">Work</a>
            <a href="#about" className="nav-element hover:text-[#a890ff] transition-colors">About</a>
            <a href="#contact" className="nav-element hover:text-[#a890ff] transition-colors">Contact</a>
          </div>
        </nav>

        {/* --- HIGHLY ANIMATED CENTERED HERO --- */}
        <section 
          className="hero-section relative min-h-[120vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glowing Orbs */}
          <div className="orb-bg orb-1 absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-[#a890ff] rounded-full blur-[120px] opacity-[0.35] pointer-events-none z-0"></div>
          <div className="orb-bg orb-2 absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-[#25D366] rounded-full blur-[150px] opacity-[0.2] pointer-events-none z-0"></div>

          {/* Enormous Background Text */}
          <div 
             ref={bgTextRef}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-display font-bold text-black/[0.04] whitespace-nowrap pointer-events-none tracking-tighter z-0"
          >
            SASUNDUL
          </div>

          {/* BACKGROUND TYPOGRAPHY (Behind Card) */}
          <div className="absolute inset-0 flex flex-col justify-between pt-20 pb-8 md:pt-40 md:pb-32 px-4 md:px-12 pointer-events-none z-0">
             {/* Top Left */}
             <div className="text-left text-black overflow-hidden relative">
                <h1 className="text-[14vw] sm:text-[13vw] md:text-[9vw] lg:text-[7vw] font-display font-bold uppercase leading-[0.8] tracking-tighter">
                  <SplitTextChars text="I CRAFT" charClass="hero-char" />
                </h1>
                <h1 className="text-[14vw] sm:text-[13vw] md:text-[9vw] lg:text-[7vw] font-display font-bold uppercase leading-[0.8] tracking-tighter text-outline mt-2 md:mt-0">
                  <SplitTextChars text="DIGITAL" charClass="hero-char" />
                </h1>
             </div>

             {/* Bottom Right */}
             <div className="text-right text-black self-end mt-auto pt-20 md:pt-0 overflow-hidden relative">
                <h1 className="text-[11vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-display font-bold uppercase leading-[0.8] tracking-tighter">
                  <SplitTextChars text="EXPERIENCES" charClass="hero-char" />
                </h1>
                <p className="hero-char text-[11px] sm:text-xs md:text-xl max-w-[250px] md:max-w-sm mt-4 md:mt-6 text-gray-500 md:text-gray-600 font-medium leading-relaxed font-sans ml-auto whitespace-normal">
                  Commanding the intersection of high end design and robust full-stack engineering.
                </p>
             </div>
          </div>


          {/* CENTERED ID CARD (Foreground) */}
          <div className="hero-card-container z-20 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] perspective-[2000px] cursor-crosshair px-2 sm:px-6 md:px-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 md:mt-4">
            <div 
               ref={cardRef} 
               className="w-full relative bg-[#0a0a0a] text-[#f1f1f1] border border-black/20 rounded-3xl shadow-2xl p-6 overflow-hidden transform-style-[preserve-3d]"
               style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a890ff]/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-[3s] z-0"></div>
              
              <div className="flex justify-between items-start mb-6 border-b border-[#f1f1f1]/10 pb-4 relative z-10 transform translate-z-[40px]">
                <div className="text-sm uppercase tracking-widest text-[#a890ff] font-bold">NickName: Sasa</div>
                <div className="w-12 h-4 rounded-full border border-white/20 flex items-center justify-center">
                   <div className="w-8 h-[2px] bg-white/40 delay-75"></div>
                </div>
              </div>

              <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative grayscale-[0.8] hover:grayscale-0 transition-all duration-700 transform translate-z-[60px] shadow-2xl border border-white/5 bg-black">
                <img src={PROFILE_IMAGE_URL} alt="Sasundul" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out opacity-90 hover:opacity-100" />
              </div>

              <div className="space-y-4 relative z-10 transform translate-z-[30px]">
                 <div>
                   <h3 className="font-display text-3xl uppercase tracking-tight font-bold">Sasundul<br/>Wanasinghe</h3>
                   <p className="text-xs text-[#25D366] uppercase tracking-widest mt-2">[ DESIGNER / DEVELOPER ]</p>
                 </div>
                 <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                   {['React.js', 'Spring Boot', 'Next.js', 'Tailwind CSS','figma'].map(tech => (
                     <span key={tech} className="text-[10px] text-gray-300 font-bold uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full border border-white/5">{tech}</span>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Spinning Badge */}
          <div className="spinning-badge absolute bottom-[5%] left-[5%] w-32 h-32 md:w-40 md:h-40 pointer-events-none hidden lg:block z-30">
            <svg viewBox="0 0 200 200" className="spin-inner w-full h-full text-black">
              <path id="curve" fill="transparent" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
              <text width="500" className="text-[20px] uppercase font-bold tracking-[0.2em] fill-current">
                <textPath href="#curve">
                  •Available for Work • Sasudul Wanasinghe •
                </textPath>
              </text>
            </svg>
            <ArrowUpRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-black" />
          </div>

        </section>

        {/* Dynamic Services Grid (Light) */}
        <section id="about" className="py-24 px-6 md:px-12 bg-[#f1f1f1] relative z-20">
           <div className="max-w-7xl mx-auto border-t border-black/10 pt-20">
             <div className="mb-16 overflow-hidden">
               <h2 className="reveal-text text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter">My Expertise</h2>
             </div>

             <div className="services-container grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-black/10 pb-20">
                {SERVICES.map((s, idx) => (
                  <div key={idx} className="service-item group relative pl-6 border-l-2 border-transparent hover:border-black transition-all">
                    <div className="text-black/30 font-display text-2xl mb-4 font-bold transition-colors group-hover:text-[#a890ff]">{`(0${idx + 1})`}</div>
                    <h3 className="text-3xl font-display font-bold uppercase tracking-wide mb-4 text-black">{s.title}</h3>
                    <p className="text-gray-600 text-lg font-medium leading-relaxed">{s.desc}</p>
                  </div>
                ))}
             </div>
           </div>
        </section>

        {/* Selected Works (Dark Section) */}
        <section id="work" className="dark-section py-32 px-6 md:px-12 bg-[#050505] text-[#f1f1f1] relative z-20">
          <div className="max-w-7xl mx-auto">
             <div className="overflow-hidden mb-24">
               <h2 className="reveal-text text-5xl md:text-[8vw] font-display font-bold uppercase tracking-tighter leading-none">
                 Selected <span className="text-outline">Works</span>
               </h2>
             </div>

             <div className="space-y-40">
               {PROJECTS.map((p, idx) => (
                  <div key={idx} className="project-card group relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-center">
                    
                    <div className="overflow-hidden rounded-3xl aspect-[4/3] bg-[#111] w-full relative border border-white/5 project-img-container" 
                         onMouseEnter={(e) => {
                           const img = e.currentTarget.querySelector('img');
                           if(img) img.style.filter = "url(#liquid-distort)";
                         }}
                         onMouseLeave={(e) => {
                           const img = e.currentTarget.querySelector('img');
                           if(img) img.style.filter = "grayscale(0)";
                         }}
                    >
                      <img src={p.image} alt={p.title} className="project-img w-full h-[130%] object-cover absolute top-[-15%] left-0 grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-[1.5s]" />
                      
                      {/* Hover Overlay Title inside Image */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm transition-all duration-500 z-10 pointer-events-none">
                         <h3 className="text-5xl font-display font-bold uppercase tracking-tighter text-white translate-y-10 group-hover:translate-y-0 transition-transform duration-500">View Live</h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="text-[#a890ff] text-sm uppercase font-bold tracking-widest mb-6 flex items-center gap-4">
                        <span className="w-12 h-[2px] bg-[#a890ff]"></span>
                        {p.category}
                      </div>
                      <h3 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-6 group-hover:text-[#a890ff] transition-colors duration-500">{p.title}</h3>
                      <p className="text-gray-400 font-mono text-sm md:text-base font-semibold uppercase mb-12">{p.tech}</p>
                      
                      <button className="magnetic flex items-center gap-4 text-xl font-bold uppercase tracking-widest w-fit border-b-2 border-transparent group-hover:border-[#f1f1f1] transition-all pb-2 origin-left scale-x-0 group-hover:scale-x-100 duration-500 cursor-none">
                        Explore Project <ArrowUpRight size={28} />
                      </button>
                    </div>

                  </div>
               ))}
             </div>
          </div>
        </section>

        {/* Marquee (Dark) */}
        <div className="py-12 bg-[#a890ff] text-[#050505] overflow-hidden flex relative z-20">
          <div className="marquee-inner flex whitespace-nowrap">
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center text-5xl md:text-7xl font-display uppercase tracking-widest font-bold px-12">
                  <span>DIGITAL EXPERIENCES</span>
                  <span className="mx-12 opacity-50">•</span>
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px #050505' }}>UI/UX ENGINEERING</span>
                  <span className="mx-12 opacity-50">•</span>
                </div>
             ))}
          </div>
        </div>

        {/* Footer / Contact (Dark) */}
        <footer 
          id="contact" 
          className="dark-section py-32 px-6 md:px-12 bg-[#050505] text-[#f1f1f1] relative overflow-hidden z-20 cursor-none"
          onMouseMove={handleFooterMouseMove}
          onMouseLeave={handleFooterMouseLeave}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#25D366] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
             <div className="reveal-text inline-block px-6 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-12 bg-white/5 backdrop-blur-md">
               🟢 Available for freelance design & development
             </div>

             <div className="overflow-hidden mb-16 perspective-[1000px]">
               <h2 
                 ref={footerTextRef}
                 className="reveal-text text-[15vw] md:text-[10vw] font-display font-bold uppercase tracking-tighter leading-[0.85] flex flex-col items-center transform-style-[preserve-3d]"
               >
                 <span className="footer-word inline-block origin-center text-outline transform-style-[preserve-3d]">Let's Work</span>
                 <span className="footer-word inline-block origin-center transform-style-[preserve-3d]">Together.</span>
               </h2>
             </div>

             <a href="mailto:sasuduln@gmail.com" className="reveal-text magnetic group relative inline-flex items-center justify-center px-16 py-8 bg-[#f1f1f1] text-[#050505] text-2xl font-bold uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-500 shadow-[0_0_40px_rgba(241,241,241,0.2)] hover:shadow-[0_0_60px_rgba(168,144,255,0.4)] cursor-none">
               <span className="relative z-10 flex items-center gap-4 transition-colors group-hover:text-white pointer-events-none">
                 Send a Message <ArrowUpRight size={28} />
               </span>
               <div className="absolute inset-0 bg-[#a890ff] translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0 pointer-events-none"></div>
             </a>

             <div className="reveal-text flex gap-8 mt-32 mb-16 border-t border-white/10 pt-16 w-full justify-center">
                {[
                  { icon: <Github size={28} />, label: "GitHub", href: "https://github.com/Sasudul" },
                  { icon: <Linkedin size={28} />, label: "LinkedIn", href: "https://www.linkedin.com/in/sasundul/" },
                  { icon: <MessageCircle size={28} />, label: "WhatsApp", href: "https://wa.me/+94740629020" },
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#a890ff] hover:text-[#050505] hover:border-transparent transition-all duration-300 hover:scale-110 cursor-none"
                  >
                    {social.icon}
                  </a>
                ))}
             </div>

             <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-500 font-bold uppercase gap-6 md:gap-0">
               <p className="flex items-center gap-4">
                 CODE BY SASUNDUL © {new Date().getFullYear()}
               </p>
               <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors cursor-none">
                 Scroll to top &uarr;
               </button>
             </div>
          </div>
        </footer>

      </div>
    </ReactLenis>
  );
}