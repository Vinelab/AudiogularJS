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
            js: {
                files: {
                    'temp/app.js': ['src/app.module.js', 'src/classes/*.js', 'src/**/*.js']
                }
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

        /* watch changes on js files in  app directory and run the tasks : concat - babel above*/
        watch: {
            files: ['src/**/*.js'],
            tasks: ['concat', 'babel']
        }

    });
    grunt.registerTask('default', 'concat files from app and store in <temp> then transform to es5 and watch changes', ['concat', 'babel', 'watch']);
};