import styles from 'ansi-styles'
import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
const { bgCyan, bold, yellow, reset } = styles

const ctx = await esbuild.context({
	entryPoints: ['src/index/index.ts', 'src/joystick/index.ts'],
	outdir: './dist/js',
	bundle: true,
	minify: true,
	splitting: true,
	format: 'esm',
	plugins: [clean({ patterns: ['./dist/js/*'] })]
})

if (process.argv.includes('--watch')) {
	// Watch mode
	await ctx.watch()
	const { host, port } = await ctx.serve({ servedir: 'dist' })
	console.log(
		`- ${bgCyan.open}[INFO]${bgCyan.close} ${bold.open}Server running at ${yellow.open}${host}:${port}${reset.open}`
	)
	console.log(`- ${bgCyan.open}[INFO]${bgCyan.close} ${bold.open}Watching for changes...`)
} else {
	// Build
	await ctx.rebuild()
	process.exit()
}
