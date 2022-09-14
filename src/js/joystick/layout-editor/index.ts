// window.onload = () => layoutEditor.start() //temp

import { IElementNode } from '../../types'
import { toast } from '../../utils/toast'
import { resizeJoystick } from '../joystick'
import options from '../../shared/options'
import { elementClick, touchEnd, touchMove, touchStart } from './interactions'
import { toolbar } from './toolbar'

interface ILayoutEditor {
	opened?: boolean
	start?: () => void
	end?: () => void
}

export const layoutEditor: ILayoutEditor = {}
window.layoutEditor = layoutEditor

layoutEditor.opened = false

export const GRID_SIZE = 10
layoutEditor.start = () => {
	layoutEditor.opened = true
	options.disJoyXAxis = true
	options.disJoyYAxis = true
	resizeJoystick()
	document.body.classList.add('layout-editor-opened')
	document.addEventListener('click', click)

	document.body.style.setProperty('--grid-size', GRID_SIZE + 'px')
	document.addEventListener('touchstart', touchStart)
	document.addEventListener('touchmove', touchMove)
	document.addEventListener('touchend', touchEnd)

	document.addEventListener('mousedown', touchStart)
	document.addEventListener('mouseup', touchMove)
	document.addEventListener('mousemove', touchEnd)

	toast('Modo edição ativado')
	toast('Clique em algum elemento para editar')
}

function click(e: MouseEvent) {
	if (e.path.includes(toolbar.element)) return

	let i = 0
	while (
		e.path[i] &&
		(!('instance' in e.path[i]) || (e.path[i] as IElementNode<any, any>)?.instance?.editing)
	) {
		i++
	}

	elementClick(e.path[i] as IElementNode<any, HTMLElement>)
}

let mousePressed = false
function mouseDown(e: MouseEvent) {
	mousePressed = true
	touchStart(e)
}

function mouseUp(e: MouseEvent) {
	mousePressed = false
	touchEnd(e)
}

function mouseMove(e: MouseEvent) {
	if (mousePressed) touchMove(e)
}

layoutEditor.end = () => {
	layoutEditor.opened = false
	document.body.classList.remove('layout-editor-opened')
	options.disJoyXAxis = false // default
	options.disJoyYAxis = false // default
	resizeJoystick()
	document.removeEventListener('click', click)
	document.removeEventListener('touchstart', touchStart)
	document.removeEventListener('touchmove', touchMove)
	document.removeEventListener('touchend', touchEnd)
	document.removeEventListener('mousedown', mouseDown)
	document.removeEventListener('mouseup', mouseMove)
	document.removeEventListener('mousemove', mouseUp)

	toast('Modo edição desativado')
}
