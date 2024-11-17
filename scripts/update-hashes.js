import fs from 'node:fs';
import yaml from 'js-yaml';
import crypto from 'node:crypto';

const CONFIG_FILE = 'wedding-config.yaml';

// Default empty config structure
const defaultConfig = {
  invites: []
};

// Try to read existing config or use default
let data;
try {
  const fileContents = fs.readFileSync(CONFIG_FILE, 'utf8');
  data = yaml.load(fileContents);
  if (!data.invites) {
    data.invites = [];
  }
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log(`${CONFIG_FILE} not found, creating new file with empty invites array`);
    data = defaultConfig;
  } else {
    throw error; // Re-throw if it's a different error
  }
}

const usedHashes = new Set();

// Update hashes where missing and reorder properties
data.invites = data.invites.map(invite => {
  if (!invite.hash) {
    let hash;
    do {
      hash = crypto
        .createHash('md5')
        .update(invite.invite_key)
        .digest('hex')
        .slice(0, 8);
    } while (usedHashes.has(hash));
    invite.hash = hash;
  }
  usedHashes.add(invite.hash);

  return {
    hash: invite.hash,
    invite_key: invite.invite_key,
    emails: invite.emails,
    guests: invite.guests
  };
});

fs.writeFileSync(
  CONFIG_FILE,
  yaml.dump(data, { quotingType: '"', lineWidth: -1 })
);

console.log(`Updated hashes in ${CONFIG_FILE}`);