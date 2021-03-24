const ip = localStorage.getItem('joystick.code') || '127.0.0.1:5000'
const layout = localStorage.getItem('joystick.layout')
document.querySelector('.layout').href = 'layouts/' + layout + '.css'

if (!layout) location.href = 'index.html'

window.onload = () => {
	const joy = nipplejs.create({
		zone: document.getElementById('joystick'),
		size: 90,
		mode: 'static',
		position: {
			left: '50%',
			top: '50%'
		}
	})

	document.querySelector('#joystick .nipple .front').classList.add('joystick', 'handleTouch')
	joy.on('move end', (e, d) => updateAnalog(d?.angle?.degree, d?.direction))
	document.body.classList.remove('preload')
}

const socket = new WebSocket('ws://' + ip);
socket.addEventListener('open', e => {
	document.documentElement.style.setProperty('--color', '#fff8')
	document.documentElement.style.setProperty('--active', '#fff3')
})

socket.addEventListener('close', e => {
	document.documentElement.style.setProperty('--color', '#f008')
	document.documentElement.style.setProperty('--active', '#f003')
})

const currentTouches = []
document.ontouchstart = e => {
	const touches = e.changedTouches

	for (const touch of touches) {
		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		if (!target.classList.contains('joystick') &&
			(!target.classList.contains('handleTouch') ||
			target.classList.contains('active') ||
			target.classList.contains('lock'))) target = null

		const analog = target?.classList.contains('joystick') ? true : false

		if (target) {
			target.classList.add('active')
			sendCmd(target.dataset.cmd)
			navigator.vibrate(15)
		}
		currentTouches.push({
			target,
			touch,
			analog,
		})
	}
}

document.ontouchmove = e => {
	const touches = e.changedTouches

	for (const touch of touches) {
		const i = currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue
		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		if (!target?.classList.contains('handleTouch') ||
			target.classList.contains('joystick')) target = null
		const oldtouch = currentTouches[i]

		if (oldtouch.analog) continue

		if (oldtouch.target !== target) {
			oldtouch.target?.classList.remove('active')
			sendCmd(oldtouch.target?.dataset.cmd, true)
			if (target && (!target.classList.contains('handleTouch') ||
				target.classList.contains('active') ||
				target.classList.contains('lock'))) target = null
			if (target) {
				target.classList.add('active')
				sendCmd(target.dataset.cmd)
				navigator.vibrate(15)
			}
			oldtouch.target = target
		}
		oldtouch.touch = touch
	}
}

document.ontouchend = e => {
	const touches = e.changedTouches
	for (const touch of touches) {
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

document.querySelectorAll('.lock').forEach(el => {
	el.onclick = () => {
		if (el.classList.contains('active')) {
			el.classList.remove('active')
			sendCmd(el.dataset.cmd, true)
		} else {
			el.classList.add('active')
			sendCmd(el.dataset.cmd)
		}
		navigator.vibrate(15)
	}
})

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

	function update(dir, value) {
		if (analog[dir] === value) return
		analog[dir] = value
		sendCmd(dir, !value)
	}
}

function sendCmd(cmd, release = false) {
	try {
		if (!cmd) return
		cmd = cmd.toLowerCase()
		const str = (release ? 'R' : 'P') + ' ' + cmd
		socket.send(str)
	} catch (err) {console.error(err)}
}