import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const targetFile = resolve(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    try {
        const writeStream = createWriteStream(targetFile);
        process.stdout.write('')
        await pipeline(process.stdin, writeStream);
    } catch (e) {
        console.log(e);
    }
};

await write();