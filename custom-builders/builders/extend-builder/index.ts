import {
  createBuilder,
  BuilderContext,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { ExtendBuilder } from './schema';
import { Observable, forkJoin, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { JsonObject } from '@angular-devkit/core';
import { Configuration } from 'webpack';
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
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
  builder: Function
): (options: JsonObject, context: BuilderContext) => any {
  return (options: any, context: BuilderContext) => {
    return builder(options, context, {
      webpackConfiguration(oldConfig: Configuration) {
        oldConfig.plugins.push(new ProgressBarPlugin());
        return oldConfig;
      },
    });
  };
}
