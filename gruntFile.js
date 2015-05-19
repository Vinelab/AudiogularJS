module.exports = function (grunt) {
    /* automatically load grunt tasks  */
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* serve task to run the serve on 9000*/
        serve: {
            options: {
                port: 9000
            }
        },

        /* concat all the es6 files and put in temp/app.js */
        concat: {
            main: {
                'temp/app.js': ['src/app.module.js', 'src/classes/AudiogularState.js', 'src/classes/*.js', 'src/**/*.js', '!src/test/**/*.js']
            },
            test: {
                'temp/app.test.js': ['src/test/**/*.js']
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
                    background: true,
                    browsers: ['PhantomJS'],
                    files: [
                        'bower_components/angularjs/angular.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'dist/audiogularjs.js',
                        'dist/audiogularjs.test.js'
                    ]
                }
            }
        },

        /* watch changes on js files in  app directory and run the tasks : concat - babel above*/
        watch: {
            main: {
                files: ['src/**/*.js'],
                tasks: ['concat:main', 'babel']
            },
            test: {
                files: ['src/test/**/*.js'],
                tasks: ['concat:test']
            }
        }

    });
    grunt.registerTask('default', 'concat files from app and store in <temp> then transform to es5 and watch changes', ['concat', 'babel', 'watch']);
    grunt.registerTask('test', 'run the test', ['karma:unit']);
    grunt.registerTask('build_with_test', 'build and run test', ['concat', 'babel', 'karma:unit', 'watch']);
};