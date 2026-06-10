const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

/* -------------------------------------------------------------------------- */
/* Environment Selection */
/* -------------------------------------------------------------------------- */

const currentEnv = process.env.TEST_ENV || 'qa';

/* -------------------------------------------------------------------------- */
/* Environment File Path */
/* -------------------------------------------------------------------------- */

const envFilePath = path.resolve(
    __dirname,
    `../config/${currentEnv}.env`
);

/* -------------------------------------------------------------------------- */
/* Validate Environment File */
/* -------------------------------------------------------------------------- */

if (!fs.existsSync(envFilePath)) {
    throw new Error(`
❌ Environment file not found

${envFilePath}
`);
}

/* -------------------------------------------------------------------------- */
/* Load Environment Variables */
/* -------------------------------------------------------------------------- */

dotenv.config({
    path: envFilePath,
    override: true
});

/* -------------------------------------------------------------------------- */
/* Environment Object */
/* -------------------------------------------------------------------------- */

const ENV = {

    ENV: currentEnv,

    BASE_URL: process.env.BASE_URL,

    USERNAME: process.env.USERNAME,

    PASSWORD: process.env.PASSWORD,

    HEADLESS: process.env.HEADLESS === 'true',

    SLOW_MO: Number(process.env.SLOW_MO || 0)
};

/* -------------------------------------------------------------------------- */
/* Required Variable Validation */
/* -------------------------------------------------------------------------- */

const requiredVariables = [
    'BASE_URL',
    'USERNAME',
    'PASSWORD'
];

requiredVariables.forEach((variable) => {

    if (!ENV[variable]) {

        throw new Error(`
❌ Missing Environment Variable

${variable}

Environment: ${currentEnv}
`);
    }
});

/* -------------------------------------------------------------------------- */
/* Freeze Environment */
/* -------------------------------------------------------------------------- */

Object.freeze(ENV);

module.exports = ENV;