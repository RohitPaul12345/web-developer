"use strict";

global.imageminConfiguration = { interlaced: true, multipass: true, optimizationLevel: 7, progressive: true, svgoPlugins: [{ removeViewBox: false }] };

let gulp    = require("gulp");
let plugins = require("gulp-load-plugins")();

gulp.task("minify-images", function()
{
  return gulp.src("images/**/*.{gif,jpg,png}")
    .pipe(plugins.imagemin(global.imageminConfiguration).on("error", global.errorHandler))
    .pipe(gulp.dest("images"));
});

gulp.task("images", ["minify-images"]);
