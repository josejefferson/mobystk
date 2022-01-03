// CONEXÃO DO SOCKET
let socket = socketConnect()
function socketConnect() {
	const ws = new WebSocket('ws://' + options.ip)
	document.body.classList.remove('connected', 'disconnected')
	document.body.classList.add('connecting')
	// Socket conectado
	ws.onopen = () => {
		document.body.classList.remove('connecting', 'disconnected')
		document.body.classList.add('connected')
	}
	// Socket desconectado
	ws.onclose = () => {
		document.body.classList.remove('connecting', 'connected')
		document.body.classList.add('disconnected')
		setTimeout(() => socket = socketConnect(), 3000)
	}
	return ws
}

// ENVIA COMANDOS PARA O SERVIDOR
function sendCmd(keys, release = false, custom) {
	if (!keys || !keys.length) return
	if (typeof keys === 'string') keys = [keys]
	if (!custom) keys = keys.map(key => {
		key = keymappings[key]?.[options.player]
		return key
	})

	if (recordingMacro) return lastMacro.push((custom + ' ' || (release ? 'R ' : 'P ')) + keys)
	if (socket.readyState !== 1) return
	if (!custom && options.vgamepad) {
		return socket.send((release ? 'VR ' : 'VP ') + keys)
	}
	socket.send((custom + ' ' || (release ? 'R ' : 'P ')) + keys)
}