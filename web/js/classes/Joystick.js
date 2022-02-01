Controller.Joystick = class extends EventEmitter {
	constructor(details) {
		super()

		this.type = 'mobystk:joystick'
		this.id = details.id || 'mobystk:unknown'
		this.name = details.name || '(Sem nome)'

		this.x = details.x || [0, 'px']
		this.y = details.y || [0, 'px']
		this.anchorX = details.anchorX || 0
		this.anchorY = details.anchorY || 0
		this.size = details.size || [90, 'px']
		this.padding = details.padding || 60

		this.keys = details.keys || ['joyLUp', 'joyLLeft', 'joyLDown', 'joyLRight']
		this.position = { up: false, down: false, left: false, right: false }

		const $joystick = document.createElement('div')
		$joystick.classList.add('controller-joystick')
		$joystick.instance = this
		this.element = $joystick

		this.render()
	}

	render() {
		const el = this.element

		// Reseta a posição
		this.position = { up: false, down: false, left: false, right: false }

		// Reseta os estilos
		el.style.left = null
		el.style.right = null
		el.style.top = null
		el.style.bottom = null
		el.style.transform = null

		// Aplica os estilos
		el.style.width = this.size[0] + this.padding + this.size[1]
		el.style.height = this.size[0] + this.padding + this.size[1]
		if (this.anchorX === 0) el.style.left = this.x.join('')
		if (this.anchorX === 1) el.style.right = this.x.join('')
		if (this.anchorX === 2) el.style.left = '50%'
		if (this.anchorY === 0) el.style.top = this.y.join('')
		if (this.anchorY === 1) el.style.bottom = this.y.join('')
		if (this.anchorY === 2) el.style.top = '50%'

		// Se o joystick estiver centralizado
		if (this.anchorX === 2 && this.anchorY === 2) {
			el.style.transform = 'translate(-50%, -50%)'
		} else if (this.anchorX === 2 && this.anchorY !== 2) {
			el.style.transform = 'translateX(-50%)'
		} else if (this.anchorX !== 2 && this.anchorY === 2) {
			el.style.transform = 'translateY(-50%)'
		}

		// NippleJS
		if (this.nipple) this.nipple.destroy()
		this.nipple = nipplejs.create({
			zone: el,
			size: this.size[0],
			mode: 'static',
			position: {
				left: '50%',
				top: '50%'
			},
			lockX: options.disJoyYAxis,
			lockY: options.disJoyXAxis
		})

		// Eventos
		this.nipple.on('move', (e, d) => this.emit('move', this, e, d))
		this.nipple.on('end', (e, d) => this.emit('end', this, e, d))
	}
}