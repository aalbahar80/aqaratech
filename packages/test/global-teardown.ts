import type { FullConfig } from '@playwright/test';
import cp from 'node:child_process';
import kill from 'tree-kill';
import { wasProcessStartedByPlaywright } from './utils/check-port';

function globalTeardown(config: FullConfig) {
	// Kill any hanging servers

	// const PORTS = [3000, 3002];

	console.log('[GLOBAL-TEARDOWN] Attempting to extract ports from config');

	// Grab ports from config
	// @ts-expect-error webServers is a private property
	// eslint-disable-next-line
	const PORTS: number[] = config._webServers.map((ws) => ws.port);

	if (!PORTS.length) {
		console.warn(
			'[GLOBAL-TEARDOWN] No ports found. This might be an error. Consider listing the ports manually in global-teardown.ts',
		);
		return;
	}

	const pids: number[] = [];
	for (const port of PORTS) {
		const portPids = cp
			.execSync(`lsof -i tcp:${port} -t`)
			.toString()
			.trim()
			.split(' ');

		// sometimes there are multiple pids for a single port
		for (const pid of portPids) {
			pids.push(parseInt(pid));
			console.log(`Found process ${pid} on port ${port}`);
		}
	}

	for (const pid of pids) {
		if (wasProcessStartedByPlaywright(pid)) {
			kill(pid);
		}
	}
}

export default globalTeardown;
