import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fork } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const childProcessPath = resolve(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const childProcess = fork(childProcessPath, args, { silent: true });
    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
await spawnChildProcess([ 36, 'bar', 55, 'foo', 'baz' ]);
