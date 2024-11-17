import { execSync } from 'child_process';

const REPO = 'ainara-luke/ainara-luke.github.io';

try {
  // Trigger the deployment
  execSync(`gh workflow run deploy.yml -R ${REPO}`, {
    stdio: 'inherit'
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
