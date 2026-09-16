import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CircleDot,
  Copy,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  ShieldCheck,
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

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('qa-theme', next ? 'dark' : 'light');
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(portfolio.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand-mark" onClick={() => scrollTo('top')} data-testid="button-home" aria-label="Back to top">
            <span className="brand-square">MM</span>
            <span className="brand-name">Muhammad Malik Rachman</span>
          </button>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
            <button onClick={() => scrollTo('capabilities')} data-testid="link-capabilities">Capabilities</button>
            <button onClick={() => scrollTo('work')} data-testid="link-work">Selected work</button>
            <button onClick={() => scrollTo('about')} data-testid="link-about">About</button>
            <button onClick={() => scrollTo('contact')} data-testid="link-contact">Contact</button>
          </nav>
          <div className="header-actions">
            <button className="icon-button" onClick={toggleTheme} data-testid="button-theme-toggle" aria-label={dark ? 'Use light theme' : 'Use dark theme'}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="page-width hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Software quality · Jakarta, Indonesia</span>
              <h1>Quality is a <em>conversation</em>, not a final step.</h1>
              <p className="hero-lede">I help teams ship with more confidence by turning uncertain behavior into observable, repeatable signals — from the first acceptance criteria to the last API check.</p>
              <div className="hero-ctas">
                <button className="button-primary" onClick={() => scrollTo('work')} data-testid="button-view-work">Explore selected work <ArrowDownRight size={15} /></button>
                <a className="button-quiet" href={`mailto:${portfolio.email}`} data-testid="link-email-hero">Start a conversation <ArrowUpRight size={15} /></a>
              </div>
              <div className="availability"><span className="status-dot" /> Available for new challenges <span className="font-mono-ui">· GMT+7</span></div>
            </div>
            <WorkspacePreview />
          </div>
        </section>

        <section className="section" id="capabilities">
          <div className="page-width">
            <div className="section-heading">
              <div><span className="eyebrow">01 / How I help</span><h2>A QA practice built around useful evidence.</h2></div>
              <p>Good testing is not about finding more bugs. It is about making the right risks visible early enough to do something about them.</p>
            </div>
            <div className="capability-grid">
              <Capability icon={<ShieldCheck size={17} />} title="Product confidence" featured description="A risk-led approach that gives product and engineering a shared language for what 'ready' means." items={['Test strategy & planning', 'Exploratory test charters', 'Release risk mapping']} />
              <Capability icon={<TestTube2 size={17} />} title="Automation that lasts" description="Pragmatic suites that protect critical journeys without becoming another product to maintain." items={['Playwright & WebdriverIO', 'CI smoke coverage', 'Stable test data']} />
              <Capability icon={<Network size={17} />} title="API validation" description="Checks the contracts underneath the interface, where fast feedback and honest failures start." items={['REST contract checks', 'Postman collections', 'Boundary scenarios']} />
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="page-width split-grid">
            <div>
              <span className="eyebrow">02 / Point of view</span>
              <p className="statement">Leave every system <em>clearer</em> than you found it.</p>
              <p className="body-copy">I am most useful at the seam between a product idea and its real-world behavior. I ask awkward questions early, make them executable, then leave behind tools and context that help the whole team move faster.</p>
            </div>
            <div className="principles">
              <Principle number="01" title="Observe before assuming" text="I start with the user's workflow and the system's signals, not just the ticket. The gap is usually where the interesting risk lives." />
              <Principle number="02" title="Automate the repeatable" text="Automation earns its place when it gives the team a dependable answer in the moments humans should not have to repeat." />
              <Principle number="03" title="Make failures legible" text="A red build is only useful when the next person can understand what happened, reproduce it, and choose a path forward." />
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="page-width experience-layout">
            <div>
              <span className="eyebrow">03 / Experience</span>
              <p className="statement">Curious about the details others <em>skip.</em></p>
              <p className="body-copy">My toolkit follows the question at hand. Sometimes that is a browser trace; sometimes it is a careful conversation with the person who will live with the feature.</p>
            </div>
            <div className="timeline">
              <Experience date="2024 — now" role="Software QA Engineer" company="Product engineering teams" text="Own end-to-end quality activities across web delivery: scenario design, API checks, regression planning, and the automation feedback loop in CI." />
              <Experience date="2023 — 2024" role="QA Intern & Project Contributor" company="Digital product environment" text="Built a foundation in functional testing and defect communication while helping teams turn acceptance criteria into durable test cases." />
              <Experience date="2021 — 2025" role="Information Systems" company="BINUS University · Graduated 2025" text="Studied systems thinking, software delivery, and the relationship between technology, people, and the decisions products make possible." />
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="page-width">
            <div className="section-heading">
              <div><span className="eyebrow">04 / Selected work</span><h2>Small case studies from the quality desk.</h2></div>
              <p>Names are generalized where work was private. The thinking, constraints, and outcomes are real.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} active={activeProject === project.id} onToggle={() => setActiveProject(activeProject === project.id ? null : project.id)} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-width">
            <div className="toolkit-band">
              <span>Current working toolkit</span>
              <div className="tool-list">
                {tools.map((tool) => <span className="tool" key={tool} data-testid={`text-tool-${tool.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{tool}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-width">
            <span className="eyebrow">05 / Say hello</span>
            <h2>Have a tricky <em>release?</em></h2>
            <p>If you are building a product where quality needs a seat at the table, I would like to hear what you are working through.</p>
            <div className="contact-actions">
              <a className="button-primary" href={`mailto:${portfolio.email}`} data-testid="link-email-contact"><Mail size={15} /> {portfolio.email}</a>
              <button className="button-quiet" onClick={copyEmail} data-testid="button-copy-email"><Copy size={14} /> {copied ? 'Copied to clipboard' : 'Copy email'}</button>
              <a className="button-quiet" href={portfolio.linkedin} target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={15} /> LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="page-width footer-inner">
          <span>© 2025 Muhammad Malik Rachman · Built with care, tested with intent.</span>
          <div className="footer-links">
            <a href={portfolio.github} target="_blank" rel="noreferrer" data-testid="link-github">GitHub</a>
            <a href="mailto:hello@example.com" data-testid="link-footer-email">Email</a>
            <button onClick={() => scrollTo('top')} data-testid="button-back-top">Back to top ↑</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

const portfolio = {
  email: 'muhammad.malik.qa@example.com',
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/',
};

const tools = ['Playwright', 'Postman', 'JavaScript', 'TypeScript', 'Jira', 'GitHub Actions', 'SQL', 'Chrome DevTools'];

type Project = { id: string; eyebrow: string; title: string; description: string; detail: string; tags: string[]; large?: boolean };
const projects: Project[] = [
  { id: 'commerce-checkout', eyebrow: 'Case study / 01', title: 'A checkout that tells the truth', description: 'Mapped the highest-risk purchase paths and built a layered smoke suite for web and API behavior.', detail: 'The useful shift was moving from a long regression list to a small, intentional signal: critical path checks in CI, exploratory charters around payment edges, and defect reports with reproducible evidence.', tags: ['Web testing', 'Playwright', 'Risk mapping'], large: true },
  { id: 'api-contracts', eyebrow: 'Case study / 02', title: 'Contracts before screens', description: 'Validated response shapes and failure states before UI work landed.', detail: 'Created a lightweight collection of positive, negative, and boundary checks so frontend and backend could work from the same observable contract.', tags: ['API testing', 'Postman'] },
  { id: 'release-signal', eyebrow: 'Case study / 03', title: 'A calmer release signal', description: 'Turned flaky end-to-end checks into actionable feedback for the delivery team.', detail: 'Grouped failures by cause, tightened test data setup, and documented the handful of signals worth blocking a release on.', tags: ['CI', 'Test design'] },
];

function WorkspacePreview() {
  return (
    <div className="workspace-card" aria-label="Illustration of a QA workspace dashboard">
      <div className="workspace-top"><div className="traffic-lights"><span /><span /><span /></div><span className="workspace-label">qa / release-readiness.md</span></div>
      <div className="workspace-body">
        <div className="workspace-title"><div><h3>Release readiness</h3><p>build 184 · checked 09:42 GMT+7</p></div><div className="pass-ring"><span>94%</span></div></div>
        <div className="matrix" aria-hidden="true">{Array.from({ length: 48 }, (_, i) => <i key={i} />)}</div>
        <div className="check-list">
          <div className="check-row"><span><strong>Critical journeys</strong> · 18 checks</span><b><Check size={12} /> passed</b></div>
          <div className="check-row"><span><strong>API contracts</strong> · 32 checks</span><b><Check size={12} /> passed</b></div>
          <div className="check-row"><span><strong>Exploratory notes</strong> · 04 open</span><b><CircleDot size={11} /> reviewed</b></div>
        </div>
      </div>
    </div>
  );
}

function Capability({ icon, title, description, items, featured = false }: { icon: ReactNode; title: string; description: string; items: string[]; featured?: boolean }) {
  return <article className={`capability-card ${featured ? 'featured' : ''}`}><div className="capability-icon">{icon}</div><h3>{title}</h3><p>{description}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}

function Principle({ number, title, text }: { number: string; title: string; text: string }) {
  return <article className="principle"><span className="principle-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>;
}

function Experience({ date, role, company, text }: { date: string; role: string; company: string; text: string }) {
  return <article className="timeline-item"><span className="timeline-date">{date}</span><div><h3>{role} <span>↗ {company}</span></h3><p>{text}</p></div></article>;
}

function ProjectCard({ project, active, onToggle }: { project: Project; active: boolean; onToggle: () => void }) {
  return <article className={`project-card ${project.large ? 'large' : ''}`} data-testid={`card-project-${project.id}`}>
    <div className="project-visual"><div className="project-topline"><span>{project.eyebrow}</span><ArrowUpRight size={15} /></div><h3>{project.title}</h3></div>
    <div className="project-info"><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><button className="project-action" onClick={onToggle} data-testid={`button-case-study-${project.id}`} aria-expanded={active}>{active ? 'Close notes' : 'Read case notes'} <ArrowUpRight size={13} /></button>{active && <div className="project-detail">{project.detail}</div>}</div>
  </article>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
