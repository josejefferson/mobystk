Controller.joysticks.push(
	// Joystick esquerdo
	{
		type: 'mobystk:joystick',
		id: 'mobystk:joystick_left',
		name: 'Joystick esquerdo',
		anchorX: 0,
		anchorY: 1,
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
		anchorX: 1,
		anchorY: 1,
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
		anchorX: 0,
		anchorY: 1,
		x: [10, 'px'],
		y: [0, 'px'],
		size: [90, 'px'],
		padding: 60,
		keys: ['padUp', 'padLeft', 'padDown', 'padRight']
	}
)