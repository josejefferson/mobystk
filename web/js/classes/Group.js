Controller.Group = class {
	constructor(details) {
		this.type = 'mobystk:group'
		this.id = details.id || 'mobystk:unknown'
		this.name = details.name || '(Sem nome)'

		this.x = details.x || [0, 'px']
		this.y = details.y || [0, 'px']
		this.anchorX = details.anchorX || 0
		this.anchorY = details.anchorY || 0
		this.width = details.width || [100, 'px']
		this.height = details.height || [100, 'px']

		this.content = details.content || []

		const $group = document.createElement('div')
		$group.classList.add('controller-group')
		$group.instance = this
		this.element = $group

		for (const element of this.content) {
			$group.appendChild(element.element)
		}

		this.render()
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
		if (this.anchorX === 0) el.style.left = this.x.join('')
		if (this.anchorX === 1) el.style.right = this.x.join('')
		if (this.anchorX === 2) el.style.left = '50%'
		if (this.anchorY === 0) el.style.top = this.y.join('')
		if (this.anchorY === 1) el.style.bottom = this.y.join('')
		if (this.anchorY === 2) el.style.top = '50%'

		// Se o grupo estiver centralizado
		if (this.anchorX === 2 && this.anchorY === 2) {
			el.style.transform = 'translate(-50%, -50%)'
		} else if (this.anchorX === 2 && this.anchorY !== 2) {
			el.style.transform = 'translateX(-50%)'
		} else if (this.anchorX !== 2 && this.anchorY === 2) {
			el.style.transform = 'translateY(-50%)'
		}

	}
}