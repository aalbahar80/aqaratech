import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** Use an absolute path for storing cookies. A good place that is
 * cross-platform is the OS's temp directory. Works well with git worktrees. */
export const globalStoragePath = path.join(
	os.homedir(),
	'.cache',
	'playwright',
	'storage-state',
);

/** Directory for storing downloads.
 * LevelsDB expects the directory to exist.
 */
const DOWNLOADS = path.resolve(__dirname, '../downloads');

export const createDownloadsDir = () => {
	if (!fs.existsSync(DOWNLOADS)) {
		fs.mkdirSync(DOWNLOADS);
	}
};
