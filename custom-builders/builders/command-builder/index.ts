import { createBuilder, BuilderContext } from '@angular-devkit/architect';
import * as childProcess from 'child_process';

import { CommandBuilder } from './schema';

export default createBuilder<any>(commandBuilder);

function commandBuilder(
  options: CommandBuilder,
  context: BuilderContext
): Promise<any> {
  const process = childProcess.spawn(
    options.command,
    options.args,
    { stdio: 'pipe' }
  );
  process.stdout.on('data', data => {
    context.logger.info(data.toString());
  });
  process.stderr.on('data', data => {
    context.logger.error(data.toString());
  });

  return new Promise(resolve => {
    process.on('close', code => {
      resolve({ success: code === 0 });
    });
  });
}
