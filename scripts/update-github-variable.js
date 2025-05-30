import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const CONFIG_PATH = './wedding-config.yaml';
const REPO = 'ainara-luke/ainara-luke.github.io';

try {
  // Read and update the config
  const configContent = readFileSync(CONFIG_PATH, 'utf8');

  // Update the secret for github actions
  execSync(`gh secret set WEDDING_CONFIG -b"${configContent}" -R ${REPO}`, {
    stdio: 'inherit'
  });

  // Set a variable in case we need access to the config data
  execSync(`gh variable set WEDDING_CONFIG -b"${configContent}" -R ${REPO}`, {
    stdio: 'inherit'
  });

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
