import options from './options'
import loading from '../utils/loading'
import { toast } from '../utils/toast'

// Evita aparecer a tela de senha novamente
let triedToAuthenticate = false

interface ICommands {
	[key: string]: Function
}

// Comandos vindos do servidor
export const commands: ICommands = {
	/** Exibe informações na tela */
	INFO: (data: string) => {
		toast(data)
	},

	/** Falha ao autenticar */
	AUTH_FAILED: () => {
		if (triedToAuthenticate) return
		document.body.classList.remove('connecting', 'connected')
		document.body.classList.add('disconnected')
		const password = prompt('O computador requer uma senha para se conectar ao MobyStk')
		if (password === null) return
		localStorage.setItem('joystick.password', password)
		triedToAuthenticate = true
		loading()
		window.location.reload()
	}
}

/** Conexão do socket */
export let socket = socketConnect()

/** Tenta conectar ao socket */
export function socketConnect() {
	let ws: WebSocket
	try {
		ws = new WebSocket('ws://' + options.ip)
	} catch (err) {
		console.error(err)
		closed()
		return
	}

	ws.addEventListener('open', opened)
	ws.addEventListener('close', closed)
	ws.addEventListener('message', message)
	document.body.classList.remove('connected', 'disconnected')
	document.body.classList.add('connecting')

	/** Socket conectado */
	function opened() {
		document.body.classList.remove('connecting', 'disconnected')
		document.body.classList.add('connected')
		ws.send('PASSWORD ' + (options.password || ''))
	}

	/** Socket desconectado */
	function closed() {
		document.body.classList.remove('connecting', 'connected')
		document.body.classList.add('disconnected')
		setTimeout(() => (socket = socketConnect()), 3000)
	}

	/** Mensagem do socket */
	function message(e: MessageEvent<any>) {
		const [cmd, ...data]: [string, string[]] = e.data.split(' ')
		const command = commands[cmd]
		if (typeof command !== 'function') return
		command(data.join(' '))
	}

	return ws
}
