module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            'dist/all.js': ['src/js/**/*.js']
        },
        // Test settings
        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            unit: {
                singleRun: true,
                options: {
                    reporters: ['dots', 'coverage']
                }
            },
            server: {
                autoWatch: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test', [
        'karma:unit'
    ]);

    grunt.registerTask('default', [
        'concat'
    ]);

}