window.ls = store.namespace('joystick')
const options = {
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
	driveSensitivity: getOpt('driveSensitivity', 2),
	drivePrecision: getOpt('drivePrecision', 1)
}

function getOpt(name, defaultValue) {
	const value = ls(name)
	return value === null ? defaultValue : value
}

// EVENTOS DA PÁGINA
document.addEventListener('contextmenu', e => e.preventDefault())
window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

// DEBUG
const $debug = document.querySelector('.debugLog')
function debug(text) {
	$debug.innerText = text === undefined ? '' : text
}

// TELA DE CARREGAMENTO
const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}

// CUSTOMIZAÇÃO NA VIBRAÇÃO
navigator._lastVibration = Date.now()
navigator._vibrate = navigator.vibrate
navigator.vibrate = function (pattern, force = false) {
	let time
	if (Array.isArray(pattern))
		time = pattern.reduce((a, c) => a += Number(c), 0)
	else time = Number(pattern)

	if (force) {
		navigator._lastVibration = Date.now() + time
		return navigator._vibrate(pattern)
	}
	if (Date.now() + time > navigator._lastVibration) {
		return navigator._vibrate(pattern)
	}
	return false
}

function escapeHTML(unsafe) {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}