import fs from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { FS_OPERATION_FAILED } from './utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcFile = resolve(__dirname, 'files', 'wrongFilename.txt');
const targetFile = resolve(__dirname, 'files', 'properFilename.md');

const renameFile = async (src, target, err) => {
    const isTargetExist = !!(await fs.stat(target).catch(() => false));
    if (!isTargetExist) {
        await fs.rename(src, target);
    } else {
        throw new Error(err);
    }
};

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