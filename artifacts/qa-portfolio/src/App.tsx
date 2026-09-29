import { type ReactNode, useEffect, useRef, useState } from 'react';
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

const skillGroups = [
  { name: 'Testing & QA', points: ['Qase', 'Katalon Studio', 'SortSite'] },
  { name: 'System Analysis', points: ['Requirement Gathering', 'SRS / FRS', 'Use Case', 'Flowchart', 'ERD', 'UML'] },
  { name: 'Project & Documentation', points: ['Jira', 'Notion', 'Microsoft Office'] },
  { name: 'UI & Workflow', points: ['Figma', 'Balsamiq', 'Draw.io', 'Lucidchart'] },
];

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
  title: string;
  description: string;
  detail: string;
  tags: string[];
  tone: 'coral' | 'blue' | 'yellow';
  image?: string;
  detailImage?: string;
  bugReportImage?: string;
  uatImage?: string;
};

const projects: Project[] = [
  {
    id: 'tsatqo',
    title: 'Mobile and web Tsatgo',
    description: 'Tested attendance, leave, and overtime flows across mobile and web applications.',
    detail: 'Managed 200+ Qase test cases and used manual and automation testing with Katalon Studio, finding 20+ mobile defects and 15+ web defects.',
    tags: ['Qase', 'Katalon', 'Bug reporting', 'Manual testing'],
    tone: 'coral',
    image: '/tsatqo-mobile.png',
    detailImage: '/tsatgo-katalon.png',
    bugReportImage: '/tsatgo-bug-report.png',
    uatImage: '/tsatgo-uat.png',
  },
  {
    id: 'mobile-operational',
    title: 'Mobil Operational',
    description: 'A mobile application for tracking and booking the company’s operational vehicles.',
    detail: 'Worked as both QA and System Analyst by reviewing requirements, testing vehicle tracking and booking flows, and supporting reliable day-to-day operations.',
    tags: ['Qase', 'Katalon', 'Bug reporting', 'Manual testing'],
    tone: 'blue',
    image: '/mobile-operational.png',
    detailImage: '/mobile-operational-katalon.png',
    bugReportImage: '/mobile-operational-bug-report.png',
    uatImage: '/mobile-operational-uat.png',
  },
  {
    id: 'marvel',
    title: 'MARVEL',
    description: 'A business contract management application used across the company.',
    detail: 'Worked as QA to test contract management workflows, report defects, and help ensure reliable handling of business agreements.',
    tags: ['Qase', 'Katalon', 'Bug reporting', 'Manual testing'],
    tone: 'yellow',
    image: '/marvel.png',
  },
  {
    id: 'partnerhub',
    title: 'PartnerHub',
    description: 'An internal collaboration and deal registration system for monitoring project opportunities with partners and internal teams.',
    detail: 'Developed an application to support collaboration efforts in winning targeted projects, enabling monitoring of the List of Project (LOP) from both internal and partner sides, and functioning as a Deal Registration tool to register projects from partners before they are shared with the relevant internal team.',
    tags: ['LOP monitoring', 'Deal registration', 'Partner collaboration', 'Manual testing'],
    tone: 'coral',
    image: '/partnerhub-laptop.png',
  },
];

function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const projectGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('qa-theme');
    const isDark = saved === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    if (!detailProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDetailProject(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [detailProject]);

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

  const scrollProjects = (direction: number) => {
    projectGridRef.current?.scrollBy({
      left: direction * Math.max(projectGridRef.current.clientWidth * 0.78, 320),
      behavior: 'smooth',
    });
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
            <div className="quote-mark">“</div>
            <blockquote>Make failures legible, then make the next step easier.</blockquote>
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="skills-band">
            <div className="page-width skills-band-inner">
              <span className="skills-band-label">Skills I work with</span>
              <div className="skill-group-list">
                {skillGroups.map((group) => (
                  <article className="skill-group" key={group.name}>
                    <strong>{group.name}</strong>
                    <div className="skill-group-points">
                      {group.points.map((point) => <span key={point}>{point}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="page-width">
            <div className="work-heading">
              <div><h2>My recent <span>work</span></h2></div>
              <div className="carousel-buttons">
                <button onClick={() => scrollProjects(-1)} aria-label="Previous work"><ArrowLeft size={15} /></button>
                <button onClick={() => scrollProjects(1)} aria-label="Next work"><ArrowRight size={15} /></button>
              </div>
            </div>
            <div className="project-grid reference-project-grid" ref={projectGridRef}>
              {projects.map((project) => <ProjectCard key={project.id} project={project} active={activeProject === project.id} onToggle={() => setActiveProject(activeProject === project.id ? null : project.id)} onDetail={() => setDetailProject(project)} />)}
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
      {detailProject && <ProjectDetailModal project={detailProject} onClose={() => setDetailProject(null)} />}
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

function ProjectCard({ project, active, onToggle, onDetail }: { project: Project; active: boolean; onToggle: () => void; onDetail: () => void }) {
  return (
    <article className={`project-card ${project.tone} ${project.image ? 'has-image' : ''}`} data-testid={`card-project-${project.id}`}>
      <div className="project-visual">
        <div className="project-topline"><ArrowUpRight size={15} /></div>
        {project.image ? <img className="project-image" src={project.image} alt={`${project.title} preview`} /> : <div className="project-art"><span>{project.tone === 'coral' ? 'QA' : project.tone === 'blue' ? 'OPS' : 'MARVEL'}</span></div>}
        <h3>{project.title}</h3>
      </div>
      <div className="project-info">
        <p>{project.description}</p>
        <div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          <button className="project-action" onClick={onToggle} aria-expanded={active}>{active ? 'Close notes' : 'Read case notes'} <ArrowUpRight size={13} /></button>
          <button className="project-detail-action" onClick={onDetail} aria-label={`View details for ${project.title}`}>Detail <ArrowUpRight size={13} /></button>
        </div>
        {active && <div className="project-detail">{project.detail}</div>}
      </div>
    </article>
  );
}

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="project-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className={`project-modal ${project.tone}`} role="dialog" aria-modal="true" aria-labelledby={`project-detail-title-${project.id}`} onMouseDown={(event) => event.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose} aria-label="Close project details"><X size={18} /></button>
        <div className="project-modal-media">
          {project.image ? <img src={project.image} alt={`${project.title} QA work`} /> : <div className="project-art"><span>QA</span></div>}
          {project.detailImage && <div className="project-modal-secondary-media"><span>Katalon test execution</span><img src={project.detailImage} alt={`${project.title} Katalon test execution`} /></div>}
          {project.bugReportImage && <div className="project-modal-secondary-media"><span>Bug report</span><img src={project.bugReportImage} alt={`${project.title} bug report`} /></div>}
          {project.uatImage && <div className="project-modal-secondary-media"><span>UAT document</span><img src={project.uatImage} alt={`${project.title} user acceptance test document`} /></div>}
        </div>
        <div className="project-modal-copy">
          <span className="work-eyebrow">Project detail</span>
          <h2 id={`project-detail-title-${project.id}`}>{project.title}</h2>
          <p>{project.description}</p>
          <div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          <div className="project-modal-notes">
            <span>Case notes</span>
            <p>{project.detail}</p>
          </div>
        </div>
      </section>
    </div>
  );
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
