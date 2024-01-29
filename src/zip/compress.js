import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcFile = resolve(__dirname, 'files', 'fileToCompress.txt');
const compressedFile = resolve(__dirname, 'files', 'archive.gz');


const compress = async () => {
    try {
        const srcStream = createReadStream(srcFile);
        const targetStream = createWriteStream(compressedFile);
        await pipeline(srcStream, createGzip(), targetStream);
    } catch (e) {
        console.log(e);
    }
};

await compress();