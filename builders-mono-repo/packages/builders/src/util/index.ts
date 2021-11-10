import { normalizeExtraEntryPoints } from '@angular-devkit/build-angular/src/webpack/utils/helpers';
import { getSystemPath, join, normalize } from '@angular-devkit/core';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

import type { ExtendDevServer } from '../extend-serve/schema';

export interface GlobalScriptsByBundleName {
  bundleName: string;
  paths: string[];
  inject: boolean;
}
export interface FormattedAssets {
  globalScriptsByBundleName: GlobalScriptsByBundleName[];
}
export function prepareServerConfig(options: ExtendDevServer, root: string): FormattedAssets {
  const scripts = [];
  // Write the config to a file, and then include that in the bundle so it loads on window
  const configPath = getSystemPath(join(normalize(__dirname), '../../assets', normalize('consolelog-config.js')));
  writeFileSync(
    configPath,
    `window.Bionic = window.Bionic || {}; Bionic.ConsoleLogServerConfig = { wsPort: ${options.consolelogsPort} }`
  );
  scripts.push({ input: configPath, bundleName: 'consolelogs' });
  scripts.push({
    input: getSystemPath(join(normalize(__dirname), '../../assets', normalize('consolelogs.js'))),
    bundleName: 'consolelogs',
  });

  const globalScriptsByBundleName = normalizeExtraEntryPoints(scripts, 'scripts').reduce(
    (prev: { bundleName: string; paths: string[]; inject: boolean }[], curr) => {
      const { bundleName, inject, input } = curr;
      const resolvedPath = resolve(root, input);
      const existingEntry = prev.find((el) => el.bundleName === bundleName);
      if (existingEntry) {
        existingEntry.paths.push(resolvedPath);
      } else {
        prev.push({
          bundleName,
          inject,
          paths: [resolvedPath],
        });
      }
      return prev;
    },
    []
  );

  return { globalScriptsByBundleName };
}
