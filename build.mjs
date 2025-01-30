import { execSync } from 'child_process';

// Force using npm and disable bun
process.env.PACKAGE_MANAGER = 'npm';
process.env.BUN_INSTALL = 'false';
process.env.NODE_BUNDLER = 'npm';
process.env.CI = 'true';
process.env.DISABLE_BUN = 'true';
process.env.FORCE_NPM = 'true';

try {
  // Clean install directories
  console.log('Cleaning install directories...');
  try {
    execSync('rm -rf node_modules', { stdio: 'inherit' });
    execSync('rm -rf dist', { stdio: 'inherit' });
  } catch (e) {
    console.log('Clean step had some errors, continuing anyway...');
  }

  // Install dependencies with npm
  console.log('Installing dependencies with npm...');
  execSync('npm install --legacy-peer-deps --no-frozen-lockfile', { stdio: 'inherit' });

  // Run build directly with vite
  console.log('Building project...');
  execSync('npx vite build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 