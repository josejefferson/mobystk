// Configuração do IP e do Layout
const ip = localStorage.getItem('joystick.code') || '127.0.0.1:5000'
const layout = localStorage.getItem('joystick.layout')
if (!layout) location.href = 'index.html'
document.querySelector('.layout').href = 'layouts/' + layout + '.css'

// Conexão do socket
let socket = socketConn()
function socketConn() {
	const ws = new WebSocket('ws://' + ip);
	ws.onopen = e => {
		document.documentElement.style.setProperty('--color', '#fff8')
		document.documentElement.style.setProperty('--active', '#fff3')
	}
	ws.onclose = e => {
		document.documentElement.style.setProperty('--color', '#f008')
		document.documentElement.style.setProperty('--active', '#f003')
		setTimeout(() => socket = socketConn(), 3000)
	}
	return ws
}

// Carregamento da página
document.oncontextmenu = () => false
window.onload = () => {
	// Joystick
	const joy = nipplejs.create({
		zone: document.getElementById('joystick'),
		size: 90,
		mode: 'static',
		position: {
			left: '50%',
			top: '50%'
		}
	}).on('move end', (e, d) => {
		updateAnalog(d?.angle?.degree, d?.direction)
	})

	document.querySelector('#joystick .nipple .front').classList.add('joystick', 'handleTouch')
	document.body.classList.remove('preload')
}

// Toques
const currentTouches = []

// Início do toque
document.ontouchstart = e => {
	for (const touch of e.changedTouches) {
		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		if (!target.classList.contains('joystick') &&
			(!target.classList.contains('handleTouch') ||
			target.classList.contains('active') ||
			target.classList.contains('lock'))) target = null

		const analog = target?.classList.contains('joystick') ? true : false
		currentTouches.push({ target, touch, analog })
		if (!target) continue
		target.classList.add('active')
		sendCmd(target.dataset.cmd)
		navigator.vibrate(15)
	}
}

// Movimento do toque
document.ontouchmove = e => {
	for (const touch of e.changedTouches) {
		const i = currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue

		const oldtouch = currentTouches[i]
		if (oldtouch.analog) continue
		oldtouch.touch = touch

		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		if (!target?.classList.contains('handleTouch') ||
			target.classList.contains('joystick')) target = null

		if (oldtouch.target === target) continue
		oldtouch.target?.classList.remove('active')
		sendCmd(oldtouch.target?.dataset.cmd, true)

		if (target && (!target.classList.contains('handleTouch') ||
			target.classList.contains('active') ||
			target.classList.contains('lock'))) target = null
		oldtouch.target = target
		if (!target) continue
		target.classList.add('active')
		sendCmd(target.dataset.cmd)
		navigator.vibrate(15)
	}
}

// Fim do toque
document.ontouchend = e => {
	for (const touch of e.changedTouches) {
		const i = currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue
		if (currentTouches[i].target) {
			currentTouches[i].target.classList.remove('active')
			sendCmd(currentTouches[i].target.dataset.cmd, true)
		}
		currentTouches.splice(i, 1)
	}
}

// Botões bloqueáveis
document.querySelectorAll('.lock').forEach(el => el.ontouchend = () => {
	navigator.vibrate(15)
	if (el.classList.contains('active')) {
		// Ativa o botão
		el.classList.remove('active')
		sendCmd(el.dataset.cmd, true)
	} else {
		// Desativa o botão
		el.classList.add('active')
		sendCmd(el.dataset.cmd)
	}
})

// Joystick
const analog = {
	up: false,
	down: false,
	left: false,
	right: false
}

function updateAnalog(angle, direction) {
	if (!direction) {
		update('up', false)
		update('left', false)
		update('down', false)
		update('right', false)
		return
	}
	if (angle > 22.5 && angle < 157.5) update('up', true)
	else update('up', false)
	if (angle > 112.5 && angle < 247.5) update('left', true)
	else update('left', false)
	if (angle > 202.5 && angle < 337.5) update('down', true)
	else update('down', false)
	if (angle > 292.5 || angle < 67.5) update('right', true)
	else update('right', false)

	// Atualiza a direção do joystick
	function update(dir, value) {
		if (analog[dir] === value) return
		analog[dir] = value
		sendCmd(dir, !value)
	}
}

// Função de enviar comandos para o computador
function sendCmd(cmd, release = false) {
	// Trata o comando
	if (!cmd) return
	cmd = cmd.toLowerCase()
	cmd = cmd.split(',')
	cmd.forEach(c => {
		// Diagonais
		if (cmd.length > 1) document.querySelectorAll(`[data-cmd="${c}"]`)
				.forEach(e => e.classList[release ? 'remove' : 'add']('dActive'))

		// Não envia o comando se o websocket não estiver conectado
		if (socket.readyState !== 1) return

		// Envia o comando
		socket.send((release ? 'R' : 'P') + ' ' + c)
	})
}