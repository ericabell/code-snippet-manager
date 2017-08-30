module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mongodb-fixtures');

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mongodb_fixtures: {
      files: {
        
      }
      options: {
        // task-specific options go here
      },
      your_target: {
        // target-specific file lists and/or options go here
      }
    },
  });

  // Register tasks
  grunt.registerTask('default', 'Log some stuff', function() {
    grunt.log.write('Logging some stuff...').ok();
  });


};
