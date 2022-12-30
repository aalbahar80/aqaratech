/** Manually copied from `lib.dom.d.ts` to avoid including the entire dom lib
 * in `/utils` and `/backend` (by adding `lib: ["DOM"]` in `tsconfig.json`). Provides
 * information about files and allows JavaScript in a web page to access their
 * content. */
export interface File extends Blob {
	readonly lastModified: number;
	readonly name: string;
	readonly webkitRelativePath: string;
}
