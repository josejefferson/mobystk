class Tree {
	constructor(element) {
		this.element = element
		this.opened = false
		this.interacting = false

		element.addEventListener('touchstart', () => this.interacting = true)
		element.addEventListener('touchend', () => this.interacting = false)

		this.render()
	}

	render() {
		this.element.classList[this.opened ? 'add' : 'remove']('opened')
		this.element.innerHTML = ''
		this.element.appendChild(this._html(Controller.currentLayout))
	}

	_html(element, root = true) {
		const $tree = document.createDocumentFragment()
		let $groupContent
		if (!root && element instanceof Controller.Group) {
			const $group = document.createElement('div')
			$group.classList.add('element', 'group')
			if (element === editingElement) $group.classList.add('active')
			const $name = document.createElement('div')
			$name.classList.add('name')
			$name.innerHTML += `<i class="mdi mdi-${this._getIcon(element)}"></i> ${element.name}`
			$name.instance = element
			$group.appendChild($name)
			$groupContent = document.createElement('div')
			$groupContent.classList.add('content')
			$group.appendChild($groupContent)
			$tree.appendChild($group)
		} else {
			$groupContent = $tree
		}

		for (const el of element.content) {
			if (Array.isArray(el.content)) {
				$groupContent.appendChild(this._html(el, false))
			} else {
				const $element = document.createElement('div')
				const type = el instanceof Controller.Button ? 'button' : el instanceof Controller.Joystick ? 'joystick' : ''
				$element.classList.add('element', type)
				if (el === editingElement) $element.classList.add('active')
				const $name = document.createElement('div')
				$name.classList.add('name')
				$name.innerHTML += `<i class="mdi mdi-${this._getIcon(el)}"></i> ${el.name}`
				$name.instance = el
				$element.appendChild($name)
				$groupContent.appendChild($element)
			}
		}
		return $tree
	}

	_getIcon(element) {
		switch (element.type) {
			case 'mobystk:button': return element.content.type === 'mobystk:icon' ? element.content.value : 'checkbox-intermediate'
			case 'mobystk:group': return 'group'
			case 'mobystk:joystick': return 'gamepad'
		}
	}
}

const tree = new Tree(document.querySelector('.layout-tree'))