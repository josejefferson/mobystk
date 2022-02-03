let $hAnchor = $vAnchor = $editBox = null
function updateAnchorLines() {
	$hAnchor.style = null
	$vAnchor.style = null
	$editBox.style = null

	if (!editingElement) return
	const {anchorX, anchorY, width, height, x, y} = editingElement

	$hAnchor.style.width = x.join('')
	$vAnchor.style.height = y.join('')
	$editBox.style.width = width.join('')
	$editBox.style.height = height.join('')

	const posX = anchorX === 1 ? 'right' : 'left'
	const posY = anchorY === 1 ? 'bottom' : 'top'
	$hAnchor.style[posX] = '0'
	$vAnchor.style[posX] = anchorX === 2 ? '50%' : `calc(${x.join('')} + ${width.join('')} / 2)`
	$vAnchor.style[posY] = '0'
	$hAnchor.style[posY] = anchorY === 2 ? '50%' : `calc(${y.join('')} + ${height.join('')} / 2)`
	$editBox.style[posX] = anchorX === 2 ? '50%' : x.join('')
	$editBox.style[posY] = anchorY === 2 ? '50%' : y.join('')

	if (anchorX === 2 && anchorY === 2) $editBox.style.transform = 'translate(-50%, -50%)'
	else if (anchorX === 2) $editBox.style.transform = 'translateX(-50%)'
	else if (anchorY === 2) $editBox.style.transform = 'translateY(-50%)'
}

function addAnchorLines(element) {
	const parent = element.parent?.element || document.body
	parent.classList.add('editing-element-parent')
	$hAnchor = document.createElement('div')
	$vAnchor = document.createElement('div')
	$editBox = document.createElement('div')
	$hAnchor.classList.add('horizontal-anchor')
	$vAnchor.classList.add('vertical-anchor')
	$editBox.classList.add('editing-item-box')
	parent.appendChild($hAnchor)
	parent.appendChild($vAnchor)
	parent.appendChild($editBox)
}

function removeAnchorLines(element) {
	const parent = element.parent?.element || document.body
	parent.classList.remove('editing-element-parent')
	$hAnchor?.remove()
	$vAnchor?.remove()
	$editBox?.remove()
}