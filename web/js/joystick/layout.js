function loadLayout(layout) {
	layout.content = layout.content.map(parseElement)
	for (const object of layout.content) {
		if (!object) continue
		document.body.appendChild(object.element)
		if (object instanceof Controller.Joystick) object.render()
	}
	return layout
}

function parseElement(object) {
	if (object.import) object = importElement(object)
	if (!object) return

	if (object.type === 'mobystk:button') {
		return new Controller.Button(object)
	} else if (object.type === 'mobystk:group') {
		object.content = object.content.map(parseElement)
		return new Controller.Group(object)
	} else if (object.type === 'mobystk:joystick') {
		return new Controller.Joystick(object)
	}
}

function importElement(object) {
	const ALL_ELEMENTS = [...Controller.BUTTONS, ...Controller.GROUPS, ...Controller.JOYSTICKS]
	const element = ALL_ELEMENTS.find((e) => e.id === object.import)
	if (element) return { ...element, ...object }
}

const layout = Controller.layouts.find(l => l.id === options.layout)
if (layout) {
	loadLayout(layout)
} else {
	alert('Layout não encontrado!')
	window.location.href = 'index.html'
}