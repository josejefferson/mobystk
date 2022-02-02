Controller.Button = class extends EventEmitter {
	constructor(details) {
		super()

		this.type = 'mobystk:button'
		this.id = details.id || 'mobystk:unknown'
		this.name = details.name || '(Sem nome)'

		this.x = details.x || [0, 'px']
		this.y = details.y || [0, 'px']
		this.anchorX = details.anchorX || 0
		this.anchorY = details.anchorY || 0
		this.width = details.width || [50, 'px']
		this.height = details.height || [25, 'px']

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
		if (!this.border[0]) el.style.borderTop = '0'
		if (!this.border[1]) el.style.borderRight = '0'
		if (!this.border[2]) el.style.borderBottom = '0'
		if (!this.border[3]) el.style.borderLeft = '0'
		if (this.anchorX === 0) el.style.left = this.x.join('')
		if (this.anchorX === 1) el.style.right = this.x.join('')
		if (this.anchorX === 2) el.style.left = '50%'
		if (this.anchorY === 0) el.style.top = this.y.join('')
		if (this.anchorY === 1) el.style.bottom = this.y.join('')
		if (this.anchorY === 2) el.style.top = '50%'
		const radius = this.radius.map(e => e.join('')).join(' ')
		el.style.borderRadius = radius
		el.style.fontSize = this.fontSize.join('')

		// Se o botão estiver centralizado
		if (this.anchorX === 2 && this.anchorY === 2) {
			el.style.transform = this._transform = 'translate(-50%, -50%)'
		} else if (this.anchorX === 2 && this.anchorY !== 2) {
			el.style.transform = this._transform = 'translateX(-50%)'
		} else if (this.anchorX !== 2 && this.anchorY === 2) {
			el.style.transform = this._transform = 'translateY(-50%)'
		}

		// Botões de diagonal e bloqueáveis
		el.classList[this.diagonal ? 'add' : 'remove']('controller-button-diagonal')
		el.classList[this.lockable ? 'add' : 'remove']('controller-button-lockable')

		// Conteúdo do botão
		el.innerHTML = ''
		if (this.content.type === 'mobystk:text') el.innerText = this.content.value
		else if (this.content.type === 'mobystk:icon') {
			const $icon = document.createElement('i')
			$icon.classList.add('mdi', 'mdi-' + this.content.value)
			el.appendChild($icon)
		}

		// Botão com ação personalizada
		el.classList[this.customAction ? 'add' : 'remove']('controller-custom-action')
		el.dataset.action = this.customAction || null
	}
}