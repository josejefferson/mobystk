document.oncontextmenu = () => false
document.forms[0].elements.code.value = localStorage.getItem('joystick.code') || window.location.hostname + ':5000'
document.forms[0].elements.layout.value = localStorage.getItem('joystick.layout')
document.forms[0].elements.player.value = localStorage.getItem('joystick.player')
document.forms[0].elements.invert.checked = localStorage.getItem('joystick.invert') === 'true' ? true : false
document.forms[0].elements.background.value = localStorage.getItem('joystick.background') || '#000000'
document.forms[0].elements.color.value = localStorage.getItem('joystick.color') || '#FFFFFF'
document.forms[0].elements.border.value = localStorage.getItem('joystick.border') || '#FFFFFF'
document.forms[0].elements.active.value = localStorage.getItem('joystick.active') || '#FFFFFF'
document.forms[0].elements.colorT.value = localStorage.getItem('joystick.colorT') || '136'
document.forms[0].elements.borderT.value = localStorage.getItem('joystick.borderT') || '136'
document.forms[0].elements.activeT.value = localStorage.getItem('joystick.activeT') || '51'

localStorage.getItem('joystick.locked')?.split(',')?.forEach(e => {
	if (e) document.querySelector(`[name=lock][value="${e}"]`).checked = true
})

document.forms[0].onsubmit = function (e) {
	e.preventDefault()
	localStorage.setItem('joystick.code', this.elements.code.value)
	localStorage.setItem('joystick.layout', this.elements.layout.value)
	localStorage.setItem('joystick.player', this.elements.player.value)
	localStorage.setItem('joystick.debug', this.elements.debug.checked)
	localStorage.setItem('joystick.invert', this.elements.invert.checked)
	localStorage.setItem('joystick.background', this.elements.background.value)
	localStorage.setItem('joystick.color', this.elements.color.value)
	localStorage.setItem('joystick.border', this.elements.border.value)
	localStorage.setItem('joystick.active', this.elements.active.value)
	localStorage.setItem('joystick.colorT', this.elements.colorT.value)
	localStorage.setItem('joystick.borderT', this.elements.borderT.value)
	localStorage.setItem('joystick.activeT', this.elements.activeT.value)

	const lockedBtns = []
	this.elements.lock.forEach(e => {
		if (e.checked) lockedBtns.push(e.value)
	})
	localStorage.setItem('joystick.locked', lockedBtns.join(','))

	this.submit()
}

document.querySelector('.start').oncontextmenu = () => {
	document.querySelector('.links').style.display = 'block'
}

document.querySelector('.resetColors').onclick = () => {
	document.forms[0].elements.background.value = document.forms[0].elements.background.defaultValue
	document.forms[0].elements.color.value = document.forms[0].elements.color.defaultValue
	document.forms[0].elements.border.value = document.forms[0].elements.border.defaultValue
	document.forms[0].elements.active.value = document.forms[0].elements.active.defaultValue
	document.forms[0].elements.colorT.value = document.forms[0].elements.colorT.defaultValue
	document.forms[0].elements.borderT.value = document.forms[0].elements.borderT.defaultValue
	document.forms[0].elements.activeT.value = document.forms[0].elements.activeT.defaultValue
}