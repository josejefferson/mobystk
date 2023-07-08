import nipplejs, { JoystickManager } from 'nipplejs'
import options from '../shared/options'
import type { IElementNode, IJoystick, IJoystickComponent, ValueAndUnit } from '../types'
import ElementComponent from './Element'

export default class JoystickComponent extends ElementComponent implements IJoystickComponent {
	type: 'mobystk:joystick'
	size: ValueAndUnit
	padding: number
	keys: [string, string, string, string]
	position: {
		up: boolean
		down: boolean
		left: boolean
		right: boolean
	}
	nipple?: JoystickManager

	constructor(details: IJoystick) {
		super(details)
		this.type = 'mobystk:joystick'

		this.size = details.size || [90, 'px']
		this.padding = details.padding || 60

		this.keys = details.keys || ['joyLUp', 'joyLLeft', 'joyLDown', 'joyLRight']
		this.position = { up: false, down: false, left: false, right: false }

		const $joystick = <IElementNode<JoystickComponent, HTMLDivElement>>document.createElement('div')
		$joystick.classList.add('controller-joystick')
		$joystick.dataset.id = this.id
		$joystick.instance = this
		this.element = $joystick
	}

	render() {
		this.width = [this.size[0] + this.padding, this.size[1]]
		this.height = [this.size[0] + this.padding, this.size[1]]
		super.render()
		const el = this.element

		// Reseta a posição
		this.position = { up: false, down: false, left: false, right: false }

		// NippleJS
		if (this.nipple) this.nipple.destroy()
		this.nipple = nipplejs.create({
			zone: el,
			size: this.size[0],
			mode: 'static',
			position: {
				left: '50%',
				top: '50%'
			},
			lockX: options.disJoyYAxis,
			lockY: options.disJoyXAxis
		})

		// Eventos
		this.nipple.on('move', (e, d) => this.emit('move', this, e, d))
		this.nipple.on('end', (e, d) => this.emit('end', this, e, d))
	}

	toObject(): IJoystick {
		return {
			...super.toObject(),
			type: this.type,
			size: this.size,
			padding: this.padding,
			keys: this.keys
		}
	}
}
