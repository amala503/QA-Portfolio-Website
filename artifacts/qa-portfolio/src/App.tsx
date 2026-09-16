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
  Github,
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
  email: 'muhammad.malik.qa@example.com',
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/',
};

const tools = ['Playwright', 'Postman', 'JavaScript', 'TypeScript', 'Jira', 'GitHub Actions'];

type Project = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  tags: string[];
  tone: 'coral' | 'blue' | 'yellow';
};

const projects: Project[] = [
  {
    id: 'commerce-checkout',
    eyebrow: 'Web automation',
    title: 'A checkout that tells the truth',
    description: 'Mapped critical purchase paths and built a layered smoke suite for browser and API behavior.',
    detail: 'Moved the team from a long regression list to a focused release signal: critical path checks in CI, exploratory charters around payment edges, and defects with reproducible evidence.',
    tags: ['Playwright', 'Risk mapping'],
    tone: 'coral',
  },
  {
    id: 'api-contracts',
    eyebrow: 'API validation',
    title: 'Contracts before screens',
    description: 'Validated response shapes and failure states before UI work landed.',
    detail: 'Created positive, negative, and boundary checks so frontend and backend could work from the same observable contract.',
    tags: ['Postman', 'REST'],
    tone: 'blue',
  },
  {
    id: 'release-signal',
    eyebrow: 'Quality process',
    title: 'A calmer release signal',
    description: 'Turned flaky end-to-end checks into actionable feedback for the delivery team.',
    detail: 'Grouped failures by cause, tightened test data setup, and documented the few signals worth blocking a release on.',
    tags: ['CI', 'Test design'],
    tone: 'yellow',
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
            <div className="experience-stat"><strong>04</strong><span>QA focus<br />areas</span></div>
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
          <div className="page-width resume-grid">
            <div className="timeline-block">
              <span className="eyebrow">Experience</span>
              <h2>A curious eye for the details others <em>skip.</em></h2>
              <Experience date="2024 — present" role="Software QA Engineer" company="Product engineering teams" text="Own end-to-end quality activities across web delivery, API checks, regression planning, and the automation feedback loop in CI." />
              <Experience date="2023 — 2024" role="QA Intern & project contributor" company="Digital product environment" text="Built a foundation in functional testing and defect communication while turning acceptance criteria into durable test cases." />
              <Experience date="2021 — 2025" role="Information Systems" company="BINUS University" text="Studied systems thinking, software delivery, and the relationship between technology, people, and product decisions." />
            </div>
            <div className="education-stack">
              <div className="education-card"><Sparkles size={24} /><strong>Automation &amp; API</strong><span>Professional focus</span></div>
              <div className="education-card accent-card"><Sparkles size={24} /><strong>Information Systems</strong><span>BINUS University · Graduated 2025</span></div>
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
          <span>© 2025 Muhammad Malik Rachman · Tested with intent.</span>
          <div className="footer-links"><a href={portfolio.github} target="_blank" rel="noreferrer"><Github size={13} /> GitHub</a><button onClick={() => scrollTo('top')}>Back to top ↑</button></div>
        </div>
      </footer>
    </div>
  );
}

function ProfileVisual() {
  return (
    <div className="profile-visual" aria-label="Profile photo of Muhammad Malik Rachman">
      <div className="portrait-orbit" />
      <div className="portrait-frame">
        <img className="profile-photo" src="/profile-photo.png" alt="Muhammad Malik Rachman" />
      </div>
      <div className="social-float"><a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={14} /></a><a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={14} /></a><a href={`mailto:${portfolio.email}`} aria-label="Email"><Mail size={14} /></a></div>
    </div>
  );
}

function CapabilityCard({ icon, title, text, featured = false }: { icon: ReactNode; title: string; text: string; featured?: boolean }) {
  return <article className={`capability-card ${featured ? 'featured' : ''}`}><div className="capability-icon">{icon}</div><h3>{title}</h3><p>{text}</p><span className="card-arrow"><ArrowUpRight size={14} /></span></article>;
}

function Experience({ date, role, company, text }: { date: string; role: string; company: string; text: string }) {
  return <article className="timeline-item"><span className="timeline-date">{date}</span><div><h3>{role} <span>@ {company}</span></h3><p>{text}</p></div></article>;
}

function ProjectCard({ project, active, onToggle }: { project: Project; active: boolean; onToggle: () => void }) {
  return <article className={`project-card ${project.tone}`} data-testid={`card-project-${project.id}`}>
    <div className="project-visual"><div className="project-topline"><span>{project.eyebrow}</span><ArrowUpRight size={15} /></div><div className="project-art"><span>{project.tone === 'coral' ? 'QA' : project.tone === 'blue' ? 'API' : 'CI'}</span></div><h3>{project.title}</h3></div>
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
