const ls = localStorage
const form = document.forms[0]
const formEls = form.elements

// Eventos
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

document.addEventListener('contextmenu', () => false)
document.querySelectorAll('a').forEach(e => e.addEventListener('click', loading))
document.querySelectorAll('.start').forEach(e => {
	e.addEventListener('contextmenu', () => {
		document.querySelector('.hiddenOptions').style.display = 'flex'
	})
})

const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}

// Carregar opções
formEls.code.value = ls['joystick.code'] || window.location.hostname + ':5000'
formEls.layout.value = ls['joystick.layout']
formEls.player.value = ls['joystick.player']
formEls.invert.checked = ls['joystick.invert'] === 'true'
formEls.vibrate.checked = !(ls['joystick.vibrate'] === 'false')
formEls.background.value = ls['joystick.background'] || 'rgba(0, 0, 0, 1)'
formEls.color.value = ls['joystick.color'] || 'rgba(255, 255, 255, 0.53)'
formEls.border.value = ls['joystick.border'] || 'rgba(255, 255, 255, 0.53)'
formEls.active.value = ls['joystick.active'] || 'rgba(255, 255, 255, 0.2)'
formEls.bgImage.value = ls['joystick.bgImage']
formEls.bgOpacity.value = ls['joystick.bgOpacity'] || '0.5'
formEls.bgBlur.value = ls['joystick.bgBlur'] || '0'
formEls.customCSS.value = ls['joystick.customCSS']
formEls.driveSensitivity.value = ls['joystick.driveSensitivity'] || '2'
formEls.drivePrecision.value = ls['joystick.drivePrecision'] || '1'
ls['joystick.locked']?.split(',')?.forEach(e => {
	if (e) document.querySelector(`[name=lock][value="${e}"]`).checked = true
})
ls['joystick.hidden']?.split(',')?.forEach(e => {
	if (e) document.querySelector(`[name=hide][value="${e}"]`).checked = true
})

// Salvar opções
document.forms[0].addEventListener('submit', function (e) {
	e.preventDefault()
	const elems = this.elements
	const lockedBtns = []
	const hiddenItems = []
	elems.lock.forEach(e => {
		if (e.checked) lockedBtns.push(e.value)
	})
	elems.hide.forEach(e => {
		if (e.checked) hiddenItems.push(e.value)
	})

	ls['joystick.code'] = elems.code.value
	ls['joystick.layout'] = elems.layout.value
	ls['joystick.player'] = elems.player.value
	ls['joystick.debug'] = elems.debug.checked
	ls['joystick.invert'] = elems.invert.checked
	ls['joystick.vibrate'] = elems.vibrate.checked
	ls['joystick.background'] = elems.background.value
	ls['joystick.color'] = elems.color.value
	ls['joystick.border'] = elems.border.value
	ls['joystick.active'] = elems.active.value
	ls['joystick.bgImage'] = elems.bgImage.value
	ls['joystick.bgOpacity'] = elems.bgOpacity.value
	ls['joystick.bgBlur'] = elems.bgBlur.value
	ls['joystick.customCSS'] = elems.customCSS.value
	ls['joystick.driveSensitivity'] = elems.driveSensitivity.value
	ls['joystick.drivePrecision'] = elems.drivePrecision.value
	ls['joystick.locked'] = lockedBtns.join(',')
	ls['joystick.hidden'] = hiddenItems.join(',')

	loading()
	location.href = 'joystick.html'
})

// Cores
const colors = {
	background: createPickr('background', '#000'),
	color: createPickr('color', '#FFF8', '88'),
	border: createPickr('border', '#FFF8', '88'),
	active: createPickr('active', '#FFF3', '33')
}

document.querySelector('.resetColors').addEventListener('click', () => {
	colors.background.setColor('#000')
	colors.color.setColor('#FFF8')
	colors.border.setColor('#FFF8')
	colors.active.setColor('#FFF3')
})

function createPickr(el, defaultColor, opacity) {
	return Pickr.create({
		el: `.pickr-${el}`,
		theme: 'classic',
		default: ls['joystick.' + el] || defaultColor,
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

	}).on('change', color => {
		color = color.toRGBA().toString()
		const $input = formEls[el]
		$input.value = color
		$input.parentElement.querySelector('.pickr button')
			.style.setProperty('--pcr-color', color)
	}).on('save', (color, instance) => {
		instance.hide()
	})
}