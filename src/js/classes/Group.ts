import { IElementNode } from '../types/Element'
import { IGroup } from '../types/Group'
import { Element } from './Element'

export class Group extends Element implements IGroup {
	content: Element[]

	constructor(details) {
		super(details)
		this.type = 'mobystk:group'

		this.content = details.content || []

		const $group = <IElementNode<Group, HTMLDivElement>>document.createElement('div')
		$group.classList.add('controller-group')
		$group.dataset.id = this.id
		$group.instance = this
		this.element = $group

		for (const element of this.content) {
			$group.appendChild(element.element)
			element.render()
		}
	}
}
