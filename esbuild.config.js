import styles from 'ansi-styles'
import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
const { bgCyan, bold, yellow, reset } = styles

const ctx = await esbuild.context({
	entryPoints: ['ts/index/index.ts', 'ts/joystick/index.ts', 'ts/setup/index.ts'],
	outdir: './public/js',
	bundle: true,
	minify: true,
	splitting: true,
	format: 'esm',
	plugins: [clean({ patterns: ['./public/js/*'] })]
})

if (process.argv.includes('--watch')) {
	// Watch mode
	await ctx.watch()
	const { host, port } = await ctx.serve({ servedir: 'src' })
	console.log(
		`- ${bgCyan.open}[INFO]${bgCyan.close} ${bold.open}Server running at ${yellow.open}${host}:${port}${reset.open}`
	)
	console.log(`- ${bgCyan.open}[INFO]${bgCyan.close} ${bold.open}Watching for changes...`)
} else {
	// Build
	await ctx.rebuild()
	process.exit()
}
