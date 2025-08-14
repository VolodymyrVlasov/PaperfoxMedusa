import { DeployTypes } from "./scripts/gulp-scripts/deploy/deployTypes.js";
import watchBuildDeployScripts from "./scripts/gulp-scripts/watchScripts.js";
import { localVars } from "./scripts/gulp-scripts/const.js";
import { testRemoteVars } from "./scripts/gulp-scripts/const.js";
import { prodRemoteVars } from "./scripts/gulp-scripts/const.js";

export const watchToLocal = (done) => {
  watchBuildDeployScripts.forEach((script) => {
    script(DeployTypes.LOCAL_SERVER, localVars, true, done);
  });
};

export const deployToLocal = (done) => {
  watchBuildDeployScripts.forEach((script) => {
    script(DeployTypes.LOCAL_SERVER, localVars, false, done); //(deployType, vars, isWatch)
  }); 
};

export const buidProd = (done) => {
  watchBuildDeployScripts.forEach((script) => {
    script(DeployTypes.REMOTE_SERVER, testRemoteVars, false, done);
  });
};