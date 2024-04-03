interface IKeyMappings {
	/** [Player1, Player2, Player3, Player4, VGamepad] */
	[key: string]: [string, string, string, string, string?]
}

/**
 * Mapas de teclas
 * [Player1, Player2, Player3, Player4, VGamepad]
 */
const keymappings: IKeyMappings = {
	joyLUp: ['W', 'T', '058', '195'],
	joyLLeft: ['A', 'F', '063', '196'],
	joyLDown: ['S', 'G', '096', '197'],
	joyLRight: ['D', 'H', '097', '198'],
	joyRUp: ['5', '9', '098', '199'],
	joyRLeft: ['6', '0', '099', '200'],
	joyRDown: ['7', '[', '100', '201'],
	joyRRight: ['8', ']', '101', '202'],
	padUp: ['UP', 'Z', '102', '203', 'XUSB_GAMEPAD_DPAD_UP'],
	padLeft: ['LEFT', 'X', '103', '204', 'XUSB_GAMEPAD_DPAD_LEFT'],
	padDown: ['DOWN', 'C', '104', '205', 'XUSB_GAMEPAD_DPAD_DOWN'],
	padRight: ['RIGHT', 'V', '105', '206', 'XUSB_GAMEPAD_DPAD_RIGHT'],
	actUp: ['I', 'B', '106', '207', 'XUSB_GAMEPAD_Y'],
	actLeft: ['J', 'N', '107', '208', 'XUSB_GAMEPAD_X'],
	actDown: ['K', 'M', '108', '209', 'XUSB_GAMEPAD_A'],
	actRight: ['L', 'Ç', '109', '210', 'XUSB_GAMEPAD_B'],
	left1: ['Q', 'Y', '110', '211', 'XUSB_GAMEPAD_LEFT_SHOULDER'],
	left2: ['1', '3', '111', '212', 'XUSB_GAMEPAD_LEFT_TRIGGER'],
	left3: [';', '´', '187', '213', 'XUSB_GAMEPAD_LEFT_THUMB'],
	right1: ['E', 'U', '188', '214', 'XUSB_GAMEPAD_RIGHT_SHOULDER'],
	right2: ['2', '4', '189', '215', 'XUSB_GAMEPAD_RIGHT_TRIGGER'],
	right3: ['.', '~', '190', '216', 'XUSB_GAMEPAD_RIGHT_THUMB'],
	select: ['ENTER', 'P', '193', '217', 'XUSB_GAMEPAD_BACK'],
	start: ['SPACE', 'O', '231', '218', 'XUSB_GAMEPAD_START'],
	pause: ['ESC', 'ESC', 'ESC', 'ESC', 'ESC'],
	load: ['F1', 'F1', 'F1', 'F1', 'F1'],
	save: ['[', '[', '[', '[', '['],
	fast: ['TAB', 'TAB', 'TAB', 'TAB', 'TAB'],
	volUp: [
		'MEDIA_VOLUME_UP',
		'MEDIA_VOLUME_UP',
		'MEDIA_VOLUME_UP',
		'MEDIA_VOLUME_UP',
		'MEDIA_VOLUME_UP'
	],
	volDown: [
		'MEDIA_VOLUME_DOWN',
		'MEDIA_VOLUME_DOWN',
		'MEDIA_VOLUME_DOWN',
		'MEDIA_VOLUME_DOWN',
		'MEDIA_VOLUME_DOWN'
	]
}

window.keymappings = keymappings

export default keymappings
