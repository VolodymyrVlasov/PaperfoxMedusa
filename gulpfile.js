import { DeployTypes } from "./scripts/gulp-scripts/deploy/deployTypes.js";
import watchBuildDeployScripts from "./scripts/gulp-scripts/watchScripts.js";
import { localVars } from "./scripts/gulp-scripts/const.js";
import { testRemoteVars } from "./scripts/gulp-scripts/const.js";
import { prodRemoteVars } from "./scripts/gulp-scripts/const.js";

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

export const buidProd = () => {
  watchBuildDeployScripts.forEach((script) => {
    return script(DeployTypes.REMOTE_SERVER, testRemoteVars, false);
  });
};