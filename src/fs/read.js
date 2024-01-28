import fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FS_OPERATION_FAILED } from './utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFile = resolve(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        const data = await fs.readFile(readFile, { encoding: 'utf8' });
        console.log(data);
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new Error(FS_OPERATION_FAILED);
        }
    }
};

await read();