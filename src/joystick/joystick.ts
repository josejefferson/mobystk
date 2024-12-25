import { EventData, JoystickOutputData } from 'nipplejs'
import type JoystickComponent from '../components/Joystick'
import Controller from '../shared/controller'
import options from '../shared/options'
import { socket } from '../shared/socket'
import { Key } from '../types/socket'
import vibrate from '../utils/vibrate'
import { $viewport } from './elements'

type Direction = 'up' | 'left' | 'down' | 'right'
type Border = 'Top' | 'Left' | 'Bottom' | 'Right'
const joysticks = [
	'mobystk:joystick_left_bottom',
	'mobystk:joystick_left_top',
	'mobystk:joystick_right_top',
	'mobystk:joystick_right_bottom'
]

/**
 * Atualiza os dados dos joysticks e pressiona as teclas do computador
 */
export default function updateJoystick(
	target: JoystickComponent,
	_e: EventData,
	d: JoystickOutputData
) {
	if (options.vibrateJoystick) {
		vibrate((options.vibrateJoystick * d?.distance) / 45)
	}

	// Se estiver usando o controle virtual
	if (!options.useKeyboard && joysticks.includes(target.id)) {
		const x = d?.vector?.x
		const y = d?.vector?.y
		if (target.id.startsWith('mobystk:joystick_left')) socket.sendJoystickPos('JOYSTICK_1', x, y)
		if (target.id.startsWith('mobystk:joystick_right')) socket.sendJoystickPos('JOYSTICK_2', x, y)
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
	function update(dir: Direction, press: boolean) {
		const { key, border } = getKeyAndBorder(target.keys, dir)

		// Efeito da borda
		const $back = target.element!.querySelector<HTMLElement>('.back')!
		$back.style[`border${border}Width`] = press ? '7px' : ''

		if (!(!options.useKeyboard && joysticks.includes(target.id))) {
			if (target.position[dir] === press) return
			socket.sendKey(key, press ? 'press' : 'release')
		}

		target.position[dir] = press
	}
}

/**
 * Retorna a tecla que será pressionada e a borda
 */
function getKeyAndBorder(keys: [Key, Key, Key, Key], dir: Direction) {
	const keysAndBorders: {
		[key: string]: [Key, Border]
	} = {
		up: [keys[0], 'Top'],
		left: [keys[1], 'Left'],
		down: [keys[2], 'Bottom'],
		right: [keys[3], 'Right']
	}

	const [key, border] = keysAndBorders[dir]
	return { key, border }
}

const IDEAL_WIDTH = 720
const IDEAL_HEIGHT = 400

/**
 * Reinicia os joysticks para evitar bugs
 */
export function resizeJoystick() {
	// Ajusta os tamanhos do controle
	let width: number
	if (window.innerHeight > window.innerWidth / (IDEAL_WIDTH / IDEAL_HEIGHT)) width = IDEAL_WIDTH
	else width = (window.innerWidth / window.innerHeight) * IDEAL_HEIGHT

	// @ts-ignore
	document.body.style.zoom = `${window.innerWidth / width}`

	// Reconstrói os joysticks
	Controller.currentTouches = Controller.currentTouches.filter((el) => !el.joystick)
	const joysticks = Controller.elements.joysticks
	joysticks.forEach((j) => j.render())
}

window.addEventListener('load', resizeJoystick)
window.addEventListener('resize', resizeJoystick)
