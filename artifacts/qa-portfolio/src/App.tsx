import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  ShieldCheck,
  Sparkles,
  Sun,
  TestTube2,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const portfolio = {
  email: 'amalazkr8@gmail.com',
  linkedin: 'https://www.linkedin.com/in/amala-zakira',
};

const tools = ['Playwright', 'Postman', 'JavaScript', 'TypeScript', 'Jira', 'GitHub Actions'];

type ExperienceProject = {
  name: string;
  bullets: string[];
};

type ProfessionalExperience = {
  date: string;
  role: string;
  company: string;
  projects: ExperienceProject[];
};

const professionalExperiences: ProfessionalExperience[] = [
  {
    date: 'August 2025 — Present',
    role: 'Quality Assurance',
    company: 'PT Telkom Satelit Indonesia',
    projects: [
      {
        name: 'MYTelkomsat Website & Mobile',
        bullets: [
          'Executed 300+ manual tests for web and mobile applications using Qase, contributing to a 100% completed system with stable operation and no critical issues after launch.',
          'Identified and reported 50+ defects, categorized issues by severity, and collaborated with developers to resolve critical bugs before release, resulting in zero major incidents post-launch.',
        ],
      },
      {
        name: 'Aplikasi Bispro',
        bullets: [
          'Conducted manual testing using Qase to identify defects and support ongoing system maintenance and improvements, identifying 41 defects during testing.',
          'Implemented 100% of targeted business processes into the system, reducing manual work and accelerating operational workflows.',
        ],
      },
      {
        name: 'Aplikasi Tsatgo',
        bullets: [
          'Developed and managed 200+ test cases using Qase for attendance, leave, and overtime mobile and website applications.',
          'Performed manual and automation testing using Katalon Studio, identifying 20+ defects from mobile and 15+ defects from the website, ranging from minor UI issues to critical functional bugs.',
        ],
      },
      {
        name: 'Aplikasi Buku Tamu',
        bullets: [
          'Prepared test plans and executed testing for an internal visitor management system covering visitor, intern, and trainee data across Telkomsat head office and branch offices, designing 80+ test cases and identifying 10+ defects before release.',
          'Contributed to a 100% completed system now used company-wide and continue to support ongoing maintenance and improvements.',
        ],
      },
      {
        name: 'Aplikasi CMS Billing',
        bullets: [
          'Conducted testing for a new CMS Billing enhancement, designing 70+ test cases to validate the transition from manual processes to a fully automated workflow and identifying 8+ defects before release.',
        ],
      },
      {
        name: 'MARYVEL (Legal System)',
        bullets: [
          'Executed manual and automation testing using Qase and Katalon Studio for application enhancements, creating 120+ test cases and identifying 35+ defects across UI and functional workflows.',
          'Managed bug reports and coordinated with the development team on timely resolution, supporting successful 100% delivery of the system.',
        ],
      },
      {
        name: 'Aplikasi Booking Ruang Meeting',
        bullets: [
          'Executed testing for a meeting room booking system, designing 100+ test cases to validate booking and approval workflows and identifying 8+ defects during validation.',
          'Contributed to a 100% completed system adopted by all units company-wide and continue to support maintenance and improvements based on user feedback.',
        ],
      },
      {
        name: 'Registration Deal',
        bullets: [
          'Conducted 80+ manual tests using Qase, identifying and tracking 10+ defects to ensure system quality and support continuous improvements.',
        ],
      },
    ],
  },
  {
    date: 'February 2024 — June 2024',
    role: 'System Analyst Intern',
    company: 'PT Telkom Satelit Indonesia',
    projects: [
      {
        name: 'Billing Center Project',
        bullets: [
          'Enhanced the Requirement Definition Document (RDD), including functional and non-functional requirements, flowcharts, ERDs, use cases, activity diagrams, and process documentation to support system development.',
        ],
      },
      {
        name: 'OSF Tracking Finance (RAB) Project',
        bullets: [
          'Revised and optimized flowcharts and use case diagrams to represent updated system processes and facilitate clearer communication across teams.',
        ],
      },
      {
        name: 'DTP Telkomsat',
        bullets: [
          'Led requirement analysis and created RDDs, wireframes, business process flows, and UML diagrams to support development of a satellite service transaction system that reached 80% completion.',
          'Prepared testing documentation to validate system quality and requirement compliance.',
        ],
      },
    ],
  },
];

type Project = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  tags: string[];
  tone: 'coral' | 'blue' | 'yellow';
  image?: string;
};

const projects: Project[] = [
  {
    id: 'tsatqo',
    eyebrow: 'Mobile & web QA',
    title: 'Mobile and web Tsatgo',
    description: 'Tested attendance, leave, and overtime flows across mobile and web applications.',
    detail: 'Managed 200+ Qase test cases and used manual and automation testing with Katalon Studio, finding 20+ mobile defects and 15+ web defects.',
    tags: ['Qase', 'Katalon', 'Bug reporting', 'Manual testing', 'Requirements'],
    tone: 'coral',
    image: '/tsatqo-mobile.png',
  },
  {
    id: 'mobile-operational',
    eyebrow: 'QA & system analysis',
    title: 'Mobile Operational',
    description: 'A mobile application for tracking and booking the company’s operational vehicles.',
    detail: 'Worked as both QA and System Analyst by reviewing requirements, testing vehicle tracking and booking flows, and supporting reliable day-to-day operations.',
    tags: ['Qase', 'Katalon', 'Bug reporting', 'Manual testing', 'Requirements'],
    tone: 'blue',
    image: '/mobile-operational.png',
  },
  {
    id: 'marvel',
    eyebrow: 'QA & business systems',
    title: 'MARVEL',
    description: 'A business contract management application used across the company.',
    detail: 'Worked as QA to test contract management workflows, report defects, and help ensure reliable handling of business agreements.',
    tags: ['Qase', 'Katalon', 'Bug reporting', 'Manual testing', 'Requirements'],
    tone: 'yellow',
    image: '/marvel.png',
  },
];

function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('qa-theme');
    const isDark = saved === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('qa-theme', next ? 'dark' : 'light');
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(portfolio.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="site-shell">
      <header className="floating-nav">
        <button className="nav-brand" onClick={() => scrollTo('top')} aria-label="Back to top">
          <span className="brand-square">MM</span>
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          <button onClick={() => scrollTo('about')}>ABOUT</button>
          <button onClick={() => scrollTo('capabilities')}>SERVICES</button>
          <button onClick={() => scrollTo('work')}>PORTFOLIO</button>
          <button onClick={() => scrollTo('experience')}>RESUME</button>
          <button onClick={() => scrollTo('contact')}>CONTACT</button>
          <button onClick={() => scrollTo('work')}>BLOG</button>
        </nav>
        <div className="nav-actions">
          <button className="nav-theme" onClick={toggleTheme} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>
            {dark ? <Sun size={14} /> : <Moon size={14} />}
            <span> {dark ? 'LIGHT' : 'DARK'} VERSION</span>
          </button>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero reference-hero">
          <div className="page-width hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Software quality · Indonesia</span>
              <h1>Hi there! I&apos;m Amala. A <em>Website &amp; mobile QA.</em></h1>
              <div className="availability-pill"><span className="status-dot" /> Available for new challenges</div>
              <p className="hero-lede">I ensure product quality through hands-on manual testing, test automation, and clear defect reporting to help teams deliver reliable products.</p>
              <div className="hero-ctas">
                <button className="button-primary" onClick={() => scrollTo('work')}>View my work <ArrowDownRight size={15} /></button>
                <a className="button-quiet" href={`mailto:${portfolio.email}`}>Let&apos;s talk <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <ProfileVisual />
          </div>
        </section>

        <section className="capability-strip" id="capabilities">
          <div className="page-width capability-cards">
            <CapabilityCard icon={<Network size={23} />} title="Manual testing" text="Finding the edge cases before they reach the interface." />
            <CapabilityCard icon={<TestTube2 size={23} />} title="Automation testing" text="Building stable checks for the journeys that matter most." />
            <CapabilityCard icon={<ShieldCheck size={23} />} title="Release confidence" featured text="Making quality visible from first ticket to final release." />
          </div>
        </section>

        <section className="intro-section" id="about">
          <div className="page-width intro-grid">
            <div className="experience-stat"><strong>08</strong><span>QA projects<br />tested</span></div>
            <div>
              <h2>Quality is not a final step. It&apos;s a <em>conversation.</em></h2>
              <p>I work at the seam between a product idea and its real-world behavior. I ask useful questions early, turn them into observable checks, and leave teams with better context to move forward.</p>
            </div>
          </div>
          <div className="page-width trust-row">
            <span>Tools I work with</span>
            <div className="tool-list">{tools.map((tool) => <span className="tool" key={tool}>{tool}</span>)}</div>
            <div className="quote-mark">“</div>
            <blockquote>Make failures legible, then make the next step easier.</blockquote>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="page-width">
            <div className="work-heading">
              <div><span className="work-eyebrow">Selected work</span><h2>My recent <span>work</span></h2></div>
              <div className="carousel-buttons"><button aria-label="Previous work"><ArrowLeft size={15} /></button><button aria-label="Next work"><ArrowRight size={15} /></button></div>
            </div>
            <div className="project-grid reference-project-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} active={activeProject === project.id} onToggle={() => setActiveProject(activeProject === project.id ? null : project.id)} />)}
            </div>
          </div>
        </section>

        <section className="resume-section" id="experience">
          <div className="page-width resume-grid resume-grid-detailed">
            <div className="timeline-block">
              <span className="eyebrow">Experience</span>
              <h2>A curious eye for the details others <em>skip.</em></h2>
              {professionalExperiences.map((experience) => <Experience key={`${experience.company}-${experience.date}`} {...experience} />)}
            </div>
            <div className="resume-side">
              <section className="resume-side-section">
                <span className="eyebrow">Education</span>
                <article className="education-detail-card">
                  <div className="detail-card-topline"><Sparkles size={18} /><span>September 2021 — July 2025</span></div>
                  <h3>Brawijaya University</h3>
                  <p className="detail-muted">Malang, Indonesia</p>
                  <p><strong>Bachelor&apos;s Degree in Informatics Engineering</strong></p>
                  <p className="thesis"><strong>Thesis:</strong> Pengembangan Sistem Transaksi Layanan Satelit Berbasis Website Pada Perusahaan Jasa Telekomunikasi (Studi Kasus: PT. XYZ)</p>
                </article>
              </section>

              <section className="resume-side-section">
                <span className="eyebrow">Certification &amp; training</span>
                <div className="training-list">
                  <article className="training-card"><strong>MSIB Batch 6</strong><span>February 2024 — June 2024 · System Analyst</span><p>Completed the five-month MSIB program at Telkom Satelit Indonesia and contributed to several company projects.</p></article>
                  <article className="training-card"><strong>Microsoft Office Training</strong><span>May 2025 · Participant</span><p>Successfully achieved all requirements of the professional competency training and assessment.</p></article>
                  <article className="training-card"><strong>GFT Bootcamp</strong><span>2023 · Bootcamp Participant</span><p>Completed an offline object-oriented programming course using the Grammatical Fast Track method and finished three assigned projects with 100% completion.</p></article>
                </div>
              </section>

              <section className="resume-side-section">
                <span className="eyebrow">Skills</span>
                <div className="skill-groups">
                  <div><strong>Testing &amp; QA</strong><span>Qase · Katalon Studio · SortSite</span></div>
                  <div><strong>System Analysis</strong><span>Requirement Gathering · SRS/FRS · Use Case · Flowchart · ERD · UML</span></div>
                  <div><strong>Project &amp; Documentation</strong><span>Jira · Notion · Microsoft Office</span></div>
                  <div><strong>UI &amp; Workflow</strong><span>Figma · Balsamiq · Draw.io · Lucidchart</span></div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-width contact-inner">
            <span className="eyebrow">Let&apos;s connect</span>
            <h2>Have a tricky <em>release?</em></h2>
            <p>If you are building a product where quality needs a seat at the table, I would like to hear what you are working through.</p>
            <div className="contact-actions">
              <a className="button-primary" href={`mailto:${portfolio.email}`}><Mail size={15} /> {portfolio.email}</a>
              <button className="button-quiet" onClick={copyEmail}><Copy size={14} /> {copied ? 'Copied' : 'Copy email'}</button>
              <a className="button-quiet" href={portfolio.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="page-width footer-inner">
          <span>© 2025 Amala · Tested with intent.</span>
          <div className="footer-links"><button onClick={() => scrollTo('top')}>Back to top ↑</button></div>
        </div>
      </footer>
    </div>
  );
}

function ProfileVisual() {
  return (
    <div className="profile-visual" aria-label="Profile photo of Amala">
      <div className="portrait-orbit" />
      <div className="portrait-frame">
        <img className="profile-photo" src="/profile-photo.png" alt="Amala" />
      </div>
      <div className="social-float"><a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile"><Linkedin size={14} /></a><a href={`mailto:${portfolio.email}`} aria-label="Send email to Amala"><Mail size={14} /></a></div>
    </div>
  );
}

function CapabilityCard({ icon, title, text, featured = false }: { icon: ReactNode; title: string; text: string; featured?: boolean }) {
  return <article className={`capability-card ${featured ? 'featured' : ''}`}><div className="capability-icon">{icon}</div><h3>{title}</h3><p>{text}</p><span className="card-arrow"><ArrowUpRight size={14} /></span></article>;
}

function Experience({ date, role, company, projects }: ProfessionalExperience) {
  return (
    <article className="timeline-item experience-entry">
      <span className="timeline-date">{date}</span>
      <div>
        <h3>{role} <span>@ {company}</span></h3>
        <div className="experience-projects">
          {projects.map((project) => (
            <section className="experience-project" key={project.name}>
              <h4>{project.name}</h4>
              <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, active, onToggle }: { project: Project; active: boolean; onToggle: () => void }) {
  return <article className={`project-card ${project.tone} ${project.image ? 'has-image' : ''}`} data-testid={`card-project-${project.id}`}>
    <div className="project-visual"><div className="project-topline"><span>{project.eyebrow}</span><ArrowUpRight size={15} /></div>{project.image ? <img className="project-image" src={project.image} alt={`${project.title} preview`} /> : <div className="project-art"><span>{project.tone === 'coral' ? 'QA' : project.tone === 'blue' ? 'OPS' : 'MARVEL'}</span></div>}<h3>{project.title}</h3></div>
    <div className="project-info"><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><button className="project-action" onClick={onToggle} aria-expanded={active}>{active ? 'Close notes' : 'Read case notes'} <ArrowUpRight size={13} /></button>{active && <div className="project-detail">{project.detail}</div>}</div>
  </article>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
