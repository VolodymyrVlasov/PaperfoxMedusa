import gulp from "gulp";
import webp from "gulp-webp";
import { deleteSync } from "del";

const SRC_PATH = "./apps/site-src/static/";
const TARGET_PATH = "./dist/static/";
const QUALITY_FACTOR = 90;

const buildAssets = () => {
  try {
    deleteSync([TARGET_PATH + "**/*"], { base: SRC_PATH, alowEmpty: true });
    let streamHtml = gulp.src(SRC_PATH + "**/*");

    return streamHtml
      .pipe(gulp.dest(TARGET_PATH))
      .pipe(webp({ quality: QUALITY_FACTOR }))
      .pipe(gulp.dest(TARGET_PATH));

    // return true;
  } catch (error) {
    console.error("---> BuildAssets interupted. " + error);
    return false;
  }
};

export { buildAssets, SRC_PATH, TARGET_PATH };
