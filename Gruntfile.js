// Generated on 2015-06-05 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  var projectSettings = {
    // Project paths
    app: 'app',
    deps: 'bower_components',
    dist: 'dist',
    tmp: '.tmp',
    tests: 'test',
    webui: 'webui',
    scrollPlugin:'malihu-custom-scrollbar-plugin',

    // Dist folders
    images: 'images',
    fonts: 'fonts',
    js: 'js',
    css: 'css',

    // JS files
    jsFiles: [
      '<%= projectSettings.app %>/app/**/*!(.test).js',
      '<%= projectSettings.app %>/js/**/*!(.test).js',
      '<%= projectSettings.app %>/common/**/*!(.test).js',
      '<%= projectSettings.app %>/modules/**/*!(.test).js'
    ],

    // Images files
    imagesFiles: [
      '<%= projectSettings.app %>/images/*.{png,jpg,jpeg,gif,webp,svg,mp4}',
      '<%= projectSettings.deps %>/images/*.*',
	  '<%= projectSettings.deps %>/<%= projectSettings.webui %>/dist/images/*.*',
    ],

    // Fonts
    fontFiles: [
      '<%= projectSettings.deps %>/font-awesome/fonts/*',
      '<%= projectSettings.deps %>/bootstrap/dist/fonts/*',
      '<%= projectSettings.app %>/fonts/*'
    ],

    // Dependencies exclusion (for index.html inject)
    excludeDeps: [
      'bootstrap.css'
    ]
  };


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    projectSettings: projectSettings,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= projectSettings.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= projectSettings.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
		tasks: ['less'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= projectSettings.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= projectSettings.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,mp4}',
		  '<%= projectSettings.app %>/less/*.less'
        ]
      },
	  less: {
                files: ['<%= projectSettings.app %>/less/*.less'],
                tasks: ['less', 'csslint'],
                options: {
                    nospawn: true
                }
            }
    },

    // The actual grunt server settings
    connect: {
      options: {
        protocol:'http',
        port: 9010,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= projectSettings.dist %>'
        }
      }
    },


    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          '<%= projectSettings.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= projectSettings.dist %>/{,*/}*',
            '!<%= projectSettings.dist %>/.git{,*/}*',
			'styles/{,*/}*.*',
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= projectSettings.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= projectSettings.dist %>/scripts/{,*/}*.js',
          '<%= projectSettings.dist %>/styles/{,*/}*.css',
          '!<%= projectSettings.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,mp4}',
          '!<%= projectSettings.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= projectSettings.app %>/index.html',
      options: {
        dest: '<%= projectSettings.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= projectSettings.dist %>/{,*/}*.html'],
      css: ['<%= projectSettings.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= projectSettings.dist %>',
          '<%= projectSettings.dist %>/images',
          '<%= projectSettings.dist %>/styles'
        ],
		patterns: {
      html: [

        [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg|mp4))/gm, 'Update HTML to reference revved images'],
        [/(styles\/.*?\.(?:css))/gm, 'Update HTML to reference revved css'],
        [/(scripts\/.*?\.(?:js))/gm, 'Update HTML to reference revved js']
      ]
    }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= projectSettings.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= projectSettings.dist %>/scripts/scripts.js': [
    //         '<%= projectSettings.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= projectSettings.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif,mp4}',
          dest: '<%= projectSettings.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= projectSettings.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= projectSettings.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= projectSettings.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= projectSettings.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= projectSettings.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= projectSettings.app %>',
          dest: '<%= projectSettings.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'styles/fonts/{,*/}*.*',
			'<%= projectSettings.fontFiles %>'

          ]
        }, {
          expand: true,
          cwd: '<%= projectSettings.app %>/images',
          dest: '<%= projectSettings.dist %>/images',
          src: ['*']
        }, {
          expand: true,
          cwd: '<%= projectSettings.deps %>/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= projectSettings.dist %>'
        },{
            expand: true,
            cwd: '<%= projectSettings.app %>/common',
            src: '*',
            dest: '<%= projectSettings.dist %>/common'
        },{
			expand: true,
			cwd: '<%= projectSettings.deps %>/font-awesome',
			dest: '<%= projectSettings.dist %>',
			src: 'fonts/*'
        },{
			expand: true,
			cwd: '<%= projectSettings.app %>/data',
			dest: '<%= projectSettings.dist %>/data',
			src: ['*.json']
        },{
          expand: true,
          cwd: '<%= projectSettings.deps %>/<%= projectSettings.webui %>/dist/fonts',
          dest: '<%= projectSettings.dist %>/styles/fonts/',
          src: ['*']
      },{
			expand: true,
			cwd: '<%= projectSettings.deps %>/<%= projectSettings.webui %>/dist/images',
			dest: '<%= projectSettings.dist %>/styles/images/',
			src: ['*']
        },
        {
            expand: true,
            cwd: '<%= projectSettings.deps %>/<%= projectSettings.scrollPlugin %>',
            dest: '<%= projectSettings.dist %>/styles/',
            src: ['*.png']
        },
        {
          expand: true,
          cwd: '<%= projectSettings.deps %>/pdfjs-dist/build',
          src: ['*'],
          dest: '<%= projectSettings.dist %>/bower_components/pdfjs-dist/build'
        },
		{
          expand: true,
          cwd: '<%= projectSettings.deps %>/<%= projectSettings.webui %>/dist/fonts',
          dest: '<%= projectSettings.dist %>/styles/fonts/',
          src: ['*']
      }]
      },
      styles: {
        expand: true,
        cwd: '<%= projectSettings.app %>/styles',
        dest: '.tmp/styles/',
        src: ['*','fonts/*']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        /*'imagemin',*/
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

	//CSS Lint
	csslint: {
	  strict: {
		options: {
		  import: 2
		},
		src: ['<%= projectSettings.dist %>/styles/**/*.css']
	  },
	  lax: {
		options: {
		  import: false
		},
		src: ['<%= projectSettings.dist %>/styles/**/*.css']
	  }
	},
	//LESS
	less: {
		core : {
			files: {'<%= projectSettings.app%>/styles/app.css' : '<%= projectSettings.app%>/less/app.less'}
		}
	},
	//AngularJS GetText
	nggettext_compile: {
		all: {
			files: {
				'<%= projectSettings.app%>/locales/translations.js': ['<%= projectSettings.app%>/locales/*.po']
			}
		},
	},
	//HTML2JS
	html2js: {
      options: {
        base: 'app',
        module: 'seTemplateCacheModule',
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['app/views/**/*.html'],
        dest: 'app/views/se-templates-cache.js'
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      /*'wiredep',*/
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the ""serve"" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
     grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    /*'wiredep',*/
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist'  ,
    //'wiredep',
	'less',
	'nggettext_compile',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
	  'html2js:main',
	  'csslint',
    'concat',
    'ngAnnotate',
	'copy:styles',
    'copy:dist',
    /*'cdnify',*/
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
	'less',
	'nggettext_compile',
    //'newer:jshint',
    //'test',
    'build'
  ]);
};
