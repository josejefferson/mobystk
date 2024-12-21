import { AnchorX, AnchorY } from '../components/Element'
import type { IGroup } from '../types/Group'

// Diagonais das setas
const arrowsDiagonals = [
	{
		import: 'mobystk:diag_left_up',
		targets: ['mobystk:pad_left', 'mobystk:pad_up']
	},
	{
		import: 'mobystk:diag_right_up',
		targets: ['mobystk:pad_right', 'mobystk:pad_up']
	},
	{
		import: 'mobystk:diag_left_down',
		targets: ['mobystk:pad_left', 'mobystk:pad_down']
	},
	{
		import: 'mobystk:diag_right_down',
		targets: ['mobystk:pad_right', 'mobystk:pad_down']
	}
]

// Grupo setas na parte superior
const arrowsTop: IGroup = {
	type: 'mobystk:group',
	id: 'mobystk:arrows_top',
	name: 'Grupo setas na parte superior',
	anchorX: AnchorX.LEFT,
	anchorY: AnchorY.TOP,
	x: [60, 'px'],
	y: [72, 'px'],
	width: [150, 'px'],
	height: [150, 'px'],
	content: [
		...arrowsDiagonals,
		{ import: 'mobystk:pad_up' },
		{ import: 'mobystk:pad_left' },
		{ import: 'mobystk:pad_right' },
		{ import: 'mobystk:pad_down' }
	]
}

// Grupo setas na parte inferior
const arrowsBottom: IGroup = {
	...arrowsTop,
	id: 'mobystk:arrows_bottom',
	name: 'Grupo setas na parte inferior',
	anchorY: AnchorY.BOTTOM,
	y: [30, 'px'],
	width: [180, 'px'],
	height: [180, 'px'],
	content: [
		...arrowsDiagonals,
		{ import: 'mobystk:pad_up', width: [70, 'px'], height: [70, 'px'] },
		{ import: 'mobystk:pad_left', width: [70, 'px'], height: [70, 'px'] },
		{ import: 'mobystk:pad_right', width: [70, 'px'], height: [70, 'px'] },
		{ import: 'mobystk:pad_down', width: [70, 'px'], height: [70, 'px'] }
	]
}

// Diagonais das ações
const actionsDiagonals = [
	{
		import: 'mobystk:diag_left_up',
		targets: ['mobystk:action_left', 'mobystk:action_up']
	},
	{
		import: 'mobystk:diag_right_up',
		targets: ['mobystk:action_right', 'mobystk:action_up']
	},
	{
		import: 'mobystk:diag_left_down',
		targets: ['mobystk:action_left', 'mobystk:action_down']
	},
	{
		import: 'mobystk:diag_right_down',
		targets: ['mobystk:action_right', 'mobystk:action_down']
	}
]

// Grupo ações na parte inferior
const actionsBottom: IGroup = {
	type: 'mobystk:group',
	id: 'mobystk:actions_bottom',
	name: 'Grupo ações na parte inferior',
	anchorX: AnchorX.RIGHT,
	anchorY: AnchorY.BOTTOM,
	x: [60, 'px'],
	y: [30, 'px'],
	width: [180, 'px'],
	height: [180, 'px'],
	content: [
		...actionsDiagonals,
		{ import: 'mobystk:action_up' },
		{ import: 'mobystk:action_left' },
		{ import: 'mobystk:action_right' },
		{ import: 'mobystk:action_down' }
	]
}

// Grupo ações na parte superior
const actionsTop: IGroup = {
	...actionsBottom,
	id: 'mobystk:actions_top',
	name: 'Grupo ações na parte superior',
	anchorY: AnchorY.TOP,
	y: [72, 'px'],
	width: [150, 'px'],
	height: [150, 'px'],
	content: [
		...actionsDiagonals,
		{ import: 'mobystk:action_up', width: [58, 'px'], height: [58, 'px'] },
		{ import: 'mobystk:action_left', width: [58, 'px'], height: [58, 'px'] },
		{ import: 'mobystk:action_right', width: [58, 'px'], height: [58, 'px'] },
		{ import: 'mobystk:action_down', width: [58, 'px'], height: [58, 'px'] }
	]
}

const groups: IGroup[] = [arrowsTop, arrowsBottom, actionsBottom, actionsTop]

export default groups
