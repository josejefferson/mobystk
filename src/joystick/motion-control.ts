import ButtonComponent from '../components/Button'
import Controller from '../shared/controller'
import options from '../shared/options'
import { socket } from '../shared/socket'
import vibrate from '../utils/vibrate'

type Direction = 'JOYSTICK_1_UP' | 'JOYSTICK_1_LEFT' | 'JOYSTICK_1_RIGHT'

const defaultDriveHTML = `
	<svg viewBox="0 0 32 32">
		<path d="M16 0a16 16 0 100 32 16 16 0 000-32zm0 4a12 12 0 0111.3 8H4.7c1.7-4.6 6-8 11.3-8zm0 14a2 2 0 110-4 2 2 0 010 4zM4 16c5.5 0 9.9 5.3 10 11.8A12 12 0 014 16zm14 11.8c.1-6.5 4.5-11.8 10-11.8a12 12 0 01-10 11.8z"></path>
	</svg>`

export default function loadDriveMode() {
	const drive: ButtonComponent = Controller.elements.buttons.find(
		(e) => e.customAction === 'drive'
	)!
	const driveHTML = drive ? (drive._html = defaultDriveHTML) : ''
	drive?.render()
	if (drive) drive.element!.addEventListener('touchstart', toggleDriveMode)

	// Desativa o ícone de volante, caso não esteja em HTTPS
	if (!isHTTPS() && drive && drive.element) drive.element.style.display = 'none'

	/**
	 * Liga/desliga o sensor
	 */
	function toggleDriveMode() {
		if (window.layoutEditor?.opened) return

		// Inicia/para o sensor
		if (drive.active) stopSensor()
		else startSensor()

		/**
		 * Inicia o sensor
		 */
		function startSensor() {
			drive.press()
			drive.element!.innerHTML = '<i class="driveArrow mdi mdi-arrow-up"></i>'
			let driveY = 0
			let driveAngle = 0
			let lastDirections: Direction[] = []

			// Detecta os movimentos
			window.ondevicemotion = (e: DeviceMotionEvent) => {
				const land = window.outerWidth > window.outerHeight
				const inverted = e.accelerationIncludingGravity![land ? 'x' : 'y']! >= 0 ? 1 : -1
				driveY = parseFloat(e.accelerationIncludingGravity![land ? 'y' : 'x']!.toFixed(1))
				driveY *= inverted * (land ? 1 : -1)

				const $steeringWheel = drive.element!.children[0] as HTMLElement
				if (options.useKeyboard) {
					// Define a direção (ângulo)
					const angle = getArrowAngle(
						driveAngle,
						driveY,
						options.driveSensitivity,
						options.drivePrecision
					)
					if (angle === driveAngle) return
					$steeringWheel.style.transform = `rotate(${angle}deg)`
					driveAngle = angle
					vibrate(options.vibrate * 2)

					// Pressiona as teclas
					const directions = getDirections(angle)
					const pressKeys = directions.filter((e) => !lastDirections.includes(e))
					const unpressKeys = lastDirections.filter((e) => !directions.includes(e))

					for (const key of pressKeys) socket.sendKey(key, 'press')
					for (const key of unpressKeys) socket.sendKey(key, 'release')

					lastDirections = [...directions]
				} else {
					// Usando VGamepad
					let x = Math.round((32767 / options.driveSensitivity) * driveY)
					if (x < 10923 * options.drivePrecision && x > -10923 * options.drivePrecision) x = 0
					if (x > 32767) x = 32767
					if (x < -32767) x = -32767
					const angle = (90 * x) / 32767
					$steeringWheel.style.transform = `rotate(${angle}deg)`
					socket.sendJoystickPos('JOYSTICK_1', x)
				}
			}
		}

		/**
		 * Para o sensor
		 */
		function stopSensor() {
			drive.release()
			drive.element!.innerHTML = driveHTML
			window.ondevicemotion = null
			if (options.useKeyboard) {
				socket.sendKey('JOYSTICK_1_UP', 'release')
				socket.sendKey('JOYSTICK_1_LEFT', 'release')
				socket.sendKey('JOYSTICK_1_RIGHT', 'release')
			} else {
				socket.sendJoystickPos('JOYSTICK_1')
			}
		}
	}
}

/**
 * Retorna true se o site estiver em HTTPS
 */
function isHTTPS(): boolean {
	return (
		location.protocol === 'https:' ||
		location.hostname === 'localhost' ||
		location.hostname === '127.0.0.1'
	)
}

/**
 * Retorna o ângulo em graus da rotação do celular
 */
function getArrowAngle(driveAngle: number, driveY: number, SENSITIVITY: number, PRECISION: number) {
	let angle = 0
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

	return angle
}

/**
 * Retorna as teclas que devem estar pressionadas no ângulo atual
 */
function getDirections(angle: number) {
	let directions: Direction[]
	switch (angle) {
		case -90:
			directions = ['JOYSTICK_1_LEFT']
			break
		case -45:
			directions = ['JOYSTICK_1_UP', 'JOYSTICK_1_LEFT']
			break
		case 45:
			directions = ['JOYSTICK_1_UP', 'JOYSTICK_1_RIGHT']
			break
		case 90:
			directions = ['JOYSTICK_1_RIGHT']
			break
		default:
			directions = ['JOYSTICK_1_UP']
	}

	return directions
}
