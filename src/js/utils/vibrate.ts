let lastVibration = Date.now()

export default function vibrate(pattern: VibratePattern, force = false) {
	let time
	if (Array.isArray(pattern))
		time = pattern.reduce((a, c) => (a += Number(c)), 0)
	else time = Number(pattern)

	if (force) {
		lastVibration = Date.now() + time
		return navigator.vibrate(pattern)
	}
	if (Date.now() + time > lastVibration) {
		return navigator.vibrate(pattern)
	}
	return false
}
