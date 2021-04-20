const $layoutCSS = document.querySelector('.layout')
const $viewport = document.querySelector('meta[name="viewport"]')

const ip = localStorage.getItem('joystick.code') || '127.0.0.1:5000'
const layout = localStorage.getItem('joystick.layout')
const player2 = localStorage.getItem('joystick.player') === '2' ? true : false
const debug = localStorage.getItem('joystick.debug') === 'true' ? true : false

if (debug) document.body.classList.add('debug')
if (!layout) location.href = 'index.html'
localStorage.getItem('joystick.locked')?.split(',')?.forEach(key => {
	if (key) document.querySelector('.' + key)?.classList.add('lock')
})
if (localStorage.getItem('joystick.invert') === 'true')
	document.body.classList.add('invert')

// Carrega o layout
$layoutCSS.href = 'layouts/' + layout + '.css'

const currentTouches = []
const joysticks = []


// Eventos da página
document.addEventListener('contextmenu', () => false)
window.addEventListener('resize', resizeJoystick)
window.addEventListener('load', () => {
	document.body.classList.remove('preload')
	resizeJoystick()
})
resizeJoystick()


// Conexão do socket
let socket = socketConn()
function socketConn() {
	const ws = new WebSocket('ws://' + ip)
	ws.onopen = e => {
		document.body.classList.remove('connecting', 'disconnected')
		document.body.classList.add('connected')
	}
	ws.onclose = e => {
		document.body.classList.remove('connecting')
		document.body.classList.add('disconnected')
		setTimeout(() => socket = socketConn(), 3000)
	}
	return ws
}


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
		navigator.vibrate(15)
		if (joystick) continue
		target.classList.add('active')
		sendCmd(target.dataset[player2 ? 'secKey' : 'key'] || target.dataset.key)
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
		sendCmd(oldtouch.target?.dataset[player2 ? 'secKey' : 'key'] || oldtouch.target?.dataset.key, true)

		if (target && (!target.classList.contains('touch') ||
			target.classList.contains('active') ||
			target.classList.contains('lock'))) target = null
		oldtouch.target = target
		if (!target) continue
		target.classList.add('active')
		sendCmd(target.dataset[player2 ? 'secKey' : 'key'] || target.dataset.key)
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
		if (!currentTouches[i].joystick && currentTouches[i].target) {
			currentTouches[i].target.classList.remove('active')
			sendCmd(currentTouches[i].target.dataset[player2 ? 'secKey' : 'key'] || currentTouches[i].target.dataset.key, true)
		}
		currentTouches.splice(i, 1)
	}
}


// Clique do mouse
document.onmousedown = (e) => {
	if ('ontouchstart' in document.documentElement) return
	let target = e.target
	if (!target.classList.contains('joystick') &&
		(!target.classList.contains('touch') ||
			target.classList.contains('active') ||
			target.classList.contains('lock'))) target = null
	if (!target) return
	target.classList.add('active')
	if (target.dataset.key) sendCmd(target.dataset[player2 ? 'secKey' : 'key'] || target.dataset.key)

	// Fim do clique
	document.onmouseup = (e) => {
		target.classList.remove('active')
		if (target.dataset.key) sendCmd(target.dataset[player2 ? 'secKey' : 'key'] || target.dataset.key, true)
		document.onmouseup = null
	}
}


// Botões bloqueáveis
document.querySelectorAll('.lock').forEach(el => {
	el.ontouchstart = event
	el.onmousedown = event
	function event(e) {
		if ('ontouchstart' in document.documentElement && e.type === 'mousedown') return
		navigator.vibrate(15)
		if (el.classList.contains('active')) {
			// Ativa o botão
			el.classList.remove('active')
			sendCmd(el.dataset[player2 ? 'secKey' : 'key'] || target.dataset.key, true)
		} else {
			// Desativa o botão
			el.classList.add('active')
			sendCmd(el.dataset[player2 ? 'secKey' : 'key'] || target.dataset.key)
		}
	}
})


// Atualiza os dados dos joysticks
function updateJoystick(joystick, id, angle, direction) {
	const keys = (joystick.dataset[player2 ? 'secKeys' : 'keys'] || joystick.dataset.keys).split(' ')
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
	function update(dir, value, key) {
		switch (dir) {
			case 'up': key = keys[0]; break
			case 'left': key = keys[1]; break
			case 'down': key = keys[2]; break
			case 'right': key = keys[3]; break
		}

		if (joysticks[id][dir] === value) return
		joysticks[id][dir] = value
		sendCmd(key, !value)
	}
}


// Envia comandos para o servidor
function sendCmd(key, release = false) {
	// Trata o comando
	if (!key) return
	key = key.toUpperCase()
	key = key.split(' ')
	key.forEach(c => {
		// Diagonais
		if (key.length > 1) document.querySelectorAll(`[data-${player2 ? 'sec-key' : 'key'}="${c}"]`)
			.forEach(e => e.classList[release ? 'remove' : 'add']('dActive'))
	})
	// Não envia o comando se o websocket não estiver conectado
	if (socket.readyState !== 1) return

	// Envia o comando
	socket.send((release ? 'R ' : 'P ') + key)
}


// Corrige bugs do joystick e ajusta à tela
function resizeJoystick() {
	$viewport.setAttribute('content', `width=${width()}, user-scalable=0`)

	for (j in joysticks) joysticks[j].instance.destroy();
	(['joystickL', 'joystickR', 'joystickA']).forEach(id => {
		const $el = document.getElementById(id)
		joysticks[id] = { up: false, down: false, left: false, right: false }
		joysticks[id].instance = nipplejs.create({
			zone: $el,
			size: 90,
			mode: 'static',
			position: {
				left: '50%',
				top: '50%'
			}
		}).on('move end', (e, d) => {
			updateJoystick($el, id, d?.angle?.degree, d?.direction)
		})
	})

	document.querySelectorAll('.joystick .nipple .front').forEach(e => {
		e.classList.add('joystick', 'touch')
	})

	function inadequateHeight() {
		if (window.outerWidth >= 640) return window.outerHeight < 360 ? true : false
		else return window.outerWidth / window.outerHeight > 1.7777777777777778 ? true : false
	}

	function width() {
		if (inadequateHeight()) return window.outerWidth * (360 / window.outerHeight)
		else if (window.outerWidth <= 640) return 640
		else return 'device-width'
	}
}