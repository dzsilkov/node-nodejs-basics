import fs from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { FS_OPERATION_FAILED } from './utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = resolve(__dirname, 'files');
const targetDir = resolve(__dirname, 'files_copy');

const copyDir = async (srcPath, destPath) => {
    const srcFiles = await fs.readdir(srcPath, { withFileTypes: true });
    await fs.mkdir(destPath, { recursive: false });
    return Promise.all(
        srcFiles.map(async (file) => file.isFile()
            ? await fs.copyFile(resolve(file.path, file.name), resolve(destPath, file.name))
            : await copyDir(resolve(file.path, file.name), resolve(destPath, file.name))
        )
    );
};

const copy = async () => {
    try {
        await copyDir(srcDir, targetDir);
    } catch (e) {
        if (e.code === 'EEXIST' || e.code === 'ENOENT') {
            throw new Error(FS_OPERATION_FAILED);
        }
    }
};

await copy();
