window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

window.addEventListener('scroll', () => {
	if (document.scrollingElement.scrollTop > window.innerHeight) {
		document.querySelector('.start.floating').classList.remove('hidden')
	} else {
		document.querySelector('.start.floating').classList.add('hidden')
	}
})

document.oncontextmenu = () => false
document.querySelectorAll('a').forEach(e => e.onclick = loading)
document.forms[0].elements.code.value = localStorage.getItem('joystick.code') || window.location.hostname + ':5000'
document.forms[0].elements.layout.value = localStorage.getItem('joystick.layout')
document.forms[0].elements.player.value = localStorage.getItem('joystick.player')
document.forms[0].elements.invert.checked = localStorage.getItem('joystick.invert') === 'true'
document.forms[0].elements.vibrate.checked = !(localStorage.getItem('joystick.vibrate') === 'false')
document.forms[0].elements.background.value = localStorage.getItem('joystick.background') || 'rgba(0, 0, 0, 1)'
document.forms[0].elements.color.value = localStorage.getItem('joystick.color') || 'rgba(255, 255, 255, 0.53)'
document.forms[0].elements.border.value = localStorage.getItem('joystick.border') || 'rgba(255, 255, 255, 0.53)'
document.forms[0].elements.active.value = localStorage.getItem('joystick.active') || 'rgba(255, 255, 255, 0.2)'
document.forms[0].elements.bgImage.value = localStorage.getItem('joystick.bgImage')
document.forms[0].elements.bgOpacity.value = localStorage.getItem('joystick.bgOpacity') || '0.5'
document.forms[0].elements.bgBlur.value = localStorage.getItem('joystick.bgBlur') || '0'
document.forms[0].elements.customCSS.value = localStorage.getItem('joystick.customCSS')
document.forms[0].elements.driveSensitivity.value = localStorage.getItem('joystick.driveSensitivity') || '2'
document.forms[0].elements.drivePrecision.value = localStorage.getItem('joystick.drivePrecision') || '1'

localStorage.getItem('joystick.locked')?.split(',')?.forEach(e => {
	if (e) document.querySelector(`[name=lock][value="${e}"]`).checked = true
})
localStorage.getItem('joystick.hidden')?.split(',')?.forEach(e => {
	if (e) document.querySelector(`[name=hide][value="${e}"]`).checked = true
})

document.forms[0].onsubmit = function (e) {
	e.preventDefault()
	localStorage.setItem('joystick.code', this.elements.code.value)
	localStorage.setItem('joystick.layout', this.elements.layout.value)
	localStorage.setItem('joystick.player', this.elements.player.value)
	localStorage.setItem('joystick.debug', this.elements.debug.checked)
	localStorage.setItem('joystick.invert', this.elements.invert.checked)
	localStorage.setItem('joystick.vibrate', this.elements.vibrate.checked)
	localStorage.setItem('joystick.background', this.elements.background.value)
	localStorage.setItem('joystick.color', this.elements.color.value)
	localStorage.setItem('joystick.border', this.elements.border.value)
	localStorage.setItem('joystick.active', this.elements.active.value)
	localStorage.setItem('joystick.bgImage', this.elements.bgImage.value)
	localStorage.setItem('joystick.bgOpacity', this.elements.bgOpacity.value)
	localStorage.setItem('joystick.bgBlur', this.elements.bgBlur.value)
	localStorage.setItem('joystick.customCSS', this.elements.customCSS.value)
	localStorage.setItem('joystick.driveSensitivity', this.elements.driveSensitivity.value)
	localStorage.setItem('joystick.drivePrecision', this.elements.drivePrecision.value)

	const lockedBtns = []
	const hiddenItems = []
	this.elements.lock.forEach(e => {
		if (e.checked) lockedBtns.push(e.value)
	})
	this.elements.hide.forEach(e => {
		if (e.checked) hiddenItems.push(e.value)
	})
	
	localStorage.setItem('joystick.locked', lockedBtns.join(','))
	localStorage.setItem('joystick.hidden', hiddenItems.join(','))
	
	loading()
	location.href = 'joystick.html'
}

const colors = {
	background: createPickr('background', '#000'),
	color: createPickr('color', '#FFF8', '88'),
	border: createPickr('border', '#FFF8', '88'),
	active: createPickr('active', '#FFF3', '33')
}

document.querySelectorAll('.start').forEach (e => e.oncontextmenu = () => {
	document.querySelector('.hiddenOptions').style.display = 'block'
})

document.querySelector('.resetColors').onclick = () => {
	colors.background.setColor('#000')
	colors.color.setColor('#FFF8')
	colors.border.setColor('#FFF8')
	colors.active.setColor('#FFF3')
}

function createPickr(el, defaultColor, opacity) {
	return Pickr.create({
		el: `.pickr-${el}`,
		theme: 'classic',
		default: localStorage.getItem('joystick.' + el) || defaultColor,
		defaultRepresentation: 'HEXA',
		comparison: false,
		autoReposition: true,
		components: {
			preview: true,
			opacity: true,
			hue: true,
			interaction: {
				input: true,
				save: true
			}
		},
		i18n: {
			'btn:save': 'Fechar',
		},
		swatches: [
			'#F44336',
			'#E91E63',
			'#9C27B0',
			'#673AB7',
			'#3F51B5',
			'#2196F3',
			'#03A9F4',
			'#00BCD4',
			'#009688',
			'#4CAF50',
			'#8BC34A',
			'#CDDC39',
			'#FFEB3B',
			'#FFC107',
			'#FF9800',
			'#FF5722',
			'#795548',
			'#9E9E9E',
			'#607D8B',
			'#FFFFFF',
			'#000000'
		].map(e => e + (opacity || ''))

	}).on('change', (color) => {
		const $input = document.forms[0].elements[el]
		color = color.toRGBA().toString()
		$input.value = color
		$input.parentElement.querySelector('.pickr button').style.setProperty('--pcr-color', color)
	}).on('save', (color, instance) => instance.hide())
}

const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}