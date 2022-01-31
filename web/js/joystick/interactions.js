// INÍCIO DO TOQUE
document.ontouchstart = e => {
	if (window.layoutEditor?.opened) return
	for (const touch of e.changedTouches) {
		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		if (!target.classList.contains('joystick') &&
			(!target.classList.contains('touch') ||
				target.classList.contains('active') ||
				target.classList.contains('lock'))) target = null

		const joystick = target?.classList.contains('joystick') ? true : false
		currentTouches.push({ target, touch, joystick })
		if (!target) continue
		navigator.vibrate(options.vibrate)
		if (joystick) continue
		target.classList.add('active')

		const keys = target.dataset.key?.split(' ')
		// Diagonal
		keys?.forEach(key => {
			if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
				e.classList.add('dActive')
			})
		})
		sendCmd(keys)
	}
}

// MOVIMENTO DO TOQUE
document.ontouchmove = e => {
	if (window.layoutEditor?.opened) return
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

		let keys = oldtouch?.target?.dataset?.key?.split(' ')
		// Diagonal
		keys?.forEach(key => {
			if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
				e.classList.remove('dActive')
			})
		})
		sendCmd(keys, true)

		if (target && (!target.classList.contains('touch') ||
			target.classList.contains('active') ||
			target.classList.contains('lock'))) target = null
		oldtouch.target = target
		if (!target) continue
		target.classList.add('active')

		keys = target.dataset.key?.split(' ')
		keys?.forEach(key => {
			// Diagonal
			if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
				e.classList.add('dActive')
			})
		})
		sendCmd(keys)

		navigator.vibrate(options.vibrate)
	}
}

// FIM DO TOQUE
document.ontouchend = e => {
	if (window.layoutEditor?.opened) return
	for (const touch of e.changedTouches) {
		const i = currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue
		if (!currentTouches[i].joystick && currentTouches[i].target) {
			currentTouches[i].target.classList.remove('active')

			const keys = currentTouches[i].target.dataset.key?.split(' ')
			// Diagonal
			keys?.forEach(key => {
				if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
					e.classList.remove('dActive')
				})
			})
			sendCmd(keys, true)
		}
		currentTouches.splice(i, 1)
	}
}

// CLIQUE DO MOUSE
document.onmousedown = e => {
	if (window.layoutEditor?.opened) return
	if ('ontouchstart' in document.documentElement) return
	let target = e.target
	if (!target.classList.contains('joystick') &&
		(!target.classList.contains('touch') ||
			target.classList.contains('active') ||
			target.classList.contains('lock'))) target = null
	if (!target) return
	target.classList.add('active')

	const keys = target.dataset.key?.split(' ')
	// Diagonal
	keys?.forEach(key => {
		if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
			e.classList.add('dActive')
		})
	})
	sendCmd(keys)

	// Fim do clique
	document.onmouseup = (e) => {
		target.classList.remove('active')

		const keys = target.dataset.key?.split(' ')
		// Diagonal
		keys?.forEach(key => {
			if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
				e.classList.remove('dActive')
			})
		})
		sendCmd(keys, true)
		document.onmouseup = null
	}
}