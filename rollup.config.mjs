import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
	input: 'src/index.ts',
	output: [{
		file: 'dist/index.js',
		format: 'esm',
		sourcemap: true,
	}, {
		file: 'dist/index.cjs',
		format: 'cjs',
		sourcemap: true
	}],
	plugins: [
		nodeResolve(),
		typescript(),
		commonjs(),
	]
};
