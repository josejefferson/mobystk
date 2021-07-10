// TECLAS BLOQUEÁVEIS
document.querySelectorAll('.lock').forEach(el => {
	el.ontouchstart = event;
	el.onmousedown = event;

	function event(e) {
		if ('ontouchstart' in document.documentElement && e.type === 'mousedown') return;
		if (options.vibrate) navigator.vibrate(15); // Ativa a tecla

		if (el.classList.contains('active')) {
			el.classList.remove('active');
			sendCmd(el.dataset.key, true); // Desativa a tecla
		} else {
			el.classList.add('active');
			sendCmd(el.dataset.key);
		}
	}
}); // CARREGAR E SALVAR

const $load = document.querySelector('.load');
$load.addEventListener(options.dblClickLoadSave ? 'dblclick' : 'click', () => {
	sendCmd('load');
	sendCmd('load', true);
});
const $save = document.querySelector('.save');
$save.addEventListener(options.dblClickLoadSave ? 'dblclick' : 'click', () => {
	sendCmd('save');
	sendCmd('save', true);
}); // INVERTER JOYSTICK/SETAS

const $invert = document.querySelector('.toggleInvert');
$invert.ontouchstart = toggleInvert;

function toggleInvert() {
	document.body.classList.toggle('invert');
	$invert.classList.toggle('active');
	resizeJoystick();
} // MACROS


let recordingMacro = false;
let lastMacro = []; // Iniciar/parar gravação da macro

const $recordMacro = document.querySelector('.recordMacro');

$recordMacro.onclick = function () {
	this.classList.toggle('active');
	if (!recordingMacro) lastMacro = [];
	recordingMacro = !recordingMacro;
}; // Executar macro


const $playMacro = document.querySelector('.playMacro');

$playMacro.onclick = async function () {
	$playMacro.classList.add('active');

	for (command of lastMacro) {
		if (socket.readyState !== 1) break;
		socket.send(command);
		await new Promise(r => setTimeout(r, 50));
	}

	$playMacro.classList.remove('active');
};