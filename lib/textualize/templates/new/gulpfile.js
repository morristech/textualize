var gulp = require('gulp');

gulp.task('default', ['convert-raml-to-json'])

gulp.task('mkdir-src', function() {
  var mkdirp = require('mkdirp')

  mkdirp('./.tmp')

  return gulp.src('./')
})

var raml       = require('gulp-raml');
var debug      = require('gulp-debug');

gulp.task('validate-raml', function() {
  return gulp.src('apis/*.raml')

  .pipe(debug({title: 'checking raml file: '}))
  .pipe(raml())
  .pipe(raml.reporter('default'))
  .pipe(raml.reporter('fail'))
})

var notify     = require('gulp-notify');
var concat     = require('gulp-concat');
var yaml       = require('gulp-yaml');

gulp.task('convert-raml-to-json', ['validate-raml'], function() {
  return gulp.src('apis/*.raml', { base: './' })
  .pipe(raml2json())
  .pipe(gulp.dest('./.tmp'))
})

function raml2json(options) {
  var path = require('path');
  var gutil = require('gulp-util');
  var through = require('through2');
  var raml2html = require('raml2html');

  var simplifyMark = function(mark) {
    if (mark) {
      mark.buffer = mark.buffer.split('\n', mark.line + 1)[mark.line].trim();
    }
  }

  var options = {}
  options.type = 'json'
  options.config = {
    template: function(obj) { return JSON.stringify(obj, null, 2); }
  };
  options.extension = '.json'

  var stream = through.obj(function(file, enc, done) {
    var fail = function(message) {
      done(new gutil.PluginError('raml2html', message));
    };
    if (file.isBuffer()) {
      var cwd = process.cwd();
      process.chdir(path.resolve(path.dirname(file.path)));
      raml2html.render(file.contents, options.config,
        function(output) {
          process.chdir(cwd);
          stream.push(new gutil.File({
            base: file.base,
            cwd: file.cwd,
            path: gutil.replaceExtension(file.path, options.extension),
            contents: new Buffer(output)
          }));
          done();
        },
        function(error) {
          process.chdir(cwd);
          simplifyMark(error.context_mark);
          simplifyMark(error.problem_mark);
          process.nextTick(function() {
            fail(JSON.stringify(error, null, 2));
          });
        });
    }
    else if (file.isStream()) fail(
      'Streams are not supported: ' + file.inspect()
    );
    else if (file.isNull()) fail('Input file is null: ' + file.inspect());
  });

  return stream;
}

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}
