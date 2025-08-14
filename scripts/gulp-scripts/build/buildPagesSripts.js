import gulp from "gulp";
import { deleteSync } from "del";

const SRC_PATH = "./apps/site-src/";
const TARGET_PATH = "./dist/";

const buildPagesScripts = () => {
  try {
    deleteSync([TARGET_PATH + "**/*.js"]);
    return gulp
      .src(SRC_PATH + "**/*.js", { aloowEmpty: true })
      .pipe(gulp.dest(TARGET_PATH));
    // return true;
  } catch (error) {
    console.error("---> BuildPagesScripts interupted. " + error);
    return false;
  }
};

export { buildPagesScripts, SRC_PATH, TARGET_PATH };
