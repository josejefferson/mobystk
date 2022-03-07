window.toast = alert // temporário
const ls = localStorage

const options = {
	ip: ls['joystick.options.code'] || 'localhost:5000',
	layout: ls['joystick.options.layout'],
	player: parseInt(ls['joystick.options.player']) - 1,
	password: ls['joystick.password'] || '',
	debug: ls['joystick.options.debug'] === 'true',
	locked: ls['joystick.options.locked']?.split(','),
	hidden: ls['joystick.options.hidden']?.split(','),
	invertL: ls['joystick.options.invertL'] === 'true',
	invertR: ls['joystick.options.invertR'] === 'true',
	disJoyXAxis: ls['joystick.options.disJoyXAxis'] === 'true',
	disJoyYAxis: ls['joystick.options.disJoyYAxis'] === 'true',
	dblClickLoadSave: ls['joystick.options.dblClickLoadSave'] === 'true',
	vibrate: Number(ls['joystick.options.vibrate'] || 15),
	vibrateJoystick: Number(ls['joystick.options.vibrateJoystick'] || 5),
	vibrationFromGame: !(ls['joystick.options.vibrationFromGame'] === 'false'),
	vgamepad: ls['joystick.options.vgamepad'] === 'true',
	bgImage: ls['joystick.options.bgImage'],
	bgOpacity: ls['joystick.options.bgOpacity'],
	bgBlur: ls['joystick.options.bgBlur'],
	colorsBackground: ls['joystick.options.background'],
	colorsColor: ls['joystick.options.color'],
	colorsBorder: ls['joystick.options.border'],
	colorsActive: ls['joystick.options.active'],
	customCSS: ls['joystick.options.customCSS'],
	driveSensitivity: parseFloat(ls['joystick.options.driveSensitivity'] || 2),
	drivePrecision: parseFloat(ls['joystick.options.drivePrecision'] || 1)
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