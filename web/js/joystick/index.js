const ls = localStorage

const options = {
	ip: ls['joystick.code'] || 'localhost:5000',
	layout: ls['joystick.layout'],
	player: parseInt(ls['joystick.player']) - 1,
	debug: ls['joystick.debug'] === 'true',
	locked: ls['joystick.locked']?.split(','),
	hidden: ls['joystick.hidden']?.split(','),
	invert: ls['joystick.invert'] === 'true',
	vibrate: !(ls['joystick.vibrate'] === 'false'),
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

// EVENTOS DA PÁGINA
document.addEventListener('contextmenu', () => false)
window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

// TELA DE CARREGAMENTO
const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}