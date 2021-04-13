document.forms[0].elements.code.value = localStorage.getItem('joystick.code') || window.location.hostname + ':5000'
document.forms[0].elements.layout.value = localStorage.getItem('joystick.layout')

document.forms[0].onsubmit = function(e) {
	e.preventDefault()
	localStorage.setItem('joystick.code', this.elements.code.value)
	localStorage.setItem('joystick.layout', this.elements.layout.value)
	this.submit()
}