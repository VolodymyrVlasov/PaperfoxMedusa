// import { DeployTypes } from "./scripts/gulp-scripts/deploy/deployTypes.js";
// import watchBuildDeployScripts from "./scripts/gulp-scripts/watchScripts.js";
// import { localVars } from "./scripts/gulp-scripts/const.js";
// import { prodRemoteVars } from "./scripts/gulp-scripts/const.js";
// import { deleteSync } from "del";

// export const watchToLocal = () => {
//   watchBuildDeployScripts.forEach((script) => {
//     return script(DeployTypes.LOCAL_SERVER, localVars, true);
//   });
// };

// export const deployToLocal = () => {
//   watchBuildDeployScripts.forEach((script) => {
//     return script(DeployTypes.LOCAL_SERVER, localVars, false); //(deployType, vars, isWatch)
//   });
// };

// export const buildProd = () => {
//   watchBuildDeployScripts.forEach((script) => {
//     return script(DeployTypes.PROD_SERVER, prodRemoteVars, false);
//   });

//   setTimeout(() => {
//     let rmPath = "./dist/";
//     let isDeleteDist = deleteSync(rmPath, { force: true });
//     console.log(`[${new Date().toUTCString()}] -> DELETE FILES FROM ${rmPath} -> ${isDeleteDist}`);
//   }, 10000);
// };

import { DeployTypes } from "./scripts/gulp-scripts/deploy/deployTypes.js";
import watchBuildDeployScripts from "./scripts/gulp-scripts/watchScripts.js";
import { localVars, prodVars } from "./scripts/gulp-scripts/const.js";
import { deleteSync } from "del";

// допоміжна: послідовно виконати всі скрипти
const runAllSequential = async (deployType, vars, isWatch) => {
  for (const script of watchBuildDeployScripts) {
    await script(deployType, vars, isWatch);
  }
};

// якщо хочеш паралельно (обережно з колізіями файлів):
// const runAllParallel = (deployType, vars, isWatch) =>
//   Promise.all(watchBuildDeployScripts.map((script) => script(deployType, vars, isWatch)));

export const watchToLocal = async () => {
  // для watch краще стартувати всі паралельно, бо кожен ставить власний watcher
  await Promise.all(
    watchBuildDeployScripts.map((script) => script(DeployTypes.LOCAL_SERVER, localVars, true))
  );
  // повертаємо Promise, щоб gulp знав що ми активували вотчери
};

export const deployToLocal = async () => {
  // білд → деплой усіх частин ПОСЛІДОВНО, щоб не було гонок із записом у dist/target
  await runAllSequential(DeployTypes.LOCAL_SERVER, localVars, false);
  return true;
};

export const buildProd = async () => {
  await runAllSequential(DeployTypes.PROD_SERVER, prodVars, false);

  // чистимо dist після успішного завершення
  const rmPath = "./dist/";
  deleteSync(rmPath, { force: true });
  console.log(`[${new Date().toUTCString()}] -> DELETE FILES FROM ${rmPath} -> done`);
  return true;
};