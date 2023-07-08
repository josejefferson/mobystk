/**
 * PLUGIN - MobyStk Mobile
 * @author Jefferson Dantas
 */
options.vgamepad = false
let seq = 0

/** Envia o comando para o servidor */
window.addEventListener('load', () => {
	socketConnect = () => {}
	sendCmd = (keys, release = false) => {
		if (!keys || !keys.length) return
		if (typeof keys === 'string') keys = [keys]

		keys = keys.map((key) => {
			return keymappings[key]?.[0]
		})

		// Salva no macro ao invés de enviar para o servidor
		if (recordingMacro) return lastMacro.push(`${release ? 'R' : 'P'} ${keys} ${options.player}`)

		// Envia o comando para o servidor
		keys = keys.map(getKeycode).map((key) => `${release ? 'U' : 'D'}${key}`)
		for (const key of keys) {
			sendKey(key, release)
		}
	}
})

function connecting() {
	document.body.classList.remove('connected', 'disconnected')
	document.body.classList.add('connecting')
}

function connected() {
	document.body.classList.remove('connecting', 'disconnected')
	document.body.classList.add('connected')
}

function disconnected() {
	document.body.classList.remove('connecting', 'connected')
	document.body.classList.add('disconnected')
}

/** Retorna a sequência do WiFiKeyboard */
function getSeq() {
	connecting()
	let url = `${options.ip}/`
	if (!options.ip.startsWith('http')) url = 'http://' + url
	fetch(url)
		.then((r) => {
			return r.text()
		})
		.then((r) => {
			seq = parseInt(r.split('\n')[46].split('= ')[1].slice(0, -1))
			connected()
		})
		.catch((err) => {
			console.error(err)
			seq = 1000
			disconnected()
			setTimeout(getSeq, 5000)
		})
}

getSeq()

/** Envia as teclas para o servidor */
function sendKey(keys) {
	const string = `${seq++},${keys},`
	let url = `${options.ip}/key?${string}`
	if (!options.ip.startsWith('http')) url = 'http://' + url
	return fetch(url).catch(console.error)
}

/** Retorna o código da tecla */
function getKeycode(key) {
	const KEY_CODES = {
		enter: 13,
		esc: 27,
		space: 32,
		0: 48,
		1: 49,
		2: 50,
		3: 51,
		4: 52,
		5: 53,
		6: 54,
		7: 55,
		8: 56,
		9: 57,
		a: 65,
		b: 66,
		c: 67,
		d: 68,
		e: 69,
		f: 70,
		g: 71,
		h: 72,
		i: 73,
		j: 74,
		k: 75,
		l: 76,
		m: 77,
		n: 78,
		o: 79,
		p: 80,
		q: 81,
		r: 82,
		s: 83,
		t: 84,
		u: 85,
		v: 86,
		w: 87,
		x: 88,
		y: 89,
		z: 90,
		'.': 190,
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		tab: 9,
		escape: 27,
		f1: 112,
		';': 188,
		'[': 221,
		media_volume_up: 121,
		media_volume_down: 120
	}
	return KEY_CODES[key.toLowerCase()]
}

toast('MOBYSTK MOBILE PLUGIN (beta)\nBy Jefferson Dantas\n\nCarregado com sucesso!')
