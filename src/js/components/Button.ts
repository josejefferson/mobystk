import type { IButton, IButtonComponent, IElementNode, ValueAndUnit } from '../types'
import Controller from '../shared/controller'
import ElementComponent from './Element'

export default class ButtonComponent extends ElementComponent implements IButtonComponent {
	type: 'mobystk:button'
	key?: string
	border: [boolean, boolean, boolean, boolean]
	fontSize?: ValueAndUnit
	content?: {
		type: 'mobystk:text' | 'mobystk:icon'
		value: string
	}
	radius: [ValueAndUnit, ValueAndUnit, ValueAndUnit, ValueAndUnit]
	lockable?: boolean
	scalable?: boolean
	customAction?: string | false
	diagonal?: boolean
	targets?: string[]
	active: boolean
	_html?: string
	_imaginaryX?: number
	_imaginaryY?: number
	_imaginaryWidth?: number
	_imaginaryHeight?: number
	_imaginarySize?: number
	_imaginaryPadding?: number

	constructor(details: IButton) {
		super(details)
		this.type = 'mobystk:button'

		this.content = details.content || { type: 'mobystk:text', value: '' }
		this.key = details.key || ''
		this.customAction = details.customAction || false
		this.lockable = details.lockable || false
		this.diagonal = details.diagonal || false
		if (this.diagonal) this.targets = details.targets || []

		this.scalable = details.scalable || false
		this.border = details.border || [true, true, true, true]
		this.radius = details.radius || [
			[0, 'px'],
			[0, 'px'],
			[0, 'px'],
			[0, 'px']
		]
		this.fontSize = details.fontSize || [20, 'px']

		this.active = false
		this.editing = false

		const $button = <IElementNode<ButtonComponent, HTMLButtonElement>>(
			document.createElement('button')
		)
		$button.classList.add('controller-button')
		$button.dataset.id = this.id
		$button.instance = this
		this.element = $button
	}

	press(diagonal = false) {
		if (this.diagonal) {
			const targets = Controller.elements.buttons.filter(
				(e) => this.targets.includes(e.id) && !e.lockable
			)
			for (const target of targets) target.press(true)
		} else {
			if (!this.active && !this.customAction) this.emit('press', this.key)
			if (this.scalable && !this.active && !diagonal) {
				this.element.classList.add('controller-button-scale')
			} else if (!this.active && diagonal) {
				this.element.classList.add('controller-button-active-diagonal')
				this.element.classList.add('controller-button-scale-diagonal')
			}
			this.active = true
			this.element.classList.add('controller-button-active')
		}
	}

	release() {
		if (this.diagonal) {
			const targets = Controller.elements.buttons.filter((e) => this.targets.includes(e.id))
			for (const target of targets) target.release()
		} else {
			if (this.active && !this.customAction) this.emit('release', this.key)
			this.active = false
			this.element.classList.remove('controller-button-active')
			this.element.classList.remove('controller-button-scale')
			this.element.classList.remove('controller-button-active-diagonal')
			this.element.classList.remove('controller-button-scale-diagonal')
		}
	}

	render() {
		super.render()
		const el = this.element

		// Aplica os estilos
		if (!this.border[0]) el.style.borderTop = '0'
		if (!this.border[1]) el.style.borderRight = '0'
		if (!this.border[2]) el.style.borderBottom = '0'
		if (!this.border[3]) el.style.borderLeft = '0'

		const radius = this.radius.map((e) => e.join('')).join(' ')
		el.style.borderRadius = radius
		el.style.fontSize = this.fontSize.join('')

		// Botões de diagonal e bloqueáveis e editando
		el.classList[this.diagonal ? 'add' : 'remove']('controller-button-diagonal')
		el.classList[this.lockable ? 'add' : 'remove']('controller-button-lockable')

		// Conteúdo do botão
		el.innerHTML = ''
		if (this.content.type === 'mobystk:text') {
			el.innerText = this.content.value
		} else if (this.content.type === 'mobystk:icon') {
			const $icon = document.createElement('i')
			$icon.classList.add('mdi', 'mdi-' + this.content.value)
			el.appendChild($icon)
		}
		if (this._html) {
			el.innerHTML = this._html
		}

		// Botão com ação personalizada
		el.classList[this.customAction ? 'add' : 'remove']('controller-custom-action')
		el.dataset.action = this.customAction || null
	}

	toObject(): IButton {
		return {
			...super.toObject(),
			type: this.type,
			key: this.key,
			border: this.border,
			fontSize: this.fontSize,
			content: this.content,
			radius: this.radius,
			lockable: this.lockable,
			scalable: this.scalable,
			customAction: this.customAction,
			diagonal: this.diagonal,
			targets: this.targets
		}
	}
}
