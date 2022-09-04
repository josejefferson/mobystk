import Button from '../classes/Button'
import Controller from '../classes/Controller'
import Joystick from '../classes/Joystick'
import { IElementNode } from '../types/Element'
import vibrate from '../utils/vibrate'
import options from './options'

document.addEventListener('touchstart', touchStart)
document.addEventListener('touchmove', touchMove)
document.addEventListener('touchend', touchEnd)
document.addEventListener('touchcancel', touchEnd)

/**
 * Início do toque
 */
function touchStart(e: TouchEvent) {
	// if (window.layoutEditor?.opened) return

	for (const touch of Array.from(e.changedTouches)) {
		let target = <IElementNode<any, any>>document.elementFromPoint(touch.clientX, touch.clientY)
		while (
			target !== null &&
			!(
				(target.instance instanceof Button && !target.instance.customAction) ||
				target.instance instanceof Joystick
			)
		) {
			target = <IElementNode<any, any>>(<unknown>target.parentElement)
		}

		if (target?.instance.lockable) {
			vibrate(options.vibrate)
			if (target.instance.active) target.instance.release()
			else target.instance.press()
			continue
		}

		const joystick = target?.instance instanceof Joystick
		Controller.currentTouches.push({ target, touch, joystick })
		if (!target) continue
		vibrate(options.vibrate)
		if (joystick) continue
		target.instance.press()
	}
}

/**
 * Movimento do toque
 */
function touchMove(e: TouchEvent) {
	// if (window.layoutEditor?.opened) return

	for (const touch of Array.from(e.changedTouches)) {
		const i = Controller.currentTouches.findIndex((t) => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue

		const oldtouch = Controller.currentTouches[i]
		if (oldtouch.joystick) continue
		if (!options.changeKeyOnDrag && oldtouch.target) continue
		oldtouch.touch = touch

		let target = <IElementNode<any, any>>document.elementFromPoint(touch.clientX, touch.clientY)
		// todo: colocar lockable aqui
		while (
			target !== null &&
			!(
				target.instance instanceof Button &&
				!target.instance.customAction &&
				!target.instance.lockable
			)
		) {
			target = <IElementNode<any, any>>(<unknown>target.parentElement)
		}

		if (oldtouch.target === target) continue
		oldtouch.target?.instance.release()

		if (!target || target.instance?.active) target = null
		oldtouch.target = target
		if (!target) continue
		target.instance.press()
		vibrate(options.vibrate)
	}
}

/**
 * Fim do toque
 */
function touchEnd(e: TouchEvent) {
	// if (window.layoutEditor?.opened) return

	for (const touch of Array.from(e.changedTouches)) {
		const i = Controller.currentTouches.findIndex((t) => {
			return t.touch.identifier === touch.identifier
		})
		if (i < 0) continue

		if (Controller.currentTouches[i].target?.instance instanceof Button) {
			Controller.currentTouches[i].target.instance.release()
		}
		Controller.currentTouches.splice(i, 1)
	}
}

export {}
