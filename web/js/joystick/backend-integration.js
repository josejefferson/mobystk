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
	})
	// Socket desconectado
	ws.addEventListener('close', () => {
		document.body.classList.remove('connecting', 'connected')
		document.body.classList.add('disconnected')
		setTimeout(() => socket = socketConnect(), 3000)
	})
	// Mensagem do Socket
	ws.addEventListener('message', (e) => {
		const [cmd, value] = e.data.toLowerCase().split(' ')
		if (options.vibrationFromGame && cmd === 'v') {
			const n = parseInt(value.split('|')[0])
			navigator.vibrate(n ? 5000 : 0)
		}
	})
	return ws
}

// ENVIA COMANDOS PARA O SERVIDOR
function sendCmd(keys, release = false, custom) {
	if (!keys || !keys.length) return
	if (typeof keys === 'string') keys = [keys]

	// Mapeia as teclas
	if (!custom) keys = keys.map((key) => {
		return keymappings[key]?.[options.player]
	})

	// Salva no macro ao invés de enviar para o servidor
	if (recordingMacro && custom) return lastMacro.push(`${custom} ${keys}`)
	if (recordingMacro) return lastMacro.push(`${release ? 'R' : 'P'} ${keys}`)

	// Se não tiver conectado, não faz nada
	if (socket.readyState !== 1) return

	// Envia o comando para o servidor
	if (custom) socket.send(`${custom} ${keys}`)
	else socket.send(`${release ? 'R' : 'P'} ${keys}`)
}