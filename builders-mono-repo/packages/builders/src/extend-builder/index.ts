import type { BuilderContext } from '@angular-devkit/architect';
import {
  createBuilder,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import type { JsonObject } from '@angular-devkit/core';
import NyanStyledProgressPlugin = require('nyan-styled-progress-webpack-plugin');
import type { Observable } from 'rxjs';
import { forkJoin, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import type { Configuration } from 'webpack';

import type { ExtendBuilder } from './schema';

export default createBuilder<JsonObject & ExtendBuilder>(
  extendExisitingBuilder
);

function extendExisitingBuilder(
  options: ExtendBuilder,
  context: BuilderContext
): Observable<any> {
  const targetSpec = targetFromTargetString(options.browserTarget);
  return forkJoin([
    from(context.getTargetOptions(targetSpec)),
    from(context.getBuilderNameForTarget(targetSpec)),
  ]).pipe(
    concatMap(([buildOptions, buildName]) => {
      return from(context.validateOptions(buildOptions, buildName));
    }),
    concatMap((finalOpts) =>
      extendBuilder(executeBrowserBuilder)(
        { ...finalOpts, progress: false },
        context
      )
    )
  );
}

export function extendBuilder(
  builder: any
): (options: JsonObject, context: BuilderContext) => any {
  return (options: any, context: BuilderContext) => {
    return builder(options, context, {
      webpackConfiguration(oldConfig: Configuration) {
        oldConfig.plugins.push(new NyanStyledProgressPlugin());
        return oldConfig;
      },
    });
  };
}
