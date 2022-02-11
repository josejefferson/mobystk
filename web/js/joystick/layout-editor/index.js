window.onload = () => layoutEditor.start() //temp


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
		if (e.path.includes(toolbar.element)) return
		let i = 0
		while (e.path[i] && (!e.path[i]?.instance || e.path[i]?.instance?.editing)) i++
		elementClick(e.path[i])
	})

	document.body.style.setProperty('--grid-size', GRID_SIZE + 'px')
	document.addEventListener('touchstart', touchStart)
	document.addEventListener('touchmove', touchMove)
	document.addEventListener('touchend', touchEnd)

	// let mouseDown = false
	// document.addEventListener('mousedown', (e) => {
	// 	console.log('mousedown')
	// 	mouseDown = true
	// 	touchStart(e)
	// })
	// document.addEventListener('mouseup', (e) => {
	// 	console.log('mouseup')
	// 	mouseDown = false
	// 	touchEnd(e)
	// })
	// document.addEventListener('mousemove', (e) => {
	// 	if (mouseDown) touchMove(e)
	// })

	toast('Modo edição ativado')
	toast('Clique em algum elemento para editar')
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

	toast('Modo edição desativado')
}