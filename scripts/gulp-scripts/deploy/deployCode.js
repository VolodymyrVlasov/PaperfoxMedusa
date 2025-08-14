import gulp from "gulp";
import { DeployTypes } from "./deployTypes.js";
import { ftp } from "./ftp.js";
import { deleteSync } from "del";

const deployToLocal = ({
  sourcePath,
  targetPath,
  clearBeforeDeploy,
  basePath,
  done
}) => {
  if (!targetPath) throw new Error("invalid targetPath");
  const delay = 300;

  clearBeforeDeploy.forEach((rmPath) => {
    deleteSync(rmPath, { force: true });
    console.log(
      `[${new Date().toUTCString()}] ---> DELETE FILES FROM ${rmPath}`
    );
  });

  setTimeout(() => {
    console.log(
      `[${new Date().toUTCString()}] ---> DEPLOY * FROM ${sourcePath} TO ${
        DeployTypes.LOCAL_SERVER + targetPath
      }`
    );
    gulp
      .src(sourcePath, { base: basePath, allowEmpty: true })
      .pipe(gulp.dest(`${DeployTypes.LOCAL_SERVER + targetPath}`))
      .on('end', done);

    console.log(`[${new Date().toUTCString()}] ---> DEPLOY SUCCESFULY`);
  }, delay);
};

export const deployCode = ({
  deployType,
  sourcePath,
  targetPath,
  prodURL,
  basePath,
  clearBeforeDeploy,
  done
}) => {
  try {
    if (!sourcePath) throw new Error("invalid sourcePath");
    switch (deployType) {
      case DeployTypes.LOCAL_SERVER:
        console.log(
          `[${new Date().toUTCString()}] ---> DEPLOY TO LOCAL SERVER SELECTED...`
        );
        deployToLocal({ sourcePath, targetPath, clearBeforeDeploy, basePath });
        break;
      case DeployTypes.REMOTE_SERVER:
        console.log(
          `[${new Date().toUTCString()}] ---> DEPLOY TO REMOTE SERVER SELECTED...`
        );

        if (!targetPath) throw new Error("targetPath is invalid");
        console.log(
          `[${new Date().toUTCString()}] ---> DELETE FILES FROM ${clearBeforeDeploy}`
        );
        if (clearBeforeDeploy)
          ftp.rmdir(clearBeforeDeploy, (error) => {
            console.log("cd func called", error);
          });
        setTimeout(() => {
          console.log(`[${new Date().toUTCString()}] ---> DELETED SUCCESFULY`);

          console.log(
            `[${new Date().toUTCString()}] ---> DEPLOY * FROM ${sourcePath} TO ${
              DeployTypes.REMOTE_SERVER + targetPath
            }`
          );
          gulp
            .src(sourcePath, { base: basePath, allowEmpty: true })
            .pipe(ftp.dest(`${DeployTypes.REMOTE_SERVER + targetPath}`));
        }, 2000);

        break;
      case DeployTypes.PROD_SERVER:
        if (!prodURL) throw new Error("prodURL is invalid");
        if (clearBeforeDeploy) ftp.rmdir(clearBeforeDeploy);
        gulp
          .src(sourcePath, { base: basePath, allowEmpty: true })
          .pipe(ftp.dest(`${DeployTypes.PROD_SERVER + prodURL}`));
        break;
      default:
         throw new Error("Invalid Deploy type")
    }
  } catch {
    (error) => {
      console.error(error);
    };
  }
};
