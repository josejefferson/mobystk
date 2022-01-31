const layoutEditor = {}
window.layoutEditor = layoutEditor

layoutEditor.opened = false
layoutEditor.load = () => {
	document.body.classList.remove('loading-layout-editor')
	layoutEditor.start()
}

const GRID_SIZE = 5
layoutEditor.start = () => {
	layoutEditor.opened = true
	options.disJoyXAxis = true
	options.disJoyYAxis = true
	resizeJoystick()
	document.body.classList.add('layout-editor-opened')
	document.querySelectorAll('button.touch, .joystick, .group, .deviceInfo').forEach((button) => {
		button.addEventListener('click', elementClick)
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
	document.querySelectorAll('button.touch, .joystick, .group, .deviceInfo').forEach((button) => {
		button.removeEventListener('click', elementClick)
	})
	document.removeEventListener('touchstart', touchStart)
	document.removeEventListener('touchmove', touchMove)
	document.removeEventListener('touchend', touchEnd)
}

const $editMenu = document.querySelector('.edit-menu')
const $editMenuDrag = $editMenu.querySelector('.edit-menu .edit-menu-drag')
let editMenuDragging = false
$editMenuDrag.addEventListener('touchstart', (e) => {
	editMenuDragging = true
})

let activeMode = -1
const $modes = document.querySelectorAll('.edit-mode')
$modes.forEach(($mode) => {
	$mode.addEventListener('click', function (e) {
		const mode = parseInt(this.dataset.mode)
		if (isNaN(mode)) return
		if (activeMode === mode) {
			this.classList.remove('mode-active')
			activeMode = -1
			return
		}
		activeMode = mode
		$modes.forEach(($mode) => $mode.classList.remove('mode-active'))
		this.classList.add('mode-active')
	})
})


$editMenuDrag.addEventListener('touchmove', (e) => {
	let x = e.changedTouches[0].clientX - 12
	let y = e.changedTouches[0].clientY - 17
	if (x < 0) x = 0
	if (y < 0) y = 0
	if (x + $editMenu.offsetWidth > window.innerWidth) x = window.innerWidth - $editMenu.offsetWidth
	if (y + $editMenu.offsetHeight > window.innerHeight) y = window.innerHeight - $editMenu.offsetHeight
	$editMenu.style.left = x + 'px'
	$editMenu.style.top = y + 'px'
})

$editMenuDrag.addEventListener('touchend', (e) => {
	editMenuDragging = false
})

function elementClick(e) {
	if (this.classList.contains('editing')) {
		$editMenu.classList.remove('editing-element')
		this.classList.remove('editing')
		return
	}
	document.querySelectorAll('button, .joystick, .group, .deviceInfo').forEach(b => b.classList.remove('editing'))
	this.classList.add('editing')
	$editMenu.classList.add('editing-element')
	if (activeMode === -1) activeMode = 0
}
function touchStart(e) {
	touch = e.changedTouches[0]
}
let deltaxordeltay = -1 // 0 = x; 1 = y
function touchMove(e) {
	const el = document.querySelector('.editing')
	if (!el) return
	const deltaX = e.changedTouches[0].clientX - touch.clientX
	const deltaY = e.changedTouches[0].clientY - touch.clientY

	if (deltaxordeltay === -1) deltaxordeltay = Math.abs(deltaX) > Math.abs(deltaY) ? 0 : 1

	if (activeMode === 0) {
		const x = (parseFloat(el.getAttribute('data-x')) || convert(getComputedStyle(el).left).value)
		const y = (parseFloat(el.getAttribute('data-y')) || convert(getComputedStyle(el).top).value)
		const gridX = Math.round(x / GRID_SIZE) * GRID_SIZE
		const gridY = Math.round(y / GRID_SIZE) * GRID_SIZE
		if (deltaxordeltay === 0) el.setAttribute('data-x', x + deltaX)
		if (deltaxordeltay === 1) el.setAttribute('data-y', y + deltaY)
		el.style.position = 'absolute'
		if (deltaxordeltay === 0) el.style.left = gridX + 'px'
		if (deltaxordeltay === 1) el.style.top = gridY + 'px'

	} else if (activeMode === 1) {
		const currentWidth = convert(getComputedStyle(el).width).value
		const currentHeight = convert(getComputedStyle(el).height).value
		const width = currentWidth + deltaX
		const height = currentHeight + deltaY
		console.log(currentWidth, width, currentHeight, height)
		el.style.width = width + 'px'
		el.style.height = height + 'px'
	}
	touch = e.changedTouches[0]
}
function touchEnd(e) {
	deltaxordeltay = -1
}



// temp
function convert(str) {
	var n = parseFloat(str);
	var u = str.trim().substring(n.toString().length)
	return {
		value: n,
		unit: u
	}
}