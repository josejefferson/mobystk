export default function getPrecision(num: number | string) {
	const str = Number(num).toString()
	const arr = str.indexOf('.') + 1
	return !arr ? 0 : str.length - arr
}
