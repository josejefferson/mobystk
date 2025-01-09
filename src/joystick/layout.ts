import type { AnyComponent } from '../components'
import ButtonComponent from '../components/Button'
import GroupComponent from '../components/Group'
import JoystickComponent from '../components/Joystick'
import layout from '../elements/layout'
import Controller from '../shared/controller'
import options from '../shared/options'
import { socket } from '../shared/socket'
import type {
	IButton,
	IElements,
	IElementsOrImport,
	IGroup,
	IImport,
	IJoystick,
	ILayout,
	ILayoutComponent
} from '../types'
import loadElementActions from './element-actions'
import { $layout } from './elements'
import updateJoystick from './joystick'
import loadDriveMode from './motion-control'

/**
 * Carrega o layout
 */
export function loadLayout(layout: ILayout) {
	const parsedLayout: ILayoutComponent = {
		...layout,
		parsedContent: layout.content.map(parseElement).filter((e): e is AnyComponent => !!e)
	}
	const allElements = getAllElements(parsedLayout)

	$layout.innerHTML = ''
	for (const object of parsedLayout.parsedContent) {
		if (!object) continue
		$layout.appendChild(object.element!)
		object.render()
	}

	Controller.currentLayout = parsedLayout
	Controller.elements.all = allElements
	Controller.elements.buttons = allElements.filter(
		(e) => e instanceof ButtonComponent
	) as ButtonComponent[]
	Controller.elements.groups = allElements.filter(
		(e) => e instanceof GroupComponent
	) as GroupComponent[]
	Controller.elements.joysticks = allElements.filter(
		(e) => e instanceof JoystickComponent
	) as JoystickComponent[]

	loadElementActions()
	loadDriveMode()

	return layout
}

/**
 * Retorna todos os elementos (botões, grupos e joysticks) de um objeto
 */
export function getAllElements(
	object: AnyComponent | ILayoutComponent,
	elements: AnyComponent[] = []
) {
	if (object.type === 'mobystk:layout' || object.type === 'mobystk:group') {
		if (object.type !== 'mobystk:layout') elements.push(object)
		for (const obj of object.parsedContent!) getAllElements(obj, elements)
	} else {
		elements.push(object)
	}
	return elements
}

/**
 * Converte os elementos de JSON para objetos
 */
export function parseElement(object: IElementsOrImport) {
	const objectID = 'import' in object ? object.import : object.id

	// Remove os itens ocultos
	if (options.hidden?.includes(objectID)) return

	// Importa os elementos
	if ('import' in object) object = importElement(object)!

	// Descarta os objetos inválidos
	if (!object) return

	if (object.type === 'mobystk:button') {
		// Botão
		object = object as IButton
		if (options.locked?.includes(objectID)) object = { ...object, lockable: true }
		return new ButtonComponent(object)
	} else if (object.type === 'mobystk:group') {
		// Grupo
		object = object as IGroup
		object.parsedContent = object.content
			.map(parseElement)
			.filter((e: AnyComponent | undefined) => e) as AnyComponent[]
		const group = new GroupComponent(object)
		object.parsedContent = object.parsedContent.map((e: AnyComponent) => (e.parent = group))
		return group
	} else if (object.type === 'mobystk:joystick') {
		// Joystick
		object = object as IJoystick
		return new JoystickComponent(object)
	}
}

/**
 * Reutiliza um elemento
 */
export function importElement(object: IImport): (IElements & IImport) | undefined {
	const allElements = [...Controller.buttons, ...Controller.groups, ...Controller.joysticks]
	const element = allElements.find((e) => e.id === object.import)
	if (element) return { ...element, ...object }
}

// Carrega o layout do joystick
loadLayout(layout)

// Configura os eventos dos elementos
for (const element of Controller.elements.all) {
	if (element instanceof ButtonComponent) {
		element.on('press', (key) => socket.sendKey(key, 'press'))
		element.on('release', (key) => socket.sendKey(key, 'release'))
	} else if (element instanceof JoystickComponent) {
		element.on('move end', updateJoystick)
	}
}
