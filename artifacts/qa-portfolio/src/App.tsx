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
  Award,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Download,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  TestTube2,
  TrendingUp,
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
  cv: 'https://drive.google.com/file/d/1OvNZVRVLmpx0EWXvGyo5FuyEpDavaoxg/view?usp=sharing',
};

const skillGroups = [
  { name: 'Testing & QA', points: ['Qase', 'Katalon Studio', 'Postman', 'SortSite'] },
  { name: 'System Analysis', points: ['Requirement Gathering', 'SRS / FRS', 'Use Case', 'Flowchart', 'ERD', 'UML'] },
  { name: 'Project & Documentation', points: ['Jira', 'Notion', 'Microsoft Office'] },
  { name: 'UI & Workflow', points: ['Figma', 'Balsamiq', 'Draw.io', 'Lucidchart'] },
];

type ExperienceProject = {
  name: string;
  category?: string;
  highlight?: string;
  tools?: string[];
  bullets: string[];
};

type ProfessionalExperience = {
  date: string;
  isCurrent?: boolean;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  stats?: { label: string; value: string }[];
  projects: ExperienceProject[];
};

const professionalExperiences: ProfessionalExperience[] = [
  {
    date: 'August 2025 — Present',
    isCurrent: true,
    role: 'Quality Assurance',
    company: 'PT Telkom Satelit Indonesia',
    location: 'Bogor / Jakarta, Indonesia',
    type: 'Contract',
    description: 'Leading test planning, functional & regression testing, test automation, and defect lifecycle management across critical enterprise systems, business process portals, and mobile applications.',
    stats: [
      { label: 'Enterprise Systems', value: '8 Systems' },
      { label: 'Test Scenarios & Cases', value: '650+ Cases' },
      { label: 'Defects Caught', value: '150+ Bugs' },
      { label: 'Post-Launch Critical Incidents', value: '0 Incidents' },
    ],
    projects: [
      {
        name: 'MYTelkomsat Website & Mobile',
        category: 'Flagship Mobile & Web',
        highlight: '300+ Tests · 0 Post-Launch Incidents',
        tools: ['Qase', 'Manual QA', 'Regression', 'Mobile & Web'],
        bullets: [
          'Executed 300+ manual tests for web and mobile applications using Qase, contributing to a 100% completed system with stable operation and no critical issues after launch.',
          'Identified and reported 50+ defects, categorized issues by severity, and collaborated with developers to resolve critical bugs before release, resulting in zero major incidents post-launch.',
        ],
      },
      {
        name: 'Aplikasi Tsatgo',
        category: 'Attendance & HR Mobile/Web',
        highlight: '200+ Test Cases · Automated with Katalon',
        tools: ['Postman', 'Katalon Studio', 'Qase', 'API Testing', 'Mobile QA'],
        bullets: [
          'Developed and managed 200+ test cases using Qase for attendance, leave, and overtime mobile and website applications.',
          'Performed API testing using Postman (validating endpoints, JWT token authentication, request payloads, and status codes) and automation testing using Katalon Studio, identifying 20+ defects from mobile and 15+ defects from the website.',
        ],
      },
      {
        name: 'Aplikasi Bispro',
        category: 'Business Process Automation',
        highlight: '41 Defects Identified · 100% Adoption',
        tools: ['Qase', 'Process Testing', 'Workflow Validation'],
        bullets: [
          'Conducted manual testing using Qase to identify defects and support ongoing system maintenance and improvements, identifying 41 defects during testing.',
          'Implemented 100% of targeted business processes into the system, reducing manual work and accelerating operational workflows.',
        ],
      },
      {
        name: 'MARYVEL (Legal System)',
        category: 'Enterprise Legal & Contracts',
        highlight: '120+ Test Cases · 100% Delivery',
        tools: ['Qase', 'Katalon Studio', 'UI & Functional QA'],
        bullets: [
          'Executed manual and automation testing using Qase and Katalon Studio for application enhancements, creating 120+ test cases and identifying 35+ defects across UI and functional workflows.',
          'Managed bug reports and coordinated with the development team on timely resolution, supporting successful 100% delivery of the system.',
        ],
      },
      {
        name: 'Aplikasi Buku Tamu',
        category: 'Visitor & Security Management',
        highlight: '80+ Test Cases · Company-Wide Rollout',
        tools: ['Qase', 'Access Control', 'Branch Verification'],
        bullets: [
          'Prepared test plans and executed testing for an internal visitor management system covering visitor, intern, and trainee data across Telkomsat head office and branch offices, designing 80+ test cases and identifying 10+ defects before release.',
          'Contributed to a 100% completed system now used company-wide and continue to support ongoing maintenance and improvements.',
        ],
      },
      {
        name: 'Aplikasi CMS Billing',
        category: 'Billing & Financial Operations',
        highlight: '70+ Test Cases · Automated Billing',
        tools: ['Qase', 'Billing Workflow', 'Data Integrity'],
        bullets: [
          'Conducted testing for a new CMS Billing enhancement, designing 70+ test cases to validate the transition from manual processes to a fully automated workflow and identifying 8+ defects before release.',
        ],
      },
      {
        name: 'Aplikasi Booking Ruang Meeting',
        category: 'Resource Scheduling & Approvals',
        highlight: '100+ Test Cases · 100% Adoption',
        tools: ['Qase', 'Approval Flow Testing', 'Validation'],
        bullets: [
          'Executed testing for a meeting room booking system, designing 100+ test cases to validate booking and approval workflows and identifying 8+ defects during validation.',
          'Contributed to a 100% completed system adopted by all units company-wide and continue to support maintenance and improvements based on user feedback.',
        ],
      },
      {
        name: 'Registration Deal',
        category: 'Partner Deal Pipeline',
        highlight: '80+ Manual Tests · Continuous QA',
        tools: ['Qase', 'Deal Pipeline', 'Partner Collaboration'],
        bullets: [
          'Conducted 80+ manual tests using Qase, identifying and tracking 10+ defects to ensure system quality and support continuous improvements.',
        ],
      },
    ],
  },
  {
    date: 'February 2024 — June 2024',
    isCurrent: false,
    role: 'System Analyst Intern',
    company: 'PT Telkom Satelit Indonesia',
    location: 'Bogor / Jakarta, Indonesia',
    type: 'MSIB Internship',
    description: 'Synthesized complex business requirements into structured engineering specifications, UML diagrams, business process flows (BPMN), and comprehensive test documentation.',
    stats: [
      { label: 'Core Systems Analyzed', value: '3 Projects' },
      { label: 'Key Deliverables', value: 'RDD, BPMN, UML' },
      { label: 'Flagship Build', value: '80% DTP Build' },
    ],
    projects: [
      {
        name: 'Billing Center Project',
        category: 'Enterprise Billing Architecture',
        highlight: 'Comprehensive RDD & System Models',
        tools: ['RDD / SRS', 'Flowchart & BPMN', 'ERD & UML', 'Process Specs'],
        bullets: [
          'Enhanced the Requirement Definition Document (RDD), including functional and non-functional requirements, flowcharts, ERDs, use cases, activity diagrams, and process documentation to support system development.',
        ],
      },
      {
        name: 'OSF Tracking Finance (RAB) Project',
        category: 'Financial Tracking & Budgeting',
        highlight: 'Cross-Team Process Optimization',
        tools: ['BPMN', 'Use Case Diagrams', 'Financial Workflows'],
        bullets: [
          'Revised and optimized flowcharts and use case diagrams to represent updated system processes and facilitate clearer communication across teams.',
        ],
      },
      {
        name: 'DTP Telkomsat',
        category: 'Satellite Service Transaction System',
        highlight: 'Spearheaded requirements to 80% completion',
        tools: ['Requirement Engineering', 'Wireframes', 'UML', 'Test Documentation'],
        bullets: [
          'Led requirement analysis and created RDDs, wireframes, business process flows, and UML diagrams to support development of a satellite service transaction system that reached 80% completion.',
          'Prepared testing documentation to validate system quality and requirement compliance.',
        ],
      },
    ],
  },
];

type ProjectMediaSection = {
  title: string;
  image?: string;
  emptyNotice?: string;
};

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
  mediaSections?: ProjectMediaSection[];
};

const projects: Project[] = [
  {
    id: 'tsatqo',
    title: 'Mobile and web Tsatgo',
    description: 'Tested attendance, leave, and overtime flows across mobile and web applications, including backend API verification.',
    detail: 'Managed 200+ Qase test cases, performed API testing using Postman (JWT auth, attendance payloads, error handling), and conducted manual & automation testing with Katalon Studio, catching 20+ mobile and 15+ web defects.',
    tags: ['Postman', 'Katalon', 'Qase', 'API testing', 'Manual testing'],
    tone: 'coral',
    image: '/tsatqo-mobile.png',
    detailImage: '/tsatgo-katalon.png',
    bugReportImage: '/tsatgo-bug-report.png',
    uatImage: '/tsatgo-uat.png',
    mediaSections: [
      {
        title: '1. Katalon test execution',
        image: '/tsatgo-katalon.png',
      },
      {
        title: '2. API Testing (Postman)',
        image: '/tsatgo-api-postman.png',
      },
      {
        title: '3. Bug report',
        image: '/tsatgo-bug-report.png',
      },
      {
        title: '4. UAT document',
        image: '/tsatgo-uat.png',
      },
    ],
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
    tags: ['ClickUp', 'UAT', 'Bug reporting', 'Qase', 'Katalon', 'Manual testing'],
    tone: 'yellow',
    image: '/marvel.png',
    uatImage: '/marvel-uat.png',
    detailImage: '/marvel-katalon.png',
    mediaSections: [
      {
        title: '1. Bug and task management di ClickUp',
        image: '/marvel-clickup.png',
      },
      {
        title: '2. Bug report',
        image: '/marvel-bug-report.png',
      },
      {
        title: '3. UAT (User Acceptance Test)',
        image: '/marvel-uat.png',
      },
      {
        title: '4. Katalon test execution',
        image: '/marvel-katalon.png',
      },
    ],
  },
  {
    id: 'partnerhub',
    title: 'PartnerHub',
    description: 'An internal collaboration and deal registration system for monitoring project opportunities with partners and internal teams.',
    detail: 'Developed an application to support collaboration efforts in winning targeted projects, enabling monitoring of the List of Project (LOP) from both internal and partner sides, and functioning as a Deal Registration tool to register projects from partners before they are shared with the relevant internal team.',
    tags: ['Qase', 'Katalon', 'Bug reporting', 'Manual testing'],
    tone: 'coral',
    image: '/partnerhub-laptop.png',
    detailImage: '/partnerhub-katalon.png',
    bugReportImage: '/partnerhub-bug-report.png',
    uatImage: '/partnerhub-uat.png',
  },
];

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeCode: string;
  category: string;
  description: string;
  detail: string;
  tags: string[];
  tone: 'coral' | 'blue' | 'yellow' | 'purple';
  credentialId?: string;
  skills: string[];
  image?: string;
};

const certificates: Certificate[] = [
  {
    id: 'msib-batch-6',
    title: 'Magang Bersertifikat Angkatan 6 (MSIB)',
    issuer: 'Pelaksana Pusat Kampus Merdeka · PT Telkom Satelit Indonesia',
    date: 'Februari 2024 — Juni 2024',
    badgeCode: 'MSIB 6',
    category: 'Sertifikat Kepesertaan MSIB',
    description: 'Sertifikat Kepesertaan program Magang Bersertifikat Angkatan 6 di PT Telkom Satelit Indonesia dari Kemendikbudristek & Kampus Merdeka.',
    detail: 'Resmi menyelesaikan program Magang Bersertifikat Kampus Merdeka (MSIB Angkatan 6) selama 5 bulan sebagai System Analyst di PT Telkom Satelit Indonesia. Mengemban tanggung jawab dalam rekayasa kebutuhan (RDD/SRS), perancangan alur proses bisnis (BPMN/Flowchart), UML diagram, use case, dan pengujian kualitas sistem enterprise.',
    tags: ['Kampus Merdeka', 'Telkom Satelit Indonesia', 'System Analyst', 'MSIB Angkatan 6', 'ID: 8037862'],
    tone: 'blue',
    credentialId: 'NIM: 215150201111044 · ID: 8037862',
    image: '/certificate-msib-batch-6.jpg',
    skills: ['Requirement Gathering', 'Functional Specification (SRS)', 'Flowchart & BPMN', 'Use Case & ERD', 'Test Planning'],
  },
  {
    id: 'microsoft-office-training',
    title: 'Microsoft Office Desktop Application',
    issuer: 'Trust Training Partners · Microsoft Partner',
    date: 'May 08, 2025',
    badgeCode: 'MOS',
    category: 'Certificate of Achievement',
    description: 'Professional competency training and assessment for Microsoft Office Desktop Application with Accomplished - Excellent Grade.',
    detail: 'Meraih Certificate of Achievement dengan predikat Accomplished - Excellent Grade dalam uji kompetensi profesional Microsoft Office Desktop Application yang diselenggarakan oleh Trust Training Partners (Microsoft Partner Silver Learning) bekerja sama dengan Universitas Brawijaya.',
    tags: ['Microsoft Partner', 'Desktop Application', 'Excellent Grade', 'Trust Training Partners', 'Universitas Brawijaya'],
    tone: 'coral',
    credentialId: 'Certificate No: 25UBC05114610',
    image: '/certificate-microsoft-office.jpg',
    skills: ['Advanced Excel & Data Models', 'Technical Documentation', 'Structured Reporting', 'Presentation Standards'],
  },
  {
    id: 'gft-bootcamp',
    title: 'Software Engineering Foundation (GFT)',
    issuer: 'SEAFT Programming · PT Lambda Solusi Informatika',
    date: 'September 20, 2023',
    badgeCode: 'GFT',
    category: 'Certificate of Completion',
    description: 'Boot camp of Software Engineering Foundation Based on GFT Methodology - The Journey of Programmers.',
    detail: 'Berhasil menyelesaikan boot camp of Software Engineering Foundation Based on GFT Methodology - The Journey of Programmers dari SEAFT Programming (PT. Lambda Solusi Informatika) yang ditandatangani oleh Nurudin Santoso (Founder of GFT Methodology). Mempelajari fondasi rekayasa perangkat lunak, paradigma OOP, arsitektur modular, dan penyelesaian proyek pemrograman.',
    tags: ['SEAFT Programming', 'GFT Methodology', 'Software Engineering', '23-SELFT-1016', 'Nurudin Santoso'],
    tone: 'yellow',
    credentialId: 'No: 23-SELFT-1016',
    image: '/certificate-gft.jpg',
    skills: ['Object-Oriented Programming', 'Modular Architecture', 'Design Patterns', 'Project Delivery'],
  },
];

function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [detailCertificate, setDetailCertificate] = useState<Certificate | null>(null);
  const [copied, setCopied] = useState(false);
  const projectGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('qa-theme');
    const isDark = saved === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    if (!detailProject && !detailCertificate) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDetailProject(null);
        setDetailCertificate(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [detailProject, detailCertificate]);

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
          <span className="brand-square">AZ</span>
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          <button onClick={() => scrollTo('about')}>ABOUT</button>
          <button onClick={() => scrollTo('capabilities')}>SERVICES</button>
          <button onClick={() => scrollTo('work')}>PORTFOLIO</button>
          <button onClick={() => scrollTo('certificates')}>CERTIFICATES</button>
          <button onClick={() => scrollTo('experience')}>RESUME</button>
          <button onClick={() => scrollTo('contact')}>CONTACT</button>
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
                <a className="button-cv" href={portfolio.cv} target="_blank" rel="noopener noreferrer">
                  <Download size={14} /> Download CV
                </a>
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

        <section className="certificate-section" id="certificates">
          <div className="page-width">
            <div className="work-heading certificate-heading">
              <div>
                <h2>Certification</h2>
              </div>
            </div>
            <div className="certificate-grid">
              {certificates.map((cert) => (
                <CertificateCard
                  key={cert.id}
                  certificate={cert}
                  onDetail={() => setDetailCertificate(cert)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="resume-section" id="experience">
          <div className="page-width resume-grid resume-grid-detailed">
            <div className="timeline-block">
              <span className="eyebrow">Work Experience</span>
              <h2>A curious eye for the details others <em>skip.</em></h2>

              {/* Executive Impact Highlights Banner */}
              <div className="experience-highlight-banner">
                <div className="impact-pill">
                  <div className="impact-pill-top">
                    <span className="impact-number">8+</span>
                    <span className="impact-icon-badge"><Building2 size={14} /></span>
                  </div>
                  <span className="impact-label">Enterprise Systems Shipped</span>
                </div>
                <div className="impact-pill">
                  <div className="impact-pill-top">
                    <span className="impact-number">650+</span>
                    <span className="impact-icon-badge"><CheckCircle2 size={14} /></span>
                  </div>
                  <span className="impact-label">Test Scenarios & Cases</span>
                </div>
                <div className="impact-pill">
                  <div className="impact-pill-top">
                    <span className="impact-number">150+</span>
                    <span className="impact-icon-badge"><TrendingUp size={14} /></span>
                  </div>
                  <span className="impact-label">Pre-Release Bugs Caught</span>
                </div>
                <div className="impact-pill">
                  <div className="impact-pill-top">
                    <span className="impact-number">0</span>
                    <span className="impact-icon-badge"><ShieldCheck size={14} /></span>
                  </div>
                  <span className="impact-label">Post-Launch Critical Incidents</span>
                </div>
              </div>

              {/* Vertical Timeline Track */}
              <div className="experience-timeline">
                {professionalExperiences.map((experience) => (
                  <Experience key={`${experience.company}-${experience.date}`} {...experience} />
                ))}
              </div>
            </div>

            {/* Enhanced Sidebar: Education, Core QA Toolkit, Quality Pledge */}
            <div className="resume-side">
              <section className="resume-side-section">
                <span className="eyebrow">Academic Background</span>
                <article className="education-detail-card">
                  <div className="detail-card-topline">
                    <div className="education-badge-header">
                      <GraduationCap size={16} />
                      <span>Graduated 2025</span>
                    </div>
                    <span className="detail-date-badge">2021 — 2025</span>
                  </div>
                  <h3>Brawijaya University</h3>
                  <p className="detail-muted">Faculty of Computer Science · Malang, Indonesia</p>
                  <div className="degree-tag-row">
                    <span className="degree-tag">S.Kom / Bachelor of Informatics</span>
                  </div>
                  <div className="thesis">
                    <div className="thesis-label">
                      <Sparkles size={12} />
                      <strong>Undergraduate Thesis:</strong>
                    </div>
                    <p>Pengembangan Sistem Transaksi Layanan Satelit Berbasis Website Pada Perusahaan Jasa Telekomunikasi (Studi Kasus: PT. XYZ)</p>
                  </div>
                </article>
              </section>

              <section className="resume-side-section">
                <span className="eyebrow">Testing & Methodologies</span>
                <div className="competencies-card">
                  <div className="competency-group">
                    <div className="competency-title">
                      <ShieldCheck size={14} />
                      <span>QA & Verification</span>
                    </div>
                    <div className="competency-pills">
                      <span>Manual Testing</span>
                      <span>Automation Testing</span>
                      <span>Test Plan & Scenarios</span>
                      <span>Defect Triage</span>
                      <span>Regression & Smoke</span>
                      <span>Mobile & Web QA</span>
                    </div>
                  </div>

                  <div className="competency-group">
                    <div className="competency-title">
                      <Terminal size={14} />
                      <span>Tools & Platforms</span>
                    </div>
                    <div className="competency-pills">
                      <span className="highlight-pill">Katalon Studio</span>
                      <span className="highlight-pill">Qase TMS</span>
                      <span>Postman</span>
                      <span>Jira</span>
                      <span>Git / GitHub</span>
                    </div>
                  </div>

                  <div className="competency-group">
                    <div className="competency-title">
                      <Layers size={14} />
                      <span>Systems & Analysis</span>
                    </div>
                    <div className="competency-pills">
                      <span>RDD & SRS Specs</span>
                      <span>BPMN 2.0 & Flowchart</span>
                      <span>UML & Use Cases</span>
                      <span>ERD Modeling</span>
                    </div>
                  </div>
                </div>
              </section>

              <article className="quality-pledge-card">
                <div className="pledge-quote-mark">“</div>
                <p>
                  Quality is never an afterthought. It starts with sharp requirements and continues until every critical workflow is battle-tested.
                </p>
                <div className="pledge-author">
                  <span className="live-dot" />
                  <strong>Amala Zakira</strong> · Quality Assurance
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-width contact-inner">
            <span className="eyebrow">Let&apos;s connect</span>
            <h2>Have a tricky <em>release?</em></h2>
            <p>If you are building a product where quality needs a seat at the table, I would like to hear what you are working through. I&apos;m also open for freelance or project-based work.</p>
            <div className="contact-availability-badge">
              <span className="live-dot" />
              <span>Open for Freelance &amp; Project-Based Work</span>
            </div>
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
          <span>© 2026 Amala</span>
          <div className="footer-links"><button onClick={() => scrollTo('top')}>Back to top ↑</button></div>
        </div>
      </footer>
      {detailProject && <ProjectDetailModal project={detailProject} onClose={() => setDetailProject(null)} />}
      {detailCertificate && <CertificateDetailModal certificate={detailCertificate} onClose={() => setDetailCertificate(null)} />}
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

function Experience({
  date,
  isCurrent,
  role,
  company,
  location,
  type,
  description,
  stats,
  projects,
}: ProfessionalExperience) {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll || projects.length <= 4 ? projects : projects.slice(0, 4);

  return (
    <article className={`experience-timeline-node ${isCurrent ? 'is-current' : ''}`}>
      <div className="timeline-node-pin">
        <div className="timeline-node-icon">
          {isCurrent ? <Briefcase size={17} /> : <Layers size={17} />}
        </div>
      </div>
      <div className="experience-card">
        <div className="experience-card-header">
          <div className="role-main-info">
            <div className="role-title-row">
              <h3>{role}</h3>
              {isCurrent ? (
                <span className="status-live-pill">
                  <span className="live-dot" />
                  <span>Present · Contract</span>
                </span>
              ) : (
                <span className="status-past-pill">{type}</span>
              )}
            </div>
            <div className="role-sub-row">
              <span className="role-company">
                <Building2 size={13} />
                {company}
              </span>
              <span className="role-separator">•</span>
              <span className="role-location">{location}</span>
              <span className="role-separator">•</span>
              <span className="role-date">
                <Calendar size={13} />
                {date}
              </span>
            </div>
          </div>
        </div>

        {description && <p className="experience-summary">{description}</p>}

        {stats && stats.length > 0 && (
          <div className="role-stats-grid">
            {stats.map((s) => (
              <div className="role-stat-chip" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="experience-projects-heading">
          <h4>
            Key Projects & Systems <span>({projects.length})</span>
          </h4>
          <span className="projects-subtitle">Quality Assurance & System Engineering</span>
        </div>

        <div className="experience-project-grid">
          {displayedProjects.map((project) => (
            <div className="project-detail-box" key={project.name}>
              <div className="project-detail-header">
                <div className="project-detail-titles">
                  <h5>{project.name}</h5>
                  {project.category && <span className="project-category-badge">{project.category}</span>}
                </div>
                {project.highlight && (
                  <span className="project-highlight-badge">
                    <Sparkles size={11} />
                    {project.highlight}
                  </span>
                )}
              </div>

              <ul className="project-bullet-list">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>
                    <CheckCircle2 size={12} className="bullet-icon" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {project.tools && project.tools.length > 0 && (
                <div className="project-tools-row">
                  {project.tools.map((tool) => (
                    <span className="tool-chip" key={tool}>{tool}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {projects.length > 4 && (
          <button
            type="button"
            className="toggle-more-projects-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <span>Show less</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>View all {projects.length} systems ({projects.length - 4} more)</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}

function ProjectCard({ project, active, onToggle, onDetail }: { project: Project; active: boolean; onToggle: () => void; onDetail: () => void }) {
  return (
    <article className={`project-card ${project.tone} ${project.image ? 'has-image' : ''}`} data-testid={`card-project-${project.id}`}>
      <div className="project-visual" onClick={onDetail} style={{ cursor: 'pointer' }} role="button" tabIndex={0} title="Klik untuk membuka detail & artefak pengujian">
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
        {active && (
          <div className="project-detail">
            {project.detail}
            {project.mediaSections && (
              <div className="project-detail-media-hint">
                <span className="hint-label">Artefak Pengujian Tersedia ({project.mediaSections.length}):</span>
                <div className="hint-pills">
                  {project.mediaSections.map((s) => (
                    <span key={s.title} className="hint-pill">{s.title}</span>
                  ))}
                </div>
                <button type="button" className="hint-open-btn" onClick={onDetail}>
                  Buka Gambar &amp; Detail Lengkap <ArrowUpRight size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const sections = project.mediaSections;

  return (
    <div className="project-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className={`project-modal ${project.tone}`} role="dialog" aria-modal="true" aria-labelledby={`project-detail-title-${project.id}`} onMouseDown={(event) => event.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose} aria-label="Close project details"><X size={18} /></button>
        <div className="project-modal-media">
          {sections && sections.length > 0 && (
            <div className="modal-media-tabs" aria-label="Filter artefak pengujian">
              <button
                type="button"
                className={`media-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                Semua ({sections.length + 1})
              </button>
              <button
                type="button"
                className={`media-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                App UI
              </button>
              {sections.map((sec) => (
                <button
                  type="button"
                  key={sec.title}
                  className={`media-tab-btn ${activeTab === sec.title ? 'active' : ''}`}
                  onClick={() => setActiveTab(sec.title)}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'preview') && (
            project.image ? <img src={project.image} alt={`${project.title} QA work`} /> : <div className="project-art"><span>QA</span></div>
          )}

          {sections ? (
            sections
              .filter((sec) => activeTab === 'all' || activeTab === sec.title)
              .map((sec) => (
                <div className="project-modal-secondary-media" key={sec.title}>
                  <span>{sec.title}</span>
                  {sec.image ? (
                    <img src={sec.image} alt={sec.title} />
                  ) : (
                    <div className="project-modal-empty-box">
                      <span>{sec.emptyNotice || 'Dikosongkan sementara'}</span>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <>
              {project.detailImage && <div className="project-modal-secondary-media"><span>Katalon test execution</span><img src={project.detailImage} alt={`${project.title} Katalon test execution`} /></div>}
              {project.bugReportImage && <div className="project-modal-secondary-media"><span>Bug report</span><img src={project.bugReportImage} alt={`${project.title} bug report`} /></div>}
              {project.uatImage && <div className="project-modal-secondary-media"><span>UAT document</span><img src={project.uatImage} alt={`${project.title} user acceptance test document`} /></div>}
            </>
          )}
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

function CertificateCard({
  certificate,
  onDetail,
}: {
  certificate: Certificate;
  onDetail: () => void;
}) {
  return (
    <article
      className={`certificate-card ${certificate.tone} ${certificate.image ? 'has-image' : ''}`}
      data-testid={`card-certificate-${certificate.id}`}
      onClick={onDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDetail();
        }
      }}
      aria-label={`View details for ${certificate.title}`}
    >
      <div className="certificate-visual">
        <div className="certificate-topline">
          <span className="certificate-badge-pill">{certificate.category}</span>
          <span className="certificate-open-hint">
            <ArrowUpRight size={13} />
          </span>
        </div>
        {certificate.image ? (
          <img className="certificate-image" src={certificate.image} alt={`${certificate.title} Certificate`} />
        ) : (
          <div className="certificate-art">
            <div className="certificate-art-icon">
              <Award size={20} />
            </div>
            <span className="certificate-art-code">{certificate.badgeCode}</span>
          </div>
        )}
        <h3>{certificate.title}</h3>
      </div>
      <div className="certificate-info">
        <div className="certificate-issuer-row">
          <span className="certificate-issuer">{certificate.issuer}</span>
          <span className="certificate-date">{certificate.date}</span>
        </div>
        <p>{certificate.description}</p>
      </div>
    </article>
  );
}

function CertificateDetailModal({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {
  return (
    <div className="project-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`project-modal ${certificate.tone}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`certificate-detail-title-${certificate.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="project-modal-close" onClick={onClose} aria-label="Close certificate details">
          <X size={18} />
        </button>
        <div className="project-modal-media certificate-modal-media">
          {certificate.image ? (
            <div className="certificate-modal-image-wrap">
              <img src={certificate.image} alt={`${certificate.title} Certificate Full`} className="certificate-full-img" />
              <div className="certificate-image-caption">
                <span className="certificate-seal">
                  <CheckCircle2 size={13} /> VERIFIED CREDENTIAL
                </span>
                {certificate.credentialId && <span className="credential-code">{certificate.credentialId}</span>}
              </div>
            </div>
          ) : (
            <div className="certificate-modal-badge-card">
              <div className="certificate-modal-header">
                <span className="certificate-seal">
                  <CheckCircle2 size={13} /> VERIFIED CREDENTIAL
                </span>
                <Award size={36} className="modal-award-icon" />
              </div>
              <div className="certificate-recipient">
                <span>Presented to</span>
                <strong>Amala Zakira</strong>
                <p className="certificate-recipient-field">{certificate.title}</p>
              </div>
              <div className="certificate-meta-table">
                <div className="certificate-meta-row">
                  <span>Issuer</span>
                  <strong>{certificate.issuer}</strong>
                </div>
                <div className="certificate-meta-row">
                  <span>Period / Date</span>
                  <strong>{certificate.date}</strong>
                </div>
                {certificate.credentialId && (
                  <div className="certificate-meta-row">
                    <span>Credential ID</span>
                    <strong className="credential-code">{certificate.credentialId}</strong>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="project-modal-copy">
          <span className="work-eyebrow">Credential details</span>
          <h2 id={`certificate-detail-title-${certificate.id}`}>{certificate.title}</h2>
          <p>{certificate.description}</p>
          <div className="certificate-skills-block">
            <span className="detail-subhead">Verified Competencies</span>
            <div className="tag-row">
              {certificate.skills.map((skill) => (
                <span className="tag" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="project-modal-notes">
            <span>Learning outcomes &amp; impact</span>
            <p>{certificate.detail}</p>
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
