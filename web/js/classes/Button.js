Controller.Button = class {
	constructor(details) {
		details = this.validate(details)
		
		this.x = details.x || [0, 'px']
		this.y = details.y || [0, 'px']
		this.anchorX = details.anchorX || 0
		this.anchorY = details.anchorY || 0
		this.width = details.width || [50, 'px']
		this.height = details.height || [25, 'px']
		this.content = details.content || { "type": "mobystk:text", "value": "" }
		this.key = details.key || ''
		this.border = details.border || [true, true, true, true]
		this.radius = details.radius || [[0, 'px'], [0, 'px'], [0, 'px'], [0, 'px']]
		this.fontSize = details.fontSize || [20, 'px']
		this.diagonal = details.diagonal || false
		this.lockable = details.lockable || false
		this.active = false
		
		const $button = document.createElement('button')
		$button.classList.add('controller-button')
		$button.classList.add('touch')
		/* ## TEMP ## */ $button.style.display = 'flex'
		/* ## TEMP ## */ $button.style.position = 'absolute'
		/* ## TEMP ## */ $button.style.fontSize = '20px'
		$button.instance = this
		this.element = $button

		this.render()
	}

	validate(details) {
		return details
	}

	press() {
		//if (!this.active) // event emit
		this.active = true
		this.render()
	}
	
	release() {
		//if (this.active) // event emit
		this.active = false
		this.render()
	}

	render() {
		this.element.style.left = null
		this.element.style.right = null
		this.element.style.top = null
		this.element.style.bottom = null
		this.element.style.transform = null

		if (this.anchorX === 0) this.element.style.left = this.x.join('')
		if (this.anchorX === 1) this.element.style.right = this.x.join('')
		if (this.anchorX === 2) this.element.style.left = '50%'
		if (this.anchorY === 0) this.element.style.top = this.y.join('')
		if (this.anchorY === 1) this.element.style.bottom = this.y.join('')
		if (this.anchorY === 2) this.element.style.top = '50%'

		if (this.anchorX === 2 && this.anchorY === 2) {
			this.element.style.transform = 'translate(-50%, -50%)'
		} else if (this.anchorX === 2 && this.anchorY !== 2) {
			this.element.style.transform = 'translateX(-50%)'
		} else if (this.anchorX !== 2 && this.anchorY === 2) {
			this.element.style.transform = 'translateY(-50%)'
		}

		this.element.style.width = this.width.join('')
		this.element.style.height = this.height.join('')
		
		if (this.diagonal) this.element.classList.add('diag')
		else this.element.classList.remove('diag')
		if (this.lockable) this.element.classList.add('lock')
		else this.element.classList.remove('lock')

		if (!this.border[0]) this.element.style.borderTop = '0'
		if (!this.border[1]) this.element.style.borderRight = '0'
		if (!this.border[2]) this.element.style.borderBottom = '0'
		if (!this.border[3]) this.element.style.borderLeft = '0'
		
		const radius = this.radius.map(e => e.join('')).join(' ')
		this.element.style.borderRadius = radius	
		this.element.style.fontSize = this.fontSize.join('')	

		if (this.content.type === 'mobystk:text')	this.element.innerText = this.content.value
		if (this.content.type === 'mobystk:icon')	{
			const $icon = document.createElement('i')
			$icon.classList.add('mdi', 'mdi-' + this.content.value)
			this.element.appendChild($icon)
		}
		
		/* ## TEMP ## */ this.element.dataset.key = this.key
	}
}