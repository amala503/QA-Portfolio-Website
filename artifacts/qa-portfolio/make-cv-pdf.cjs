const fs = require('fs');
const path = require('path');

function createCvPdf() {
  const objects = [];
  
  function addObject(content) {
    objects.push(content);
    return objects.length; // 1-based index
  }

  // Escape special chars in PDF text
  function esc(str) {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  // Stream content builder
  const streamCommands = [];

  function setColor(r, g, b, stroke = false) {
    const rf = (r / 255).toFixed(3);
    const gf = (g / 255).toFixed(3);
    const bf = (b / 255).toFixed(3);
    if (stroke) {
      streamCommands.push(`${rf} ${gf} ${bf} RG`);
    } else {
      streamCommands.push(`${rf} ${gf} ${bf} rg`);
    }
  }

  function drawRect(x, y, w, h, fill = true, stroke = false) {
    streamCommands.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re`);
    if (fill && stroke) {
      streamCommands.push('B');
    } else if (fill) {
      streamCommands.push('f');
    } else if (stroke) {
      streamCommands.push('S');
    }
  }

  function drawLine(x1, y1, x2, y2, lineWidth = 1) {
    streamCommands.push(`${lineWidth} w`);
    streamCommands.push(`${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
  }

  function addText(x, y, text, font = '/F1', size = 10, align = 'left') {
    streamCommands.push('BT');
    streamCommands.push(`${font} ${size} Tf`);
    streamCommands.push(`${x.toFixed(2)} ${y.toFixed(2)} Td`);
    streamCommands.push(`(${esc(text)}) Tj`);
    streamCommands.push('ET');
  }

  // Page dimensions (A4: 595.28 x 841.89 pt)
  const W = 595.28;
  const H = 841.89;

  // Background top banner (Dark aesthetic accent)
  setColor(20, 24, 38); // Deep navy
  drawRect(0, H - 110, W, 110, true, false);

  // Accent line
  setColor(108, 92, 231); // Royal Purple accent
  drawRect(0, H - 114, W, 4, true, false);

  // Name & Title in Header
  setColor(255, 255, 255);
  addText(40, H - 48, 'AMALA ZAKIRA', '/F2', 24);
  
  setColor(180, 190, 215);
  addText(40, H - 70, 'Software Quality Assurance Engineer  |  System Analyst', '/F1', 11);

  // Contact line
  setColor(150, 160, 185);
  addText(40, H - 90, 'Email: amalazkr8@gmail.com  |  LinkedIn: linkedin.com/in/amala-zakira  |  Indonesia', '/F1', 9);

  let curY = H - 145;

  // Helper section header
  function renderSection(title) {
    setColor(35, 42, 60);
    drawRect(40, curY - 3, W - 80, 20, true, false);
    setColor(108, 92, 231);
    drawRect(40, curY - 3, 5, 20, true, false);
    setColor(255, 255, 255);
    addText(52, curY + 3, title.toUpperCase(), '/F2', 10);
    curY -= 24;
  }

  // 1. EXECUTIVE SUMMARY
  renderSection('Executive Profile & Summary');
  setColor(50, 55, 70);
  addText(40, curY, 'Detail-oriented Quality Assurance Engineer and Informatics graduate with comprehensive experience in', '/F1', 9.5);
  curY -= 14;
  addText(40, curY, 'manual testing, automated regression, system analysis, and defect lifecycle management across web and', '/F1', 9.5);
  curY -= 14;
  addText(40, curY, 'mobile platforms. Proven record of testing 8+ enterprise-scale systems, executing 650+ test cases, and', '/F1', 9.5);
  curY -= 14;
  addText(40, curY, 'achieving zero post-launch critical incidents through rigorous test scenario design and proactive defect tracking.', '/F1', 9.5);
  curY -= 22;

  // 2. CORE SKILLS & METHODOLOGIES
  renderSection('Core Competencies & Tools');
  
  const col1X = 40;
  const col2X = 310;
  const skillsY = curY;

  setColor(20, 24, 38);
  addText(col1X, skillsY, 'Testing & QA Methodologies:', '/F2', 9.5);
  setColor(60, 65, 80);
  addText(col1X + 10, skillsY - 14, '* Manual & Exploratory Testing, Functional & Regression QA', '/F1', 9);
  addText(col1X + 10, skillsY - 26, '* Tools: Qase TMS, Katalon Studio (Mobile & Web), SortSite', '/F1', 9);
  addText(col1X + 10, skillsY - 38, '* Test Planning, Scenario & Case Design, Defect Lifecycle, UAT', '/F1', 9);

  setColor(20, 24, 38);
  addText(col2X, skillsY, 'System Analysis & Architecture:', '/F2', 9.5);
  setColor(60, 65, 80);
  addText(col2X + 10, skillsY - 14, '* SRS/FRS Documentation, User Stories & Acceptance Criteria', '/F1', 9);
  addText(col2X + 10, skillsY - 26, '* UML Diagrams, Flowcharts, Use Cases, ERD Modeling', '/F1', 9);
  addText(col2X + 10, skillsY - 38, '* Tools: Jira, Notion, Figma, Lucidchart, Draw.io', '/F1', 9);

  curY -= 56;

  // 3. PROFESSIONAL EXPERIENCE
  renderSection('Professional Experience');

  // Job 1
  setColor(20, 24, 38);
  addText(40, curY, 'Quality Assurance & System Analyst  -  PT Telkom Satelit Indonesia (Telkomsat)', '/F2', 10.5);
  setColor(108, 92, 231);
  addText(W - 170, curY, 'Feb 2024 - Jun 2024 | Bogor, Indonesia', '/F2', 8.5);
  curY -= 15;

  setColor(80, 85, 100);
  addText(40, curY, 'Spearheaded QA workflows and functional validation across 8 enterprise applications spanning web and mobile:', '/F3', 9);
  curY -= 14;

  const expBullets = [
    'MYTelkomsat (Mobile & Web): Executed 300+ manual test cases on Qase; identified and reported 50+ defects, resulting in 100% completed system delivery with 0 post-launch critical incidents.',
    'Aplikasi Tsatgo (Attendance & HR): Authored 200+ test cases in Qase. Executed manual and Katalon Studio automation testing, uncovering 35+ mobile and web defects before release.',
    'Aplikasi Bispro (Business Process Automation): Executed end-to-end process validation, logged 41 defects, and ensured 100% target business process digital adoption.',
    'MARYVEL (Legal & Contract Management): Conducted UI and functional test automation with Katalon & Qase, executing 120+ test cases and catching 35+ defects.',
    'CMS Billing & Buku Tamu Systems: Designed 150+ test cases validating automated billing transitions and internal visitor security management across branch offices.',
  ];

  for (const b of expBullets) {
    setColor(108, 92, 231);
    addText(46, curY, '>', '/F2', 9);
    setColor(50, 55, 70);
    // Split bullet if long
    if (b.length > 105) {
      const splitIdx = b.lastIndexOf(' ', 100);
      addText(58, curY, b.substring(0, splitIdx), '/F1', 9);
      curY -= 12;
      addText(58, curY, b.substring(splitIdx + 1), '/F1', 9);
    } else {
      addText(58, curY, b, '/F1', 9);
    }
    curY -= 13;
  }

  curY -= 6;

  // 4. EDUCATION
  renderSection('Education & Academic Background');

  setColor(20, 24, 38);
  addText(40, curY, 'Brawijaya University  -  Bachelor of Informatics (S.Kom)', '/F2', 10);
  setColor(108, 92, 231);
  addText(W - 130, curY, '2021 - 2025 | Malang, Indonesia', '/F2', 8.5);
  curY -= 14;

  setColor(70, 75, 90);
  addText(40, curY, 'Faculty of Computer Science (FILKOM) - Graduated 2025', '/F1', 9);
  curY -= 12;
  addText(40, curY, 'Undergraduate Thesis: Pengembangan Sistem Transaksi Layanan Satelit Berbasis Website Pada Perusahaan', '/F3', 8.8);
  curY -= 11;
  addText(40, curY, 'Jasa Telekomunikasi (Studi Kasus: PT. XYZ) - Comprehensive analysis, UI/UX modeling, and quality validation.', '/F3', 8.8);

  curY -= 20;

  // 5. CERTIFICATIONS
  renderSection('Certifications & Credentials');

  const certs = [
    'MSIB Batch 6 Certified - Ministry of Education, Culture, Research, and Technology (Telkomsat)',
    'Global Finance Technology (GFT) Certification',
    'Microsoft Office Specialist (MOS) Certified',
  ];

  for (const c of certs) {
    setColor(108, 92, 231);
    addText(46, curY, '*', '/F2', 10);
    setColor(50, 55, 70);
    addText(58, curY, c, '/F1', 9);
    curY -= 13;
  }

  // Footer bar
  setColor(240, 243, 248);
  drawRect(40, 22, W - 80, 20, true, false);
  setColor(120, 130, 150);
  addText(48, 28, 'Amala Zakira  |  Software QA Engineer Portfolio  |  Available for Full-time & Project/Freelance Roles', '/F1', 8);

  const streamContent = streamCommands.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf-8');

  // Build PDF structure
  // Obj 1: Catalog
  // Obj 2: Pages
  // Obj 3: Page
  // Obj 4: Content Stream
  // Obj 5: Font F1 (Helvetica)
  // Obj 6: Font F2 (Helvetica-Bold)
  // Obj 7: Font F3 (Helvetica-Oblique)

  const bodyParts = [];
  const offsets = [];

  function addPdfObject(str) {
    const currentOffset = bodyParts.reduce((acc, p) => acc + Buffer.byteLength(p, 'utf-8'), 0) + '%PDF-1.4\n'.length;
    offsets.push(currentOffset);
    bodyParts.push(str);
  }

  addPdfObject(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);
  addPdfObject(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`);
  addPdfObject(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>\nendobj\n`);
  addPdfObject(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`);
  addPdfObject(`5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`);
  addPdfObject(`6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`);
  addPdfObject(`7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj\n`);

  const header = '%PDF-1.4\n';
  const body = bodyParts.join('');
  const xrefOffset = Buffer.byteLength(header + body, 'utf-8');

  let xref = `xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xref += String(off).padStart(10, '0') + ' 00000 n \n';
  }

  const trailer = `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const finalPdf = Buffer.from(header + body + xref + trailer, 'utf-8');
  
  const destPath = path.resolve(__dirname, 'public', 'cv-amala-zakira.pdf');
  fs.writeFileSync(destPath, finalPdf);
  console.log('Successfully generated CV PDF at:', destPath);
}

createCvPdf();
