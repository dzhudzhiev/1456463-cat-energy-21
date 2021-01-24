const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const autoprefixer = require("autoprefixer");
const imagemin = require("gulp-imagemin");
const { create } = require("browser-sync");
const sync = require("browser-sync").create();

// Html

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
};

exports.html = html;

// Scripts

const scripts = () => {
  return gulp
    .src("source/js/script.js")
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(sync.stream());
};

exports.scripts = scripts;

// Images

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("dist/img"));
};

exports.images = images;

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Webp

const createWebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("dist/img"));
};

exports.createWebp = createWebp;

const sprite = () => {
  return gulp
    .src("source/img/icons/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("dist/img"));
};

exports.sprite = sprite;

// Copy

const copy = () => {
  return gulp
    .src(
      [
        "source/fonts/*.{woff2,woff}",
        "source/*.ico",
        "source/img/*.{jpg,png,svg}",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("dist"));
};

exports.copy = copy;

// Clean

const clean = () => {
  return del("dist");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "dist",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

// Build

const build = gulp.series(
  clean,
  gulp.parallel(styles, html, images, sprite, copy, createWebp)
);

exports.build = build;

exports.default = gulp.series(
  clean,
  gulp.parallel(styles, html, copy, sprite, createWebp),
  gulp.series(server, watcher)
);
