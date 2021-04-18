document.oncontextmenu = () => false
document.forms[0].elements.code.value = localStorage.getItem('joystick.code') || window.location.hostname + ':5000'
document.forms[0].elements.layout.value = localStorage.getItem('joystick.layout')
document.forms[0].elements.player.value = localStorage.getItem('joystick.player')
document.forms[0].elements.invert.checked = localStorage.getItem('joystick.invert') === 'true' ? true : false
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