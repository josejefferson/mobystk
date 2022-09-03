Controller.Group = class extends Controller.Element {
	constructor(details) {
		super(details)
		this.type = 'mobystk:group'

		this.content = details.content || []

		const $group = document.createElement('div')
		$group.classList.add('controller-group')
		$group.dataset.id = this.id
		$group.instance = this
		this.element = $group

		for (const element of this.content) {
			$group.appendChild(element.element)
		}

		this.render()
	}
}