import { EventData, JoystickOutputData } from 'nipplejs'
import Controller from '../classes/Controller'
import type Joystick from '../classes/Joystick'
import vibrate from '../utils/vibrate'
import { sendCmd } from './backend-integration'
import { $viewport } from './elements'
import options from './options'

type Direction = 'up' | 'left' | 'down' | 'right'
type Border = 'Top' | 'Left' | 'Bottom' | 'Right'
const joysticks = ['mobystk:joystick_left', 'mobystk:joystick_right']

/**
 * Atualiza os dados dos joysticks e pressiona as teclas do computador
 */
export default function updateJoystick(target: Joystick, _e: EventData, d: JoystickOutputData) {
	vibrate((options.vibrateJoystick * d?.distance) / 45)

	// Se estiver usando o vgamepad
	if (options.vgamepad && joysticks.includes(target.id)) {
		let x = Math.round(-32768 + (65534 / 90) * (45 + d?.distance * Math.cos(d?.angle?.radian)))
		let y = Math.round(-32768 + (65534 / 90) * (45 + d?.distance * Math.sin(d?.angle?.radian)))
		if (isNaN(x) || isNaN(y)) x = y = 0
		if (target.id === 'mobystk:joystick_left') sendCmd(`${x}|${y}`, false, 'VJL')
		if (target.id === 'mobystk:joystick_right') sendCmd(`${x}|${y}`, false, 'VJR')
	}

	// Se o joystick estiver em repouso, desapertar teclas
	if (!d?.direction) {
		update('up', false)
		update('left', false)
		update('down', false)
		update('right', false)
		return
	}

	// Define as teclas de acordo com a posição
	if (!options.disJoyYAxis) update('up', d?.angle.degree > 22.5 && d?.angle.degree < 157.5)
	if (!options.disJoyXAxis) update('left', d?.angle.degree > 112.5 && d?.angle.degree < 247.5)
	if (!options.disJoyYAxis) update('down', d?.angle.degree > 202.5 && d?.angle.degree < 337.5)
	if (!options.disJoyXAxis) update('right', d?.angle.degree > 292.5 || d?.angle.degree < 67.5)

	/**
	 * Pressiona as teclas
	 */
	function update(dir: Direction, value: boolean) {
		const { key, border } = getKeyAndBorder(target.keys, dir)

		// Efeito da borda
		const $back = target.element.querySelector<HTMLElement>('.back')
		$back.style[`border${border}Width`] = value ? '7px' : ''

		if (!(options.vgamepad && joysticks.includes(target.id))) {
			if (target.position[dir] === value) return
			sendCmd([key], !value)
		}

		target.position[dir] = value
	}
}

/**
 * Retorna a tecla que será pressionada e a borda
 */
function getKeyAndBorder(keys: [string, string, string, string], dir: Direction) {
	let key: string
	let border: Border

	switch (dir) {
		case 'up':
			key = keys[0]
			border = 'Top'
			break
		case 'left':
			key = keys[1]
			border = 'Left'
			break
		case 'down':
			key = keys[2]
			border = 'Bottom'
			break
		case 'right':
			key = keys[3]
			border = 'Right'
			break
	}

	return { key, border }
}

/**
 * Reinicia os joysticks para evitar bugs
 */
function resizeJoystick() {
	// Ajusta os tamanhos do controle
	let width: number
	if (window.outerHeight > window.outerWidth / 1.7777777777777777) width = 640
	else width = (window.outerWidth / window.outerHeight) * 360
	$viewport.setAttribute('content', `width=${width}, user-scalable=0`)

	// Reconstrói os joysticks
	Controller.currentTouches = Controller.currentTouches.filter((el) => !el.joystick)
	const joysticks = Controller.elements.joysticks
	joysticks.forEach((j) => j.render())
}

window.addEventListener('load', resizeJoystick)
window.addEventListener('resize', resizeJoystick)
