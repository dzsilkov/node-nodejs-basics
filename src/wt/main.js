import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { cpus } from 'os';
import { Worker } from 'worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = resolve(__dirname, 'worker.js');


const performCalculations = async () => {
    const initialValue = 10;
    const workersP = cpus().map((cp, idx) => {
            return new Promise(resolve => {
                const worker = new Worker(workerPath, { workerData: initialValue + idx });
                worker.on('message', (data) => resolve({ status: 'resolved', data }));
                worker.on('error', () => resolve({ status: 'error', data: null }));
            });
        }
    );
    const result = await Promise.all(workersP);
    console.log(result);
};

await performCalculations();