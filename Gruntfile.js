module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: { force: true},
            all: {
                src: ['build/**/*.*']
            }
        },
        concat: {
            dist: {
                src: ['src/js/**/*.js', '<%= ngtemplates.app.dest %>'],
                dest: 'build/mdi-desktop.js',
                nonull: true
            }
        },
        ngtemplates:  {
            app: {
                src: 'src/**/*.html',
                dest: 'build/templates.js',
                options: {
                    module: 'mdi.desktop'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/mdi-desktop.min.js': ['build/mdi-desktop.js']
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'build',
                add:true,
                user: {
                    name: 'smithscripts',
                    email: 'rob.smith@outlook.com'
                }
            },
            src: '**/*'

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
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-karma');


    grunt.registerTask('default', [
        'clean',
        'ngtemplates',
        'concat',
        'uglify',
        'gh-pages',
        'karma:unit']);
}