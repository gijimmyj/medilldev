var os = require('os');
var path = require('path');
var package = require('../package.json');

// browserify transforms
var requireGlobify = require('require-globify');

// configuration for gulp tasks
module.exports = {
  browserSync: {
    opts: {
      server: 'dist'
    }
  },
  browserify: {
    src: 'src/js/script.js',
    bundle: 'script.js',
    dist: 'dist/js',
    watch: 'src/js',
    resave: 'src/js/script.js',
    opts: {
      cache: {},
      packageCache: {},
      debug: true,
      transform: [requireGlobify]
    }
  },
  clean: {
    target: 'dist'
  },
  videos: {
    src: 'src/videos/**/*',
    dist: 'dist/videos'
  },
  json: {
    src: 'src/index.json',
    dist: 'dist/'
  },
  map: {
    src: 'src/js/map.js',
    dist: 'dist/js'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dist: 'dist/fonts'
  },
  images: {
    src: 'src/img/**/*',
    dist: 'dist/img'
  },
  lint: {
    format: ['*', 'gulpfile.js/**/*', 'src/**/*', '!src/svgstore/**/*'],
    js: ['gulpfile.js/**/*.js', 'src/js/**/*.js'],
    sass: 'src/sass/**/*.scss'
  },
  nunjucks: {
    src: 'src/html/**/[^_]*.html',
    dist: 'dist',
    watch: 'src/html/**/*.html',
    opts: {
      searchPaths: 'src/html'
    },
    htmlmin: {
      collapseWhitespace: true
    }
  },
  sass: {
    src: 'src/sass/**/*.scss',
    dist: 'dist/css',
    autoprefixer: {
      browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'IE >= 9'],
      cascade: false
    },
    cssnano: {
      autoprefixer: false,
      safe: true
    }
  },
  svgstore: {
    src: 'src/svgstore/**/*.svg',
    dist: 'dist/img',
    template: 'src/svgstore/util/_template.mustache',
    sass: '_svgstore.scss',
    out: 'src/sass/util',
    opts: {
      inlineSvg: true
    },
    imagemin: {
      svgoPlugins: [
      {removeTitle: true}
      ]
    }
  }
};
