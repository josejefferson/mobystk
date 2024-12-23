import { AnyComponent } from '../../components'
import { AnchorX, AnchorY } from '../../components/Element'
import { editingElement } from './interactions'

export class AnchorLines {
	$hAnchor: HTMLElement | null
	$vAnchor: HTMLElement | null
	$editBox: HTMLElement | null

	constructor() {
		this.$hAnchor = null
		this.$vAnchor = null
		this.$editBox = null
	}

	update() {
		this.$hAnchor?.removeAttribute('style')
		this.$vAnchor?.removeAttribute('style')
		this.$editBox?.removeAttribute('style')

		if (!editingElement) return
		const { anchorX, anchorY, width, height, x, y } = editingElement

		this.$hAnchor!.style.width = anchorX !== AnchorX.CENTER ? x.join('') : '0px'
		this.$vAnchor!.style.height = anchorY !== AnchorY.CENTER ? y.join('') : '0px'
		this.$editBox!.style.width = width.join('')
		this.$editBox!.style.height = height.join('')

		const posX = anchorX === AnchorX.RIGHT ? 'right' : 'left'
		const posY = anchorY === AnchorY.BOTTOM ? 'bottom' : 'top'
		this.$hAnchor!.style[posX] = '0'
		this.$vAnchor!.style[posX] =
			anchorX === AnchorX.CENTER ? '50%' : `calc(${x.join('')} + ${width.join('')} / 2)`
		this.$vAnchor!.style[posY] = '0'
		this.$hAnchor!.style[posY] =
			anchorY === AnchorY.CENTER ? '50%' : `calc(${y.join('')} + ${height.join('')} / 2)`
		this.$editBox!.style[posX] = anchorX === AnchorX.CENTER ? '50%' : x.join('')
		this.$editBox!.style[posY] = anchorY === AnchorY.CENTER ? '50%' : y.join('')

		if (anchorX === AnchorX.CENTER && anchorY === AnchorY.CENTER)
			this.$editBox!.style.transform = 'translate(-50%, -50%)'
		else if (anchorX === AnchorX.CENTER) this.$editBox!.style.transform = 'translateX(-50%)'
		else if (anchorY === AnchorY.CENTER) this.$editBox!.style.transform = 'translateY(-50%)'
	}

	add(element: AnyComponent) {
		const parent = element.parent?.element || document.body
		parent.classList.add('editing-element-parent')
		this.$hAnchor = document.createElement('div')
		this.$vAnchor = document.createElement('div')
		this.$editBox = document.createElement('div')
		this.$hAnchor.classList.add('horizontal-anchor')
		this.$vAnchor.classList.add('vertical-anchor')
		this.$editBox.classList.add('editing-item-box')
		parent.appendChild(this.$hAnchor)
		parent.appendChild(this.$vAnchor)
		parent.appendChild(this.$editBox)
	}

	remove(element: AnyComponent) {
		const parent = element.parent?.element || document.body
		parent.classList.remove('editing-element-parent')
		this.$hAnchor?.remove()
		this.$vAnchor?.remove()
		this.$editBox?.remove()
	}
}

export const anchorLines = new AnchorLines()
