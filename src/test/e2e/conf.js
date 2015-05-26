exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'src/test/e2e/e2e.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': { 'args': ['incognito'] }
    },


    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};