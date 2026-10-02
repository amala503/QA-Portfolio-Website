const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const outPath = path.resolve(__dirname, 'cv_extracted.txt');
const results = [];

function log(...args) {
  results.push(args.join(' '));
}

try {
  const filePath = path.resolve(__dirname, 'artifacts/qa-portfolio/assets/CV_Amala Zakira - QA.pdf');
  log('Checking path:', filePath);
  if (!fs.existsSync(filePath)) {
    log('File does NOT exist!');
  } else {
    const buf = fs.readFileSync(filePath);
    log('File exists! Size:', buf.length);
    log('Header hex:', buf.subarray(0, 16).toString('hex'));
    log('Header text:', buf.subarray(0, 50).toString('latin1'));

    const content = buf.toString('latin1');
    
    // Look for plain strings
    const tjMatches = content.match(/\(([^()]+)\)\s*Tj/g) || [];
    log('Tj matches count:', tjMatches.length);
    if (tjMatches.length > 0) {
      log('Direct Tj strings:');
      tjMatches.forEach(m => log('  ' + m));
    }

    // Look for streams
    let streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let match;
    let streamCount = 0;
    while ((match = streamRegex.exec(content)) !== null) {
      streamCount++;
      const streamData = Buffer.from(match[1], 'latin1');
      try {
        const decomp = zlib.inflateSync(streamData);
        log(`\n--- Decompressed Stream ${streamCount} (length: ${decomp.length}) ---`);
        const decompText = decomp.toString('utf-8');
        // Extract BT ... ET blocks or Tj / TJ
        const lines = decompText.split(/\r?\n/);
        for (const line of lines) {
          if (line.includes('Tj') || line.includes('TJ') || line.startsWith('(')) {
            log(line);
          }
        }
        // Also dump full decompressed text if short or sample
        log('--- Stream text sample ---');
        log(decompText.slice(0, 2000));
      } catch (err) {
        log(`Stream ${streamCount} is not deflate or failed:`, err.message);
        // Maybe raw text?
        const rawSlice = streamData.slice(0, 200).toString('latin1');
        if (/[\w\s]{20,}/.test(rawSlice)) {
          log(`Stream ${streamCount} raw sample:`, rawSlice);
        }
      }
    }
    log(`Total streams checked: ${streamCount}`);
  }
} catch (e) {
  log('Exception occurred:', e.stack);
}

fs.writeFileSync(outPath, results.join('\n'), 'utf-8');
console.log('Finished writing to', outPath);
