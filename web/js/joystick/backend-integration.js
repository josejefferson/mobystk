const $controllerIndicator = document.querySelector('.controller-indicator')
const controllerIndicatorClass = options.vgamepad ? 'mdi-google-controller' : 'mdi-keyboard'
$controllerIndicator.classList.add(controllerIndicatorClass)

// Evita aparecer a tela de senha novamente
let triedToAuthenticate = false

// Comandos vindos do servidor
const commands = {
	'V': (data) => {
		const [value, player] = data.toLowerCase().split(' ')
		if (options.vibrationFromGame/* && parseInt(player) === options.player*/) {
			const n = parseInt(value.split('|')[0])
			navigator.vibrate(n ? 3000 : 0, true)
			$controllerIndicator.classList[n ? 'remove' : 'add'](controllerIndicatorClass)
			$controllerIndicator.classList[n ? 'add' : 'remove']('mdi-vibrate')
		}
	},
	'INFO': (data) => {
		toast(data)
	},
	'AUTH_FAILED': () => {
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

// CONEXÃO DO SOCKET
let socket = socketConnect()
function socketConnect() {
	const ws = new WebSocket('ws://' + options.ip)
	document.body.classList.remove('connected', 'disconnected')
	document.body.classList.add('connecting')
	// Socket conectado
	ws.addEventListener('open', () => {
		document.body.classList.remove('connecting', 'disconnected')
		document.body.classList.add('connected')
		ws.send('PASSWORD ' + (options.password || ''))
	})
	// Socket desconectado
	ws.addEventListener('close', () => {
		document.body.classList.remove('connecting', 'connected')
		document.body.classList.add('disconnected')
		setTimeout(() => socket = socketConnect(), 3000)
	})
	// Mensagem do Socket
	ws.addEventListener('message', (e) => {
		const [cmd, ...data] = e.data.split(' ')
		const command = commands[cmd]
		if (typeof command !== 'function') return
		command(data.join(' '))
	})
	return ws
}

// ENVIA COMANDOS PARA O SERVIDOR
function sendCmd(keys, release = false, custom) {
	if (!keys || !keys.length) return
	if (typeof keys === 'string') keys = [keys]

	// Mapeia as teclas
	if (!custom) keys = keys.map((key) => {
		if (options.vgamepad) return keymappings[key]?.[4]
		else return keymappings[key]?.[options.player]
	})

	// Salva no macro ao invés de enviar para o servidor
	if (recordingMacro && custom) return lastMacro.push(`${custom} ${keys} ${options.player}`)
	if (recordingMacro) return lastMacro.push(`${release ? 'R' : 'P'} ${keys} ${options.player}`)

	// Se não tiver conectado, não faz nada
	if (socket.readyState !== 1) return

	// Envia o comando para o servidor
	if (custom) socket.send(`${custom} ${keys} ${options.player}`)
	else socket.send(`${release ? 'R' : 'P'} ${keys} ${options.player}`)
}