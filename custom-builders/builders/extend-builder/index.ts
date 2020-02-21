import {
  createBuilder,
  BuilderContext,
  BuilderOutput,
  targetFromTargetString
} from '@angular-devkit/architect';
import {
  executeBrowserBuilder,
  ExecutionTransformer
} from '@angular-devkit/build-angular';
import { ExtendBuilder } from './schema';
import { Observable, forkJoin, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { JsonObject } from '@angular-devkit/core';

import { Configuration } from 'webpack';

const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

export default createBuilder<JsonObject & ExtendBuilder>(
  extendExisitingBuilder
);

function extendExisitingBuilder(
  options: ExtendBuilder,
  context: BuilderContext
): Observable<BuilderOutput> {
  const targetSpec = targetFromTargetString(options.browserTarget);
  return forkJoin(
    from(context.getTargetOptions(targetSpec)),
    from(context.getBuilderNameForTarget(targetSpec))
  ).pipe(
    concatMap(([buildOptions, buildName]) => {
      return from(context.validateOptions(buildOptions, buildName));
    }),
    concatMap(finalOpts =>
      extendBuilder(executeBrowserBuilder)(finalOpts, context)
    )
  );
}

interface BuilderTransforms {
  webpackConfiguration?: ExecutionTransformer<Configuration>;
}
type Builder<T, R> = (
  options: T,
  context: BuilderContext,
  transforms?: BuilderTransforms
) => Observable<R>;

export function extendBuilder<T, R>(builder: Builder<T, R>) {
  return (options: any, context: BuilderContext) => {
    return builder(options, context, {
      webpackConfiguration(config) {
        config.plugins!.push(new NyanProgressPlugin());
        return config;
      }
    });
  };
}
