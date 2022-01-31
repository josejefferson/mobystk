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
	e.addEventListener('contextmenu', (e) => {
		e.preventDefault()
		document.querySelector('.hiddenOptions').style.display = 'flex'
		scrollToY(document.body.scrollHeight, 400)
		return false
	})
})

const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}

// Carregar opções
formEls.code.value = ls.getItem('joystick.code') || window.location.hostname + ':5000'
formEls.layout.value = ls.getItem('joystick.layout')
formEls.player.value = ls.getItem('joystick.player')
formEls.invertL.checked = ls.getItem('joystick.invertL') === 'true'
formEls.invertR.checked = ls.getItem('joystick.invertR') === 'true'
formEls.disJoyXAxis.checked = ls.getItem('joystick.disJoyXAxis') === 'true'
formEls.disJoyYAxis.checked = ls.getItem('joystick.disJoyYAxis') === 'true'
formEls.dblClickLoadSave.checked = ls.getItem('joystick.dblClickLoadSave') === 'true'
formEls.vibrate.value = ls.getItem('joystick.vibrate') || '15'
formEls.vibrateJoystick.value = ls.getItem('joystick.vibrateJoystick') || '5'
formEls.vibrationFromGame.checked = !(ls.getItem('joystick.vibrationFromGame') === 'false')
formEls.vgamepad.checked = ls.getItem('joystick.vgamepad') === 'true'
formEls.background.value = ls.getItem('joystick.background') || 'rgba(0, 0, 0, 1)'
formEls.color.value = ls.getItem('joystick.color') || 'rgba(255, 255, 255, 0.53)'
formEls.border.value = ls.getItem('joystick.border') || 'rgba(255, 255, 255, 0.53)'
formEls.active.value = ls.getItem('joystick.active') || 'rgba(255, 255, 255, 0.2)'
formEls.bgImage.value = ls.getItem('joystick.bgImage')
formEls.bgOpacity.value = ls.getItem('joystick.bgOpacity') || '0.5'
formEls.bgBlur.value = ls.getItem('joystick.bgBlur') || '0'
formEls.customCSS.value = ls.getItem('joystick.customCSS')
formEls.driveSensitivity.value = ls.getItem('joystick.driveSensitivity') || '2'
formEls.drivePrecision.value = ls.getItem('joystick.drivePrecision') || '1'
if (ls.getItem('joystick.locked') !== null)
	document.querySelectorAll('[name=lock]').forEach(e => e.checked = false)
ls.getItem('joystick.locked')?.split(',')?.forEach(e => {
	if (e) document.querySelector(`[name=lock][value="${e}"]`).checked = true
})
if (ls.getItem('joystick.hidden') !== null)
	document.querySelectorAll('[name=hide]').forEach(e => e.checked = false)
ls.getItem('joystick.hidden')?.split(',')?.forEach(e => {
	if (e) document.querySelector(`[name=hide][value="${e}"]`).checked = true
})

document.querySelectorAll('input[type="range"] + .value').forEach($value => {
	const $range = $value.parentElement.querySelector('input[type="range"]')
	const precision = getPrecision($range.step || 1)
	if ($range) {
		$range.addEventListener('change', change)
		$range.addEventListener('mousemove', change)
		$range.addEventListener('touchmove', change)
	}
	change()
	function change() {
		$value.innerText = Number($range.value).toFixed(precision)
	}
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

	localStorage.setItem('joystick.code', elems.code.value)
	localStorage.setItem('joystick.layout', elems.layout.value)
	localStorage.setItem('joystick.player', elems.player.value)
	localStorage.setItem('joystick.debug', elems.debug.checked)
	localStorage.setItem('joystick.invertL', elems.invertL.checked)
	localStorage.setItem('joystick.invertR', elems.invertR.checked)
	localStorage.setItem('joystick.disJoyXAxis', elems.disJoyXAxis.checked)
	localStorage.setItem('joystick.disJoyYAxis', elems.disJoyYAxis.checked)
	localStorage.setItem('joystick.dblClickLoadSave', elems.dblClickLoadSave.checked)
	localStorage.setItem('joystick.vibrate', elems.vibrate.value)
	localStorage.setItem('joystick.vibrateJoystick', elems.vibrateJoystick.value)
	localStorage.setItem('joystick.vibrationFromGame', elems.vibrationFromGame.checked)
	localStorage.setItem('joystick.vgamepad', elems.vgamepad.checked)
	localStorage.setItem('joystick.background', elems.background.value)
	localStorage.setItem('joystick.color', elems.color.value)
	localStorage.setItem('joystick.border', elems.border.value)
	localStorage.setItem('joystick.active', elems.active.value)
	localStorage.setItem('joystick.bgImage', elems.bgImage.value)
	localStorage.setItem('joystick.bgOpacity', elems.bgOpacity.value)
	localStorage.setItem('joystick.bgBlur', elems.bgBlur.value)
	localStorage.setItem('joystick.customCSS', elems.customCSS.value)
	localStorage.setItem('joystick.driveSensitivity', elems.driveSensitivity.value)
	localStorage.setItem('joystick.drivePrecision', elems.drivePrecision.value)
	localStorage.setItem('joystick.locked', lockedBtns.join(','))
	localStorage.setItem('joystick.hidden', hiddenItems.join(','))

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

const $import = document.querySelector('.importSettings')
$import.addEventListener('click', importSettings)
function importSettings() {
	const el = document.createElement('input')
	el.type = 'file'
	el.style.display = 'none'
	el.click()
	el.onchange = async function () {
		try {
			const file = this.files[0]
			if (!file) return
			let content = await new Promise((resolve, reject) => {
				let reader = new FileReader()
				reader.onload = () => {
					resolve(reader.result)
				}
				reader.onerror = reject
				reader.readAsText(file)
			})
			content = JSON.parse(content)
			for (option in content) {
				ls.setItem(option, content[option])
			}
			loading()
			location.reload()
		} catch (err) {
			console.error(err)
			alert('Ocorreu um erro ao importar as configurações.')
		}
	}
}

const $export = document.querySelector('.exportSettings')
$export.addEventListener('click', exportSettings)

function exportSettings() {
	const content = JSON.stringify(ls)
	const el = document.createElement('a')
	const blob = new Blob([content], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	el.href = url
	el.download = `mobyStk-settings-${Date.now()}.json`
	el.click()
}


function scrollToY(y, duration = 0, element = document.scrollingElement) {
	if (element.scrollTop === y) return
	const cosParameter = (element.scrollTop - y) / 2
	let scrollCount = 0, oldTimestamp = null
	function step(newTimestamp) {
		if (oldTimestamp !== null) {
			scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration
			if (scrollCount >= Math.PI) return element.scrollTop = y
			element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount)
		}
		oldTimestamp = newTimestamp
		window.requestAnimationFrame(step)
	}
	window.requestAnimationFrame(step)
}

function getPrecision(num) {
	const str = Number(num).toString()
	const arr = str.indexOf('.') + 1
	return !arr ? 0 : str.length - arr
}