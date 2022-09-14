import Controller from '../shared/controller'
import vibrate from '../utils/vibrate'
import { sendCmd } from './backend-integration'
import { socket } from '../shared/socket'
import options from '../shared/options'

export let recordingMacro = false
export let playingMacro = false
export let lastMacro: string[] = []

/** Carrega o estado do jogo */
function loadState() {
	if (window.layoutEditor?.opened) return
	sendCmd('load')
	sendCmd('load', true)
	vibrate(options.vibrate * 3)
}

/** Salva o estado do jogo */
function saveState() {
	if (window.layoutEditor?.opened) return
	sendCmd('save')
	sendCmd('save', true)
	vibrate(options.vibrate * 3)
}

/** Inicia/para a gravação de uma macro */
function recordMacro() {
	if (window.layoutEditor?.opened) return
	if (playingMacro) return
	if (this.instance) this.instance[this.instance.active ? 'release' : 'press']()
	if (!recordingMacro) lastMacro = []
	recordingMacro = !recordingMacro
}

/** Executa a macro gravada */
async function playMacro() {
	if (window.layoutEditor?.opened) return
	if (recordingMacro) return
	playingMacro = !playingMacro
	if (this.instance) this.instance.press()
	for (const command of lastMacro) {
		if (!playingMacro) break
		// TODO: toast desconectado
		if (socket.readyState !== 1) break
		socket.send(command)
		await new Promise((r) => setTimeout(r, 50))
	}
	if (this.instance) this.instance.release()
	playingMacro = false
}

/** Entra em tela cheia */
function fullScreen() {
	document.documentElement.requestFullscreen()
}

export default function loadElementActions() {
	// CARREGAR E SALVAR
	const loadStateBtn = Controller.elements.buttons.find((e) => e.customAction === 'load-state')
	if (loadStateBtn)
		loadStateBtn.element.addEventListener(
			options.dblClickLoadSave ? 'dblclick' : 'click',
			loadState
		)

	const saveStateBtn = Controller.elements.buttons.find((e) => e.customAction === 'save-state')
	if (saveStateBtn)
		saveStateBtn.element.addEventListener(
			options.dblClickLoadSave ? 'dblclick' : 'click',
			saveState
		)

	// MACROS
	recordingMacro = false
	playingMacro = false
	lastMacro = []

	// Iniciar/parar gravação da macro
	const recordMacroBtn = Controller.elements.buttons.find((e) => e.customAction === 'macro-record')
	if (recordMacroBtn) recordMacroBtn.element.addEventListener('click', recordMacro)

	// Executar macro
	const playMacroBtn = Controller.elements.buttons.find((e) => e.customAction === 'macro-play')
	if (playMacroBtn) playMacroBtn.element.addEventListener('click', playMacro)

	// TELA CHEIA
	document.querySelector('.deviceInfo').addEventListener('dblclick', fullScreen)
}

window.playingMacro = playingMacro
window.recordingMacro = recordingMacro
window.lastMacro = lastMacro
window.loadState = loadState
window.saveState = saveState
window.recordMacro = recordMacro
window.playMacro = playMacro
window.fullScreen = fullScreen
