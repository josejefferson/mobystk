class Toolbar {
	constructor(element) {
		this.element = element
		this.x = 0
		this.y = 0

		// 0 = move
		// 1 = resize
		this.mode = 0

		this.showingMore = false
		this.interacting = false

		element.addEventListener('touchstart', () => this.interacting = true)
		element.addEventListener('touchend', () => {
			this.interacting = false
			this.render()
		})

		const $toolbarDrag = element.querySelector('.drag')
		$toolbarDrag.addEventListener('touchmove', (e) => {
			this.x = Math.max(0, e.changedTouches[0].clientX - 14)
			this.y = Math.max(0, e.changedTouches[0].clientY - 21)
			this.render()
		})

		this.$showLayoutTree = element.querySelector('.show-layout-tree')
		this.$showLayoutTree.addEventListener('click', (e) => {
			tree.opened = !tree.opened
			tree.render()
			this.render()
		})

		this.$toolbarShowMore = element.querySelector('.show-more')
		this.$toolbarShowMore.addEventListener('click', (e) => {
			this.showingMore = !this.showingMore
			this.render()
		})

		this.$modes = document.querySelectorAll('.mode')
		for (const $mode of this.$modes) {
			const _this = this
			$mode.addEventListener('click', function (e) {
				const mode = parseInt(this.dataset.mode)
				if (isNaN(mode)) return
				_this.mode = mode
				_this.render()
			})
		}

		this.render()
	}

	render() {
		const el = this.element
		el.classList[this.showingMore ? 'add' : 'remove']('showing-more')
		el.classList[this.interacting ? 'add' : 'remove']('interacting')
		try{this.$showLayoutTree.classList[tree.opened ? 'add' : 'remove']('active')}catch(err){console.error(err)}
		console.log(this.$toolbarShowMore.classList)

		let x = this.x
		let y = this.y
		const parent = el.parentElement
		if (x + el.offsetWidth > parent.offsetWidth) x = parent.offsetWidth - el.offsetWidth
		if (y + el.offsetHeight > parent.offsetHeight) y = parent.offsetHeight - el.offsetHeight
		el.style.left = x + 'px'
		el.style.top = y + 'px'
		this._x = x
		this._y = y

		for (const $mode of this.$modes) {
			const mode = parseInt($mode.dataset.mode)
			if (isNaN(mode)) continue
			$mode.classList[this.mode === mode ? 'add' : 'remove']('active-mode')
		}
	}
}

const toolbar = new Toolbar(document.querySelector('.layout-editor-toolbar'))