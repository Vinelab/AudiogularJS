module.exports = function (grunt) {

   require('load-grunt-tasks')(grunt);
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      serve: {
         options: {
            port: 9000
         }
      },
      babel: {
         options: {
            sourceMap: true
         },
         dist: {
            files: {
               'src/audiogularjs.js': 'app/**/*.js'
            }
         }
      }
      //,
      //typescript: {
      //   base: {
      //      src: ['app/**/*.ts'],
      //      dest: 'src/audiogularjs.js',
      //      options: {
      //         watch: true
      //      }
      //   }
      //}
   });
};