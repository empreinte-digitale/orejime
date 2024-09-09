import {defineConfig} from 'tsup'

export default defineConfig({
	entry: {
		orejime: 'src/index.ts'
	},
	format: ["cjs", "esm"],
	outDir: "dist",
	outExtension({format}) {
		return {
			js: format === 'cjs'
				? '.cjs'
				: format === 'esm'
					? '.mjs'
					: '.js',
		}
	},
	dts: true,
	splitting: false,
})
