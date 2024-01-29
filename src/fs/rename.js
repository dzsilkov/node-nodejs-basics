import fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FS_OPERATION_FAILED } from './utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcFile = resolve(__dirname, 'files', 'wrongFilename.txt');
const targetFile = resolve(__dirname, 'files', 'properFilename.md');

const rename = async () => {
    try {
        const isTargetExist = !!(await fs.stat(targetFile).catch(() => false));
        if (isTargetExist) {
            throw new Error(FS_OPERATION_FAILED);
        } else {
            await fs.rename(srcFile, targetFile);
        }
    } catch (e) {

        console.log(e);
        if (e.code === 'ENOENT') {
            throw new Error(FS_OPERATION_FAILED);
        }
    }
};

await rename();