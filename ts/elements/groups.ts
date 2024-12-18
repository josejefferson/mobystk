import { AnchorX, AnchorY } from '../components/Element'
import type { IGroup } from '../types/Group'

const groups: IGroup[] = [
	// Setas
	{
		type: 'mobystk:group',
		id: 'mobystk:arrows',
		name: 'Grupo setas',
		anchorX: AnchorX.LEFT,
		anchorY: AnchorY.BOTTOM,
		x: [30, 'px'],
		y: [20, 'px'],
		width: [150, 'px'],
		height: [150, 'px'],
		content: [
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
			},
			{ import: 'mobystk:pad_up' },
			{ import: 'mobystk:pad_left' },
			{ import: 'mobystk:pad_right' },
			{ import: 'mobystk:pad_down' }
		]
	},

	// Setas no topo
	{
		type: 'mobystk:group',
		id: 'mobystk:arrows_top',
		name: 'Grupo setas no topo',
		anchorX: AnchorX.LEFT,
		anchorY: AnchorY.BOTTOM,
		x: [30, 'px'],
		y: [150, 'px'],
		width: [128, 'px'],
		height: [128, 'px'],
		content: [
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
			},
			{ import: 'mobystk:pad_up', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:pad_left', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:pad_right', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:pad_down', width: [48, 'px'], height: [48, 'px'] }
		]
	},

	// Ações (estilo XBOX)
	{
		type: 'mobystk:group',
		id: 'mobystk:xbox_actions',
		name: 'Grupo ações (estilo XBOX)',
		anchorX: AnchorX.RIGHT,
		anchorY: AnchorY.BOTTOM,
		x: [30, 'px'],
		y: [20, 'px'],
		width: [150, 'px'],
		height: [150, 'px'],
		content: [
			{
				import: 'mobystk:diag_left_up',
				targets: ['mobystk:xbox_act_left', 'mobystk:xbox_act_up']
			},
			{
				import: 'mobystk:diag_right_up',
				targets: ['mobystk:xbox_act_right', 'mobystk:xbox_act_up']
			},
			{
				import: 'mobystk:diag_left_down',
				targets: ['mobystk:xbox_act_left', 'mobystk:xbox_act_down']
			},
			{
				import: 'mobystk:diag_right_down',
				targets: ['mobystk:xbox_act_right', 'mobystk:xbox_act_down']
			},
			{ import: 'mobystk:xbox_act_up' },
			{ import: 'mobystk:xbox_act_left' },
			{ import: 'mobystk:xbox_act_right' },
			{ import: 'mobystk:xbox_act_down' }
		]
	},

	// Ações (estilo PlayStation)
	{
		type: 'mobystk:group',
		id: 'mobystk:ps_actions',
		name: 'Grupo ações (estilo PlayStation)',
		anchorX: AnchorX.RIGHT,
		anchorY: AnchorY.BOTTOM,
		x: [30, 'px'],
		y: [20, 'px'],
		width: [150, 'px'],
		height: [150, 'px'],
		content: [
			{
				import: 'mobystk:diag_left_up',
				targets: ['mobystk:ps_act_left', 'mobystk:ps_act_up']
			},
			{
				import: 'mobystk:diag_right_up',
				targets: ['mobystk:ps_act_right', 'mobystk:ps_act_up']
			},
			{
				import: 'mobystk:diag_left_down',
				targets: ['mobystk:ps_act_left', 'mobystk:ps_act_down']
			},
			{
				import: 'mobystk:diag_right_down',
				targets: ['mobystk:ps_act_right', 'mobystk:ps_act_down']
			},
			{ import: 'mobystk:ps_act_up' },
			{ import: 'mobystk:ps_act_left' },
			{ import: 'mobystk:ps_act_right' },
			{ import: 'mobystk:ps_act_down' }
		]
	},

	// Ações (estilo PlayStation) no topo
	{
		type: 'mobystk:group',
		id: 'mobystk:ps_actions_top',
		name: 'Grupo ações (estilo PlayStation) no topo',
		anchorX: AnchorX.RIGHT,
		anchorY: AnchorY.BOTTOM,
		x: [30, 'px'],
		y: [150, 'px'],
		width: [128, 'px'],
		height: [128, 'px'],
		content: [
			{
				import: 'mobystk:diag_left_up',
				targets: ['mobystk:ps_act_left', 'mobystk:ps_act_up']
			},
			{
				import: 'mobystk:diag_right_up',
				targets: ['mobystk:ps_act_right', 'mobystk:ps_act_up']
			},
			{
				import: 'mobystk:diag_left_down',
				targets: ['mobystk:ps_act_left', 'mobystk:ps_act_down']
			},
			{
				import: 'mobystk:diag_right_down',
				targets: ['mobystk:ps_act_right', 'mobystk:ps_act_down']
			},
			{ import: 'mobystk:ps_act_up', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:ps_act_left', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:ps_act_right', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:ps_act_down', width: [48, 'px'], height: [48, 'px'] }
		]
	}
]

export default groups
