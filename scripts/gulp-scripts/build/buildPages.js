import gulp from "gulp";
import replace from "gulp-replace";
import fileInclude from "gulp-file-include";
import webpHtml from "gulp-webp-html-nosvg";
import { deleteSync } from "del";

const SRC_PATH = "./apps/site-src/pages/";
const TARGET_PATH = "./dist/";

const buildPages = (vars) => {
  try {
    console.log(`[${new Date().toUTCString()}] --- ---> buildPages -> from "${SRC_PATH}" to "${TARGET_PATH}"`);

    deleteSync([TARGET_PATH + "**/*.html"]);
    let streamHtml = gulp.src(SRC_PATH + "**/*.html", { base: SRC_PATH, alowEmpty: true });
    streamHtml.pipe(fileInclude({ prefix: "@@", basepath: "@file" }));

    for (const [placeholder, value] of Object.entries(vars)) {
      streamHtml = streamHtml.pipe(replace(placeholder, value));
    }
    
    return streamHtml.pipe(webpHtml()).pipe(gulp.dest(TARGET_PATH)).end;;
    // return true;
  } catch (error) {
    console.error("--- ---> buildPages interupted with error: " + error);
    return false;
  }
};

export { buildPages, SRC_PATH, TARGET_PATH };
