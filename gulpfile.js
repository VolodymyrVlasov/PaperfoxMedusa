import { DeployTypes } from "./scripts/gulp-scripts/deploy/deployTypes.js";
import watchBuildDeployScripts from "./scripts/gulp-scripts/watchScripts.js";
import { localVars } from "./scripts/gulp-scripts/const.js";
import { prodRemoteVars } from "./scripts/gulp-scripts/const.js";
import { deleteSync } from "del";

export const watchToLocal = () => {
  watchBuildDeployScripts.forEach((script) => {
    return script(DeployTypes.LOCAL_SERVER, localVars, true);
  });
};

export const deployToLocal = () => {
  watchBuildDeployScripts.forEach((script) => {
    return script(DeployTypes.LOCAL_SERVER, localVars, false); //(deployType, vars, isWatch)
  });
};

export const buildProd = () => {
  watchBuildDeployScripts.forEach((script) => {
    return script(DeployTypes.PROD_SERVER, prodRemoteVars, false);
  });

  // setTimeout(() => {
  //   let rmPath = "./dist/";
  //   let isDeleteDist = deleteSync(rmPath, { force: true });
  //   console.log(`[${new Date().toUTCString()}] -> DELETE FILES FROM ${rmPath} -> ${isDeleteDist}`);
  // }, 20000);
};
