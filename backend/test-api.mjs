import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = resolve(__dirname, 'server.js');

console.log('Starting server...');
const server = spawn('node', [serverPath], {
  cwd: __dirname,
  stdio: 'pipe'
});

server.stdout.on('data', (data) => {
  console.log('[SERVER]', data.toString().trim());
});

server.stderr.on('data', (data) => {
  console.error('[SERVER ERROR]', data.toString().trim());
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Wait for server to start
setTimeout(async () => {
  console.log('\n--- Testing API endpoints ---\n');
  
  const baseUrl = 'http://localhost:5000';
  
  try {
    // Test projects
    const projectsRes = await fetch(`${baseUrl}/api/projects`);
    const projects = await projectsRes.json();
    console.log('Projects: OK (', projects.length, 'items )');
  } catch (e) {
    console.error('Projects API error:', e.message);
  }
  
  try {
    // Test profile
    const profileRes = await fetch(`${baseUrl}/api/profile`);
    const profile = await profileRes.json();
    console.log('Profile: OK');
    console.log('  - footerData:', profile.footerData ? 'Present' : 'Missing');
  } catch (e) {
    console.error('Profile API error:', e.message);
  }
  
  try {
    // Test admin login
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@system', password: 'gutuza.24@' })
    });
    const loginData = await loginRes.json();
    console.log('Login: OK');
  } catch (e) {
    console.error('Login API error:', e.message);
  }
  
  server.kill();
  process.exit(0);
}, 8000);