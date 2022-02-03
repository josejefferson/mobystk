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
	document.querySelectorAll('.controller-button,.controller-joystick').forEach((el) => {
		el.addEventListener('click', elementClick)
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
	document.querySelectorAll('.controller-button,.controller-group,.controller-joystick').forEach((button) => {
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
	//navigator.vibrate(100)
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

const $hAnchor = document.querySelector('.horizontal-anchor')
const $vAnchor = document.querySelector('.vertical-anchor')
let editingElement = null
function elementClick(e) {
	if (editingElement) {
		editingElement.editing = false
		editingElement.render()
	}
	editingElement = this.instance
	if (editingElement) {
		editingElement.editing = true
		editingElement.render()
		updateAnchorLines()
	}
	if (activeMode === -1) activeMode = 0
}

function updateAnchorLines() {
	$hAnchor.style.left = null
	$hAnchor.style.right = null
	$hAnchor.style.top = null
	$hAnchor.style.bottom = null
	$vAnchor.style.left = null
	$vAnchor.style.right = null
	$vAnchor.style.top = null
	$vAnchor.style.bottom = null
	if (!editingElement) return
	if (editingElement.anchorX === 0) {
		$hAnchor.style.left = '0px'
		$vAnchor.style.left = editingElement.x[0] + editingElement.width[0] / 2 + 'px'
	}
	if (editingElement.anchorX === 1) {
		$hAnchor.style.right = '0px'
		$vAnchor.style.right = editingElement.x[0] + editingElement.width[0] / 2 + 'px'
	}
	if (editingElement.anchorY === 0) {
		$vAnchor.style.top = '0px'
		$hAnchor.style.top = editingElement.y[0] + editingElement.height[0] / 2 + 'px'
	}
	if (editingElement.anchorY === 1) {
		$vAnchor.style.bottom = '0px'
		$hAnchor.style.bottom = editingElement.y[0] + editingElement.height[0] / 2 + 'px'
	}
	$hAnchor.style.width = editingElement.x.join('')
	$vAnchor.style.height = editingElement.y.join('')
}

function touchStart(e) {
	touch = e.changedTouches[0]
	
}
// let deltaxordeltay = -1 // 0 = x; 1 = y
// let free = true
function touchMove(e) {
	const el = editingElement
	if (!el) return

	let deltaX = e.changedTouches[0].clientX - touch.clientX
	let deltaY = e.changedTouches[0].clientY - touch.clientY
	if (el.anchorX === 1) deltaX = -deltaX
	if (el.anchorY === 1) deltaY = -deltaY

	//if (deltaxordeltay === -1) deltaxordeltay = Math.abs(deltaX) > Math.abs(deltaY) ? 0 : 1
	
	if (activeMode === 0) {
		if (el.anchorX === 2) deltaX = 0
		if (el.anchorY === 2) deltaY = 0
		const x = editingElement.imaginaryX || editingElement.x[0]
		const y = editingElement.imaginaryY || editingElement.y[0]
		el.x[0] = Math.round((x + deltaX) / GRID_SIZE) * GRID_SIZE
		el.y[0] = Math.round((y + deltaY) / GRID_SIZE) * GRID_SIZE
		el.imaginaryX = x + deltaX
		el.imaginaryY = y + deltaY
		el.render()
	} else if (activeMode === 1) {
		const width = editingElement.width[0]
		const height = editingElement.height[0]
		el.width[0] = width + deltaX
		el.height[0] = height + deltaY
		if (el.width[0] < 0) el.width[0] = 0
		if (el.height[0] < 0) el.height[0] = 0
		el.render()
	}
	updateAnchorLines()
	touch = e.changedTouches[0]
}
function touchEnd(e) {
	deltaxordeltay = -1
}



// temp
function convert(str) {
	var n = parseFloat(str)
	var u = str.trim().substring(n.toString().length)
	return {
		value: n,
		unit: u
	}
}


function renderTree(element, root = true) {
	console.log(element.content)
	
	let html = root ? '' : `
		<div class="element group">
			<div class="name"><i class="mdi mdi-${gettypeicon(element)}"></i> ${element.name}</div>
			<div class="content">`
	for (const el of element.content) {
		if (Array.isArray(el.content)) html += renderTree(el, false)
		else html += `
			<div class="element button">
				<div class="name"><i class="mdi mdi-${gettypeicon(el)}"></i> ${el.name}</div>
			</div>`
	}
	html += root ? '' : '</div></div>'
	return html
}

function gettypeicon(element) {
	let typeicon = ''
	switch(element.type) {
		case 'mobystk:button': {
			if (element.content.type === 'mobystk:icon') typeicon = element.content.value
			else typeicon = 'checkbox-intermediate'
			break
		}
		case 'mobystk:group': typeicon = 'group'; break
		case 'mobystk:joystick': typeicon = 'gamepad'
	}
	return typeicon
}

document.querySelector('.layout-tree').innerHTML = renderTree(Controller.currentLayout)
