import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

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