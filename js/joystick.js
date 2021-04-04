// Configuração do IP e do Layout
const ip = localStorage.getItem('webJoy.code') || '127.0.0.1:5000'
const layout = localStorage.getItem('webJoy.layout')
if (!layout) location.href = 'index.html'
document.querySelector('.layout').href = 'layouts/' + layout + '.css'

// Conexão do socket

let y = 0, d = null

window.addEventListener('devicemotion', e => {
	const o = e.accelerationIncludingGravity.x >= 0 ? 1 : -1
	y = parseFloat(e.accelerationIncludingGravity.y.toFixed(1))
	dir = y > 4 ? 'right' : y < 4 ? 'left' : null
	if (dir != d) {
		d = dir
		if (d == null) {
			sendCmd('joyleft', true)
			sendCmd('joyright', true)
		} else {
			sendCmd('joy' + d)
		}
	}
	document.getElementById('debug').innerText = 'Y: ' + y + ' | O: ' + o + ' | D: ' + (y > 4 ? 'RIGHT' : y < 4 ? 'LEFT' : 'NONE')
})
// setInterval(() => {
// 	sendCmd(y > 0 ? 'joyright' : 'joyleft')
// 	setTimeout(() => {
// 		sendCmd('joyright', true)
// 		sendCmd('joyleft', true)
// 	}, y / 10 * 1000)
// }, 1000)


let socket = socketConn()
function socketConn() {
	const ws = new WebSocket('ws://' + ip);
	ws.onopen = e => {
		document.body.classList.remove('connecting', 'disconnected')
	}
	ws.onclose = e => {
		document.body.classList.remove('connecting')
		document.body.classList.add('disconnected')
		setTimeout(() => socket = socketConn(), 3000)
	}
	return ws
}

// Carregamento da página
document.oncontextmenu = () => false
window.onload = () => {
	// Joystick
	nipplejs.create({
		zone: document.getElementById('joystick'),
		size: 90,
		mode: 'static',
		position: {
			left: '50%',
			top: '50%'
		}
	}).on('move end', (e, d) => {
		updateJoystick(d?.angle?.degree, d?.direction)
	})

	document.querySelector('#joystick .nipple .front').classList.add('joystick', 'touch')
	document.body.classList.remove('preload')
}

// Toques
const currentTouches = []

// Início do toque
document.ontouchstart = e => {
	for (const touch of e.changedTouches) {
		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		if (!target.classList.contains('joystick') &&
			(!target.classList.contains('touch') ||
				target.classList.contains('active') ||
				target.classList.contains('lock'))) target = null

		const joystick = target?.classList.contains('joystick') ? true : false
		currentTouches.push({ target, touch, joystick })
		if (!target) continue
		target.classList.add('active')
		sendCmd(target.dataset.key)
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
		if (oldtouch.joystick) continue
		oldtouch.touch = touch

		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		if (!target?.classList.contains('touch') ||
			target.classList.contains('joystick')) target = null

		if (oldtouch.target === target) continue
		oldtouch.target?.classList.remove('active')
		sendCmd(oldtouch.target?.dataset.key, true)

		if (target && (!target.classList.contains('touch') ||
			target.classList.contains('active') ||
			target.classList.contains('lock'))) target = null
		oldtouch.target = target
		if (!target) continue
		target.classList.add('active')
		sendCmd(target.dataset.key)
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
			sendCmd(currentTouches[i].target.dataset.key, true)
		}
		currentTouches.splice(i, 1)
	}
}

// Botões bloqueáveis
document.querySelectorAll('.lock').forEach(el => el.ontouchstart = () => {
	navigator.vibrate(15)
	if (el.classList.contains('active')) {
		// Ativa o botão
		el.classList.remove('active')
		sendCmd(el.dataset.key, true)
	} else {
		// Desativa o botão
		el.classList.add('active')
		sendCmd(el.dataset.key)
	}
})

// Joystick
const joystick = {
	up: false,
	down: false,
	left: false,
	right: false
}

function updateJoystick(angle, direction) {
	if (!direction) {
		update('joyup', false)
		update('joyleft', false)
		update('joydown', false)
		update('joyright', false)
		return
	}
	if (angle > 22.5 && angle < 157.5) update('joyup', true)
	else update('joyup', false)
	if (angle > 112.5 && angle < 247.5) update('joyleft', true)
	else update('joyleft', false)
	if (angle > 202.5 && angle < 337.5) update('joydown', true)
	else update('joydown', false)
	if (angle > 292.5 || angle < 67.5) update('joyright', true)
	else update('joyright', false)

	// Atualiza a direção do joystick
	function update(dir, value) {
		if (joystick[dir] === value) return
		joystick[dir] = value
		sendCmd(dir, !value)
	}
}

// Função de enviar comandos para o computador
function sendCmd(key, release = false) {
	// Trata o comando
	if (!key) return
	key = key.toUpperCase()
	key = key.split(',')
	key.forEach(c => {
		// Diagonais
		if (key.length > 1) document.querySelectorAll(`[data-key="${c}"]`)
			.forEach(e => e.classList[release ? 'remove' : 'add']('dActive'))
	})
	// Não envia o comando se o websocket não estiver conectado
	if (socket.readyState !== 1) return

	// Envia o comando
	socket.send((release ? 'R' : 'P') + ' ' + key)
}