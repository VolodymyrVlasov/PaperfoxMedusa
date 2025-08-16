import watch from "gulp-watch";
import { deployCode } from "./deploy/deployCode.js";
import { buildPages, SRC_PATH as pagesSrc, TARGET_PATH as pagesBuild } from "./build/buildPages.js";
import { buildStyles, SRC_PATH as stylesSrc, TARGET_PATH as stylesBuild } from "./build/buildStyles.js";
import { buildAssets, SRC_PATH as assetsSrc, TARGET_PATH as assetsBuild } from "./build/buildAssets.js";
import { buildPagesScripts, SRC_PATH as scriptsSrc, TARGET_PATH as scriptsBuild } from "./build/buildPagesSripts.js";

// допоміжне: нормалізація шляхів щоб не було подвійних слешів
const joinPath = (...parts) =>
  parts
    .filter(Boolean)
    .join("/")
    .replace(/\/{2,}/g, "/");

// обгортка watch з підтримкою async-функцій
const watchWrapper = (watchPath, func) =>
  watch(joinPath(watchPath, "**/*"), () => {
    Promise.resolve()
      .then(() => func())
      .catch((e) => console.error("[watch error]", e));
  });

// ===== PAGES =====
const buildAndDeployPages = (deployRootAbs, vars = {}, isWatch = false) => {
  const func = async () => {
    const options = {
      deployType: deployRootAbs,                        // абсолютний корінь призначення
      sourcePath: joinPath(pagesBuild, "**/*"),         // ./dist/**/*
      targetPath: "/",                                  // куди в deployRoot кластимемо
      basePath: pagesBuild,                             // ./dist/
      clearBeforeDeploy: [joinPath(deployRootAbs, "**/*.html")],
    };
    await buildPages(vars);
    await deployCode(options);
  };

  return isWatch ? watchWrapper(pagesSrc, func) : func();
};

// ===== STYLES =====
const buildAndDeployStyles = (deployRootAbs, vars = {}, isWatch = false) => {
  const func = async () => {
    const options = {
      deployType: deployRootAbs,
      sourcePath: joinPath(stylesBuild, "**/*.css"),    // ./dist/**/*.css
      targetPath: "/",
      basePath: stylesBuild,
      clearBeforeDeploy: [joinPath(deployRootAbs, "**/*.css")],
    };
    await buildStyles(vars);
    await deployCode(options);
  };

  return isWatch ? watchWrapper(stylesSrc, func) : func();
};

// ===== ASSETS (/static) =====
const buildAndDeployAssets = (deployRootAbs, vars = {}, isWatch = false) => {
  const func = async () => {
    const options = {
      deployType: deployRootAbs,
      sourcePath: joinPath(assetsBuild, "**/*"),        // ./dist/static/**/*
      targetPath: "/static/",
      basePath: assetsBuild,
      clearBeforeDeploy: [joinPath(deployRootAbs, "static/**/*")],
    };
    await buildAssets(vars);
    await deployCode(options);
  };

  return isWatch ? watchWrapper(assetsSrc, func) : func();
};

// ===== PAGE SCRIPTS (js у корінь сайту) =====
const buildAndDeployPagesScripts = (deployRootAbs, vars = {}, isWatch = false) => {
  const func = async () => {
    const options = {
      deployType: deployRootAbs,
      sourcePath: joinPath(scriptsBuild, "**/*.js"),    // ./dist/**/*.js
      targetPath: "/",                                  // не лишай порожнім
      basePath: scriptsBuild,
      clearBeforeDeploy: [joinPath(deployRootAbs, "**/*.js")],
    };
    await buildPagesScripts(vars);
    await deployCode(options);
  };

  return isWatch ? watchWrapper(scriptsSrc, func) : func();
};

const watchBuildDeployScripts = [
  buildAndDeployPages,
  buildAndDeployStyles,
  buildAndDeployAssets,
  buildAndDeployPagesScripts,
];

export default watchBuildDeployScripts;