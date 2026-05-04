import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, useInView, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github, Linkedin, Mail, Phone, MapPin, ArrowRight, ArrowUpRight,
  Code2, Server, Brain, Cloud, Database, Wrench, Sparkles, Star,
  GraduationCap, Globe, Download, Menu, X, ExternalLink
} from "lucide-react";
import prince from "@/assets/prince.jpg";
import { ContactForm } from "@/components/ContactForm";
import { CustomCursor } from "@/components/CustomCursor";

const skills = [
  { icon: Server, title: "Backend", items: ["FastAPI", "Node.js", "Express", "Python", "REST APIs"] },
  { icon: Code2, title: "Frontend", items: ["React.js", "Angular", "TypeScript", "Redux", "Tailwind"] },
  { icon: Brain, title: "AI / LLM", items: ["LangChain", "LangGraph", "RAG", "Agentic AI", "Prompts"] },
  { icon: Cloud, title: "Cloud & DevOps", items: ["AWS Lambda", "Docker", "GitHub Actions", "Firebase"] },
  { icon: Database, title: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "FAISS"] },
  { icon: Wrench, title: "Tools & Systems", items: ["Git", "Power BI", "Linux", "Windows Server"] },
];

const projects = [
  {
    title: "AI Agent System",
    desc: "Multi-model agent system built with LangChain and LangGraph for autonomous task execution. Supports tool-calling, memory, and multi-step reasoning across complex workflows.",
    tags: ["LangChain", "LangGraph", "Python", "Agents"],
    year: "2025",
    highlight: true,
    github: "https://github.com/princesharmaofficial1-hub",
    demo: "",
  },
  {
    title: "RAG Chat Application",
    desc: "Document-based retrieval system with intelligent contextual responses powered by vector embeddings (FAISS). Supports PDF ingestion, semantic search, and streaming responses.",
    tags: ["RAG", "FAISS", "FastAPI", "LangChain"],
    year: "2024",
    highlight: false,
    github: "https://github.com/princesharmaofficial1-hub",
    demo: "",
  },
  {
    title: "Serverless Backend System",
    desc: "Event-driven backend services on AWS Lambda powering production-grade applications. Designed for high availability with auto-scaling and zero cold-start optimization.",
    tags: ["AWS Lambda", "FastAPI", "Docker", "Python"],
    year: "2024",
    highlight: false,
    github: "https://github.com/princesharmaofficial1-hub",
    demo: "",
  },
  {
    title: "Portfolio Website",
    desc: "This very portfolio — crafted with React, TypeScript, Tailwind CSS, and Framer Motion. Features smooth animations, parallax effects, and a fully responsive design.",
    tags: ["React", "TypeScript", "Framer Motion", "Tailwind"],
    year: "2026",
    highlight: false,
    github: "https://github.com/princesharmaofficial1-hub/psprofile",
    demo: "https://princesharmaofficial1-hub.github.io/psprofile/",
  },
];

const experience = [
  {
    role: "Solution Engineer",
    company: "Aligned Automation Pvt. Ltd.",
    period: "Jul 2021 — Present",
    points: [
      "Designed and developed scalable backend APIs using FastAPI and Node.js serving production traffic",
      "Built event-driven backend workflows using AWS Lambda with auto-scaling and high availability",
      "Developed frontend applications using React.js and Angular with TypeScript",
      "Integrated AI systems using LangChain, RAG pipelines, and multi-model agent-based workflows",
      "Containerized applications using Docker and managed CI/CD with GitHub Actions",
      "Led full development lifecycle from requirements gathering to production deployment",
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Self-employed",
    period: "Jan 2020 — Present",
    points: [
      "Delivered full stack applications using MERN stack and FastAPI for clients across industries",
      "Built responsive dashboards, blogs, and web platforms with modern UI/UX",
      "Implemented AI-based features using LangChain and agentic systems for automation",
      "Managed end-to-end project lifecycle including deployment and ongoing maintenance",
    ],
  },
  {
    role: "Customer Care Representative",
    company: "Altruist Technology Pvt. Ltd.",
    period: "Feb 2021 — Jun 2021",
    points: [
      "Delivered customer support and resolved technical queries efficiently",
      "Maintained high customer satisfaction scores through clear communication",
    ],
  },
];

const marqueeItems = ["FastAPI", "React", "LangChain", "Node.js", "AWS Lambda", "TypeScript", "Docker", "PostgreSQL", "RAG", "Agentic AI", "Python", "Tailwind"];

const clients = ["Dell", "Lilly", "Aligned Automation", "Altruist", "Freelance"];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "4", label: "Companies Served" },
  { value: "6", label: "Languages Spoken" },
];

const education = [
  {
    degree: "Diploma in Electronics & Communication Engineering",
    institution: "Board of Technical Education",
    year: "2019",
    grade: "76%",
  },
];

const certifications = [
  { name: "MERN Stack Development", status: "Ongoing", icon: "🚀" },
  { name: "Web Designing", status: "Completed", icon: "🎨" },
  { name: "C Programming", status: "Completed", icon: "💻" },
  { name: "Hardware & Networking", status: "Completed", icon: "🔧" },
];

const languages = ["English", "Hindi", "Nagamese", "Assamese", "Tamil"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const navLinks = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Active section on scroll
  useEffect(() => {
    const sections = ["home", ...navLinks.map((l) => l.toLowerCase())];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}% ${mouseY}%, hsl(var(--primary) / 0.15), transparent 60%)`;

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 inset-x-0 h-[2px] bg-gradient-vibrant z-[60] origin-left"
      />

      {/* NAV */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-3 inset-x-3 md:inset-x-6 z-50 glass rounded-full"
      >
        <div className="flex items-center justify-between h-14 px-5">
          <a href="#home" className="font-bold text-base tracking-tight">
            <span className="text-gradient">PS</span><span className="text-primary">.</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={`transition-colors ${activeSection === l.toLowerCase() ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden md:flex bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-full">
              <a href="mailto:princesharmaofficial1@gmail.com">Hire Me <ArrowUpRight className="ml-1 w-3.5 h-3.5" /></a>
            </Button>
            {/* Mobile menu button */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full glass text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden px-5 pb-4"
            >
              <div className="flex flex-col gap-1 pt-2 border-t border-border">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2.5 px-3 rounded-xl text-sm transition-colors ${activeSection === l.toLowerCase() ? "text-primary bg-primary/10 font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                  >
                    {l}
                  </a>
                ))}
                <a
                  href="mailto:princesharmaofficial1@gmail.com"
                  className="mt-2 py-2.5 px-3 rounded-xl text-sm text-center bg-gradient-primary text-primary-foreground font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section
        id="home"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative bg-hero pt-32 pb-24 overflow-hidden min-h-[100svh] flex items-center"
      >
        <motion.div style={{ background: spotlight }} className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 noise opacity-[0.025] pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container relative">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
            <div>
              <motion.div initial="hidden" animate="show" variants={fadeUp}>
                <Badge variant="outline" className="mb-6 gap-2 border-primary/30 bg-primary/5 text-primary rounded-full">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  Available for new opportunities
                </Badge>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
                <AnimatedWords text="Hi, I'm" />
                <br />
                <motion.span
                  initial={{ backgroundSize: "0% 100%" }}
                  animate={{ backgroundSize: "100% 100%" }}
                  transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                  className="text-gradient inline-block"
                >
                  Prince Sharma
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground mb-4 font-light"
              >
                <TypingText
                  phrases={["Full Stack Developer", "AI Engineer", "FastAPI Expert", "React Developer", "LangChain Builder"]}
                />
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.6 }}
                className="text-base text-muted-foreground max-w-xl mb-8 leading-relaxed"
              >
                I build scalable web applications and intelligent AI systems with FastAPI, React,
                Node.js, and LangChain. 5+ years of shipping production-ready software end-to-end.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton>
                  <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow rounded-full px-7">
                    <a href="#projects">View My Work <ArrowRight className="ml-2 w-4 h-4" /></a>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-7 border-border">
                    <a href="#contact"><Mail className="mr-2 w-4 h-4" /> Get in Touch</a>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-7 border-border">
                    <a href="/psprofile/Prince-Sharma-Resume.pdf" download>
                      <Download className="mr-2 w-4 h-4" /> Resume
                    </a>
                  </Button>
                </MagneticButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex items-center gap-5 mt-10 text-muted-foreground"
              >
                <SocialIcon href="https://github.com/princesharmaofficial1-hub"><Github className="w-5 h-5" /></SocialIcon>
                <SocialIcon href="https://www.linkedin.com/in/prince-sharma-3a7774256"><Linkedin className="w-5 h-5" /></SocialIcon>
                <SocialIcon href="mailto:princesharmaofficial1@gmail.com"><Mail className="w-5 h-5" /></SocialIcon>
                <SocialIcon href="tel:+919774642917"><Phone className="w-5 h-5" /></SocialIcon>
                <span className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" /> Pune, India</span>
              </motion.div>
            </div>

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 opacity-70"
                >
                  <div className="w-full h-full rounded-full border border-dashed border-primary/30" />
                </motion.div>
                <div className="absolute -inset-6 bg-gradient-vibrant rounded-full blur-3xl opacity-30 animate-glow-pulse" />
                <div className="relative w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full overflow-hidden border-2 border-primary/40 shadow-elegant animate-float">
                  <img src={prince} alt="Prince Sharma — Full Stack Developer" className="w-full h-full object-cover" />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-card flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-sm font-bold text-gradient">AI Engineer</div>
                    <div className="text-[10px] text-muted-foreground">LangChain · RAG</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-card"
                >
                  <div className="text-2xl font-bold text-gradient">5+</div>
                  <div className="text-xs text-muted-foreground">Years Experience</div>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="py-8 border-y border-border bg-secondary/40 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-3xl md:text-4xl font-bold text-muted-foreground/40 hover:text-gradient transition-colors flex items-center gap-8">
              {item}
              <Star className="w-4 h-4 text-primary/60" />
            </span>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <Section className="!py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="text-sm uppercase tracking-[0.25em] text-primary mb-3">Trusted By</div>
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
            Delivered work for industry leaders
          </h2>
        </motion.div>
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-20"
        >
          {clients.map((c) => (
            <motion.div
              key={c}
              variants={fadeUp}
              whileHover={{ scale: 1.08, y: -2 }}
              className="text-2xl md:text-4xl font-bold text-muted-foreground/50 hover:text-gradient transition-colors cursor-default tracking-tight"
            >
              {c}
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section id="about">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="About" title="Building software that ships." />
          <RevealText>
            I'm a Full Stack Developer with 5+ years of experience designing scalable web
            applications and backend systems. I've delivered production work for industry leaders
            including <span className="text-foreground font-medium">Dell</span> and <span className="text-foreground font-medium">Lilly</span>,
            specializing in <span className="text-foreground font-medium">FastAPI</span>,{" "}
            <span className="text-foreground font-medium">Node.js</span>, and <span className="text-foreground font-medium">React.js</span>,
            with deep experience in serverless architectures on AWS Lambda and AI integrations
            using <span className="text-foreground font-medium">LangChain</span>, <span className="text-foreground font-medium">LangGraph</span>,
            and RAG-based systems. I take pride in clean architecture, end-to-end ownership, and
            shipping software that actually works in production.
          </RevealText>

          {/* Stats */}
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-card border border-border text-center shadow-card hover:border-primary/40 transition-colors"
              >
                <div className="text-4xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 p-6 rounded-2xl bg-card border border-border shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Badge key={lang} variant="secondary" className="bg-secondary text-foreground/80 font-normal rounded-full px-4 py-1">
                  {lang}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" className="bg-secondary/20">
        <SectionHeader eyebrow="Skills" title="Technical toolkit" />
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skills.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <SkillCard {...s} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Experience" title="Where I've worked" />
          <div className="relative">
            <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
            <div className="space-y-8">
              {experience.map((e, i) => (
                <TimelineItem key={i} {...e} index={i} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" className="bg-secondary/20">
        <SectionHeader eyebrow="Projects" title="Selected work" />
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* EDUCATION */}
      <Section id="education">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Education" title="Academic background" />
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5"
          >
            {education.map((e, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-card group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{e.degree}</h3>
                    <p className="text-primary text-sm mt-1">{e.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:shrink-0">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 rounded-full">
                    Grade: {e.grade}
                  </Badge>
                  <Badge variant="outline" className="border-border rounded-full">{e.year}</Badge>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" className="bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Certifications" title="Continuous learning" />
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-card group"
              >
                <div className="text-3xl">{cert.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{cert.name}</h3>
                </div>
                <Badge
                  variant="outline"
                  className={cert.status === "Ongoing"
                    ? "border-accent/40 text-accent bg-accent/5 rounded-full"
                    : "border-primary/30 text-primary bg-primary/5 rounded-full"
                  }
                >
                  {cert.status}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center bg-card border border-border shadow-elegant"
          >
            <div className="absolute inset-0 bg-hero opacity-70 pointer-events-none" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-vibrant blur-3xl opacity-30"
            />
            <div className="relative">
              <Badge variant="outline" className="mb-6 border-primary/30 bg-primary/5 text-primary rounded-full">Let's connect</Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                Have a project <span className="text-gradient">in mind?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                I'm open to full-time roles, freelance projects, and AI engineering collaborations.
                Let's build something great together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <MagneticButton>
                  <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow rounded-full px-7">
                    <a href="mailto:princesharmaofficial1@gmail.com"><Mail className="mr-2 w-4 h-4" /> Email Me</a>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                    <a href="tel:+919774642917"><Phone className="mr-2 w-4 h-4" /> +91 9774642917</a>
                  </Button>
                </MagneticButton>
              </div>
              <div className="flex justify-center gap-4 text-muted-foreground">
                <SocialIcon href="https://github.com/princesharmaofficial1-hub"><Github className="w-5 h-5" /></SocialIcon>
                <SocialIcon href="https://www.linkedin.com/in/prince-sharma-3a7774256"><Linkedin className="w-5 h-5" /></SocialIcon>
              </div>
              <p className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" /> Pune, Maharashtra, India
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </Section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-bold text-base">
              <span className="text-gradient">PS</span><span className="text-primary">.</span>
              <span className="ml-2 font-normal text-muted-foreground">Prince Sharma</span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors">{l}</a>
              ))}
            </div>
            <div className="text-xs">© {new Date().getFullYear()} Prince Sharma · Pune, India</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ---------- Helpers ---------- */

const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`py-24 md:py-32 ${className}`}>
    <div className="container">{children}</div>
  </section>
);

const SectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mb-14"
  >
    <div className="text-sm uppercase tracking-[0.25em] text-primary mb-3 flex items-center gap-3">
      <span className="w-8 h-px bg-primary" /> {eyebrow}
    </div>
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">{title}</h2>
  </motion.div>
);

const AnimatedWords = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-3 overflow-hidden"
          style={{ display: "inline-block" }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
};

const RevealText = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-lg md:text-xl text-muted-foreground leading-relaxed"
    >
      {children}
    </motion.p>
  );
};

const SkillCard = ({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50), y = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(300px circle at ${x}% ${y}%, hsl(var(--primary) / 0.12), transparent 70%)`;
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width) * 100);
        y.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="border-gradient relative p-6 rounded-2xl bg-card border border-border hover:border-transparent transition-colors shadow-card group overflow-hidden"
    >
      <motion.div style={{ background: bg }} className="absolute inset-0 pointer-events-none" />
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map((i) => (
            <Badge key={i} variant="secondary" className="bg-secondary text-foreground/80 font-normal rounded-full">{i}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ role, company, period, points, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="relative pl-12 md:pl-16"
  >
    <div className="absolute left-0 md:left-1 top-2 w-6 h-6 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-background" />
    </div>
    <div className="p-6 md:p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-card">
      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
        <div>
          <h3 className="text-xl font-semibold">{role}</h3>
          <p className="text-primary text-sm mt-1">{company}</p>
        </div>
        <Badge variant="outline" className="border-border rounded-full">{period}</Badge>
      </div>
      <ul className="space-y-2 text-muted-foreground">
        {points.map((p: string) => (
          <li key={p} className="flex gap-3 text-sm leading-relaxed">
            <span className="text-primary mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const ProjectCard = ({ title, desc, tags, year, highlight, github, demo }: any) => {
  const x = useMotionValue(50), y = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(400px circle at ${x}% ${y}%, hsl(var(--primary) / 0.15), transparent 70%)`;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width) * 100);
        y.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="border-gradient relative p-7 rounded-2xl bg-card border border-border hover:border-transparent transition-colors shadow-card group overflow-hidden"
    >
      <motion.div style={{ background: bg }} className="absolute inset-0 pointer-events-none" />
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="text-xs text-muted-foreground">{year}</div>
              {highlight && (
                <Badge className="bg-gradient-primary text-primary-foreground text-[10px] rounded-full px-2 py-0">
                  Featured
                </Badge>
              )}
            </div>
            <h3 className="text-2xl font-semibold group-hover:text-gradient transition-colors">{title}</h3>
          </div>
          <motion.div whileHover={{ rotate: 45 }} transition={{ type: "spring", stiffness: 300 }}>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t: string) => (
            <Badge key={t} variant="outline" className="border-primary/30 text-primary bg-primary/5 font-normal rounded-full">{t}</Badge>
          ))}
        </div>
        {(github || demo) && (
          <div className="flex gap-3 mt-5 pt-4 border-t border-border">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-3.5 h-3.5" /> Code
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const TypingText = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, phrases]);

  return (
    <span>
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
};

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-primary hover:border-primary/40 transition-colors"
  >
    {children}
  </motion.a>
);

export default Index;
