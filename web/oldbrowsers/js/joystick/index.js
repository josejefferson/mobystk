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

const ls = localStorage;
const options = {
	ip: ls['joystick.code'] || 'localhost:5000',
	layout: ls['joystick.layout'],
	player: parseInt(ls['joystick.player']) - 1,
	debug: ls['joystick.debug'] === 'true',
	locked: (_ls$joystickLocked = ls['joystick.locked']) === null || _ls$joystickLocked === void 0 ? void 0 : _ls$joystickLocked.split(','),
	hidden: (_ls$joystickHidden = ls['joystick.hidden']) === null || _ls$joystickHidden === void 0 ? void 0 : _ls$joystickHidden.split(','),
	invertL: ls['joystick.invertL'] === 'true',
	invertR: ls['joystick.invertR'] === 'true',
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
};
if (options.vgamepad) options.player = 4; // EVENTOS DA PÁGINA

document.addEventListener('contextmenu', e => e.preventDefault());
window.addEventListener('load', () => {
	document.body.classList.remove('preload');
}); // DEBUG

const $debug = document.querySelector('.debug');

function debug(text) {
	$debug.innerText = text || '';
} // TELA DE CARREGAMENTO


const $loading = document.querySelector('.loadingScreen');

function loading() {
	$loading.classList.add('visible');
}