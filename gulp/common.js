"use strict";

let dateFormat       = require("dateformat");
let filterProperties = require("gulp-filter-java-properties");
let fs               = require("fs");
let gulp             = require("gulp");
let gutil            = require("gulp-util");
let lazypipe         = require("lazypipe");
let log              = require('fancy-log');
let plugins          = require("gulp-load-plugins")();
let runSequence      = require("run-sequence");

global.errorHandler = function(error, emitEnd, task)
{
  log.error(error.plugin + ' error: ' + error.message);
  log.error(error);

  // If should emit end
  if(emitEnd)
  {
    task.emit("end");
  }
  else
  {
    process.exit(1);
  }
};

global.filterProperties = function(browserName)
{
  return lazypipe()
    .pipe(filterProperties, { propertiesPath: "build/" + browserName + ".properties" })
    .pipe(filterProperties, { propertiesPath: "configuration/common/configuration.properties" })
    .pipe(filterProperties, { propertiesPath: "configuration/" + browserName + "/configuration.properties" });
};

global.initializeBuild = function(browserName, callback)
{
  fs.writeFileSync("build/" + browserName + ".properties", "browser=" + browserName + "\nbuild.date=" + dateFormat(new Date(), "mmmm d, yyyy"));
  callback();
};

gulp.task("lint-gulp", function()
{
  return gulp.src(["gulp/*.js", "gulpfile.js"])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

// Common tasks
gulp.task("all", function(callback) { runSequence("clean", "build", "package", "lint", callback); });
gulp.task("build", ["build-chrome", "build-firefox", "build-opera"]);
gulp.task("clean", ["clean-chrome", "clean-firefox", "clean-merge", "clean-opera"]);
gulp.task("default", ["all"]);
gulp.task("package", ["package-chrome", "package-firefox", "package-opera"]);
