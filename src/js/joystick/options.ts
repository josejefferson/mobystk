export interface IOptions {
	ip: string
	layout: string
	player: number
	password?: string
	debug: boolean
	locked: string[]
	hidden: string[]
	invertL: boolean
	invertR: boolean
	disJoyXAxis: boolean
	disJoyYAxis: boolean
	dblClickLoadSave: boolean
	changeKeyOnDrag: boolean
	vibrate: number
	vibrateJoystick: number
	vibrationFromGame: boolean
	vgamepad: boolean
	bgImage: string
	bgOpacity: number
	bgBlur: number
	colorsBackground: string
	colorsColor: string
	colorsBorder: string
	colorsActive: string
	customCSS: string
	customJS: string
	driveSensitivity: number
	drivePrecision: number
}

import store from 'store2'
const ls = store.namespace('joystick')

const options: IOptions = {
	ip: getOpt('code', 'localhost:5000'),
	layout: getOpt('layout'),
	player: getOpt('player', 1) - 1,
	password: getOpt('password'),
	debug: getOpt('debug', false),
	locked: getOpt('locked', []),
	hidden: getOpt('hidden', []),
	invertL: getOpt('invertL', false),
	invertR: getOpt('invertR', false),
	disJoyXAxis: getOpt('disJoyXAxis', false),
	disJoyYAxis: getOpt('disJoyYAxis', false),
	dblClickLoadSave: getOpt('dblClickLoadSave', false),
	changeKeyOnDrag: getOpt('changeKeyOnDrag', true),
	vibrate: getOpt('vibrate', 15),
	vibrateJoystick: getOpt('vibrateJoystick', 5),
	vibrationFromGame: getOpt('vibrationFromGame', true),
	vgamepad: getOpt('vgamepad', false),
	bgImage: getOpt('bgImage', ''),
	bgOpacity: getOpt('bgOpacity', 0.5),
	bgBlur: getOpt('bgBlur', 0),
	colorsBackground: getOpt('background', 'rgba(0, 0, 0, 1)'),
	colorsColor: getOpt('color', 'rgba(255, 255, 255, 0.53)'),
	colorsBorder: getOpt('border', 'rgba(255, 255, 255, 0.53)'),
	colorsActive: getOpt('active', 'rgba(255, 255, 255, 0.2)'),
	customCSS: getOpt('customCSS', ''),
	customJS: getOpt('customJS', ''),
	driveSensitivity: getOpt('driveSensitivity', 2),
	drivePrecision: getOpt('drivePrecision', 1)
}

export function getOpt(name: string, defaultValue?: any): any {
	const value = ls(name)
	return value === null ? defaultValue : value
}

export default options
