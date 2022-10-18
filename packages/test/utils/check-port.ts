import { execSync } from 'node:child_process';

/**
 * Returns true if the process was started by playwright.
 */
export const wasProcessStartedByPlaywright = (pid: number): boolean => {
	// alternatively, recursively check the command of each process until you find a process with a command that contains the string "playwright"

	// get parent tree
	const tree = execSync(`pstree -s -h -p -t -G -c -a --long ${pid}`)
		.toString()
		.trim();

	// check if any of the parents has a command that contains the string "playwright"
	const hasPlaywright = tree.includes('playwright');

	console.log(`Process ${pid} was started by Playwright: ${hasPlaywright}`);

	return hasPlaywright;
};
