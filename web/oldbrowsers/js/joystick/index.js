if (!String.prototype.padStart) {
	String.prototype.padStart = function padStart(targetLength, padString) {
		targetLength = targetLength >> 0;

		padString = String(typeof padString !== 'undefined' ? padString : ' ');

		if (this.length >= targetLength) {
			return String(this);
		} else {
			targetLength = targetLength - this.length;

			if (targetLength > padString.length) {
				padString += padString.repeat(targetLength / padString.length);
			}

			return padString.slice(0, targetLength) + String(this);
		}
	}
}

var _ls$joystickLocked, _ls$joystickHidden;

window.toast = alert; // temporário

const ls = localStorage;
const options = {
	ip: ls['joystick.code'] || 'localhost:5000',
	layout: ls['joystick.layout'],
	player: parseInt(ls['joystick.player']) - 1,
	password: ls['joystick.password'] || '',
	debug: ls['joystick.debug'] === 'true',
	locked: (_ls$joystickLocked = ls['joystick.locked']) === null || _ls$joystickLocked === void 0 ? void 0 : _ls$joystickLocked.split(','),
	hidden: (_ls$joystickHidden = ls['joystick.hidden']) === null || _ls$joystickHidden === void 0 ? void 0 : _ls$joystickHidden.split(','),
	invertL: ls['joystick.invertL'] === 'true',
	invertR: ls['joystick.invertR'] === 'true',
	disJoyXAxis: ls['joystick.disJoyXAxis'] === 'true',
	disJoyYAxis: ls['joystick.disJoyYAxis'] === 'true',
	dblClickLoadSave: ls['joystick.dblClickLoadSave'] === 'true',
	vibrate: Number(ls['joystick.vibrate'] || 15),
	vibrateJoystick: Number(ls['joystick.vibrateJoystick'] || 5),
	vibrationFromGame: !(ls['joystick.vibrationFromGame'] === 'false'),
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
}; // EVENTOS DA PÁGINA

document.addEventListener('contextmenu', e => e.preventDefault());
window.addEventListener('load', () => {
	document.body.classList.remove('preload');
}); // DEBUG

const $debug = document.querySelector('.debugLog');

function debug(text) {
	$debug.innerText = text === undefined ? '' : text;
} // TELA DE CARREGAMENTO


const $loading = document.querySelector('.loadingScreen');

function loading() {
	$loading.classList.add('visible');
} // CUSTOMIZAÇÃO NA VIBRAÇÃO


navigator._lastVibration = Date.now();
navigator._vibrate = navigator.vibrate;

navigator.vibrate = function (pattern, force = false) {
	let time;
	if (Array.isArray(pattern)) time = pattern.reduce((a, c) => a += Number(c), 0); else time = Number(pattern);

	if (force) {
		navigator._lastVibration = Date.now() + time;
		return navigator._vibrate(pattern);
	}

	if (Date.now() + time > navigator._lastVibration) {
		return navigator._vibrate(pattern);
	}

	return false;
};