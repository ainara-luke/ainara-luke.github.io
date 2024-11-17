import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const CONFIG_PATH = './wedding-config.yaml';
const REPO = 'ainara-luke/ainara-luke.github.io';

try {
  // Read and update the config
  const configContent = readFileSync(CONFIG_PATH, 'utf8');
  execSync(`gh variable set WEDDING_CONFIG -b"${configContent}" -R ${REPO}`, {
    stdio: 'inherit'
  });

  // Trigger the deployment
  execSync(`gh workflow run deploy.yml -R ${REPO}`, {
    stdio: 'inherit'
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}