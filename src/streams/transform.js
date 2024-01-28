import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

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