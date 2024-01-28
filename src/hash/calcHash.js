import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

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