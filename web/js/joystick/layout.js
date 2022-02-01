// Carrega o layout no controle
const $layout = document.querySelector('.controller-layout')
function loadLayout(layout) {
	layout.content = layout.content.map(parseElement).filter(e => e)
	const allElements = getAllElements(layout)

	$layout.innerHTML = ''
	for (const object of layout.content) {
		if (!object) continue
		$layout.appendChild(object.element)
		if (object instanceof Controller.Joystick) object.render()
	}

	Controller.currentLayout = layout
	Controller.elements.all = allElements
	Controller.elements.buttons = allElements.filter(e => e instanceof Controller.Button)
	Controller.elements.groups = allElements.filter(e => e instanceof Controller.Group)
	Controller.elements.joysticks = allElements.filter(e => e instanceof Controller.Joystick)
	$DILayout.innerText = layout.name || '???'

	loadElementActions()
	loadDriveMode()

	return layout
}

// Retorna todos os elementos (botões, grupos e joysticks) de um objeto
function getAllElements(object, elements = []) {
	if (object.type === 'mobystk:layout' || object.type === 'mobystk:group') {
		if (object.type !== 'mobystk:layout') elements.push(object)
		for (const obj of object.content) getAllElements(obj, elements)
	} else {
		elements.push(object)
	}
	return elements
}

// Converte os elementos em JSON para objetos
function parseElement(object) {
	if (options.hidden?.includes(object.import || object.id)) return
	if (object.import) object = importElement(object)
	if (!object) return

	if (object.type === 'mobystk:button') {
		if (options.locked?.includes(object.import || object.id)) object = { ...object, lockable: true }
		return new Controller.Button(object)
	} else if (object.type === 'mobystk:group') {
		object.content = object.content.map(parseElement).filter(e => e)
		return new Controller.Group(object)
	} else if (object.type === 'mobystk:joystick') {
		return new Controller.Joystick(object)
	}
}

// Reutiliza um elemento
function importElement(object) {
	const allElements = [...Controller.buttons, ...Controller.groups, ...Controller.joysticks]
	const element = allElements.find((e) => e.id === object.import)
	if (element) return { ...element, ...object }
}

// Carrega o layout selecionado
if (!options.layout) {
	window.location.href = 'index.html'
	throw new Error('Layout não selecionado')
}
const layout = Controller.layouts.find(l => l.id === options.layout)
if (!layout) {
	alert('Layout não encontrado!')
	window.location.href = 'index.html'
	throw new Error('Layout não encontrado')
}

loadLayout(layout)

// Configura os eventos dos elementos
for (const element of Controller.elements.all) {
	if (element instanceof Controller.Button) {
		element.on('press', (key) => sendCmd(key, false))
		element.on('release', (key) => sendCmd(key, true))
	} else if (element instanceof Controller.Joystick) {
		element.on('move end', updateJoystick)
	}
}