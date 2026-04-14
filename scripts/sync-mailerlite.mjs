import { access, mkdir, writeFile } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import process from 'node:process';

const execFileAsync = promisify(execFile);

const SOURCE_URLS = [
  'https://assets.mailerlite.com/js/universal.js'
];
const OUTPUT_PATH = resolve('public/vendor/mailerlite/universal.js');

const downloadWithFetch = async (sourceUrl) => {
  const response = await fetch(sourceUrl, {
    headers: {
      'User-Agent': 'cocoboko-website-build'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.text();
};

const downloadWithCurl = async (sourceUrl) => {
  const { stdout } = await execFileAsync('curl', ['-fsSL', sourceUrl], {
    maxBuffer: 5 * 1024 * 1024
  });

  return stdout;
};

const downloadScript = async () => {
  for (const sourceUrl of SOURCE_URLS) {
    try {
      return await downloadWithFetch(sourceUrl);
    } catch {
      try {
        return await downloadWithCurl(sourceUrl);
      } catch {
        // Continue trying the next source URL.
      }
    }
  }

  return null;
};

const syncMailerLite = async () => {
  const script = await downloadScript();

  if (!script) {
    try {
      await access(OUTPUT_PATH, fsConstants.F_OK);
      console.warn(`Could not download MailerLite script. Keeping existing file at ${OUTPUT_PATH}.`);
      return;
    } catch {
      throw new Error('Unable to download MailerLite script from any supported source.');
    }
  }

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, script, 'utf8');
  console.log(`Synced MailerLite script to ${OUTPUT_PATH}`);
};

syncMailerLite().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
