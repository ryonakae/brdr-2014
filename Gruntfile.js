// livereload用の設定
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, dir) {
    return connect.static(path.resolve(dir));
  };


module.exports = function(grunt){
  // 読み込むプラグインの設定
  var taskName;
  var pkg = grunt.file.readJSON('package.json');
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }


  // 各タスクの設定
  grunt.initConfig({
    // package.jsonの定義
    pkg: pkg,

    // ディレクトリの定義
    dir: {
      src: 'src',
      dest: 'dest',
      wordpress: 'wordpress'
    },

    // connect ブラウザ自動更新
    connect: {
      server: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            // http://localhost:9001/ でルートディレクトリを設定
            return [
              lrSnippet,
              folderMount(connect, 'src')
            ];
          }
        }
      }
    },

    // open gruntコマンド実行時にページをブラウザで開く
    open: {
      server: {
        path: 'http://localhost:<%= connect.livereload.options.port %>'
      }
    },

    // watch フォルダ監視
    watch: {
      // options
      options: {
        livereload: true,
        nospawn: true
      },
      // html
      html: {
        files: '<%= dir.src %>/**/*.html'
      },
      // Sass
      sass: {
        files: '<%= dir.src %>/sass/**/**',
        tasks: ['compass']
      },
      // Java Script
      scripts: {
        files: '<%= dir.src %>/js/**/*.js',
        tasks: ['jshint']
      },
      // dest
      dest: {
        files: '<%= dir.dest %>/**',
        tasks: ''
      }
    },

    // contrib-compass Compassのコンパイル
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    // grunt-autoprefixer ベンダープレフィックスの追加/削除
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      default: {
        src: '<%= dir.src %>/css/style.css',
        dest: '<%= dir.dest %>/css/style.css'
      }
    },

    // grunt-csso css圧縮
    csso: {
      default: {
        src: '<%= autoprefixer.default.dest %>',
        dest: '<%= autoprefixer.default.dest %>'
      }
    },

    // grunt-csscomb cssプロパティをソート
    csscomb: {
      default: {
        src: '<%= autoprefixer.default.dest %>',
        dest: '<%= autoprefixer.default.dest %>'
      }
    },

    // combine-media-queries メディアクエリをまとめる
    cmq: {
      options: {
        log: false
      },
      main: {
        files: {
          '<%= dir.dest %>/css/': ['<%= autoprefixer.default.dest %>']
        }
      }
    },

    // copy ファイルのコピー
    copy: {
      html: {
        expand: true,
        cwd: '<%= dir.src %>/',
        src: '**/*.html',
        dest: '<%= dir.dest %>/'
      },
      css: {
        expand: true,
        cwd: '<%= dir.src %>/',
        src: '**/*.css',
        dest: '<%= dir.dest %>/'
      },
      img: {
        expand: true,
        cwd: '<%= dir.src %>/',
        src: 'img/**',
        dest: '<%= dir.dest %>/'
      },
      js: {
        expand: true,
        cwd: '<%= dir.src %>/',
        src: 'js/**',
        dest: '<%= dir.dest %>/'
      },
      files: {
        expand: true,
        cwd: '<%= dir.src %>/',
        src: 'font/**',
        dest: '<%= dir.dest %>/',
        filter: 'isFile'
      }
    },

    // clean 不要ファイルを削除
    clean: {
      dest: {
        src: [
          '<%= dir.dest %>/*/',
          '<%= dir.dest %>/*.html',
          '!<%= dir.dest %>/*.php',
          '!<%= dir.dest %>/style.css'
        ]
      }
    },

    // concat
    concat: {
      jsdefault: {
        src: [
          '<%= dir.src %>/js/core/jquery.min.js',
          '<%= dir.src %>/js/core/jquery.easing.min.js',
          '<%= dir.src %>/js/core/jquery.transit.min.js',
          '<%= dir.src %>/js/lib/*.js'
        ],
        dest: '<%= dir.dest %>/js/script.js'
      },
      license: {
        src: [
          '<%= dir.src %>/js/license/license.js',
          '<%= dir.dest %>/js/script.js'
        ],
        dest: '<%= concat.jsdefault.dest %>'
      }
    },

    // jshint
    jshint: {
      options: {
        jshintrc: '<%= dir.src %>/js/.jshintrc'
      },
      src: '<%= dir.src %>/js/<%= pkg.name %>.js'
    },

    // uglify JSの圧縮
    uglify: {
      build: {
        src: '<%= dir.src %>/js/<%= pkg.name %>.js',
        dest: '<%= dir.dest %>/js/<%= pkg.name %>.js'
      }
    }
  });


  // gruntコマンドで実行するタスクの設定
  // デフォルト(作業時)
  grunt.registerTask('default', [
    'connect',
    // 'open',
    'watch',
    'compass',
    'jshint'
  ]);

  // 公開時
  grunt.registerTask('dest', [
    'clean:dest',
    'compass',
    'autoprefixer',
    'cmq',
    'csscomb',
    'csso',
    'concat:jsdefault',
    'jshint',
    'uglify',
    // 'concat:license',
    'copy:html',
    'copy:img',
    'copy:files'
  ]);
};