import { GRID_SIZE } from '.'
import { AnyComponent } from '../../components'
import ButtonComponent from '../../components/Button'
import { AnchorX, AnchorY } from '../../components/Element'
import GroupComponent from '../../components/Group'
import JoystickComponent from '../../components/Joystick'
import { IElementNode } from '../../types'
import { toast, toastObj } from '../../utils/toast'
import { anchorLines } from './guides'
import { toolbar } from './toolbar'
import { tree } from './tree'

// export class EditingElement {
// 	editingElement?: AnyComponent
// 	constructor(element: IElementNode<any, HTMLElement>) {
// 		this.editingElement = element?.instance
// 	}
// }

export let editingElement: AnyComponent | null = null
export function setEditingElement(element: AnyComponent | null) {
	editingElement = element
}
export function elementClick(element: IElementNode<any, HTMLElement>) {
	if (editingElement) {
		editingElement.editing = false
		editingElement.render()
		anchorLines.remove(editingElement)
	}
	editingElement = element?.instance
	if (editingElement) {
		editingElement.editing = true
		editingElement.render()
		anchorLines.add(editingElement)
		anchorLines.update()
	}
	tree.render()
	toolbar.render()
}

export let touch: Touch | MouseEvent
export function touchStart(e: TouchEvent | MouseEvent) {
	touch = 'changedTouches' in e ? e.changedTouches[0] : e
}

export function touchMove(e: TouchEvent | MouseEvent) {
	if (toolbar.interacting) return
	if (tree.interacting) return

	const el = editingElement!
	if (!el) return

	const { clientX, clientY } = 'changedTouches' in e ? e.changedTouches[0] : e
	let deltaX = clientX - (touch?.clientX || clientX)
	let deltaY = clientY - (touch?.clientY || clientY)

	if (
		(el.anchorX === AnchorX.CENTER && (deltaX < -20 || deltaX > 20) && !toastObj.showing) ||
		(el.anchorY === AnchorY.CENTER && (deltaY < -20 || deltaY > 20) && !toastObj.showing)
	) {
		toast(
			'Não é possível mover o elemento centralizado\nMude a posição do elemento para movimentá-lo'
		)
	}

	touch = 'changedTouches' in e ? e.changedTouches[0] : e
	if (el.anchorX === AnchorX.RIGHT) deltaX = -deltaX
	if (el.anchorY === AnchorY.BOTTOM) deltaY = -deltaY

	let gridX = GRID_SIZE
	let gridY = GRID_SIZE
	const parentWidth = el.parent?.width[0] || document.body.clientWidth

	if (toolbar.mode === 0) move()
	else if (toolbar.mode === 1)
		if (el instanceof JoystickComponent) resizeJoystick()
		else resize()
	el.render()
	anchorLines.update()

	function percentageX() {
		gridX = (gridX * 100) / parentWidth
		deltaX = (deltaX * 100) / parentWidth
	}

	function percentageY() {
		gridY = (gridY * 100) / parentWidth
		deltaY = (deltaY * 100) / parentWidth
	}

	function move() {
		if (el.x[1] === '%') percentageX()
		if (el.y[1] === '%') percentageY()
		if (el.anchorX === AnchorX.CENTER) deltaX = 0
		if (el.anchorY === AnchorY.CENTER) deltaY = 0
		const x = el._imaginaryX || el.x[0]
		const y = el._imaginaryY || el.y[0]
		el.x[0] = Math.round((x + deltaX) / gridX) * gridX
		el.y[0] = Math.round((y + deltaY) / gridY) * gridY
		el._imaginaryX = x + deltaX
		el._imaginaryY = y + deltaY
	}

	function resize() {
		if (el.width[1] === '%') percentageX()
		if (el.height[1] === '%') percentageY()
		const width = el._imaginaryWidth || el.width[0]
		const height = el._imaginaryHeight || el.height[0]
		el.width[0] = Math.max(0, Math.round((width + deltaX) / gridX) * gridX)
		el.height[0] = Math.max(0, Math.round((height + deltaY) / gridY) * gridY)
		el._imaginaryWidth = Math.max(0, width + deltaX)
		el._imaginaryHeight = Math.max(0, height + deltaY)
	}

	function resizeJoystick() {
		const joystick = el as JoystickComponent
		if (joystick.size[1] === '%') {
			percentageX()
			percentageY()
		}
		const size = joystick._imaginarySize || joystick.size[0]
		const padding = joystick._imaginaryPadding || joystick.padding
		joystick.size[0] = Math.max(0, Math.round((size + deltaX) / gridX) * gridX)
		joystick.padding = Math.max(0, Math.round((padding + deltaY) / gridY) * gridY)
		joystick._imaginarySize = Math.max(0, size + deltaX)
		joystick._imaginaryPadding = Math.max(0, padding + deltaY)
	}
}

export function touchEnd(e: TouchEvent | MouseEvent) {}
