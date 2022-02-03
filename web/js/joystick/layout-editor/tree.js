
function renderTree(element, root = true) {
	let html = root ? '' : `
		<div class="element group">
			<div class="name"><i class="mdi mdi-${gettypeicon(element)}"></i> ${element.name}</div>
			<div class="content">`
	for (const el of element.content) {
		if (Array.isArray(el.content)) html += renderTree(el, false)
		else html += `
			<div class="element button">
				<div class="name"><i class="mdi mdi-${gettypeicon(el)}"></i> ${el.name}</div>
			</div>`
	}
	html += root ? '' : '</div></div>'
	return html
}

function gettypeicon(element) {
	let typeicon = ''
	switch(element.type) {
		case 'mobystk:button': {
			if (element.content.type === 'mobystk:icon') typeicon = element.content.value
			else typeicon = 'checkbox-intermediate'
			break
		}
		case 'mobystk:group': typeicon = 'group'; break
		case 'mobystk:joystick': typeicon = 'gamepad'
	}
	return typeicon
}

document.querySelector('.layout-tree').innerHTML = renderTree(Controller.currentLayout)
