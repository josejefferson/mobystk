import type {
	IButton,
	IElement,
	IElementNode,
	IGroup,
	IGroupComponent,
	IImport,
	IJoystick
} from '../types'
import type ButtonComponent from './Button'
import ElementComponent from './Element'
import type JoystickComponent from './Joystick'

export default class GroupComponent extends ElementComponent implements IGroupComponent {
	type: 'mobystk:group'
	content: (IButton | IGroup | IJoystick | IImport)[]
	parsedContent?: (ButtonComponent | GroupComponent | JoystickComponent)[]
	_imaginaryX?: number
	_imaginaryY?: number
	_imaginaryWidth?: number
	_imaginaryHeight?: number
	_imaginarySize?: number
	_imaginaryPadding?: number

	constructor(details: IGroup) {
		super(details)
		this.type = 'mobystk:group'
		this.content = details.content || []
		this.parsedContent = details.parsedContent || []

		const $group = <IElementNode<GroupComponent, HTMLDivElement>>document.createElement('div')
		$group.classList.add('controller-group')
		$group.dataset.id = this.id
		$group.instance = this
		this.element = $group

		for (const element of this.parsedContent) {
			$group.appendChild(element.element)
			element.render()
		}
	}
}
