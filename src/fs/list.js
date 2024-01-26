import fs from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { FS_OPERATION_FAILED } from './utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = resolve(__dirname, 'files');

const list = async () => {
    try {
        const files = await fs.readdir(srcDir);
        console.log(files);
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw new Error(FS_OPERATION_FAILED);
        }
    }
};

await list();