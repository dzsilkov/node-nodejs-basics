const findEnvVar = (varKey) => {
    let entries = [];
    for (const key in process.env) {
        if (key.startsWith(varKey)) {
            entries.push(`${ key }=${ process.env[key] }`);
        }
    }
    return entries.join('; ');
};

const parseEnv = () => {
    try {
        const parsedEnv = findEnvVar('RSS_');
        console.log(parsedEnv);
    } catch (e) {
        console.log(e);
    }
};

parseEnv();