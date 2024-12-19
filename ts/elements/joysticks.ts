import { AnchorX, AnchorY } from '../components/Element'
import type { IJoystick } from '../types/Joystick'

// Joystick esquerdo na parte inferior
const leftJoystickBottom: IJoystick = {
	type: 'mobystk:joystick',
	id: 'mobystk:joystick_left_bottom',
	name: 'Joystick esquerdo na parte inferior',
	anchorX: AnchorX.LEFT,
	anchorY: AnchorY.BOTTOM,
	x: [30, 'px'],
	y: [20, 'px'],
	size: [120, 'px'],
	padding: 30,
	keys: ['joyLUp', 'joyLLeft', 'joyLDown', 'joyLRight']
}

// Joystick esquerdo na parte superior
const leftJoystickTop: IJoystick = {
	...leftJoystickBottom,
	id: 'mobystk:joystick_left_top',
	name: 'Joystick esquerdo na parte superior',
	anchorY: AnchorY.TOP,
	x: [75, 'px'],
	y: [72, 'px'],
	size: [60, 'px']
}

// Joystick direito na parte superior
const rightJoystickTop: IJoystick = {
	...leftJoystickTop,
	id: 'mobystk:joystick_right_top',
	name: 'Joystick direito na parte superior',
	anchorX: AnchorX.RIGHT,
	keys: ['joyRUp', 'joyRLeft', 'joyRDown', 'joyRRight']
}

// Joystick direito na parte inferior
const rightJoystickBottom: IJoystick = {
	...leftJoystickBottom,
	id: 'mobystk:joystick_right_bottom',
	name: 'Joystick direito na parte inferior',
	anchorX: AnchorX.RIGHT,
	keys: ['joyRUp', 'joyRLeft', 'joyRDown', 'joyRRight']
}

const joysticks: IJoystick[] = [
	leftJoystickBottom,
	leftJoystickTop,
	rightJoystickTop,
	rightJoystickBottom
]

export default joysticks
