// TECLAS BLOQUEÁVEIS
document.querySelectorAll('.lock').forEach(el => {
	el.ontouchstart = event
	el.onmousedown = event
	function event(e) {
		if ('ontouchstart' in document.documentElement && e.type === 'mousedown') return
		if (options.vibrate) navigator.vibrate(15)
		if (el.classList.contains('active')) {
			// Ativa a tecla
			el.classList.remove('active')
			sendCmd(el.dataset.key, true)
		} else {
			// Desativa a tecla
			el.classList.add('active')
			sendCmd(el.dataset.key)
		}
	}
})

// CARREGAR E SALVAR
const $load = document.querySelector('.load')
$load.addEventListener(options.dblClickLoadSave ? 'dblclick' : 'click', () => {
	sendCmd('load')
	sendCmd('load', true)
})

const $save = document.querySelector('.save')
$save.addEventListener(options.dblClickLoadSave ? 'dblclick' : 'click', () => {
	sendCmd('save')
	sendCmd('save', true)
})

// INVERTER JOYSTICK/SETAS
const $invert = document.querySelector('.toggleInvert')
$invert.ontouchstart = toggleInvert
function toggleInvert() {
	document.body.classList.toggle('invertL')
	$invert.classList.toggle('active')
	resizeJoystick()
}

// MACROS
let recordingMacro = false
let playingMacro = false
let lastMacro = []

// Iniciar/parar gravação da macro
const $recordMacro = document.querySelector('.recordMacro')
$recordMacro.onclick = () => {
	if (playingMacro) return
	$recordMacro.classList.toggle('active')
	if (!recordingMacro) lastMacro = []
	recordingMacro = !recordingMacro
}

// Executar macro
const $playMacro = document.querySelector('.playMacro')
$playMacro.onclick = async function () {
	if (recordingMacro) return
	playingMacro = !playingMacro
	$playMacro.classList.add('active')
	for (command of lastMacro) {
		if (!playingMacro) break
		if (socket.readyState !== 1) break
		socket.send(command)
		await new Promise(r => setTimeout(r, 50))
	}
	$playMacro.classList.remove('active')
	playingMacro = false
}