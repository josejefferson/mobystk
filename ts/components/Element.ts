import type GroupComponent from './Group'
import type { IElement, IElementComponent, ValueAndUnit } from '../types'
import EventEmitter from '../utils/event-emitter'

export enum AnchorX {
	LEFT = 0,
	RIGHT = 1,
	CENTER = 2
}

export enum AnchorY {
	TOP = 0,
	BOTTOM = 1,
	CENTER = 2
}

export default abstract class ElementComponent extends EventEmitter implements IElementComponent {
	type: string
	id: string
	name: string
	x: ValueAndUnit
	y: ValueAndUnit
	anchorX: AnchorX
	anchorY: AnchorY
	width: ValueAndUnit
	height: ValueAndUnit

	_imaginaryX?: number
	_imaginaryY?: number
	_imaginaryWidth?: number
	_imaginaryHeight?: number
	_imaginarySize?: number
	_imaginaryPadding?: number

	element?: HTMLElement
	editing?: boolean
	parent?: GroupComponent

	constructor(details: IElement) {
		super()

		this.type = 'mobystk:unknown'
		this.id = details.id || 'mobystk:unknown'
		this.name = details.name || '(Sem nome)'

		this.x = details.x || [0, 'px']
		this.y = details.y || [0, 'px']
		this.anchorX = details.anchorX || AnchorX.LEFT
		this.anchorY = details.anchorY || AnchorY.TOP
		this.width = details.width || [100, 'px']
		this.height = details.height || [100, 'px']
	}

	render() {
		const el = this.element
		if (!el) return

		// Reseta os estilos
		el.style.left = ''
		el.style.right = ''
		el.style.top = ''
		el.style.bottom = ''
		el.style.transform = ''

		// Aplica os estilos
		el.style.width = this.width.join('')
		el.style.height = this.height.join('')
		if (this.anchorX === AnchorX.LEFT) el.style.left = this.x.join('')
		if (this.anchorX === AnchorX.RIGHT) el.style.right = this.x.join('')
		if (this.anchorY === AnchorY.TOP) el.style.top = this.y.join('')
		if (this.anchorY === AnchorY.BOTTOM) el.style.bottom = this.y.join('')

		el.classList[this.anchorX === AnchorX.CENTER ? 'add' : 'remove']('center-x')
		el.classList[this.anchorY === AnchorY.CENTER ? 'add' : 'remove']('center-y')

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
