import { createUnzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcFile = resolve(__dirname, 'files', 'archive.gz');
const deCompressedFile = resolve(__dirname, 'files', 'fileToCompress.txt');


const decompress = async () => {
    try {
        const srcStream = createReadStream(srcFile);
        const targetStream = createWriteStream(deCompressedFile);
        await pipeline(srcStream, createUnzip(), targetStream);
    } catch (e) {
        console.log(e);
    }
};

await decompress();