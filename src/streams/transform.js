import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transformReverse = () => {
    return new Transform({
        transform(chunk, encoding, callback) {
            const reversed = `${ chunk }`.trim().split('').reverse().join('');
            callback(null, reversed);
        }
    });
};

const transform = async () => {
    try {
        await pipeline(process.stdin, transformReverse(), process.stdout);
    } catch (e) {
        console.log(e);
    }
};

await transform();