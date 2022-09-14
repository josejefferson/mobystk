import ButtonComponent from '../../components/Button'
import GroupComponent from '../../components/Group'
import JoystickComponent from '../../components/Joystick'
import Controller from '../../shared/Controller'
import type {
	IButton,
	IElementNode,
	IElements,
	IGroup,
	IJoystick,
	ILayout,
	ILayoutComponent
} from '../../types'
import { escapeHTML } from '../../utils/escapeHTML'
import { editingElement } from './interactions'

export class Tree {
	element: HTMLElement
	opened: boolean
	interacting: boolean

	constructor(element: HTMLElement) {
		this.element = element
		this.opened = false
		this.interacting = false

		element.addEventListener('touchstart', () => (this.interacting = true))
		element.addEventListener('touchend', () => (this.interacting = false))

		this.render()
	}

	render() {
		this.element.classList[this.opened ? 'add' : 'remove']('opened')
		this.element.innerHTML = ''
		this.element.appendChild(this._html(Controller.currentLayout))
	}

	_html(element: ILayout | IGroup | GroupComponent, root = true) {
		const $tree = document.createDocumentFragment()
		let $groupContent
		if (!root && element instanceof GroupComponent) {
			const $group = document.createElement('div')
			$group.classList.add('element', 'group')
			if (element === editingElement) $group.classList.add('active')
			const $name = <IElementNode<any, HTMLDivElement>>document.createElement('div')
			$name.classList.add('name')
			const escapedIcon = escapeHTML(this._getIcon(element))
			const escapedName = escapeHTML(element.name)
			$name.innerHTML += `<i class="mdi mdi-${escapedIcon}"></i> ${escapedName}`
			$name.instance = element
			$group.appendChild($name)
			$groupContent = document.createElement('div')
			$groupContent.classList.add('content')
			$group.appendChild($groupContent)
			$tree.appendChild($group)
		} else {
			$groupContent = $tree
		}

		for (let el of (element as ILayoutComponent).parsedContent || element.content) {
			el = el as IElements
			if ('content' in el && Array.isArray(el.content)) {
				el = el as IGroup
				$groupContent.appendChild(this._html(el, false))
			} else {
				const $element = document.createElement('div')
				const type =
					el instanceof ButtonComponent
						? 'button'
						: el instanceof JoystickComponent
						? 'joystick'
						: ''
				if (type) $element.classList.add('element', type)
				if (el === editingElement) $element.classList.add('active')
				const $name = <IElementNode<any, HTMLDivElement>>document.createElement('div')
				$name.classList.add('name')
				$name.innerHTML += `<i class="mdi mdi-${escapeHTML(this._getIcon(el))}"></i> ${escapeHTML(
					el.name
				)}`
				$name.instance = el
				$element.appendChild($name)
				$groupContent.appendChild($element)
			}
		}
		return $tree
	}

	_getIcon(element: IButton | IGroup | IJoystick) {
		switch (element.type) {
			case 'mobystk:button':
				return element.content.type === 'mobystk:icon'
					? element.content.value
					: 'checkbox-intermediate'
			case 'mobystk:group':
				return 'group'
			case 'mobystk:joystick':
				return 'gamepad'
		}
	}
}

export const tree = new Tree(document.querySelector('.layout-tree'))
