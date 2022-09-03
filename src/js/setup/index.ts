import keymappings from '../keymappings'
import KEY_SEQUENCE from '../setup/setupmap'

window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

document
	.querySelectorAll('a')
	.forEach((e) => e.addEventListener('click', loading))
const $progress = document.querySelector<HTMLElement>('.progress')
const $bar = $progress.querySelector<HTMLElement>('.bar')
const $cancel = $progress.querySelector<HTMLElement>('.cancel')
const $ip = document.querySelector<HTMLElement>('.ip')
const $connectStatus = document.querySelector<HTMLElement>('.connectStatus')

const ip =
	localStorage.getItem('joystick.options.code') ||
	window.location.hostname + ':5000'
$ip.innerText = ip
let socket = socketConn()
function socketConn() {
	const ws = new WebSocket('ws://' + ip)
	$connectStatus.classList.remove('connected', 'disconnected')
	$connectStatus.classList.add('connecting')
	ws.addEventListener('open', (e) => {
		$connectStatus.classList.remove('connecting', 'disconnected')
		$connectStatus.classList.add('connected')
	})
	ws.addEventListener('close', (e) => {
		$connectStatus.classList.remove('connecting', 'connected')
		$connectStatus.classList.add('disconnected')
		setTimeout(() => (socket = socketConn()), 3000)
		ws.send('PASSWORD ' + (localStorage.getItem('joystick.password') || ''))
	})
	ws.addEventListener('message', (e) => {
		const [cmd, ...data] = e.data.split(' ')
		if (cmd.toUpperCase() === 'AUTH_FAILED') {
			$connectStatus.classList.remove('connecting', 'connected')
			$connectStatus.classList.add('disconnected')
			const password = prompt(
				'O computador requer uma senha para se conectar ao MobyStk'
			)
			if (password === null) return
			localStorage.setItem('joystick.password', password)
			loading()
			window.location.reload()
		}
	})

	return ws
}

document.querySelectorAll<HTMLElement>('.app .actions .start').forEach((e) => {
	const { app, player } = e.dataset
	e.addEventListener('click', () => start(app, player))
})

async function start(control, player) {
	let interrupted = false
	$cancel.addEventListener('click', () => (interrupted = true))
	const { sequence, pause } = KEY_SEQUENCE[control]
	updateProgress(1)
	setButtonsDisabled(true)
	for (const i in sequence) {
		if (socket.readyState !== 1 || interrupted) return updateProgress(3)
		sendKey(sequence[i], player)
		updateProgress(1, i, sequence.length, pause)
		await wait(pause)
	}
	updateProgress(2)
}

function updateProgress(
	status: number,
	pr?: string,
	max?: number,
	pause?: number
) {
	if (status > 0) {
		$progress.classList.remove('hidden')
		switch (status) {
			case 1:
				$progress.classList.remove('complete', 'stopped')
				break
			case 2:
				$progress.classList.add('complete')
				break
			case 3:
				$progress.classList.add('stopped')
				break
		}
		if (status >= 2) {
			$bar.style.transition = ''
			setTimeout(() => updateProgress(0), 2000)
		}
		if (pr && max) {
			$bar.style.transition = pause + 'ms linear'
			const width = (1 / (max - 1)) * Number(pr) * 100
			$bar.style.width = width + '%'
		}
	} else {
		setTimeout(() => {
			$progress.classList.add('hidden')
			$bar.style.transition = ''
			setTimeout(() => {
				$progress.classList.remove('complete', 'stopped')
				$bar.style.width = '0'
				setButtonsDisabled(false)
			}, 150)
		}, 2000)
	}
}

function setButtonsDisabled(disabled = false) {
	document
		.querySelectorAll<HTMLButtonElement>('.app .actions button')
		.forEach((el) => {
			el.disabled = disabled
		})
}

function sendKey(key, player) {
	key = keymappings[key]?.[player - 1] || key
	console.log(key)
	if (socket.readyState !== 1) return
	if (key.startsWith('*')) socket.send(key.substr(1))
	else socket.send('T ' + key)
}

async function wait(sec) {
	return new Promise((resolve) => {
		setTimeout(resolve, sec)
	})
}

const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}

export {}
