import { AnchorX, AnchorY } from '../../components/Element'
import { anchorLines } from './guides'
import { editingElement } from './interactions'
import { tree } from './tree'

export class Toolbar {
	element: HTMLElement
	x: number
	y: number
	_x?: number
	_y?: number
	mode: 0 | 1
	showingMore: boolean
	interacting: boolean
	$showLayoutTree: HTMLElement
	$toolbarShowMore: HTMLElement
	$modes: NodeListOf<HTMLElement>
	$anchorX: HTMLButtonElement
	$anchorY: HTMLButtonElement

	constructor(element: HTMLElement) {
		if (!element) throw new Error('Invalid element to construct Toolbar')

		this.element = element
		this.x = 0
		this.y = 0

		// 0 = move
		// 1 = resize
		this.mode = 0

		this.showingMore = false
		this.interacting = false

		element.addEventListener('touchstart', () => (this.interacting = true))
		element.addEventListener('touchend', () => {
			this.interacting = false
			this.render()
		})

		const $toolbarDrag = element.querySelector('.drag')!
		$toolbarDrag.addEventListener('touchmove', (e) => {
			const ev = e as TouchEvent
			this.x = Math.max(0, ev.changedTouches[0].clientX - 14)
			this.y = Math.max(0, ev.changedTouches[0].clientY - 21)
			this.render()
		})

		this.$showLayoutTree = element.querySelector('.show-layout-tree')!
		this.$showLayoutTree.addEventListener('click', (e) => {
			tree.opened = !tree.opened
			tree.render()
			this.render()
		})

		this.$toolbarShowMore = element.querySelector('.show-more')!
		this.$toolbarShowMore.addEventListener('click', (e) => {
			this.showingMore = !this.showingMore
			this.render()
		})

		this.$modes = document.querySelectorAll<HTMLElement>('.mode')
		for (const $mode of Array.from(this.$modes)) {
			const _this = this
			$mode.addEventListener('click', function (e) {
				const mode = <0 | 1>parseInt(this.dataset.mode!, 10)
				if (isNaN(mode)) return
				_this.mode = mode
				_this.render()
			})
		}

		this.$anchorX = document.querySelector('.anchor-x')!
		this.$anchorX.addEventListener('click', (e) => {
			editingElement!.anchorX += 1
			if (editingElement!.anchorX > AnchorX.CENTER) editingElement!.anchorX = AnchorX.LEFT
			this.render()
			editingElement!.render()
			anchorLines.update()
		})

		this.$anchorY = document.querySelector('.anchor-y')!
		this.$anchorY.addEventListener('click', (e) => {
			editingElement!.anchorY += 1
			if (editingElement!.anchorY > AnchorY.CENTER) editingElement!.anchorY = AnchorY.TOP
			this.render()
			editingElement!.render()
			anchorLines.update()
		})

		this.render()
	}

	render() {
		const el = this.element
		el.classList[this.showingMore ? 'add' : 'remove']('showing-more')
		el.classList[this.interacting ? 'add' : 'remove']('interacting')
		try {
			this.$showLayoutTree.classList[tree.opened ? 'add' : 'remove']('active')
		} catch (err) {
			console.error(err)
		}

		let x = this.x
		let y = this.y
		const parent = el.parentElement!
		if (x + el.offsetWidth > parent.offsetWidth) x = parent.offsetWidth - el.offsetWidth
		if (y + el.offsetHeight > parent.offsetHeight) y = parent.offsetHeight - el.offsetHeight
		el.style.left = x + 'px'
		el.style.top = y + 'px'
		this._x = x
		this._y = y

		for (const $mode of Array.from(this.$modes)) {
			const mode = parseInt($mode.dataset.mode!, 10)
			if (isNaN(mode)) continue
			$mode.classList[this.mode === mode ? 'add' : 'remove']('active-mode')
		}

		const $anchorX = this.$anchorX.querySelector('i.mdi')!
		const $anchorY = this.$anchorY.querySelector('i.mdi')!
		$anchorX.classList.remove(
			'mdi-align-horizontal-left',
			'mdi-align-horizontal-center',
			'mdi-align-horizontal-right'
		)
		$anchorY.classList.remove(
			'mdi-align-vertical-top',
			'mdi-align-vertical-center',
			'mdi-align-vertical-bottom'
		)

		if (typeof editingElement !== 'undefined' && editingElement) {
			this.$anchorX.disabled = false
			this.$anchorY.disabled = false
			if (editingElement.anchorX === AnchorX.LEFT)
				$anchorX.classList.add('mdi-align-horizontal-left')
			if (editingElement.anchorX === AnchorX.RIGHT)
				$anchorX.classList.add('mdi-align-horizontal-right')
			if (editingElement.anchorX === AnchorX.CENTER)
				$anchorX.classList.add('mdi-align-horizontal-center')
			if (editingElement.anchorY === AnchorY.TOP) $anchorY.classList.add('mdi-align-vertical-top')
			if (editingElement.anchorY === AnchorY.BOTTOM)
				$anchorY.classList.add('mdi-align-vertical-bottom')
			if (editingElement.anchorY === AnchorY.CENTER)
				$anchorY.classList.add('mdi-align-vertical-center')
		} else {
			this.$anchorX.disabled = true
			this.$anchorY.disabled = true
			$anchorX.classList.add('mdi-align-horizontal-left')
			$anchorY.classList.add('mdi-align-vertical-top')
		}
	}
}

export const toolbar = new Toolbar(document.querySelector('.layout-editor-toolbar')!)
