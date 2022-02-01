const drive = Controller.elements.buttons.find(e => e.customAction === 'drive')
const driveHTML = drive ? drive.element.innerHTML = `
	<svg viewBox="0 0 32 32">
		<path d="M16 0a16 16 0 100 32 16 16 0 000-32zm0 4a12 12 0 0111.3 8H4.7c1.7-4.6 6-8 11.3-8zm0 14a2 2 0 110-4 2 2 0 010 4zM4 16c5.5 0 9.9 5.3 10 11.8A12 12 0 014 16zm14 11.8c.1-6.5 4.5-11.8 10-11.8a12 12 0 01-10 11.8z"></path>
	</svg>` : ''
if (drive) drive.element.addEventListener('touchstart', toggleDriveMode)

// Caso não esteja em HTTPS, desativa o ícone de volante
if (!(location.protocol === 'https:' ||
	location.hostname === 'localhost' ||
	location.hostname === '127.0.0.1'))
	drive.element.style.display = 'none'

// LIGA/DESLIGA O SENSOR
function toggleDriveMode(e) {
	if (window.layoutEditor?.opened) return

	const SENSITIVITY = options.driveSensitivity
	const PRECISION = options.drivePrecision

	// Desliga o sensor e desaperta as teclas
	if (drive.active) {
		drive.release()
		drive.element.innerHTML = driveHTML
		window.ondevicemotion = null
		if (!options.vgamepad) {
			sendCmd('joyLUp', true)
			sendCmd('joyLLeft', true)
			sendCmd('joyLRight', true)
		} else {
			sendCmd('0|0', false, 'VJL')
		}
		return
	}

	// Ativa o sensor
	drive.press()
	drive.element.innerHTML = '<i class="driveArrow mdi mdi-arrow-up"></i>'
	let driveY = 0, driveAngle = 0, lastDirections = []

	// Detecta os movimentos
	window.ondevicemotion = (e) => {
		const land = window.outerWidth > window.outerHeight
		const inverted = e.accelerationIncludingGravity[land ? 'x' : 'y'] >= 0 ? 1 : -1
		driveY = parseFloat(e.accelerationIncludingGravity[land ? 'y' : 'x'].toFixed(1))
		driveY *= inverted * (land ? 1 : -1)

		if (!options.vgamepad) {
			// Define a direção (ângulo)
			angle = 0
			if (driveAngle === -45) {
				if (driveY > SENSITIVITY) angle = 45
				if (driveY < -SENSITIVITY + PRECISION) angle = -45
				if (driveY > SENSITIVITY * 2) angle *= 2
				if (driveY < -SENSITIVITY * 2 - PRECISION) angle *= 2
			} else if (driveAngle === 45) {
				if (driveY > SENSITIVITY - PRECISION) angle = 45
				if (driveY < -SENSITIVITY) angle = -45
				if (driveY > SENSITIVITY * 2 + PRECISION) angle *= 2
				if (driveY < -SENSITIVITY * 2) angle *= 2
			} else {
				if (driveY > SENSITIVITY) angle = 45
				if (driveY < -SENSITIVITY) angle = -45
				if (driveY > SENSITIVITY * 2) angle *= 2
				if (driveY < -SENSITIVITY * 2) angle *= 2
			}

			if (angle === driveAngle) return
			drive.element.children[0].style.transform = `rotate(${angle}deg)`

			// Define a direção
			switch (angle) {
				case -90: directions = ['joyLLeft']; break
				case -45: directions = ['joyLUp', 'joyLLeft']; break
				case 45: directions = ['joyLUp', 'joyLRight']; break
				case 90: directions = ['joyLRight']; break
				default: directions = ['joyLUp']
			}

			driveAngle = angle
			navigator.vibrate(options.vibrate * 2)

			// Pressiona as teclas
			const pressKeys = directions.filter(e => !lastDirections.includes(e))
			const unpressKeys = lastDirections.filter(e => !directions.includes(e))
			sendCmd(pressKeys)
			sendCmd(unpressKeys, true)

			lastDirections = [...directions]
		} else {
			// Usando VGamepad
			let x = Math.round(32767 / SENSITIVITY * driveY)
			if ((x < 10923 * PRECISION) && (x > -10923 * PRECISION)) x = 0
			if (x > 32767) x = 32767
			if (x < -32767) x = -32767
			const angle = 90 * x / 32767
			drive.element.children[0].style.transform = `rotate(${angle}deg)`
			sendCmd(`${x}|0`, false, 'VJL')
		}
	}
}