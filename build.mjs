import { execSync } from 'child_process';

// Force using npm
process.env.PACKAGE_MANAGER = 'npm';
process.env.BUN_INSTALL = 'false';
process.env.NODE_BUNDLER = 'npm';

try {
  // Install dependencies with npm
  console.log('Installing dependencies with npm...');
  execSync('npm install --legacy-peer-deps --ignore-engines', { stdio: 'inherit' });

  // Run build directly with vite
  console.log('Building project...');
  execSync('npx vite build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 