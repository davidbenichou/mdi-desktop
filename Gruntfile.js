module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: { force: true},
            all: {
                src: ['build/**/*.*']
            }
        },
        copy: {
            build: {
                cwd: 'src',
                src: [ '**' ],
                dest: 'build',
                expand: true
            },
        },
        concat: {
            dist: {
                src: ['src/js/**/*.js'],
                dest: 'build/mdi-desktop.js',
                nonull: true
            }
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

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['clean', 'copy', 'concat', 'karma:unit']);

    grunt.registerTask('default', ['']);
}