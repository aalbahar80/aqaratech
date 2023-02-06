import os from 'node:os';
import path from 'node:path';

/** Use an absolute path for storing cookies. A good place that is
 * cross-platform is the OS's temp directory. Works well with git worktrees. */
export const globalStoragePath = path.join(
	os.tmpdir(),
	'playwright',
	'storage-state',
);
