document.forms[0].elements.code.value = localStorage.getItem('webJoy.code')
document.forms[0].elements.layout.value = localStorage.getItem('webJoy.layout')

document.forms[0].onsubmit = function(e) {
	e.preventDefault()
	localStorage.setItem('webJoy.code', this.elements.code.value)
	localStorage.setItem('webJoy.layout', this.elements.layout.value)
	this.submit()
}