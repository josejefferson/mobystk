// window.onload = () => layoutEditor.start() //temp

export const GRID_SIZE = 10
import { IElementNode } from '../../types'
import { toast } from '../../utils/toast'
import { resizeJoystick } from '../joystick'
import options from '../../shared/options'
import {
	editingElement,
	elementClick,
	setEditingElement,
	touchEnd,
	touchMove,
	touchStart
} from './interactions'
import { toolbar } from './toolbar'
import { anchorLines } from './guides'
import debug from '../../utils/debug'

export class LayoutEditor {
	opened: boolean
	_optionDisJoyXAxis: boolean
	_optionDisJoyYAxis: boolean

	constructor() {
		this.opened = false
		this._optionDisJoyXAxis = options.disJoyXAxis
		this._optionDisJoyYAxis = options.disJoyYAxis
	}

	start() {
		this.opened = true
		options.disJoyXAxis = true
		options.disJoyYAxis = true
		document.body.classList.add('layout-editor-opened')
		document.body.style.setProperty('--grid-size', GRID_SIZE + 'px')
		resizeJoystick()

		document.addEventListener('click', click)
		document.addEventListener('touchstart', touchStart)
		document.addEventListener('touchmove', touchMove)
		document.addEventListener('touchend', touchEnd)
		document.addEventListener('mousedown', touchStart)
		document.addEventListener('mouseup', touchMove)
		document.addEventListener('mousemove', touchEnd)

		toast('Modo edição ativado')
		toast('Clique em algum elemento para editar')
	}

	end() {
		this.opened = false
		document.body.classList.remove('layout-editor-opened')
		options.disJoyXAxis = this._optionDisJoyXAxis
		options.disJoyYAxis = this._optionDisJoyYAxis
		resizeJoystick()

		if (editingElement) {
			editingElement.editing = false
			editingElement.render()
			anchorLines.remove(editingElement)
			setEditingElement(null)
		}

		document.removeEventListener('click', click)
		document.removeEventListener('touchstart', touchStart)
		document.removeEventListener('touchmove', touchMove)
		document.removeEventListener('touchend', touchEnd)
		document.removeEventListener('mousedown', mouseDown)
		document.removeEventListener('mouseup', mouseMove)
		document.removeEventListener('mousemove', mouseUp)

		toast('Modo edição desativado')
	}
}

export const layoutEditor = new LayoutEditor()
window.layoutEditor = layoutEditor

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
