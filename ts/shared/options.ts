import getOpt from '../utils/get-option'

export interface IOptions {
	ip: string
	layout: string
	player: number
	password?: string
	debug: boolean
	locked: string[]
	hidden: string[]
	useXbox: boolean
	invertL: boolean
	invertR: boolean
	disJoyXAxis: boolean
	disJoyYAxis: boolean
	dblClickLoadSave: boolean
	changeKeyOnDrag: boolean
	vibrate: number
	vibrateJoystick: number
	vibrationFromGame: boolean
	useKeyboard: boolean
	bgImage: string
	bgOpacity: number
	bgBlur: number
	colorsBackground: string
	colorsColor: string
	colorsBorder: string
	colorsActive: string
	customCSS: string
	customJS: string
	pluginMobile: boolean
	driveSensitivity: number
	drivePrecision: number
}

const options: IOptions = {
	ip: getOpt('code', 'localhost:5000'),
	layout: getOpt('layout'),
	player: getOpt('player', 1) - 1,
	password: getOpt('password'),
	debug: getOpt('debug', false),
	locked: getOpt('locked', []),
	hidden: getOpt('hidden', []),
	useXbox: getOpt('useXbox', false),
	invertL: getOpt('invertL', false),
	invertR: getOpt('invertR', false),
	disJoyXAxis: getOpt('disJoyXAxis', false),
	disJoyYAxis: getOpt('disJoyYAxis', false),
	dblClickLoadSave: getOpt('dblClickLoadSave', false),
	changeKeyOnDrag: getOpt('changeKeyOnDrag', true),
	vibrate: getOpt('vibrate', 60),
	vibrateJoystick: getOpt('vibrateJoystick', 0),
	vibrationFromGame: getOpt('vibrationFromGame', true),
	useKeyboard: getOpt('useKeyboard', false),
	bgImage: getOpt('bgImage', ''),
	bgOpacity: getOpt('bgOpacity', 0.5),
	bgBlur: getOpt('bgBlur', 0),
	colorsBackground: getOpt('background', 'rgba(0, 0, 0, 1)'),
	colorsColor: getOpt('color', 'rgba(255, 255, 255, 0.53)'),
	colorsBorder: getOpt('border', 'rgba(255, 255, 255, 0.53)'),
	colorsActive: getOpt('active', 'rgba(255, 255, 255, 0.2)'),
	customCSS: getOpt('customCSS', ''),
	customJS: getOpt('customJS', ''),
	pluginMobile: getOpt('pluginMobile', false),
	driveSensitivity: getOpt('driveSensitivity', 2),
	drivePrecision: getOpt('drivePrecision', 1)
}

window.options = options

export default options
