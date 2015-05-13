module.exports = function (grunt) {

   require('load-grunt-tasks')(grunt);
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      serve: {
         options: {
            port: 9000
         }
      },
      typescript: {
         base: {
            src: ['app/**/*.ts'],
            dest: 'src/audiogularjs.js',
            options: {
               watch: true
            }
         }
      }
   });
};