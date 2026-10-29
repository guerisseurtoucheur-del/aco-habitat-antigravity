const fs = require('fs');
try {
  const content = fs.readFileSync('.env.local', 'utf8');
  const lines = content.split('\n');
  const geminiLine = lines.find(l => l.startsWith('GEMINI_API_KEY='));
  if (geminiLine) {
    if (geminiLine.includes('encrypted:')) {
      console.log('YES, it is encrypted by dotenvx!');
    } else {
      console.log('NO, it is plain text. Length:', geminiLine.length);
      console.log('Starts with:', geminiLine.substring(15, 25));
    }
  } else {
    console.log('Not found');
  }
} catch(e) { console.error(e) }
