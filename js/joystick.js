// Configuração do IP e do Layout
const ip = localStorage.getItem('webJoy.code') || '127.0.0.1:5000'
const layout = localStorage.getItem('webJoy.layout')
if (!layout) location.href = 'index.html'
document.querySelector('.layout').href = 'layouts/' + layout + '.css'
const joysticks = []

function updateSize() {
	const width = window.innerWidth
	const height = window.innerHeight
	
	const scale = Math.min(
		width / 640,
		height / 360
	)
	
	const $container = document.querySelector('.container')
	$container.style.transform = `scale(${scale})`
	
	console.log('update')
	joysticks.forEach(j => j.destroy());
	(['joystick', 'joystick2']).forEach((j, i) => joysticks[i] = nipplejs.create({
		zone: document.getElementById(j),
		size: 90,
		mode: 'static',
		position: {
			left: '50%',
			top: '50%'
		}
	}).on('move end', (e, d) => {
		updateJoystick(d?.angle?.degree, d?.direction)
	}))
}

window.addEventListener('load', updateSize)
window.addEventListener('resize', updateSize)


//const $drive = document.querySelector('.drive')
//const $driveIcon = document.querySelector('.drive svg')

// Drive sensor mode
/*$drive.onclick = e => {
	// Change sensitivity of sensor
	const SENSITIVITY = 4

	// Turn off drive mode
	if (e.target.classList.contains('active')) {
		e.target.classList.remove('active')
		$driveIcon.style.transform = 'rotate(0deg)'
		window.ondevicemotion = null
		return
	}

	// Turn on drive mode
	e.target.classList.add('active')
	let driveY = 0, driveDirection = null

	// Detect movement
	window.ondevicemotion = e => {
		const orientation = e.accelerationIncludingGravity.x >= 0 ? 1 : -1
		driveY = parseFloat(e.accelerationIncludingGravity.y.toFixed(1))
		$driveIcon.style.transform = `rotate(${driveY / 10 * 90 * orientation}deg)`
		direction = driveY > SENSITIVITY * orientation ? 'd' : driveY < -SENSITIVITY * orientation ? 'a' : null
		if (direction === driveDirection) return
		driveDirection = direction

		if (direction === null) {
			// sendCmd('a', true)
			// sendCmd('d', true)
		} else {
			// sendCmd(direction)
		}
	}
}*/

// Conexão do socket
let socket = socketConn()
function socketConn() {
	const ws = new WebSocket('ws://' + ip);
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

// Carregamento da página
document.oncontextmenu = () => false
window.onload = () => {eruda.init()
	// Joystick
	/*joysticks[0] = nipplejs.create({
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
	
	joysticks[1] = nipplejs.create({
		zone: document.getElementById('joystick2'),
		size: 90,
		mode: 'static',
		position: {
			left: '50%',
			top: '50%'
		}
	}).on('move end', (e, d) => {
		updateJoystick(d?.angle?.degree, d?.direction)
	})*/

	document.querySelectorAll('.joystick .nipple .front').forEach(e => e.classList.add('joystick', 'touch'))
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
		switch (dir) {
			case 'joyup': dir = 'w'; break;
			case 'joyleft': dir = 'a'; break;
			case 'joydown': dir = 's'; break;
			case 'joyright': dir = 'd'; break;
		}
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