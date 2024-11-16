import fs from 'node:fs';
import yaml from 'js-yaml';
import crypto from 'node:crypto';

const fileContents = fs.readFileSync('wedding-config.yaml', 'utf8');
const data = yaml.load(fileContents);
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
  'wedding-config.yaml',
  yaml.dump(data, { quotingType: '"', lineWidth: -1 })
);

console.log('Updated hashes in wedding-config.yaml');