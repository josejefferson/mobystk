import { IButton } from '../types/Button'

const buttons: IButton[] = [
	// L
	{
		type: 'mobystk:button',
		id: 'mobystk:left',
		name: 'L',
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

	// L1
	{
		type: 'mobystk:button',
		id: 'mobystk:left_1',
		name: 'L1',
		key: 'left1',
		anchorX: 0,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [170, 'px'],
		height: [60, 'px'],
		border: [false, true, true, false],
		fontSize: [20, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'L1'
		},
		radius: [
			[0, 'px'],
			[0, 'px'],
			[50, 'px'],
			[0, 'px']
		]
	},

	// L2
	{
		type: 'mobystk:button',
		id: 'mobystk:left_2',
		name: 'L2',
		key: 'left2',
		anchorX: 0,
		anchorY: 0,
		x: [180, 'px'],
		y: [0, 'px'],
		width: [100, 'px'],
		height: [50, 'px'],
		border: [false, true, true, true],
		fontSize: [20, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'L2'
		},
		radius: [
			[0, 'px'],
			[0, 'px'],
			[40, 'px'],
			[40, 'px']
		]
	},

	// L3
	{
		type: 'mobystk:button',
		id: 'mobystk:left_3',
		name: 'L3',
		key: 'left3',
		anchorX: 0,
		anchorY: 0,
		x: [0, 'px'],
		y: [60, 'px'],
		width: [60, 'px'],
		height: [30, 'px'],
		border: [false, true, true, false],
		fontSize: [20, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'L3'
		},
		radius: [
			[0, 'px'],
			[0, 'px'],
			[50, 'px'],
			[0, 'px']
		]
	},

	// R
	{
		type: 'mobystk:button',
		id: 'mobystk:right',
		name: 'R',
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

	// R1
	{
		type: 'mobystk:button',
		id: 'mobystk:right_1',
		name: 'R1',
		key: 'right1',
		anchorX: 1,
		anchorY: 0,
		x: [0, 'px'],
		y: [0, 'px'],
		width: [170, 'px'],
		height: [60, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'R1'
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

	// R2
	{
		type: 'mobystk:button',
		id: 'mobystk:right_2',
		name: 'R2',
		key: 'right2',
		anchorX: 1,
		anchorY: 0,
		x: [180, 'px'],
		y: [0, 'px'],
		width: [100, 'px'],
		height: [50, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'R2'
		},
		border: [false, true, true, true],
		fontSize: [20, 'px'],
		radius: [
			[0, 'px'],
			[0, 'px'],
			[40, 'px'],
			[40, 'px']
		]
	},

	// R3
	{
		type: 'mobystk:button',
		id: 'mobystk:right_3',
		name: 'R3',
		key: 'right3',
		anchorX: 1,
		anchorY: 0,
		x: [0, 'px'],
		y: [60, 'px'],
		width: [60, 'px'],
		height: [30, 'px'],
		content: {
			type: 'mobystk:text',
			value: 'R3'
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

	// SELECT
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
		height: [45, 'px'],
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

	// START
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
		height: [45, 'px'],
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

	// Pausa
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
		height: [45, 'px'],
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

	// Carregar estado
	{
		type: 'mobystk:button',
		id: 'mobystk:load_state',
		name: 'Carregar estado',
		customAction: 'load-state',
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

	// Salvar estado
	{
		type: 'mobystk:button',
		id: 'mobystk:save_state',
		name: 'Salvar estado',
		customAction: 'save-state',
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

	// Seta cima
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [36, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Seta esquerda
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [36, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Seta direita
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [36, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Seta baixo
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [36, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// X
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Y
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// A
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// B
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Triângulo
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Quadrado
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Círculo
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [32, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// X
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
		scalable: true,
		border: [true, true, true, true],
		fontSize: [42, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Volante
	{
		type: 'mobystk:button',
		id: 'mobystk:drive',
		name: 'Volante',
		customAction: 'drive',
		anchorX: 2,
		anchorY: 1,
		x: [0, '%'],
		y: [70, 'px'],
		width: [52, 'px'],
		height: [52, 'px'],
		border: [true, true, true, true],
		fontSize: [28, 'px'],
		radius: [
			[50, '%'],
			[50, '%'],
			[50, '%'],
			[50, '%']
		]
	},

	// Gravar macro
	{
		type: 'mobystk:button',
		id: 'mobystk:macro_record',
		name: 'Gravar macro',
		customAction: 'macro-record',
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

	// Reproduzir macro
	{
		type: 'mobystk:button',
		id: 'mobystk:macro_play',
		name: 'Reproduzir macro',
		customAction: 'macro-play',
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

	// Aumentar volume
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

	// Diminuir volume
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

	// Avanço rápido
	{
		type: 'mobystk:button',
		id: 'mobystk:fast_forward',
		name: 'Avanço rápido',
		key: 'fast',
		anchorX: 1,
		anchorY: 1,
		x: [5, 'px'],
		y: [5, 'px'],
		width: [40, 'px'],
		height: [25, 'px'],
		content: {
			type: 'mobystk:icon',
			value: 'fast-forward'
		},
		scalable: true,
		border: [true, true, true, true],
		fontSize: [16, 'px'],
		radius: [
			[1000, 'px'],
			[1000, 'px'],
			[1000, 'px'],
			[1000, 'px']
		]
	},

	// Diagonal esquerda cima
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

	// Diagonal direita cima
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

	// Diagonal esquerda baixo
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

	// Diagonal direita baixo
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
	}
]

export default buttons
