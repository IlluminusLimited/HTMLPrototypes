/* eslint no-undef: 0 */
module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    config: {
      source: 'site',
      dest: 'dist',
      temp: '.tmp'
    },

    eslint: {
      // http://eslint.org/docs/rules/
      target: '<%= config.source %>/js/**/*'
    },

    sasslint: {
      // https://github.com/sasstools/sass-lint/tree/master/docs/rules
      target: '<%= config.source %>/scss/**/*'
    },

    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '<%= config.temp %>/*',
            '<%= config.dest %>/*'
          ]
        }]
      }
    },

    sass: {
      options: {
        style: 'compressed',
        sourceMap: true,
        includePaths: [
          '<%= config.source %>/scss/',
          './node_modules/'
        ]
      },
      build: {
        files: {
          '<%= config.temp %>/main.css': '<%= config.source %>/assets/scss/main.scss',
        }
      },
    },

    postcss: {
      options: {
        map: {
          annotation: true,
          sourcesContent: true
        },
        processors: [
          // browser list is managed in package.json
          // http://browserl.ist/?q=defaults
          require('autoprefixer'),
          require('postcss-csso'),
        ]
      },
      dist: {
        src: '<%= config.temp %>/main.css'
      }
    },

    concat: {
      options: {
        stripBanners: true,
        sourceMap: true,
      },

      js: {
        options: { separator: ';\n', },
        src: [
          "node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js",
          "<%= config.temp %>/script.min.js"
        ],
        dest: "<%= config.dest %>/main.min.js",
      },

      css: {
        src: [
          "node_modules/normalize.css/normalize.css",
          "<%= config.temp %>/main.css",
        ],
        dest: "<%= config.dest %>/main.min.css",
      }
    },

    uglify: {
      options: {
        sourceMap: true,
      },
      main: {
        files: [{
          src: [
            "<%= config.source %>/assets/js/main/*.js",
            "<%= config.source %>/assets/js/main.js"
          ],
          dest: "<%= config.temp %>/script.min.js"
        }]
      },
    },

    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: '<%= config.source %>/assets/',
          src: ['{fonts,img,favicons,icons,vendor,video,pdf}/**/*'],
          dest: '<%= config.dest %>/'
        }]
      }
    },

    assemble: {
      options: {
        assets: '<%= config.dest %>',
        data: '<%= config.source %>/data/*',
        flatten: true,
        layout: 'default.hbs',
        layoutdir: '<%= config.source %>/layouts',
        partials: '<%= config.source %>/{partials,content}/**/*.hbs',
      },

      build: {
        options: {
          production: false,
        },
        files: [{
          expand: true,
          cwd: '<%= config.source %>/pages/',
          src: ['**/*.hbs'],
          dest: '<%= config.dest %>/'
        }]
      }
    },

    watch: {
      images: {
        files: [
          '<%= config.source %>/assets/{favicons,icons,img,video,pdf}/*',
          '<%= config.source %>/assets/{favicons,icons,img,video,pdf}/**/*'
        ],
        tasks: ['copy:assets']
      },
      scss: {
        files: '<%= config.source %>/**/*.scss',
        tasks: ['concurrent:scssWatch']
      },
      js: {
        files: '<%= config.source %>/**/*.{json,js}',
        tasks: ['concurrent:jsWatch']
      },
      assemble: {
        files: [
          '<%= config.source %>/**/**/*.hbs',
          '<%= config.source %>/**/*.hbs',
          '<%= config.source %>/data/*',
          '<%= config.source %>/content/**/*.md',
        ],
        tasks: ['assemble']
      }
    },

    browserSync: {
      serve: {
        bsFiles: { src: [ '<%= config.dest %>/**.*' ] },
        options: {
          watchTask: true,
          server: '<%= config.dest %>',
          // browser: ["google chrome"],
          // tunnel: true,
          open: 'local',
          notify: false,
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
          }
        }
      }
    },

    concurrent: {
      scssWatch: ['sasslint', 'buildScss'],
      jsWatch:   ['eslint',   'buildJs'],
      build:  ['buildJs',  'buildScss', 'assemble'],
    }

  });

  // Tasks
  grunt.registerTask('lint',      ['sasslint',    'eslint']);
  grunt.registerTask('preBuild',  ['clean:build', 'copy']);
  grunt.registerTask('buildJs',   ['uglify', 'concat:js']);
  grunt.registerTask('buildScss', ['sass', 'postcss', 'concat:css', 'concat']);

  grunt.registerTask('serve',     ['lint',  'build', 'browserSync', 'watch']);
  grunt.registerTask('build',     ['preBuild', 'concurrent']);

  grunt.registerTask('default',   ['lint',  'build']);
};
