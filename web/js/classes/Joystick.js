Controller.Joystick = class extends EventEmitter {
	constructor(details) {
		super()
		details = this.validate(details)
		
		this.x = details.x || [0, 'px']
		this.y = details.y || [0, 'px']
		this.anchorX = details.anchorX || 0
		this.anchorY = details.anchorY || 0
		this.width = details.width || [50, 'px']
		this.height = details.height || [25, 'px']
		this.keys = details.keys || ['joyLUp', 'joyLLeft', 'joyLDown', 'joyLRight']
		
		const $joystick = document.createElement('div')
		$joystick.classList.add('controller-joystick')
		$joystick.classList.add('touch')
		$joystick.classList.add('joystick')
		/* ## TEMP ## */ $joystick.classList.add('group')
		/* ## TEMP ## */ $joystick.style.display = 'block'
		/* ## TEMP ## */ $joystick.style.position = 'absolute'
		$joystick.instance = this
		this.element = $joystick

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

		/* ## TEMP ## */ this.element.dataset.keys = this.keys.join(' ')

		// NippleJS
		if (this.nipple) this.nipple.destroy()
		this.nipple = nipplejs.create({
			zone: this.element,
			size: 90,
			mode: 'static',
			position: {
				left: '50%',
				top: '50%'
			},
			lockX: options.disJoyYAxis,
			lockY: options.disJoyXAxis
		})

		this.nipple.on('move', (e, d) => this.emit('move', e, d))
		this.nipple.on('end', (e, d) => this.emit('end', e, d))
	}
}