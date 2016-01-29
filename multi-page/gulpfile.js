var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gulpJade = require('gulp-jade'),
    jade = require('jade'),
    stylus = require('gulp-stylus'),
    rename = require('gulp-rename'),
    data = require('gulp-data'),
    nib = require('nib'),
    glob = require('glob'),
    webpack = require('webpack'),
    bs = require('browser-sync').create(),
    fse = require('fs-extra'),
    fs = require('fs'),
    path = require('path');


var Path = {
  libs: {
    css: path.join(__dirname, 'src/libs/css/index.styl'),
    js: path.join(__dirname, 'src/libs/js/index.js')
  },
  common: {
    css: path.join(__dirname, 'src/common/css/index.styl'),
    js: path.join(__dirname, 'src/common/js/index.js')
  },
  pages: {
    html: path.join(__dirname, 'src/pages/*/index.jade'),
    css: path.join(__dirname, 'src/pages/*/index.styl'),
    js: path.join(__dirname, 'src/pages/*/index.js')
  },
  resources: path.join(__dirname, 'src/resources/'),
  dest: {
    html: path.join(__dirname, 'build/'),
    css: path.join(__dirname, 'build/static/css/'),
    js: path.join(__dirname, 'build/static/js/'),
    resources: path.join(__dirname, 'build/static/resources/')
  }
};

var Watches = [
  {
    path: path.join(__dirname, 'src/libs/css/**/*.styl'),
    task: ['libs-css', 'common-css', 'pages-css']
  },
  {
    path: path.join(__dirname, 'src/common/html/**/*.jade'),
    task: ['pages-html']
  },
  {
    path: path.join(__dirname, 'src/common/css/**/*.styl'),
    task: ['common-css', 'pages-css']
  },
  {
    path: path.join(__dirname, 'src/pages/**/*.jade'),
    task: ['pages-html']
  },
  {
    path: path.join(__dirname, 'src/pages/**/*.styl'),
    task: ['pages-css']
  },
  {
    path: path.join(__dirname, 'src/**/*.js'),
    task: ['js']
  }
];



// Compile libs
gulp.task('libs-css', function() {
  return gulp.src(Path.libs.css)
              .pipe(plumber())
              .pipe(stylus())
              .pipe(rename('libs.css'))
              .pipe(gulp.dest(Path.dest.css));
});

gulp.task('libs', ['libs-css']);


// Compile common
gulp.task('common-css', function() {
  return gulp.src(Path.common.css)
              .pipe(plumber())
              .pipe(stylus({
                use: [nib()],
                import: ['nib']
              }))
              .pipe(rename('common.css'))
              .pipe(gulp.dest(Path.dest.css));
});

gulp.task('common', ['common-css']);


// Compile pages
gulp.task('pages-html', function() {
  return gulp.src(Path.pages.html)
              .pipe(plumber())
              .pipe(data(function(f) {
                return {pageName: path.basename(path.dirname(f.path))};
              }))
              .pipe(gulpJade({
                pretty: true
              }))
              .pipe(rename(function(filePath) {
                filePath.basename = filePath.dirname;
                filePath.dirname = '';
              }))
              .pipe(gulp.dest(Path.dest.html));
});

gulp.task('pages-css', function() {
  return gulp.src(Path.pages.css)
              .pipe(plumber())
              .pipe(stylus({
                use: [nib()],
                import: ['nib']
              }))
              .pipe(rename(function(filePath) {
                filePath.basename = filePath.dirname;
                filePath.dirname = '';
              }))
              .pipe(gulp.dest(Path.dest.css));
});

gulp.task('pages', ['pages-html', 'pages-css']);


gulp.task('js', function(callback) {
  glob(Path.pages.js, function(err, files) {
    if (err) return callback(err);

    var entry = {};

    files.reduce(function(pre, cur){
      var name = path.basename(path.dirname(cur));
      return entry[name] = cur;
    }, entry);

    entry['libs'] = Path.libs.js;
    entry['common'] = Path.common.js;

    webpack({
      entry: entry,
      output: {
        path: Path.dest.js,
        filename: '[name].js'
      }
    }).run(function(err, stats) {
      if (err) return callback(err);

      console.log(stats.toString({
        colors: true,
        chunkModules: false
      }));
      callback();
    });
  });
});


// symlink the resources
gulp.task('resources', function(callback) {
  fse.ensureDirSync('build/static');
  fs.stat('build/static/resources', function(err, stat) {
    if (err && err.code === 'ENOENT'){
      fs.symlinkSync('../../src/resources', 'build/static/resources');
    }
    callback();
  });
});


gulp.task('watch', function() {
  Watches.forEach(function(cur) {
    gulp.watch(cur.path, cur.task);
  });
});


gulp.task('server', function() {
  bs.init({
    server: 'build',
    files: 'build/**/*',
    open: false,
    middleware: function(req, res, next) {
      if(req.url === '/all') {
        glob(Path.pages.html, function(err, files) {
          if (err) {
            res.end(err);
          }else {
            res.end(jade.renderFile(path.join(__dirname, 'all-template.jade'), {
              pages: files.map(function(filename) {
                return path.basename(path.dirname(filename));
              })
            }));
          }
        });
      }else {
        next();
      }
    }
  });
});


gulp.task('build', ['libs', 'common', 'pages', 'js', 'resources']);



gulp.task('dev', ['build', 'watch', 'server']);
