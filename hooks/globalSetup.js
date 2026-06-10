const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ENV = require('../utils/env');

async function globalSetup() {

    console.log(`
==================================================
🚀 GLOBAL SETUP STARTED
==================================================
`);

    /* -------------------------------------------------------------------------- */
    /* Create Storage State Directory */
    /* -------------------------------------------------------------------------- */

    const storageStateDir = path.resolve(
        __dirname,
        '../storageStates'
    );

    if (!fs.existsSync(storageStateDir)) {

        fs.mkdirSync(storageStateDir, {
            recursive: true
        });
    }

    /* -------------------------------------------------------------------------- */
    /* Launch Browser */
    /* -------------------------------------------------------------------------- */

    const browser = await chromium.launch({

        headless: ENV.HEADLESS
    });

    const context = await browser.newContext({

        viewport: {
            width: 1920,
            height: 1080
        },

        ignoreHTTPSErrors: true
    });

    const page = await context.newPage();

    try {

        console.log('🔐 Creating Storage State...');

        await page.goto(
            ENV.BASE_URL,
            {
                waitUntil: 'networkidle',
                timeout: 60000
            }
        );

        await page.locator('#txtUsername')
            .fill(ENV.USERNAME);

        await page.locator('#txtPassword')
            .fill(ENV.PASSWORD);

        await Promise.all([

            page.waitForURL(
                '**/dashboard/new-dashboard',
                {
                    timeout: 60000
                }
            ),

            page.locator('#btnSave').click()
        ]);

        await page.waitForLoadState(
            'networkidle'
        );

        await context.storageState({

            path: './storageStates/admin.json'
        });

        console.log(
            '✅ Storage State Saved Successfully'
        );

    } catch (error) {

        console.error(`
❌ GLOBAL SETUP FAILED

${error.message}
`);

        throw error;

    } finally {

        await context.close();

        await browser.close();

        console.log(`
==================================================
✅ GLOBAL SETUP COMPLETED
==================================================
`);
    }
}

module.exports = globalSetup;