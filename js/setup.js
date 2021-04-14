const KEY_SEQUENCE = {
	snesPlayer1: ['UP', 'LEFT', 'DOWN', 'RIGHT', 'K', 'L', 'J', 'I', 'SPACE', 'ENTER', 'Q', 'E'],
	snesPlayer2: ['Z', 'X', 'C', 'V', 'M', 'Ç', 'N', 'B', 'O', 'P', 'Y', 'U'],
	ps2Player1: ['ENTER', ';', '.', 'SPACE', 'UP', 'RIGHT', 'DOWN', 'LEFT', '1', '2', 'Q', 'E', 'I', 'L', 'K', 'J', 'W', 'D', 'S', 'A', '5', '8', '7', '6'],
	ps2Player2: ['P', '´', '~', 'O', 'Z', 'V', 'C', 'X', '3', '4', 'Y', 'U', 'B', 'Ç', 'M', 'N', 'T', 'H', 'G', 'F', '9', ']', '[', '0']
}

const ip = localStorage.getItem('joystick.code') || window.location.hostname + ':5000'
const $progress = document.querySelector('.progress')
let setup = false

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

async function start(control) {
	if (setup) return alert('Outra configuração está em andamento!')
	setup = true
	if (!KEY_SEQUENCE[control]) return alert('Este emulador não está cadastrado!')
	for (i in KEY_SEQUENCE[control]) {
		if (/*socket.readyState !== 1*/i > 5) {
			setup = false
			setProgress(true)
			return alert('Conexão perdida, tente novamente!')
		}
		setProgress(false, i, KEY_SEQUENCE[control].length)
		sendKey(KEY_SEQUENCE[control][i])
		await wait(100)
	}
	setup = false
	setTimeout(() => alert('Concluído'), 100)
}

function setProgress(error, pos, max) {
	if (error) {
		$progress.classList.add('error')
	} else {
		$progress.classList.remove('error')
		const p = 1 / (max - 1) * pos
		$progress.style.width = p * 100 + '%'
	}
}

function sendKey(key) {
	console.log(key)
	key = key.toUpperCase()
	if (socket.readyState !== 1) return
	socket.send('C ' + key)
}

async function wait(sec) {
	return new Promise((resolve) => {
		setTimeout(resolve, sec)
	})
}