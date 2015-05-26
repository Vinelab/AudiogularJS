exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'test/e2e/e2e.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },


    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};