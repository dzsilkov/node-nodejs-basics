import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFile = resolve(__dirname, 'files', 'fileToRead.txt');


const read = async () => {
    try {
        const fileStream = createReadStream(readFile);
        await pipeline(fileStream, process.stdout);
    } catch (e) {
        console.log(e);
    }
};

await read();