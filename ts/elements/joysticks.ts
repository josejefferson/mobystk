import { AnchorX, AnchorY } from '../components/Element'
import type { IJoystick } from '../types/Joystick'

const joysticks: IJoystick[] = [
	// Joystick esquerdo
	{
		type: 'mobystk:joystick',
		id: 'mobystk:joystick_left',
		name: 'Joystick esquerdo',
		anchorX: AnchorX.LEFT,
		anchorY: AnchorY.BOTTOM,
		x: [10, 'px'],
		y: [0, 'px'],
		size: [90, 'px'],
		padding: 60,
		keys: ['joyLUp', 'joyLLeft', 'joyLDown', 'joyLRight']
	},

	// Joystick direito
	{
		type: 'mobystk:joystick',
		id: 'mobystk:joystick_right',
		name: 'Joystick direito',
		anchorX: AnchorX.RIGHT,
		anchorY: AnchorY.BOTTOM,
		x: [10, 'px'],
		y: [160, 'px'],
		size: [90, 'px'],
		padding: 60,
		keys: ['joyRUp', 'joyRLeft', 'joyRDown', 'joyRRight']
	},

	// Joystick de setas
	{
		type: 'mobystk:joystick',
		id: 'mobystk:joystick_arrow',
		name: 'Joystick de setas',
		anchorX: AnchorX.LEFT,
		anchorY: AnchorY.BOTTOM,
		x: [10, 'px'],
		y: [0, 'px'],
		size: [90, 'px'],
		padding: 60,
		keys: ['padUp', 'padLeft', 'padDown', 'padRight']
	}
]

export default joysticks
