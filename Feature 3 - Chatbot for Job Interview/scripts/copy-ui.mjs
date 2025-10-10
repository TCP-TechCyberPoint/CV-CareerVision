import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const uiDist = path.resolve(projectRoot, 'interview-coach-ui', 'dist');
const apiDist = path.resolve(projectRoot, 'dist');
const target = path.resolve(apiDist, 'public');

if (!fs.existsSync(uiDist)) {
  console.error(`[copy-ui] UI dist not found at ${uiDist}. Did you run the UI build?`);
  process.exit(1);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
fs.cpSync(uiDist, target, { recursive: true });
console.log(`[copy-ui] Copied ${uiDist} -> ${target}`);

