import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const LOCK_PATH = resolve('scripts/vendor-lock.json');
const VENDOR_FILES = [
  'public/vendor/mailerlite/universal.js',
  'public/vendor/simple-analytics/latest.js',
];

const checksum = async (filePath) => {
  const contents = await readFile(resolve(filePath));
  return createHash('sha256').update(contents).digest('hex');
};

const currentChecksums = Object.fromEntries(
  await Promise.all(
    VENDOR_FILES.map(async (filePath) => [filePath, await checksum(filePath)]),
  ),
);

if (process.argv.includes('--write')) {
  await writeFile(LOCK_PATH, `${JSON.stringify(currentChecksums, null, 2)}\n`, 'utf8');
  console.log(`Updated ${LOCK_PATH}`);
  process.exit(0);
}

const expectedChecksums = JSON.parse(await readFile(LOCK_PATH, 'utf8'));
const mismatches = VENDOR_FILES.filter(
  (filePath) => expectedChecksums[filePath] !== currentChecksums[filePath],
);

if (mismatches.length > 0) {
  throw new Error(
    `Vendor integrity check failed for: ${mismatches.join(', ')}. Run pnpm update:vendor to intentionally refresh vendor files.`,
  );
}

console.log('Vendor integrity check passed.');
