// import gulp from "gulp";
// import replace from "gulp-replace";
// import { deleteSync } from "del";

// const SRC_PATH = "./apps/site-src/styles/";
// const TARGET_PATH = "./dist/";

// const buildStyles = (vars) => {
//   try {
//     deleteSync(TARGET_PATH + "**/*.css");
//     let streamCss = gulp.src(SRC_PATH + "**/*.css", {
//       base: SRC_PATH,
//       alowEmpty: true,
//     });

//     for (const [placeholder, value] of Object.entries(vars)) {
//       streamCss = streamCss.pipe(replace(placeholder, value));
//     }

//     return streamCss.pipe(gulp.dest(TARGET_PATH));
//     // return true;
//   } catch (error) {
//     return false;
//   }
// };

// export { buildStyles, SRC_PATH, TARGET_PATH };


import gulp from "gulp";
import replace from "gulp-replace";
import { deleteSync } from "del";

const SRC_PATH = "./apps/site-src/styles/";
const TARGET_PATH = "./dist/";

const buildStyles = (vars = {}) => {
  return new Promise((resolve, reject) => {
    try {
      // Очищення перед збіркою
      deleteSync([`${TARGET_PATH}**/*.css`], { force: true });

      // Створення потоку
      let stream = gulp.src(`${SRC_PATH}**/*.css`, {
        base: SRC_PATH,
        allowEmpty: true, // виправлена опечатка
      });

      // Заміна плейсхолдерів
      for (const [placeholder, value] of Object.entries(vars)) {
        stream = stream.pipe(replace(placeholder, value));
      }

      // Запис у цільову папку
      stream
        .pipe(gulp.dest(TARGET_PATH))
        .on("end", resolve)
        .on("error", reject);
    } catch (error) {
      console.error("--- ---> buildStyles interrupted: " + error);
      reject(error);
    }
  });
};

export { buildStyles, SRC_PATH, TARGET_PATH };