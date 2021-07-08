const JOYSTICK_CLASSES = ['joystickL', 'joystickR', 'joystickA']
const JOYSTICK_OPTIONS = $el => ({
	zone: $el,
	size: 90,
	mode: 'static',
	position: {
		left: '50%',
		top: '50%'
	}
})

const joysticks = []
let currentTouches = []
window.addEventListener('load', resizeJoystick)
window.addEventListener('resize', resizeJoystick)

// ATUALIZA OS DADOS DOS JOYSTICKS
function updateJoystick(joystick, id, angle, direction) {
	const keys = (joystick.dataset.keys || joystick.dataset.keys).split(' ')

	// Se o joystick estiver em repouso, desapertar teclas
	if (!direction) {
		update('up', false)
		update('left', false)
		update('down', false)
		update('right', false)
		return
	}

	// Define as teclas de acordo com a posição
	update('up', angle > 22.5 && angle < 157.5)
	update('left', angle > 112.5 && angle < 247.5)
	update('down', angle > 202.5 && angle < 337.5)
	update('right', angle > 292.5 || angle < 67.5)

	// Pressiona as teclas
	function update(dir, value, key) {
		switch (dir) {
			case 'up': key = keys[0]; border = 'Top'; break
			case 'left': key = keys[1]; border = 'Left'; break
			case 'down': key = keys[2]; border = 'Bottom'; break
			case 'right': key = keys[3]; border = 'Right'; break
		}

		// Efeito de borda
		joystick.querySelector('.back').style[`border${border}Width`] = value ? '7px' : ''

		if (joysticks[id][dir] === value) return
		joysticks[id][dir] = value
		sendCmd([key], !value)
	}
}

// REINICIA OS JOYSTICKS PARA EVITAR BUGS
const $viewport = document.querySelector('meta[name="viewport"]')
function resizeJoystick() {
	$viewport.setAttribute('content', `width=${width()}, user-scalable=0`)

	// Destrói os joysticks
	for (j in joysticks) joysticks[j].instance.destroy();
	currentTouches = currentTouches.filter(el => !el.joystick)

	// Reconstrói os joysticks
	JOYSTICK_CLASSES.forEach(id => {
		const $el = document.querySelector('.' + id)
		joysticks[id] = { up: false, down: false, left: false, right: false }
		joysticks[id].instance = nipplejs.create(JOYSTICK_OPTIONS($el)).on('move end', (e, d) => {
			updateJoystick($el, id, d?.angle?.degree, d?.direction)
		})
	})

	document.querySelectorAll('.joystick .nipple .front').forEach(e => {
		e.classList.add('joystick', 'touch')
	})

	// Retorna "true" se a altura afeta a posição dos botões
	function inadequateHeight() {
		if (window.outerWidth >= 640) return window.outerHeight < 360
		else return window.outerWidth / window.outerHeight > 1.7777777777777778
	}

	// Retorna a propriedade "width" adequada para a metatag "viewport"
	function width() {
		if (inadequateHeight()) return window.outerWidth * (360 / window.outerHeight)
		else if (window.outerWidth <= 640) return 640
		else return 'device-width'
	}
}