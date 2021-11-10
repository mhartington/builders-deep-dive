import type { BuilderContext } from '@angular-devkit/architect';
import {
  createBuilder,
  targetFromTargetString,
} from '@angular-devkit/architect';
import type {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
  ExecutionTransformer,
} from '@angular-devkit/build-angular';
import { executeDevServerBuilder } from '@angular-devkit/build-angular';
import type { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import { ScriptsWebpackPlugin } from '@angular-devkit/build-angular/src/webpack/plugins';
import type { json } from '@angular-devkit/core';
import { basename } from '@angular-devkit/core';
import type { Observable } from 'rxjs';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import type { Configuration } from 'webpack';

import type { FormattedAssets } from '../util';
import { prepareServerConfig } from '../util';
import { augmentIndexHtml } from '../util/append-script';

import { createConsoleLogServer } from './logger';
import type { ExtendDevServer } from './schema';

export type ExtendDevServerBuilderOptions = ExtendDevServer & json.JsonObject;

export default createBuilder<ExtendDevServerBuilderOptions, any>(
  extendDevServer
);

function extendDevServer(
  options: ExtendDevServer,
  context: BuilderContext
): Observable<DevServerBuilderOutput> {
  const { devServerTarget, port, host, ssl } = options;
  const devServerTargetSpec = targetFromTargetString(devServerTarget);
  const root = context.workspaceRoot;

  async function setup() {
    const devServerTargetOptions = await context.getTargetOptions(
      devServerTargetSpec
    );
    const devServerName = await context.getBuilderNameForTarget(
      devServerTargetSpec
    );

    const formattedOptions = (await context.validateOptions(
      devServerTargetOptions,
      devServerName
    )) as DevServerBuilderOptions;

    formattedOptions.port = port;
    formattedOptions.host = host;
    formattedOptions.ssl = ssl;

    const formattedAssets = prepareServerConfig(options, root);
    await createConsoleLogServer(host, options.consolelogsPort);

    return { formattedOptions, formattedAssets };
  }

  return from(setup()).pipe(
    switchMap(
      ({
        formattedOptions,
        formattedAssets,
      }): Observable<DevServerBuilderOutput> =>
        executeDevServerBuilder(
          formattedOptions,
          context as any,
          getTransforms(context, formattedAssets)
        )
    )
  );
}

function getTransforms(context: BuilderContext, assets: FormattedAssets) {
  return {
    webpackConfiguration: webpackConfigTransform(context, assets),
    indexHtml: indexHtmlTransformFactory(assets),
  };
}

const webpackConfigTransform: (
  context: BuilderContext,
  assets: FormattedAssets
) => ExecutionTransformer<Configuration> =
  ({ workspaceRoot }, assets) =>
  (browserWebpackConfig) => {
    const scriptExtras = assets.globalScriptsByBundleName.map(
      (script: { bundleName: any; paths: any }) => {
        const bundleName = script.bundleName;
        return new ScriptsWebpackPlugin({
          name: bundleName,
          sourceMap: true,
          filename: `${basename(bundleName)}.js`,
          scripts: script.paths,
          basePath: workspaceRoot,
        });
      }
    );

    (browserWebpackConfig.plugins as any)?.push(...scriptExtras);
    return browserWebpackConfig;
  };

export const indexHtmlTransformFactory: (
  formattedAssets: FormattedAssets
) => IndexHtmlTransform = (assets) => (indexTransform: string) => {
  const augmentedHtml = augmentIndexHtml(
    indexTransform,
    assets.globalScriptsByBundleName
  );
  return Promise.resolve(augmentedHtml);
};
