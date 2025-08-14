import gulp from "gulp";
import replace from "gulp-replace";
import { deleteSync } from "del";

const SRC_PATH = "./apps/site-src/";
const TARGET_PATH = "./dist/";

const buildStyles = (vars, done) => {
  try {
    deleteSync(TARGET_PATH + "**/*.css");
    let streamCss = gulp.src(SRC_PATH + "**/*.css", {
      base: SRC_PATH,
      alowEmpty: true,
    });

    for (const [placeholder, value] of Object.entries(vars)) {
      streamCss = streamCss.pipe(replace(placeholder, value));
    }

    streamCss.pipe(gulp.dest(TARGET_PATH)).on("end", done);
    return true;
  } catch (error) {
    return false;
  }
};

export { buildStyles, SRC_PATH, TARGET_PATH };
