// INÍCIO DO TOQUE
document.addEventListener('touchstart', (e) => {
	if (window.layoutEditor?.opened) return

	for (const touch of e.changedTouches) {
		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		while (target !== null &&
			!((target.instance instanceof Controller.Button && !target.instance.customAction) ||
				target.instance instanceof Controller.Joystick)) {
			target = target.parentElement
		}

		if (target?.instance.lockable) {
			navigator.vibrate(options.vibrate)
			if (target.instance.active) target.instance.release()
			else target.instance.press()
			continue
		}

		const joystick = target?.instance instanceof Controller.Joystick
		Controller.currentTouches.push({ target, touch, joystick })
		if (!target) continue
		navigator.vibrate(options.vibrate)
		if (joystick) continue
		target.instance.press()
	}
})

// MOVIMENTO DO TOQUE
document.addEventListener('touchmove', (e) => {
	if (window.layoutEditor?.opened) return

	for (const touch of e.changedTouches) {
		const i = Controller.currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue

		const oldtouch = Controller.currentTouches[i]
		if (oldtouch.joystick) continue
		if (!options.changeKeyOnDrag && oldtouch.target) continue
		oldtouch.touch = touch

		let target = document.elementFromPoint(touch.clientX, touch.clientY)
		// todo: colocar lockable aqui
		while (target !== null &&
			!((target.instance instanceof Controller.Button && !target.instance.customAction) &&
				!target.instance.lockable)) {
			target = target.parentElement
		}

		if (oldtouch.target === target) continue
		oldtouch.target?.instance.release()

		if (!target || target.instance?.active) target = null
		oldtouch.target = target
		if (!target) continue
		target.instance.press()
		navigator.vibrate(options.vibrate)
	}
})

// FIM DO TOQUE
document.addEventListener('touchend', (e) => {
	if (window.layoutEditor?.opened) return

	for (const touch of e.changedTouches) {
		const i = Controller.currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue

		if (Controller.currentTouches[i].target?.instance instanceof Controller.Button) {
			Controller.currentTouches[i].target.instance.release()
		}
		Controller.currentTouches.splice(i, 1)
	}
})

// CANCELAMENTO DO TOQUE
document.addEventListener('touchcancel', (e) => {
	if (window.layoutEditor?.opened) return

	for (const touch of e.changedTouches) {
		const i = Controller.currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue

		if (Controller.currentTouches[i].target?.instance instanceof Controller.Button) {
			Controller.currentTouches[i].target.instance.release()
		}
		Controller.currentTouches.splice(i, 1)
	}
})