let editingElement = null
function elementClick(element) {
	if (editingElement) {
		editingElement.editing = false
		editingElement.render()
		removeAnchorLines(editingElement)
	}
	editingElement = element?.instance
	if (editingElement) {
		editingElement.editing = true
		editingElement.render()
		addAnchorLines(editingElement)
		updateAnchorLines(editingElement)
	}
	tree.render()
}



function touchStart(e) {
	touch = e.changedTouches[0]	
}

function touchMove(e) {
	if (toolbar.interacting) return
	if (tree.interacting) return

	const el = editingElement
	if (!el) return

	let deltaX = e.changedTouches[0].clientX - touch.clientX
	let deltaY = e.changedTouches[0].clientY - touch.clientY
	touch = e.changedTouches[0]
	if (el.anchorX === 1) deltaX = -deltaX
	if (el.anchorY === 1) deltaY = -deltaY

	let gridX = gridY = GRID_SIZE
	const parentWidth = el.parent?.width[0] || document.body.clientWidth

	if (toolbar.mode === 0) move()
	else if (toolbar.mode === 1) 
		if (el.size) resizeJoystick()
		else resize()
	el.render()
	updateAnchorLines()

	function percentageX() {
		gridX = gridX * 100 / parentWidth
		deltaX = deltaX * 100 / parentWidth
	}

	function percentageY() {
		gridY = gridY * 100 / parentWidth
		deltaY = deltaY * 100 / parentWidth
	}

	function move() {
		if (el.x[1] === '%') percentageX()
		if (el.y[1] === '%') percentageY()
		if (el.anchorX === 2) deltaX = 0
		if (el.anchorY === 2) deltaY = 0
		const x = el._imaginaryX || el.x[0]
		const y = el._imaginaryY || el.y[0]
		el.x[0] = Math.round((x + deltaX) / gridX) * gridX
		el.y[0] = Math.round((y + deltaY) / gridY) * gridY
		el._imaginaryX = x + deltaX
		el._imaginaryY = y + deltaY
	}

	function resize() {
		if (el.width[1] === '%') percentageX()
		if (el.height[1] === '%') percentageY()
		const width = el._imaginaryWidth || el.width[0]
		const height = el._imaginaryHeight || el.height[0]
		el.width[0] = Math.max(0, Math.round((width + deltaX) / gridX) * gridX)
		el.height[0] = Math.max(0, Math.round((height + deltaY) / gridY) * gridY)
		el._imaginaryWidth = Math.max(0, width + deltaX)
		el._imaginaryHeight = Math.max(0, height + deltaY)
	}

	function resizeJoystick() {
		if (el.size[1] === '%') {
			percentageX()
			percentageY()
		}
		const size = el._imaginarySize || el.size[0]
		const padding = el._imaginaryPadding || el.padding
		el.size[0] = Math.max(0, Math.round((size + deltaX) / gridX) * gridX)
		el.padding = Math.max(0, Math.round((padding + deltaY) / gridY) * gridY)
		el._imaginarySize = Math.max(0, size + deltaX)
		el._imaginaryPadding = Math.max(0, padding + deltaY)
	}
}

function touchEnd(e) {
	deltaxordeltay = -1
}