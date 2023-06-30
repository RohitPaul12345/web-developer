"use strict";

let gulp    = require("gulp");
let plugins = require("gulp-load-plugins")();

global.packageTask = function(browserName, packageName)
{
  return gulp.src(["build/" + browserName + "/**", "license.txt"])
    .pipe(plugins.zip(packageName))
    .pipe(gulp.dest("build"));
};
