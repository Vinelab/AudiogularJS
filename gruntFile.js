module.exports = function (grunt) {

   require('load-grunt-tasks')(grunt);
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      serve: {
         options: {
            port: 9000
         }
      }
   });
};