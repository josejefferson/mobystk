let lastVibrationTime = Date.now()
let lastVibrationDuration: number = 0

/**
 * Faz o dispositivo vibrar
 */
export default function vibrate(pattern: VibratePattern, force = false) {
	let duration: number
	if (Array.isArray(pattern)) duration = pattern.reduce((a, c) => (a += Number(c)), 0)
	else duration = Number(pattern)

	if (duration > lastVibrationDuration) force = true
	lastVibrationDuration = duration

	if (force) {
		lastVibrationTime = Date.now() + duration
		return navigator.vibrate(pattern)
	}
	if (Date.now() + duration > lastVibrationTime) {
		return navigator.vibrate(pattern)
	}
	return false
}
