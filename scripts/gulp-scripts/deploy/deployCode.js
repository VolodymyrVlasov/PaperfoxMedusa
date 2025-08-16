import gulp from "gulp";
import path from "path";
import { deleteSync } from "del";
import { DeployTypes } from "./deployTypes.js";

/**
 * Універсальний деплой: чистить папки і копіює файли як gulp-стрім.
 * Повертає Promise, який резолвиться після завершення копіювання.
 */
const deployGeneric = ({ root, sourcePath, targetPath = "/", basePath, clearBeforeDeploy = [] }) => {
  return new Promise((resolve, reject) => {
    try {
      if (!root) throw new Error("invalid root (deploy root path)");
      if (!sourcePath) throw new Error("invalid sourcePath");
      if (typeof targetPath !== "string") throw new Error("invalid targetPath (must be string)");
      if (!basePath) throw new Error("invalid basePath");

      // 1) Почистити, якщо треба
      for (const rmPath of clearBeforeDeploy) {
        deleteSync(rmPath, { force: true });
        console.log(`[${new Date().toUTCString()}] ---> DELETE FILES FROM ${rmPath}`);
      }

      // 2) Кінцевий шлях призначення
      const destRoot = path.join(root, targetPath).replace(/\/{2,}/g, "/");

      console.log(
        `[${new Date().toUTCString()}] ---> DEPLOY * FROM ${sourcePath} TO ${destRoot}\n` +
        `    base: ${basePath}`
      );

      gulp
        .src(sourcePath, { base: basePath, allowEmpty: true })
        .pipe(gulp.dest(destRoot))
        .on("error", (err) => {
          console.error(`[${new Date().toUTCString()}] ---> DEPLOY FAILED:`, err?.message || err);
          reject(err);
        })
        .on("end", () => {
          console.log(`[${new Date().toUTCString()}] ---> DEPLOY SUCCESS`);
          resolve(true);
        });
    } catch (err) {
      console.error(`[${new Date().toUTCString()}] ---> DEPLOY ERROR:`, err?.message || err);
      reject(err);
    }
  });
};

export const deployCode = ({ deployType, sourcePath, targetPath, prodURL, basePath, clearBeforeDeploy }) => {
  switch (deployType) {
    case DeployTypes.LOCAL_SERVER: {
      console.log(`[${new Date().toUTCString()}] ---> DEPLOY TO LOCAL SERVER SELECTED...`);
      return deployGeneric({
        root: DeployTypes.LOCAL_SERVER,
        sourcePath,
        targetPath,
        basePath,
        clearBeforeDeploy,
      });
    }

    case DeployTypes.PROD_SERVER: {
      console.log(`[${new Date().toUTCString()}] ---> DEPLOY TO PROD SERVER SELECTED...`);
      return deployGeneric({
        root: DeployTypes.PROD_SERVER,
        sourcePath,
        targetPath,
        basePath,
        clearBeforeDeploy,
      });
    }

    default:
      return Promise.reject(new Error("Invalid Deploy type"));
  }
};
