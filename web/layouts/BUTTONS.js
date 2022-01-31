Controller.BUTTONS = [
	{
		type: 'mobystk:button',
		id: 'mobystk:macro_record',
		name: 'Gravar macro',
		anchorX: 1,
		anchorY: 0,
		x: [50, '%'],
		y: [48, 'px'],
		width: [48, 'px'],
		height: [32, 'px'],
		border: [true, false, false, true],
		fontSize: [16, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'record'
		},
		radius: [
			[1000, 'px'],
			[0, 'px'],
			[0, 'px'],
			[0, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:macro_play',
		name: 'Reproduzir macro',
		anchorX: 0,
		anchorY: 0,
		x: [50, '%'],
		y: [48, 'px'],
		width: [48, 'px'],
		height: [32, 'px'],
		border: [true, true, false, false],
		fontSize: [16, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'play'
		},
		radius: [
			[0, 'px'],
			[1000, 'px'],
			[0, 'px'],
			[0, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:volume_up',
		name: 'Aumentar volume',
		key: 'volUp',
		anchorX: 0,
		anchorY: 0,
		x: [50, '%'],
		y: [80, 'px'],
		width: [72, 'px'],
		height: [52, 'px'],
		border: [true, true, true, false],
		fontSize: [28, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'volume-plus'
		},
		radius: [
			[0, 'px'],
			[1000, 'px'],
			[1000, 'px'],
			[0, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:volume_down',
		name: 'Diminuir volume',
		key: 'volDown',
		anchorX: 1,
		anchorY: 0,
		x: [50, '%'],
		y: [80, 'px'],
		width: [72, 'px'],
		height: [52, 'px'],
		border: [true, false, true, true],
		fontSize: [28, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'volume-minus'
		},
		radius: [
			[1000, 'px'],
			[0, 'px'],
			[0, 'px'],
			[1000, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:left_1',
		name: 'L1',
		key: 'left1',
		anchorX: 0,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [250, 'px'],
		height: [60, 'px'],
		border: [false, true, true, false],
		fontSize: [20, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'L'
		},
		radius: [
			[0, 'px'],
			[0, 'px'],
			[50, 'px'],
			[0, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:right_1',
		name: 'R1',
		key: 'right1',
		anchorX: 1,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [250, 'px'],
		height: [60, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'R'
		},
		border: [false, false, true, true],
		fontSize: [20, 'px'],
		radius: [
			[0, 'px'],
			[0, 'px'],
			[0, 'px'],
			[50, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:select',
		name: 'SELECT',
		key: 'select',
		anchorX: 0,
		anchorY: 1,
		x: [180, 'px'],
		y: [0, 'px'],
		width: [110, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'SELECT'
		},
		border: [true, true, false, true],
		fontSize: [18, 'px'],
		radius: [
			[20, 'px'],
			[10, 'px'],
			[0, 'px'],
			[0, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:start',
		name: 'START',
		key: 'start',
		anchorX: 1,
		anchorY: 1,
		x: [180, 'px'],
		y: [0, 'px'],
		width: [110, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'START'
		},
		border: [true, true, false, true],
		fontSize: [18, 'px'],
		radius: [
			[10, 'px'],
			[20, 'px'],
			[0, 'px'],
			[0, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:pause',
		name: 'Pausa',
		key: 'pause',
		anchorX: 2,
		anchorY: 1,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'pause'
		},
		border: [true, true, false, true],
		fontSize: [28, 'px'],
		radius: [
			[10, 'px'],
			[10, 'px'],
			[0, 'px'],
			[0, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:load_state',
		name: 'Carregar estado',
		key: 'load',
		anchorX: 0,
		anchorY: 0,
		x: [30, 'px'],
		y: [100, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'file-download'
		},
		border: [true, true, true, true],
		fontSize: [28, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:save_state',
		name: 'Salvar estado',
		key: 'save',
		anchorX: 1,
		anchorY: 0,
		x: [30, 'px'],
		y: [100, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'content-save'
		},
		border: [true, true, true, true],
		fontSize: [28, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:pad_up',
		name: 'Seta cima',
		key: 'padUp',
		anchorX: 2,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'menu-up-outline'
		},
		border: [true, true, true, true],
		fontSize: [36, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:pad_left',
		name: 'Seta esquerda',
		key: 'padLeft',
		anchorX: 0,
		anchorY: 2,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'menu-left-outline'
		},
		border: [true, true, true, true],
		fontSize: [36, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:pad_right',
		name: 'Seta direita',
		key: 'padRight',
		anchorX: 1,
		anchorY: 2,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'menu-right-outline'
		},
		border: [true, true, true, true],
		fontSize: [36, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:pad_down',
		name: 'Seta baixo',
		key: 'padDown',
		anchorX: 2,
		anchorY: 1,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'menu-down-outline'
		},
		border: [true, true, true, true],
		fontSize: [36, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:xbox_act_up',
		name: 'X',
		key: 'actUp',
		anchorX: 2,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'X'
		},
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:xbox_act_left',
		name: 'Y',
		key: 'actLeft',
		anchorX: 0,
		anchorY: 2,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'Y'
		},
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:xbox_act_right',
		name: 'A',
		key: 'actRight',
		anchorX: 1,
		anchorY: 2,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'A'
		},
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:xbox_act_down',
		name: 'B',
		key: 'actDown',
		anchorX: 2,
		anchorY: 1,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'B'
		},
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:ps_act_up',
		name: 'Triângulo',
		key: 'actUp',
		anchorX: 2,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'triangle-outline'
		},
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:ps_act_left',
		name: 'Quadrado',
		key: 'actLeft',
		anchorX: 0,
		anchorY: 2,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'square-outline'
		},
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:ps_act_right',
		name: 'Círculo',
		key: 'actRight',
		anchorX: 1,
		anchorY: 2,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'circle-outline'
		},
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:ps_act_down',
		name: 'X',
		key: 'actDown',
		anchorX: 2,
		anchorY: 1,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'close'
		},
		border: [true, true, true, true],
		fontSize: [42, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:diag_left_up',
		name: 'Diagonal esquerda cima',
		diagonal: true,
		anchorX: 0,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [50, '%'],
		height: [50, '%'],
		border: [false, false, false, false],
		radius: [
			[75, 'px'],
			[0, 'px'],
			[30, 'px'],
			[0, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:diag_right_up',
		name: 'Diagonal direita cima',
		diagonal: true,
		anchorX: 1,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [50, '%'],
		height: [50, '%'],
		border: [false, false, false, false],
		radius: [
			[0, 'px'],
			[75, 'px'],
			[0, 'px'],
			[30, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:diag_left_down',
		name: 'Diagonal esquerda baixo',
		diagonal: true,
		anchorX: 0,
		anchorY: 1,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [50, '%'],
		height: [50, '%'],
		border: [false, false, false, false],
		radius: [
			[0, 'px'],
			[30, 'px'],
			[0, 'px'],
			[75, 'px']
		]
	},

	{
		type: 'mobystk:button',
		id: 'mobystk:diag_right_down',
		name: 'Diagonal direita baixo',
		diagonal: true,
		anchorX: 1,
		anchorY: 1,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [50, '%'],
		height: [50, '%'],
		border: [false, false, false, false],
		radius: [
			[30, 'px'],
			[0, 'px'],
			[75, 'px'],
			[0, 'px']
		]
	},
]