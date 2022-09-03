import Controller from '../classes/Controller'
import vibrate from '../utils/vibrate'
import { sendCmd, socket } from './backend-integration'
import options from './options'

export let recordingMacro = false
export let playingMacro = false
export let lastMacro = []

export default function loadElementActions() {
	// CARREGAR E SALVAR
	const loadStateBtn = Controller.elements.buttons.find((e) => e.customAction === 'load-state')
	if (loadStateBtn)
		loadStateBtn.element.addEventListener(options.dblClickLoadSave ? 'dblclick' : 'click', () => {
			// if (window.layoutEditor?.opened) return
			sendCmd('load')
			sendCmd('load', true)
			vibrate(options.vibrate * 3)
		})

	const saveStateBtn = Controller.elements.buttons.find((e) => e.customAction === 'save-state')
	if (saveStateBtn)
		saveStateBtn.element.addEventListener(options.dblClickLoadSave ? 'dblclick' : 'click', () => {
			// if (window.layoutEditor?.opened) return
			sendCmd('save')
			sendCmd('save', true)
			vibrate(options.vibrate * 3)
		})

	// MACROS
	recordingMacro = false
	playingMacro = false
	lastMacro = []

	// Iniciar/parar gravação da macro
	const recordMacroBtn = Controller.elements.buttons.find((e) => e.customAction === 'macro-record')
	if (recordMacroBtn)
		recordMacroBtn.element.addEventListener('click', () => {
			// if (window.layoutEditor?.opened) return
			if (playingMacro) return
			recordMacroBtn[recordMacroBtn.active ? 'release' : 'press']()
			if (!recordingMacro) lastMacro = []
			recordingMacro = !recordingMacro
		})

	// Executar macro
	const playMacroBtn = Controller.elements.buttons.find((e) => e.customAction === 'macro-play')
	if (playMacroBtn)
		playMacroBtn.element.addEventListener('click', async function () {
			// if (window.layoutEditor?.opened) return
			if (recordingMacro) return
			playingMacro = !playingMacro
			playMacroBtn.press()
			for (const command of lastMacro) {
				if (!playingMacro) break
				// TODO: toast desconectado
				if (socket.readyState !== 1) break
				socket.send(command)
				await new Promise((r) => setTimeout(r, 50))
			}
			playMacroBtn.release()
			playingMacro = false
		})

	// TELA CHEIA
	document.querySelector('.deviceInfo').addEventListener('dblclick', () => {
		document.documentElement.requestFullscreen()
	})
}

export { }

