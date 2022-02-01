Controller.layouts.push({
	'type': 'mobystk:layout',
	'id': 'mobystk:psp',
	'name': 'PSP',
	'content': [
		{ 'import': 'mobystk:drive' },
		{ 'import': 'mobystk:macro_record' },
		{ 'import': 'mobystk:macro_play' },
		{ 'import': 'mobystk:volume_up' },
		{ 'import': 'mobystk:volume_down' },
		{ 'import': 'mobystk:left' },
		{ 'import': 'mobystk:right' },
		{ 'import': 'mobystk:load_state', anchorX: 1, x: [128, 'px'] },
		{ 'import': 'mobystk:save_state' },
		{ 'import': 'mobystk:select' },
		{ 'import': 'mobystk:pause' },
		{ 'import': 'mobystk:start' },
		{ 'import': 'mobystk:fast_forward' },
		options.invertL
			? { 'import': 'mobystk:arrows' }
			: { 'import': 'mobystk:arrows_top' },
		{ 'import': 'mobystk:ps_actions' },
		{
			'import': 'mobystk:joystick_left',
			...(options.invertL ? { y: [160, 'px'] } : {})
		}
	]
})

Controller.layouts.push({
	'type': 'mobystk:layout',
	'id': 'mobystk:ps2',
	'name': 'PS2',
	'content': [
		{ 'import': 'mobystk:drive' },
		{ 'import': 'mobystk:macro_record' },
		{ 'import': 'mobystk:macro_play' },
		{ 'import': 'mobystk:volume_up' },
		{ 'import': 'mobystk:volume_down' },
		{ 'import': 'mobystk:left_1' },
		{ 'import': 'mobystk:left_2' },
		{ 'import': 'mobystk:left_3' },
		{ 'import': 'mobystk:right_1' },
		{ 'import': 'mobystk:right_2' },
		{ 'import': 'mobystk:right_3' },
		{ 'import': 'mobystk:select', width: [130, 'px'] },
		{ 'import': 'mobystk:start', width: [130, 'px'] },
		{ 'import': 'mobystk:fast_forward' },
		options.invertL
			? { 'import': 'mobystk:arrows' }
			: { 'import': 'mobystk:arrows_top' },
		options.invertR
			? { 'import': 'mobystk:ps_actions_top' }
			: { 'import': 'mobystk:ps_actions' },
		{
			'import': 'mobystk:joystick_left', x: [30, 'px'],
			...(options.invertL ? { y: [160, 'px'] } : {})
		},
		{
			'import': 'mobystk:joystick_right', x: [30, 'px'],
			...(options.invertR ? { y: [0, 'px'] } : {})
		}
	]
})


Controller.layouts.push({
	'type': 'mobystk:layout',
	'id': 'mobystk:snes',
	'name': 'SNES',
	'content': [
		{ 'import': 'mobystk:macro_record' },
		{ 'import': 'mobystk:macro_play' },
		{ 'import': 'mobystk:volume_up' },
		{ 'import': 'mobystk:volume_down' },
		{ 'import': 'mobystk:left' },
		{ 'import': 'mobystk:right' },
		{ 'import': 'mobystk:load_state' },
		{ 'import': 'mobystk:save_state' },
		{ 'import': 'mobystk:select' },
		{ 'import': 'mobystk:start' },
		{ 'import': 'mobystk:fast_forward' },
		options.invertL
			? { 'import': 'mobystk:joystick_arrow' }
			: { 'import': 'mobystk:arrows' },
		{ 'import': 'mobystk:xbox_actions' }
	]
})