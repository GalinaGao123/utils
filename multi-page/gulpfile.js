'use strict'

const gulp                 = require('gulp')
const plumber              = require('gulp-plumber')
const gulpPug              = require('gulp-pug')
const less                 = require('gulp-less')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const autoprefix           = new LessPluginAutoPrefix()
const webpack              = require('webpack')
const glob                 = require('glob')
const path                 = require('path')
const bs                   = require("browser-sync").create()
const pug                  = require('pug')

const isProd = process.env.NODE_ENV === 'production'




gulp.task('html', () => {
  return gulp.src('src/pug/*.pug', { base: 'src/pug' })
              .pipe(plumber())
              .pipe(gulpPug({ pretty: true }))
              .pipe(gulp.dest('public'))
})

gulp.task('css', () => {
  return gulp.src('src/less/*.less', { base: 'src/less' })
              .pipe(plumber(function (err) {
                console.log(err)
                this.emit('end')
              }))
              .pipe(less({
                plugins: [ autoprefix ],
                compress: isProd
              }))
              .pipe(gulp.dest('public/css'))
})

gulp.task('js', next => {
  glob('src/js/*.js', { absolute: true }, (err, files) => {
    if (err) { return next(err) }

    webpack(getWebpackConfig(files), (err, states) => {
      if (err) { return next(err) }

      printWebpackStates(states)
      next()
    })
  })
})

gulp.task('images', () => {
  return gulp.src('src/images/**/*', { base: 'src' })
              .pipe(gulp.dest('public'))
})

gulp.task('compile', ['html', 'css', 'js', 'images'])

gulp.task('watch', () => {
  gulp.watch('src/pug/**/*'   , ['html'])
  gulp.watch('src/less/**/*'  , ['css'])
  gulp.watch('src/js/**/*'    , ['js'])
  gulp.watch('src/images/**/*', ['images'])
})

gulp.task('server', ['compile', 'watch'], () => {
  bs.init({
    files: 'public/**/*',
    server: {
      baseDir: 'public',
      middleware: renderIndexPage
    }
  })
})




function getWebpackConfig(files) {
  const config = {
    entry: files.reduce((entry, file) => {
      entry[path.parse(file).name] = file

      return entry
    }, new Object()),

    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: '[name].js'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['latest', { 'es2015': { modules: false } }]
            ]
          }
        }
      ]
    },

    resolve: {
      modules: [
        path.resolve(__dirname, 'src/js'),
        'node_modules'
      ],
      extensions: ['.js']
    }
  }

  if (isProd) {
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true,
          warnings: false
        },
        comments: false
      })
    ]
  }

  return config
}

function printWebpackStates(states) {
  console.log(states.toString({
    colors: true,
    chunks: false
  }))
}

function renderIndexPage(req, res, next) {
  if (req.url === '/') {
    glob('src/pug/*.pug', (err, files) => {
      if (err) { return next(err) }

      const html = pug.renderFile(path.resolve(__dirname, 'index.pug'), {
        files: files.map(file => path.parse(file).name)
      })

      res.end(html)
    })
  } else {
    next()
  }
}
