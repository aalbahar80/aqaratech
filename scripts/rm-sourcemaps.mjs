#!/usr/bin/env zx

/**
 * Usage: zx rm-source-maps.mjs [path/to/dir]
 * Example: zx rm-source-maps.mjs build/client
 */

const dir = argv._[0];
const force = argv['force'];

// check if dir path is provided
if (!dir) {
	console.log('Usage: zx rm-source-maps.mjs [path/to/dir]');
	console.log('Example: zx rm-source-maps.mjs build/client');
	await $`exit 1`;
}

// check if dir exists
if (!fs.existsSync(dir)) {
	console.log(chalk.red(`Directory ${dir} does not exist.`));
	await $`exit 1`;
}

console.log(`Looking for sourcemaps in ${dir}`);

let sourcemaps = await glob(`${dir}/**/*.map`);

if (sourcemaps.length === 0) {
	console.log(`No sourcemaps found in ${dir}`);
}

console.log(`Found ${sourcemaps.length} sourcemaps in ${dir}`);

if (!force && sourcemaps.length > 0) {
	let answer = await question('Remove sourcemaps?', {
		choices: ['y', 'n'],
	});
	if (answer !== 'y') {
		await $`exit 1`;
	}
}

// Delete sourcemap files
sourcemaps.forEach(async (sourceMap) => {
	await $`rm ${sourceMap}`;
	console.log(`${sourceMap} removed`);
});
