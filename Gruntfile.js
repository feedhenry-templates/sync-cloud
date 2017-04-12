'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['gruntfile.js', 'application.js', 'lib/**/*.js', 'test/**/*.js'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['public/views/**', 'app/views/**'],
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'application.js',
        options: {
          args: [],
          ignore: ['public/**'],
          ext: 'js,html',
          nodeArgs: [],
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    env : {
      options : {},
      // environment variables - see https://github.com/jsoverson/grunt-env for more information
      local: {
        FH_USE_LOCAL_DB: true
      }
    }
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  grunt.registerTask('serve', ['env:local', 'concurrent']);
  grunt.registerTask('default', ['serve']);
};
