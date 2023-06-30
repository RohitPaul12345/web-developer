"use strict";

global.operaPackageName = "web-developer-opera.nex";

let del         = require("del");
let gulp        = require("gulp");
let runSequence = require("run-sequence");

gulp.task("build-opera-all", function()
{
  return global.buildAll("opera");
});

gulp.task("clean-opera", function()
{
  return del(["build/opera", "build/opera.properties", "build/" + global.operaPackageName]);
});

gulp.task("initialize-opera-build", function(callback)
{
  global.initializeBuild("opera", callback);
});

gulp.task("package-opera", function()
{
  return global.packageTask("opera", global.operaPackageName);
});

gulp.task("build-opera", function(callback) { runSequence("initialize-opera-build", "build-opera-all", callback); });
gulp.task("opera", function(callback) { runSequence("build-opera", "package-opera", callback); });
