import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

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