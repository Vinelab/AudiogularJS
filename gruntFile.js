module.exports = function (grunt) {
    /* automatically load grunt tasks  */
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        connect: {
            devserver: {
                options: {
                    port: 9000
                }
            }
        },

        open: {
            devserver: {
                path: 'http://localhost:9000/demo/index.html'
            }
        },

        /* concat all the es6 files and put in temp/app.js */
        concat: {
            main: {
                src: ['src/Module.js', 'src/**/*.js', '!src/test/**/*.js'],
                dest: 'temp/app.js'
            }
        },

        /* convert temp/app.js to es5 on src/audiogularjs.js and create source map*/
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/audiogularjs.js': 'temp/app.js'
                }
            }
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['Chrome'],
                    files: [
                        'bower_components/angularjs/angular.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'dist/audiogularjs.js',
                        'test/unit/*.js'
                    ]
                }
            }
        },

        /* watch changes on js files in  app directory and run the tasks : concat - babel above*/
        watch: {
            main: {
                files: ['src/**/*.js'],
                tasks: ['concat:main', 'babel']
            }
        },

        protractor: {
            options: {
                configFile: "test/e2e/conf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false // If true, protractor will not use colors in its output.
            },
            index: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "test/e2e/conf.js",
                    args: {
                        specs: [
                            'test/e2e/e2e.js'
                        ]
                    }
                }
            }
        }

    });
    grunt.registerTask('default', 'concat files from app and store in <temp> then transform to es5 and watch changes', ['concat', 'babel', 'connect:devserver', 'open:devserver', 'watch']);
    grunt.registerTask('unit', 'run the unit test', ['karma']);
    grunt.registerTask('e2e', 'run the e2e test', ['protractor']);
    grunt.registerTask('build_with_test', 'build and run test', ['concat', 'babel', 'unit','e2e', 'watch']);
};