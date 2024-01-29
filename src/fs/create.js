import fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FS_OPERATION_FAILED } from './utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = resolve(__dirname, 'files', 'fresh.txt');
const content = 'I am fresh and young';

const create = async () => {
    try {
        await fs.writeFile(file, content, { flag: 'wx' });
    } catch (e) {
        if (e.code === 'EEXIST') {
            throw new Error(FS_OPERATION_FAILED);
        }
    }
};

await create();
