const ls = localStorage

const options = {
	ip: ls['joystick.code'] || 'localhost:5000',
	layout: ls['joystick.layout'],
	player: parseInt(ls['joystick.player']) - 1,
	debug: ls['joystick.debug'] === 'true',
	locked: ls['joystick.locked']?.split(','),
	hidden: ls['joystick.hidden']?.split(','),
	invert: ls['joystick.invert'] === 'true',
	disJoyXAxis: ls['joystick.disJoyXAxis'] === 'true',
	disJoyYAxis: ls['joystick.disJoyYAxis'] === 'true',
	dblClickLoadSave: ls['joystick.dblClickLoadSave'] === 'true',
	vibrate: !(ls['joystick.vibrate'] === 'false'),
	vgamepad: ls['joystick.vgamepad'] === 'true',
	bgImage: ls['joystick.bgImage'],
	bgOpacity: ls['joystick.bgOpacity'],
	bgBlur: ls['joystick.bgBlur'],
	colorsBackground: ls['joystick.background'],
	colorsColor: ls['joystick.color'],
	colorsBorder: ls['joystick.border'],
	colorsActive: ls['joystick.active'],
	customCSS: ls['joystick.customCSS'],
	driveSensitivity: parseFloat(ls['joystick.driveSensitivity'] || 2),
	drivePrecision: parseFloat(ls['joystick.drivePrecision'] || 1)
}

if (options.vgamepad) options.player = 4

// EVENTOS DA PÁGINA
document.addEventListener('contextmenu', e => e.preventDefault())
window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

// DEBUG
const $debug = document.querySelector('.debug')
function debug(text) {
	$debug.innerText = text || ''
}

// TELA DE CARREGAMENTO
const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}