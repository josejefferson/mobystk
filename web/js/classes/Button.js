Controller.Button = class extends Controller.Element {
	constructor(details) {
		super(details)
		this.type = 'mobystk:button'

		this.content = details.content || { 'type': 'mobystk:text', 'value': '' }
		this.key = details.key || ''
		this.customAction = details.customAction || false
		this.lockable = details.lockable || false
		this.diagonal = details.diagonal || false
		if (this.diagonal) this.targets = details.targets || []

		this.scalable = details.scalable || false
		this.border = details.border || [true, true, true, true]
		this.radius = details.radius || [[0, 'px'], [0, 'px'], [0, 'px'], [0, 'px']]
		this.fontSize = details.fontSize || [20, 'px']

		this.active = false
		this.editing = false
		this._transform = ''

		const $button = document.createElement('button')
		$button.classList.add('controller-button')
		$button.dataset.id = this.id
		$button.instance = this
		this.element = $button

		this.render()
	}

	press(diagonal = false) {
		if (this.diagonal) {
			const targets = Controller.elements.buttons.filter((e) => this.targets.includes(e.id) && !e.lockable)
			for (const target of targets) target.press(true)
		} else {
			if (!this.active && !this.customAction) this.emit('press', this.key)
			if (this.scalable && !this.active && !diagonal) {
				this.element.style.transform = this._transform + ' scale(1.2)'
			} else if (!this.active && diagonal) {
				this.element.style.transform = this._transform + ' scale(0.8)'
			}
			this.active = true
			this.element.classList.add('controller-button-active')
		}
	}

	release() {
		if (this.diagonal) {
			const targets = Controller.elements.buttons.filter((e) => this.targets.includes(e.id))
			for (const target of targets) target.release(true)
		} else {
			if (this.active && !this.customAction) this.emit('release', this.key)
			if (this.scalable && this.active) {
				this.element.style.transform = this._transform
			}
			this.active = false
			this.element.classList.remove('controller-button-active')
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
		
		const radius = this.radius.map(e => e.join('')).join(' ')
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
}