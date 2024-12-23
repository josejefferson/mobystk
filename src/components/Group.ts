import type { AnyComponent } from '.'
import type { IElementNode, IElementsOrImport, IGroup, IGroupComponent } from '../types'
import ElementComponent from './Element'

export default class GroupComponent extends ElementComponent implements IGroupComponent {
	type: 'mobystk:group'
	content: IElementsOrImport[]
	parsedContent?: AnyComponent[]
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
			$group.appendChild(element.element!)
			element.render()
		}
	}

	toObject(): IGroup {
		return {
			...super.toObject(),
			type: this.type,
			content: this.content
		}
	}
}
