import ButtonComponent from '../components/Button'
import Controller from '../shared/controller'
import options from '../shared/options'
import { socket } from '../shared/socket'
import { IElementNode } from '../types'
import { SocketMessages } from '../types/socket'
import vibrate from '../utils/vibrate'

export let recordingMacro = false
export let playingMacro = false
export let lastMacro: [
	SocketMessages.Client.ClientMessage[0],
	SocketMessages.Client.ClientMessage[1]
][] = []

/** Carrega o estado do jogo */
function loadState() {
	if (window.layoutEditor?.opened) return
	socket.sendKey('LOAD', 'press') // TODO: tap
	socket.sendKey('LOAD', 'release')
	vibrate(options.vibrate * 3)
}

/** Salva o estado do jogo */
function saveState() {
	if (window.layoutEditor?.opened) return
	socket.sendKey('SAVE', 'press')
	socket.sendKey('SAVE', 'release')
	vibrate(options.vibrate * 3)
}

/** Inicia/para a gravação de uma macro */
function recordMacro(this: IElementNode<ButtonComponent, HTMLElement>) {
	if (window.layoutEditor?.opened) return
	if (playingMacro) return
	if (this.instance) this.instance[this.instance.active ? 'release' : 'press']()
	if (!recordingMacro) lastMacro = []
	recordingMacro = !recordingMacro
	window.recordingMacro = recordingMacro
	window.lastMacro = lastMacro
}

/** Executa a macro gravada */
async function playMacro(this: IElementNode<ButtonComponent, HTMLElement>) {
	if (window.layoutEditor?.opened) return
	if (recordingMacro) return
	playingMacro = !playingMacro
	window.playingMacro = playingMacro
	if (this.instance) this.instance.press()
	for (const command of lastMacro) {
		if (!playingMacro) break
		// TODO: toast desconectado
		if (socket.instance.readyState !== WebSocket.OPEN) break
		socket?.sendCommand(command[0], command[1])
		await new Promise((r) => setTimeout(r, 50))
	}
	if (this.instance) this.instance.release()
	playingMacro = false
	window.playingMacro = playingMacro
}

/** Entra em tela cheia */
function fullScreen() {
	document.documentElement.requestFullscreen()
}

// Detecta quando o modo de tela cheia é ativado/desativado e mostra/oculta o botão de tela cheia
document.addEventListener('fullscreenchange', (event) => {
	const fullScreenBtn = Controller.elements.buttons.find((e) => e.customAction === 'fullscreen')
	if (!fullScreenBtn) return
	if (document.fullscreenElement) fullScreenBtn.element!.classList.add('hidden')
	else fullScreenBtn.element!.classList.remove('hidden')
})

export default function loadElementActions() {
	// CARREGAR E SALVAR
	const loadStateBtn = Controller.elements.buttons.find((e) => e.customAction === 'load-state')
	if (loadStateBtn)
		loadStateBtn.element!.addEventListener(
			options.dblClickLoadSave ? 'dblclick' : 'click',
			loadState
		)

	const saveStateBtn = Controller.elements.buttons.find((e) => e.customAction === 'save-state')
	if (saveStateBtn)
		saveStateBtn.element!.addEventListener(
			options.dblClickLoadSave ? 'dblclick' : 'click',
			saveState
		)

	// MACROS
	recordingMacro = false
	playingMacro = false
	lastMacro = []
	window.recordingMacro = recordingMacro
	window.playingMacro = playingMacro
	window.lastMacro = lastMacro

	// Iniciar/parar gravação da macro
	const recordMacroBtn = Controller.elements.buttons.find((e) => e.customAction === 'macro-record')
	if (recordMacroBtn) recordMacroBtn.element!.addEventListener('click', recordMacro)

	// Executar macro
	const playMacroBtn = Controller.elements.buttons.find((e) => e.customAction === 'macro-play')
	if (playMacroBtn) playMacroBtn.element!.addEventListener('click', playMacro)

	// TELA CHEIA
	const fullScreenBtn = Controller.elements.buttons.find((e) => e.customAction === 'fullscreen')
	if (fullScreenBtn) fullScreenBtn.element!.addEventListener('click', fullScreen)
}

window.playingMacro = playingMacro
window.recordingMacro = recordingMacro
window.lastMacro = lastMacro
window.loadState = loadState
window.saveState = saveState
window.recordMacro = recordMacro
window.playMacro = playMacro
window.fullScreen = fullScreen
