let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  scss = require("gulp-sass")(require('sass'));

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
    notify: false,
  });
}

function html(params) {
  return src('*.html')
    .pipe(browsersync.stream());
}

function css(params) {
  return src('./styles.scss')
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )

    .pipe(dest('./css'))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch(['*.html'], html);
  gulp.watch(['./styles.scss'], css);
}



let build = gulp.series(gulp.parallel(html, css));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.css = css;
exports.watch = watch;
exports.default = watch;
exports.build = build;
exports.html = html;
