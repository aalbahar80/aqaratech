// Remove unused jsdoc params from openapi generated files.
// This is a workaround since svelte-check will complain about unused params.

import { Project, SyntaxKind } from 'ts-morph';

const project = new Project();

const globPattern = `./packages/site/src/api/openapi/**/*.ts`;

const sourceFiles = project.addSourceFilesAtPaths(globPattern);
console.log(`Found ${sourceFiles.length} source files.`);

let count = 0;

for (const sourceFile of sourceFiles) {
	console.log(sourceFile.getFilePath());
	sourceFile.fixUnusedIdentifiers();

	// delete all jsdoc @param tags
	for (const param of sourceFile.getDescendantsOfKind(
		SyntaxKind.JSDocParameterTag,
	)) {
		const paramSymbol = param.getSymbol();

		const declarations = paramSymbol?.getDeclarations();

		const paramName = param.getText();

		if (declarations && declarations.length >= 0) {
			// const text = declarations[0]?.getText();

			console.log(`Keeping used param: ${paramName}`);
		} else {
			count++;
			// console.warn('Deleting unused param:', paramName);

			param.remove();
		}
	}

	// save the file
	sourceFile.saveSync();
}

console.warn(
	`[rm-unused-jsdoc.ts] Successfully deleted ${count} unused jsdoc params from generated openapi files!`,
);
