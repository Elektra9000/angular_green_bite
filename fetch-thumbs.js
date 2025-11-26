// fetch-thumbs.js (Node-only, compatibile Windows/macOS/Linux)
const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

const outDir = path.join(__dirname, 'src', 'assets', 'fruits');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const fruits = ['banana','apple','strawberry','orange','lemon','kiwi','mango','pear','grape','pineapple'];

function downloadFile(remoteUrl, dest) {
  return new Promise((resolve, reject) => {
    const options = url.parse(remoteUrl);
    options.headers = { 'User-Agent': 'node-fetch-thumbs' };
    https.get(options, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        return resolve(downloadFile(res.headers.location, dest));
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Response status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
      file.on('error', err => reject(err));
    }).on('error', reject);
  });
}

(async () => {
  for (const name of fruits) {
    const dest = path.join(outDir, `${name.toLowerCase().replace(/\s+/g,'-')}.jpg`);
    const remote = `https://source.unsplash.com/400x400/?${encodeURIComponent(name)}`;
    try {
      console.log('Downloading', name);
      await downloadFile(remote, dest);
      console.log('Saved', dest);
    } catch (e) {
      console.error('Error for', name, e.message);
    }
  }
  const fallback = path.join(outDir, 'fallback.jpg');
  if (!fs.existsSync(fallback)) {
    try {
      console.log('Downloading fallback');
      await downloadFile('https://source.unsplash.com/400x400/?fruit', fallback);
      console.log('Saved fallback', fallback);
    } catch (e) {
      console.error('Fallback error', e.message);
    }
  }
  console.log('Done');
})();
