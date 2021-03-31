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

function newLayout(content = [], ppt = false) {
	return {
		id: rndStr(),
		platformVersion: '0.0.0',
		version: 1,
		name: '[New layout]',
		data: content
	}
}

function newGroup(buttons = []) {
	return {
		group: true,
		id: rndStr(),
		name: '[New group]',
		anchorX: 'left',
		anchorY: 'top',
		x: [0, 'px'],
		y: [0, 'px'],
		width: [100, 'px'],
		height: [100, 'px'],
		buttons
	}
}

function newButton(ppt = false) {
	return {
		id: rndStr(),
		name: '[New button]', // if ppt Swal.fire
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