const parseArgs = () => {
    const args = [];
    process.argv.forEach((arg, idx, arr) => {
        if (arg.startsWith('--')) {
            args.push(`${ arg.slice(2) } is ${ arr[idx + 1] }`);
        }
    });
    console.log(args.join(', '));
};

parseArgs();