function rndStr(length = 10, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
	const charactersLength = characters.length
	let result = ''
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

function rndInt(min = 0, max = 10) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function copy(text) {
	const el = document.createElement('textarea')
	el.value = text
	document.body.appendChild(el)
	el.select()
	document.execCommand('copy')
	document.body.removeChild(el)
}

async function newLayout(content = [], ppt = true) {
	let name = ''
	if (ppt) {
		name = (await Swal.fire({
			input: 'text',
			inputLabel: 'Name of layout',
			inputPlaceholder: '[New layout]'
		})).value
	}
	return {
		id: rndStr(),
		platformVersion: '0.0.0',
		version: 1,
		name: name || '[New layout]',
		joystick: {
			active: true,
			anchorX: 'left',
			anchorY: 'bottom',
			x: [10, 'px'],
			y: [10, 'px'],
			size: 90
		},
		data: content
	}
}

async function newGroup(buttons = [], ppt = true) {
	let name = ''
	if (ppt) {
		name = (await Swal.fire({
			input: 'text',
			inputLabel: 'Name of group',
			inputPlaceholder: '[New group]'
		})).value
	}

	return {
		group: true,
		id: rndStr(),
		name: name || '[New group]',
		anchorX: 'left',
		anchorY: 'top',
		x: [0, 'px'],
		y: [0, 'px'],
		width: [100, 'px'],
		height: [100, 'px'],
		buttons
	}
}

async function newButton(ppt = true) {
	let name = ''
	if (ppt) {
		name = (await Swal.fire({
			input: 'text',
			inputLabel: 'Name of button',
			inputPlaceholder: '[New button]'
		})).value
	}

	return {
		id: rndStr(),
		name: name || '[New button]',
		content: '[NEW]',
		visible: true,
		lock: false,
		key: ['ctrl', 'a'],
		anchorX: 'left',
		anchorY: 'top',
		x: [0, 'px'],
		y: [0, 'px'],
		width: [100, 'px'],
		height: [40, 'px'],
		fontSize: [20, 'px'],
		hiddenBorders: {
			top: false,
			left: false,
			bottom: false,
			right: false
		},
		borderRadius: [
			[0, 'px'],
			[0, 'px'],
			[0, 'px'],
			[0, 'px']
		],
		rounded: false
	}
}