const layoutEditor = {}
window.layoutEditor = layoutEditor

layoutEditor.opened = false

const GRID_SIZE = 10
layoutEditor.start = () => {
	layoutEditor.opened = true
	options.disJoyXAxis = true
	options.disJoyYAxis = true
	resizeJoystick()
	document.body.classList.add('layout-editor-opened')
	document.addEventListener('click', (e) => {
		// verificar se o clique não foi na barra de edição
		let i = 0
		while (e.path[i] && (!e.path[i]?.instance || e.path[i]?.instance?.editing)) i++
		elementClick(e.path[i])
	})

	document.body.style.setProperty('--grid-size', GRID_SIZE + 'px')
	let touch
	document.addEventListener('touchstart', touchStart)
	document.addEventListener('touchmove', touchMove)
	document.addEventListener('touchend', touchEnd)
}

layoutEditor.end = () => {
	// remove listeners
	layoutEditor.opened = false
	document.body.classList.remove('layout-editor-opened')
	options.disJoyXAxis = false // default
	options.disJoyYAxis = false // default
	resizeJoystick()
	document.removeEventListener('touchstart', touchStart)
	document.removeEventListener('touchmove', touchMove)
	document.removeEventListener('touchend', touchEnd)
}