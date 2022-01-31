Controller.Group = class {
	constructor(details) {
		details = this.validate(details)
		
		this.x = details.x || [0, 'px']
		this.y = details.y || [0, 'px']
		this.anchorX = details.anchorX || 0
		this.anchorY = details.anchorY || 0
		this.width = details.width || [100, 'px']
		this.height = details.height || [100, 'px']
		// this.border = details.border || [true, true, true, true]
		// this.radius = details.radius || [[0, 'px'], [0, 'px'], [0, 'px'], [0, 'px']]
		this.content = details.content || []
		
		const $group = document.createElement('div')
		$group.classList.add('controller-group')
		$group.classList.add('touch')
		/* ## TEMP ## */ $group.style.display = 'block'
		/* ## TEMP ## */ $group.style.position = 'absolute'
		$group.instance = this
		this.element = $group
		for (const element of this.content) {
			$group.appendChild(element.element)
		}

		this.render()
	}

	validate(details) {
		return details
	}

	render() {
		this.element.style.left = null
		this.element.style.right = null
		this.element.style.top = null
		this.element.style.bottom = null
		this.element.style.transform = null

		if (this.anchorX === 0) this.element.style.left = this.x[0] + this.x[1]
		if (this.anchorX === 1) this.element.style.right = this.x[0] + this.x[1]
		if (this.anchorX === 2) this.element.style.left = '50%'
		if (this.anchorY === 0) this.element.style.top = this.y[0] + this.y[1]
		if (this.anchorY === 1) this.element.style.bottom = this.y[0] + this.y[1]
		if (this.anchorY === 2) this.element.style.top = '50%'

		if (this.anchorX === 2 && this.anchorY === 2) {
			this.element.style.transform = 'translate(-50%, -50%)'
		} else if (this.anchorX === 2 && this.anchorY !== 2) {
			this.element.style.transform = 'translateX(-50%)'
		} else if (this.anchorX !== 2 && this.anchorY === 2) {
			this.element.style.transform = 'translateY(-50%)'
		}

		this.element.style.width = this.width[0] + this.width[1]
		this.element.style.height = this.height[0] + this.height[1]

		// if (!this.border[0]) this.element.style.borderTop = '0'
		// if (!this.border[1]) this.element.style.borderRight = '0'
		// if (!this.border[2]) this.element.style.borderBottom = '0'
		// if (!this.border[3]) this.element.style.borderLeft = '0'
		
		// const radius = this.radius.map(e => e.join('')).join(' ')
		// this.element.style.borderRadius = radius	

		// if (this.content.type === 'mobystk:text')	this.element.innerText = this.content.value
		// if (this.content.type === 'mobystk:icon')	{
		// 	const $icon = document.createElement('i')
		// 	$icon.classList.add('mdi', 'mdi-' + this.content.value)
		// 	this.element.appendChild($icon)
		// }
		
		// /* ## TEMP ## */ this.element.dataset.key = this.key
	}
}