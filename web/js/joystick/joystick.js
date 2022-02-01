// ATUALIZA OS DADOS DOS JOYSTICKS
function updateJoystick(target, e, d) {
	navigator.vibrate(options.vibrateJoystick * d?.distance / 45)

	// Se estiver usando o vgamepad
	if (options.vgamepad && ['mobystk:joystick_left', 'mobystk:joystick_right'].includes(target.id)) {
		let x = Math.round(-32768 + (65534 / 90 * (45 + d?.distance * Math.cos(d?.angle?.radian))))
		let y = Math.round(-32768 + (65534 / 90 * (45 + d?.distance * Math.sin(d?.angle?.radian))))
		if (isNaN(x) || isNaN(y)) x = y = 0
		if (target.id === 'mobystk:joystick_left') sendCmd(`${x}|${y}`, false, 'VJL')
		if (target.id === 'mobystk:joystick_right') sendCmd(`${x}|${y}`, false, 'VJR')
	}

	// Se o joystick estiver em repouso, desapertar teclas
	if (!d?.direction) {
		update('up', false)
		update('left', false)
		update('down', false)
		update('right', false)
		return
	}

	// Define as teclas de acordo com a posição
	if (!options.disJoyYAxis) update('up', d?.angle.degree > 22.5 && d?.angle.degree < 157.5)
	if (!options.disJoyXAxis) update('left', d?.angle.degree > 112.5 && d?.angle.degree < 247.5)
	if (!options.disJoyYAxis) update('down', d?.angle.degree > 202.5 && d?.angle.degree < 337.5)
	if (!options.disJoyXAxis) update('right', d?.angle.degree > 292.5 || d?.angle.degree < 67.5)

	// Pressiona as teclas
	function update(dir, value) {
		const keys = target.keys
		let key, border
		switch (dir) {
			case 'up': key = keys[0]; border = 'Top'; break
			case 'left': key = keys[1]; border = 'Left'; break
			case 'down': key = keys[2]; border = 'Bottom'; break
			case 'right': key = keys[3]; border = 'Right'; break
		}

		// Efeito de borda
		target.element.querySelector('.back').style[`border${border}Width`] = value ? '7px' : ''

		if (!(options.vgamepad && ['mobystk:joystick_left', 'mobystk:joystick_right'].includes(target.id))) {
			if (target.position[dir] === value) return
			sendCmd([key], !value)
		}
		target.position[dir] = value
	}
}

// REINICIA OS JOYSTICKS PARA EVITAR BUGS
const $viewport = document.querySelector('meta[name="viewport"]')
window.addEventListener('resize', resizeJoystick)
function resizeJoystick() {
	// Ajusta os tamanhos do controle
	if (window.outerHeight > window.outerWidth / 1.7777777777777777) width = 640
	else width = window.outerWidth / window.outerHeight * 360
	$viewport.setAttribute('content', `width=${width}, user-scalable=0`)

	// Reconstrói os joysticks
	Controller.currentTouches = Controller.currentTouches.filter(el => !el.joystick)
	const joysticks = Controller.elements.joysticks
	joysticks.forEach(j => j.render())
}