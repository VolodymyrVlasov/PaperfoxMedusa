// import gulp from "gulp";
// import { deleteSync } from "del";

// const SRC_PATH = "./apps/site-src/";
// const TARGET_PATH = "./dist/";

// const buildPagesScripts = () => {
//   try {
//     deleteSync([TARGET_PATH + "**/*.js"]);
//     gulp
//       .src(SRC_PATH + "**/*.js", { aloowEmpty: true })
//       .pipe(gulp.dest(TARGET_PATH));
//     return true;
//   } catch (error) {
//     console.error("---> BuildPagesScripts interupted. " + error);
//     return false;
//   }
// };

// export { buildPagesScripts, SRC_PATH, TARGET_PATH };

import gulp from "gulp";
import { deleteSync } from "del";

const SRC_PATH = "./apps/site-src/";
const TARGET_PATH = "./dist/";

const buildPagesScripts = () => {
  return new Promise((resolve, reject) => {
    try {
      // Чистимо цільову папку перед копіюванням
      deleteSync([`${TARGET_PATH}**/*.js`], { force: true });

      gulp.src(`${SRC_PATH}**/*.js`, { allowEmpty: true }) // allowEmpty виправлено
        .pipe(gulp.dest(TARGET_PATH))
        .on("end", resolve)    // успішне завершення
        .on("error", reject);  // помилка
    } catch (error) {
      console.error("---> BuildPagesScripts interrupted. " + error);
      reject(error); // обовʼязково, щоб gulp знав про фейл
    }
  });
};

export { buildPagesScripts, SRC_PATH, TARGET_PATH };