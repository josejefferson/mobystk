interface ISetupMap {
	[key: string]: {
		pause: number
		sequence: string[]
	}
}

const KEY_SEQUENCE: ISetupMap = {
	snes: {
		pause: 100,
		sequence: [
			'padUp',
			'padLeft',
			'padDown',
			'padRight',
			'actDown',
			'actRight',
			'actLeft',
			'actUp',
			'start',
			'select',
			'left1',
			'right1'
		]
	},
	snesSave: {
		pause: 100,
		sequence: ['[']
	},
	snesLoad: {
		pause: 100,
		sequence: ['F1']
	},
	ps2: {
		pause: 1000,
		sequence: [
			'select',
			'left3',
			'right3',
			'start',
			'padUp',
			'padRight',
			'padDown',
			'padLeft',
			'left2',
			'right2',
			'left1',
			'right1',
			'actUp',
			'actRight',
			'actDown',
			'actLeft',
			'joyLUp',
			'joyLRight',
			'joyLDown',
			'joyLLeft',
			'joyRUp',
			'joyRRight',
			'joyRDown',
			'joyRLeft'
		]
	},
	psp: {
		pause: 150,
		sequence: [
			'UP',
			'LEFT',
			'RIGHT',
			'SPACE',
			'padUp',
			'DOWN',
			'SPACE',
			'padDown',
			'DOWN',
			'SPACE',
			'padLeft',
			'DOWN',
			'SPACE',
			'padRight',
			'DOWN',
			'SPACE',
			'actRight',
			'DOWN',
			'SPACE',
			'actDown',
			'DOWN',
			'SPACE',
			'actLeft',
			'DOWN',
			'SPACE',
			'actUp',
			'DOWN',
			'SPACE',
			'start',
			'DOWN',
			'SPACE',
			'select',
			'DOWN',
			'SPACE',
			'left1',
			'DOWN',
			'SPACE',
			'right1',
			'DOWN',
			'SPACE',
			'joyLUp',
			'DOWN',
			'SPACE',
			'joyLDown',
			'DOWN',
			'SPACE',
			'joyLLeft',
			'DOWN',
			'SPACE',
			'joyLRight',
			'DOWN',
			'DOWN',
			'DOWN',
			'DOWN',
			'DOWN',
			'DOWN',
			'DOWN',
			'SPACE',
			'pause',
			'DOWN',
			'DOWN',
			'DOWN',
			'DOWN',
			'SPACE',
			'save',
			'DOWN',
			'SPACE',
			'load',
			'ESC'
		]
	}
}

export default KEY_SEQUENCE
