import gulp from "gulp";
import replace from "gulp-replace";
import fileInclude from "gulp-file-include";
import webpHtml from "gulp-webp-html-nosvg";
import { deleteSync } from "del";
import { SRC_PATH } from "../const.js";

const TARGET_PATH = "./dist/";

const buildPages = (vars) => {
  try {
    deleteSync([TARGET_PATH + "**/*.html"]);
    let streamHtml = gulp.src(SRC_PATH, { aloowEmpty: true });
    streamHtml.pipe(fileInclude({ prefix: "@@", basepath: "@file" }));

    for (const [placeholder, value] of Object.entries(vars)) {
      streamHtml = streamHtml.pipe(replace(placeholder, value));
    }

    streamHtml.pipe(webpHtml()).pipe(gulp.dest(TARGET_PATH));
    return true;
  } catch (error) {
    console.error("---> buildPages interupted with error: " + error);
    return false;
  }
};

export { buildPages, SRC_PATH, TARGET_PATH };
