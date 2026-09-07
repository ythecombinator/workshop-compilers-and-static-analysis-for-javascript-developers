/**
 * Radius Tracker — workshop app adoption graph (UI kit vs homebrew).
 *
 *   yarn demo:radius-tracker          # scan + report
 *   yarn demo:radius-tracker:report   # report only (needs ./usages.sqlite.gz)
 *   yarn demo:radius-tracker:serve    # open dashboard
 *
 * DB is always `./usages.sqlite.gz` — never under `radius-tracker-report/`
 * (`report` deletes that outdir before copying the database).
 */
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { banner, fail, kv, ok, step } from '@utils/cli';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workshopRoot = join(__dirname, '..');

const TARGET_RE = 'src/components/ui';
const IGNORED_FILE_RE =
  'demos-fixtures|node_modules|dist|radius-tracker-report|scripts';
const DATABASE = 'usages.sqlite.gz';
const REPORT_DIR = 'radius-tracker-report';

function radius(args: string[]) {
  return new Promise<number>((resolve, reject) => {
    const child = spawn('npx', ['--yes', 'radius-tracker', ...args], {
      cwd: workshopRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    child.on('error', reject);
    child.on('exit', (code) => resolve(code ?? 1));
  });
}

async function main() {
  banner('Radius Tracker', 'workshop UI kit vs homebrew');
  kv('project', '.');
  kv('targetRe', TARGET_RE);
  kv('database', DATABASE);
  kv('report', REPORT_DIR);

  step('1/2', 'in-place usage scan');
  const scanCode = await radius([
    'in-place',
    '.',
    '--targetRe',
    TARGET_RE,
    '--ignoredFileRe',
    IGNORED_FILE_RE,
    '--tsconfigPath',
    'tsconfig.json',
    '--outfile',
    DATABASE,
  ]);
  if (scanCode !== 0) {
    fail(`Radius Tracker in-place exited ${scanCode}`);
    process.exitCode = scanCode;
    return;
  }
  ok(`Wrote ${DATABASE}`);

  step('2/2', 'static report');
  const reportCode = await radius([
    'report',
    '--database',
    DATABASE,
    '--outdir',
    REPORT_DIR,
  ]);
  if (reportCode !== 0) {
    fail(`Radius Tracker report exited ${reportCode}`);
    process.exitCode = reportCode;
    return;
  }

  ok('Report ready · yarn demo:radius-tracker:serve');
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
