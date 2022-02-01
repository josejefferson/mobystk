Controller.GROUPS = [
	{
		type: 'mobystk:group',
		id: 'mobystk:arrows',
		name: 'Setas',
		anchorX: 0,
		anchorY: 1,
		x: [30, 'px'],
		y: [20, 'px'],
		width: [150, 'px'],
		height: [150, 'px'],
		content: [
			{ import: 'mobystk:diag_left_up', targets: ['mobystk:pad_left', 'mobystk:pad_up'] },
			{ import: 'mobystk:diag_right_up', targets: ['mobystk:pad_right', 'mobystk:pad_up'] },
			{ import: 'mobystk:diag_left_down', targets: ['mobystk:pad_left', 'mobystk:pad_down'] },
			{ import: 'mobystk:diag_right_down', targets: ['mobystk:pad_right', 'mobystk:pad_down'] },
			{ import: 'mobystk:pad_up' },
			{ import: 'mobystk:pad_left' },
			{ import: 'mobystk:pad_right' },
			{ import: 'mobystk:pad_down' }
		]
	},

	{
		type: 'mobystk:group',
		id: 'mobystk:arrows_top',
		name: 'Setas no topo',
		anchorX: 0,
		anchorY: 1,
		x: [30, 'px'],
		y: [150, 'px'],
		width: [128, 'px'],
		height: [128, 'px'],
		content: [
			{ import: 'mobystk:diag_left_up', targets: ['mobystk:pad_left', 'mobystk:pad_up'] },
			{ import: 'mobystk:diag_right_up', targets: ['mobystk:pad_right', 'mobystk:pad_up'] },
			{ import: 'mobystk:diag_left_down', targets: ['mobystk:pad_left', 'mobystk:pad_down'] },
			{ import: 'mobystk:diag_right_down', targets: ['mobystk:pad_right', 'mobystk:pad_down'] },
			{ import: 'mobystk:pad_up', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:pad_left', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:pad_right', width: [48, 'px'], height: [48, 'px'] },
			{ import: 'mobystk:pad_down', width: [48, 'px'], height: [48, 'px'] }
		]
	},

	{
		type: 'mobystk:group',
		id: 'mobystk:xbox_actions',
		name: 'Ações (estilo XBOX)',
		anchorX: 1,
		anchorY: 1,
		x: [30, 'px'],
		y: [20, 'px'],
		width: [150, 'px'],
		height: [150, 'px'],
		content: [
			{ import: 'mobystk:diag_left_up', targets: ['mobystk:xbox_act_left', 'mobystk:xbox_act_up'] },
			{ import: 'mobystk:diag_right_up', targets: ['mobystk:xbox_act_right', 'mobystk:xbox_act_up'] },
			{ import: 'mobystk:diag_left_down', targets: ['mobystk:xbox_act_left', 'mobystk:xbox_act_down'] },
			{ import: 'mobystk:diag_right_down', targets: ['mobystk:xbox_act_right', 'mobystk:xbox_act_down'] },
			{ import: 'mobystk:xbox_act_up' },
			{ import: 'mobystk:xbox_act_left' },
			{ import: 'mobystk:xbox_act_right' },
			{ import: 'mobystk:xbox_act_down' }
		]
	},

	{
		type: 'mobystk:group',
		id: 'mobystk:ps_actions',
		name: 'Ações (estilo PlayStation)',
		anchorX: 1,
		anchorY: 1,
		x: [30, 'px'],
		y: [20, 'px'],
		width: [150, 'px'],
		height: [150, 'px'],
		content: [
			{ import: 'mobystk:diag_left_up', targets: ['mobystk:ps_act_left', 'mobystk:ps_act_up'] },
			{ import: 'mobystk:diag_right_up', targets: ['mobystk:ps_act_right', 'mobystk:ps_act_up'] },
			{ import: 'mobystk:diag_left_down', targets: ['mobystk:ps_act_left', 'mobystk:ps_act_down'] },
			{ import: 'mobystk:diag_right_down', targets: ['mobystk:ps_act_right', 'mobystk:ps_act_down'] },
			{ import: 'mobystk:ps_act_up' },
			{ import: 'mobystk:ps_act_left' },
			{ import: 'mobystk:ps_act_right' },
			{ import: 'mobystk:ps_act_down' }
		]
	},	
]