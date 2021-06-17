const KEY_SEQUENCE = {
	snesPlayer1: { pause: 100, sequence: ['UP', 'LEFT', 'DOWN', 'RIGHT', 'K', 'L', 'J', 'I', 'SPACE', 'ENTER', 'Q', 'E'] },
	snesPlayer2: { pause: 100, sequence: ['Z', 'X', 'C', 'V', 'M', 'Ç', 'N', 'B', 'O', 'P', 'Y', 'U'] },
	snesSave: { pause: 100, sequence: ['['] },
	snesLoad: { pause: 100, sequence: ['F1'] },
	ps2Player1: { pause: 1000, sequence: ['ENTER', ';', '.', 'SPACE', 'UP', 'RIGHT', 'DOWN', 'LEFT', '1', '2', 'Q', 'E', 'I', 'L', 'K', 'J', 'W', 'D', 'S', 'A', '5', '8', '7', '6'] },
	ps2Player2: { pause: 1000, sequence: ['P', '´', '~', 'O', 'Z', 'V', 'C', 'X', '3', '4', 'Y', 'U', 'B', 'Ç', 'M', 'N', 'T', 'H', 'G', 'F', '9', ']', '[', '0'] },
	psp: { pause: 150, sequence: [
		'UP', // ADJUST FOCUS
		'LEFT', // ADJUST FOCUS
		'RIGHT', // ADJUST FOCUS
		'SPACE', 'UP', 'DOWN',
		'SPACE', 'DOWN', 'DOWN',
		'SPACE', 'LEFT', 'DOWN',
		'SPACE', 'RIGHT', 'DOWN',
		'SPACE', 'L', 'DOWN',
		'SPACE', 'K', 'DOWN',
		'SPACE', 'J', 'DOWN',
		'SPACE', 'I', 'DOWN',
		'SPACE', 'SPACE', 'DOWN',
		'SPACE', 'ENTER', 'DOWN',
		'SPACE', 'Q', 'DOWN',
		'SPACE', 'E', 'DOWN',
		'SPACE', 'W', 'DOWN',
		'SPACE', 'S', 'DOWN',
		'SPACE', 'A', 'DOWN',
		'SPACE', 'D', 'DOWN',
		'DOWN', // SKIP
		'DOWN', // SKIP
		'DOWN', // SKIP
		'DOWN', // SKIP
		'DOWN', // SKIP
		'DOWN', // SKIP
		'SPACE', 'ESC', 'DOWN',
		'DOWN', // SKIP
		'DOWN', // SKIP
		'DOWN', // SKIP
		'SPACE', '[', 'DOWN',
		'SPACE', 'F1', 'ESC', // ESC = SAIR
	] },
	code1: {pause: 50, sequence: ['UP', 'Q', 'DOWN', 'E', 'LEFT', 'Q', 'RIGHT', 'E']},
	code2: {pause: 100, sequence: ['UP', 'RIGHT', 'J', 'J', 'DOWN', 'LEFT', 'L', 'L']}
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
	if (!KEY_SEQUENCE[control]) return alert('Este emulador não está cadastrado!')
	if (!confirm('Verifique se o seu emulador está preparado para a configuração.\nAperte OK para iniciar!')) return
	$progress.style.transition = `width ${KEY_SEQUENCE[control].pause}ms linear, background-color .3s ease`
	setup = true
	for (i in KEY_SEQUENCE[control].sequence) {
		if (socket.readyState !== 1) {
			setup = false
			setProgress(true)
			return setTimeout(() => alert('Conexão perdida, tente novamente!'), 100)
		}
		setProgress(false, i, KEY_SEQUENCE[control].sequence.length)
		sendKey(KEY_SEQUENCE[control].sequence[i])
		await wait(KEY_SEQUENCE[control].pause)
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
	key = key.toUpperCase()
	console.log(key)
	if (socket.readyState !== 1) return
	socket.send('T ' + key)
}

async function wait(sec) {
	return new Promise((resolve) => {
		setTimeout(resolve, sec)
	})
}