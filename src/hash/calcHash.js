import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFile = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const fileStream = createReadStream(readFile, { encoding: 'utf8' });
    fileStream.on('data', (data) => {
        const hash = createHash('sha256').update(data).digest('hex');
        console.log(hash);
    });
    fileStream.on('error', (err) => {
        console.log(err);
    });
};

await calculateHash();