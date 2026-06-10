const { defineConfig, devices } = require('@playwright/test');
const ENV = require('./utils/env');

module.exports = defineConfig({

    testDir: './tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    timeout: 120000,

    expect: {
        timeout: 30000
    },

    globalSetup: require.resolve('./hooks/globalSetup'),

    reporter: [
        [
            'html',
            {
                outputFolder: 'playwright-report',
                open: 'never'
            }
        ],
        [
            'allure-playwright'
        ],
        [
            'list'
        ]
    ],

    use: {

        baseURL: ENV.BASE_URL,

        viewport: null,

        ignoreHTTPSErrors: true,

        actionTimeout: 30000,

        navigationTimeout: 60000,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure',

        launchOptions: {

            headless: ENV.HEADLESS,

            slowMo: ENV.SLOW_MO,

            args: [
                '--start-maximized'
            ]
        }
    },

    projects: [

        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
                storageState: './storageStates/admin.json'
            }
        },

        {
            name: 'firefox',

            use: {
                ...devices['Desktop Firefox'],
                storageState: './storageStates/admin.json'
            }
        },

        {
            name: 'webkit',

            use: {
                ...devices['Desktop Safari'],
                storageState: './storageStates/admin.json'
            }
        },

        {
            name: 'msedge',

            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
                storageState: './storageStates/admin.json'
            }
        }
    ],

    outputDir: 'test-results'
});