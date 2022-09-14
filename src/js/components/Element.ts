import type GroupComponent from './Group'
import type { IElement, IElementComponent, ValueAndUnit } from '../types'
import EventEmitter from '../utils/EventEmitter'

export default abstract class ElementComponent extends EventEmitter implements IElementComponent {
	type: string
	id: string
	name: string
	x: ValueAndUnit
	y: ValueAndUnit
	anchorX: number
	anchorY: number
	width?: ValueAndUnit
	height?: ValueAndUnit

	_imaginaryX?: number
	_imaginaryY?: number
	_imaginaryWidth?: number
	_imaginaryHeight?: number
	_imaginarySize?: number
	_imaginaryPadding?: number

	element: HTMLElement
	editing: boolean
	parent?: GroupComponent

	constructor(details: IElement) {
		super()

		this.type = 'mobystk:unknown'
		this.id = details.id || 'mobystk:unknown'
		this.name = details.name || '(Sem nome)'

		this.x = details.x || [0, 'px']
		this.y = details.y || [0, 'px']
		this.anchorX = details.anchorX || 0
		this.anchorY = details.anchorY || 0
		this.width = details.width || [100, 'px']
		this.height = details.height || [100, 'px']
	}

	render() {
		const el = this.element

		// Reseta os estilos
		el.style.left = null
		el.style.right = null
		el.style.top = null
		el.style.bottom = null
		el.style.transform = null

		// Aplica os estilos
		el.style.width = this.width.join('')
		el.style.height = this.height.join('')
		if (this.anchorX === 0) el.style.left = this.x.join('')
		if (this.anchorX === 1) el.style.right = this.x.join('')
		if (this.anchorY === 0) el.style.top = this.y.join('')
		if (this.anchorY === 1) el.style.bottom = this.y.join('')

		el.classList[this.anchorX === 2 ? 'add' : 'remove']('center-x')
		el.classList[this.anchorY === 2 ? 'add' : 'remove']('center-y')

		// Editando elemento
		el.classList[this.editing ? 'add' : 'remove']('controller-editing')
	}

	toObject(): IElement {
		return {
			type: this.type,
			id: this.id,
			name: this.name,
			x: this.x,
			y: this.y,
			anchorX: this.anchorX,
			anchorY: this.anchorY,
			width: this.width,
			height: this.height
		}
	}
}
