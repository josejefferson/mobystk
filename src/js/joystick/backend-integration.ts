import keymappings from '../shared/keymappings'
import loading from '../utils/loading'
import { toast } from '../utils/toast'
import vibrate from '../utils/vibrate'
import { lastMacro, recordingMacro } from './element-actions'
import { $controllerIndicator } from './elements'
import options from './options'
import { commands, socket } from '../shared/socket'

const controllerIndicatorClass = options.vgamepad ? 'mdi-google-controller' : 'mdi-keyboard'
$controllerIndicator.classList.add(controllerIndicatorClass)

// // Evita aparecer a tela de senha novamente
// let triedToAuthenticate = false

commands.V = (data: string) => {
	const [value] = data.toLowerCase().split(' ')
	if (options.vibrationFromGame) {
		const n = parseInt(value.split('|')[0])
		vibrate(n ? 3000 : 0, true)
		$controllerIndicator.classList[n ? 'remove' : 'add'](controllerIndicatorClass)
		$controllerIndicator.classList[n ? 'add' : 'remove']('mdi-vibrate')
	}
}
// // Comandos vindos do servidor
// const commands = {
// 	/** Vibrar */
// 	V: (data: string) => {
// 		const [value] = data.toLowerCase().split(' ')
// 		if (options.vibrationFromGame) {
// 			const n = parseInt(value.split('|')[0])
// 			vibrate(n ? 3000 : 0, true)
// 			$controllerIndicator.classList[n ? 'remove' : 'add'](controllerIndicatorClass)
// 			$controllerIndicator.classList[n ? 'add' : 'remove']('mdi-vibrate')
// 		}
// 	},

// 	/** Exibe informações na tela */
// 	INFO: (data: string) => {
// 		toast(data)
// 	},

// 	/** Falha ao autenticar */
// 	AUTH_FAILED: () => {
// 		if (triedToAuthenticate) return
// 		document.body.classList.remove('connecting', 'connected')
// 		document.body.classList.add('disconnected')
// 		const password = prompt('O computador requer uma senha para se conectar ao MobyStk')
// 		if (password === null) return
// 		localStorage.setItem('joystick.password', password)
// 		triedToAuthenticate = true
// 		loading()
// 		window.location.reload()
// 	}
// }

// /** Conexão do socket */
// export let socket = socketConnect()

// /**
//  * Tenta conectar ao socket
//  */
// export function socketConnect() {
// 	let ws: WebSocket
// 	try {
// 		ws = new WebSocket('ws://' + options.ip)
// 	} catch (err) {
// 		console.error(err)
// 		closed()
// 		return
// 	}

// 	ws.addEventListener('open', opened)
// 	ws.addEventListener('close', closed)
// 	ws.addEventListener('message', message)
// 	document.body.classList.remove('connected', 'disconnected')
// 	document.body.classList.add('connecting')

// 	/** Socket conectado */
// 	function opened() {
// 		document.body.classList.remove('connecting', 'disconnected')
// 		document.body.classList.add('connected')
// 		ws.send('PASSWORD ' + (options.password || ''))
// 	}

// 	/** Socket desconectado */
// 	function closed() {
// 		document.body.classList.remove('connecting', 'connected')
// 		document.body.classList.add('disconnected')
// 		setTimeout(() => (socket = socketConnect()), 3000)
// 	}

// 	/** Mensagem do socket */
// 	function message(e: MessageEvent<any>) {
// 		const [cmd, ...data]: [Commands, string[]] = e.data.split(' ')
// 		const command = commands[cmd]
// 		if (typeof command !== 'function') return
// 		command(data.join(' '))
// 	}

// 	return ws
// }

/**
 * Envia comandos para o servidor
 * @param keys Tecla(s) que será(ão) pressionada(s) de acordo com o KeyMapping
 * @param release Boolean indicando se a tecla está sendo solta
 * @param custom Comando personalizado para enviar ao servidor
 */
export function sendCmd(keys: string | string[], release = false, custom?: string) {
	if (!keys || !keys.length) return
	if (typeof keys === 'string') keys = [keys]

	// Mapeia as teclas
	if (!custom)
		keys = keys.map((key) => {
			if (options.vgamepad) return keymappings[key]?.[4]
			else return keymappings[key]?.[options.player]
		})

	// Salva no macro ao invés de enviar para o servidor
	if (recordingMacro && custom) return lastMacro.push(`${custom} ${keys} ${options.player}`)
	if (recordingMacro) return lastMacro.push(`${release ? 'R' : 'P'} ${keys} ${options.player}`)

	// Se não tiver conectado, não faz nada
	if (!socket || socket.readyState !== 1) return

	// Envia o comando para o servidor
	if (custom) socket.send(`${custom} ${keys} ${options.player}`)
	else socket.send(`${release ? 'R' : 'P'} ${keys} ${options.player}`)
}

window.sendCmd = sendCmd
