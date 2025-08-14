import watch from "gulp-watch";
import { deployCode } from "./deploy/deployCode.js";
import {
  buildPages,
  SRC_PATH as pagesWatchPath,
  TARGET_PATH as pagesBuildPath,
} from "./build/buildPages.js";

import {
  buildStyles,
  SRC_PATH as stylesWatchPath,
  TARGET_PATH as stylesBuildPath,
} from "./build/buildStyles.js";

import {
  buildAssets,
  SRC_PATH as assetsWatchPath,
  TARGET_PATH as assetsBuildPath,
} from "./build/buildAssets.js";

import {
  buildPagesScripts,
  SRC_PATH as pagesScriptsWatchPath,
  TARGET_PATH as pagesScriptsBuildPath,
} from "./build/buildPagesSripts.js";

const watchWrapper = (watchPath, func) => watch(watchPath, () => func());

const buildAndDeployPages = (deployType, vars, isWatch) => {
  const func = () => {
    const options = {
      deployType: deployType, // /Users/volodymyrvlasov/Documents/local-server/paperfox-medusa/paperfox.top/
      sourcePath: `${pagesBuildPath}**/*`, // dist/www/**/*
      targetPath: "/",
      basePath: pagesBuildPath, // ./dist/
      clearBeforeDeploy: [`${deployType}**/*.html`], // /Users/volodymyrvlasov/Documents/local-server/paperfox-medusa/paperfox.top/**/*.html
    };

    if (buildPages(vars)) {
      deployCode(options);
    }
  };
  isWatch ? watchWrapper(pagesWatchPath, func) : func();
};

const buildAndDeployStyles = (deployType, vars, isWatch) => {
  const func = () => {
    const options = {
      deployType: deployType,
      sourcePath: `${stylesBuildPath}**/*.css`,
      targetPath: "/",
      basePath: stylesBuildPath,
      clearBeforeDeploy: [`${deployType}**/*.css`],
    };

    if (buildStyles(vars)) {
      deployCode(options);
    }
  };
  isWatch ? watchWrapper(stylesWatchPath, func) : func();
};

const buildAndDeployAssets = (deployType, vars, isWatch) => {
  const func = () => {
    const options = {
      deployType: deployType,
      sourcePath: `${assetsBuildPath}**/*`,
      targetPath: "/static/",
      basePath: assetsBuildPath,
      clearBeforeDeploy: [
        `${deployType}/**/*`,
      ],
    };
    if (buildAssets(vars)) {
      deployCode(options);
    }
  };
  isWatch ? watchWrapper(assetsWatchPath, func) : func();
};

const buildAndDeployPagesScripts = (deployType, vars, isWatch) => {
  const func = () => {
    const options = {
      deployType: deployType,
      sourcePath: `${pagesScriptsBuildPath}**/*.js`,
      targetPath: "/",
      basePath: pagesScriptsBuildPath,
      clearBeforeDeploy: [`${deployType}**/*.js`],
    };
    if (buildPagesScripts(vars)) {
      deployCode(options);
    }
    isWatch ? watchWrapper(pagesScriptsWatchPath, func) : func();
  };
};

const watchBuildDeployScripts = [
  buildAndDeployPages,
  buildAndDeployStyles,
  buildAndDeployAssets,
  buildAndDeployPagesScripts,
];

export default watchBuildDeployScripts;
