// utils/env.js
 
const path = require('path');
 
const fs = require('fs');
 
const dotenv = require('dotenv');
 
/* -------------------------------------------------------------------------- */
/* Environment */
/* -------------------------------------------------------------------------- */
 
const currentEnv =
  process.env.TEST_ENV || 'qa';
 
/* -------------------------------------------------------------------------- */
/* Environment File */
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
 
❌ Environment file not found:
 
${envFilePath}
 
`);
}
 
/* -------------------------------------------------------------------------- */
/* Load Environment Variables */
/* -------------------------------------------------------------------------- */
 
dotenv.config({
 
  path: envFilePath,
 
  override: true,
});
 
/* -------------------------------------------------------------------------- */
/* Environment Object */
/* -------------------------------------------------------------------------- */
 
const ENV = {
 
  ENV: currentEnv,
 
  BASE_URL:
    process.env.BASE_URL,
 
  USERNAME:
    process.env.USERNAME,
 
  PASSWORD:
    process.env.PASSWORD,
 
  HEADLESS:
    process.env.HEADLESS || 'false',
 
  SLOW_MO:
    process.env.SLOW_MO || '0',
};
 
/* -------------------------------------------------------------------------- */
/* Freeze Object */
/* -------------------------------------------------------------------------- */
 
Object.freeze(ENV);
 
module.exports = ENV;