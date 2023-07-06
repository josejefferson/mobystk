window.ls = store.namespace('joystick')
window.toast = alert // temporário
const form = document.forms[0]
const formEls = form.elements

// Contador de visitas
let hits = parseInt(ls('stats.hits.home'))
if (isNaN(hits)) hits = 0
ls('stats.hits.home', ++hits)

// Eventos
window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

window.addEventListener('load', updateStartButton)
window.addEventListener('scroll', updateStartButton)

function updateStartButton() {
	if (document.scrollingElement.scrollTop > window.innerHeight) {
		document.querySelector('.start.floating').classList.remove('hidden')
	} else {
		document.querySelector('.start.floating').classList.add('hidden')
	}
}

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

// Esquecer senha do MobyStk
const $forgetPassword = document.querySelector('.forgetPassword')
if (ls('password') !== null) {
	$forgetPassword.classList.remove('hidden')
}
$forgetPassword.addEventListener('click', () => {
	ls.remove('password')
	$forgetPassword.classList.add('hidden')
	toast('A senha do MobyStk foi esquecida')
})

// Tela de carregamento
const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}

// Popup "Adicionar à tela inicial"
const $athPopup = document.querySelector('.addToHomescreenPopup')
const $athPopupClose = $athPopup.querySelector('.close-popup')
const $athPopupDSA = $athPopup.querySelector('.dontShowAgainAddToHomescreenPopup')
$athPopupClose.addEventListener('click', () => {
	$athPopup.classList.remove('show')
	if (!$athPopupDSA.checked) return
	ls('events.addToHomescreenPopup', true)
})

if (!ls('events.addToHomescreenPopup') && (hits === 3 || hits % 10 === 0)) {
	window.addEventListener('load', () => {
		const $video = document.createElement('video')
		$video.src = 'video/add-to-homescreen-tutorial.mp4'
		$video.loop = true
		$video.muted = true
		$athPopup.querySelector('.content').appendChild($video)
		$video.play()
		$athPopup.classList.add('show')
	})
}

// Carregar elementos
const $selectLayout = document.querySelector('.selectLayout')
for (const layout of Controller.layouts) {
	$selectLayout.innerHTML += `
		<label class="chip">
			<input type="radio" name="layout" value="${escapeHTML(layout.id)}">
			<div class="label">${escapeHTML(layout.name)}</div>
		</label>`
}

const $lockableKeys = document.querySelector('.lockableKeysList')
for (const button of Controller.buttons) {
	if (!button.content || button.customAction || button.diagonal) continue
	let content = ''
	if (button.content.type === 'mobystk:text') content += escapeHTML(button.content.value)
	else if (button.content.type === 'mobystk:icon') content += `<i class="mdi mdi-${escapeHTML(button.content.value)}"></i>`
	$lockableKeys.innerHTML += `
		<label class="chip">
			<input type="checkbox" name="lock" data-id="${escapeHTML(button.id)}" value="${escapeHTML(button.id)}">
			<div class="label">${content}</div>
		</label>`
}

const $hiddenItems = document.querySelector('.hiddenItemsList')
for (const element of [...Controller.buttons, ...Controller.groups, ...Controller.joysticks]) {
	let content = ''
	if (element.type === 'mobystk:group') content += '<i class="mdi mdi-group"></i>&nbsp;'
	if (element.type === 'mobystk:joystick') content += '<i class="mdi mdi-gamepad"></i>&nbsp;'
	if (element.content?.type === 'mobystk:text') content += escapeHTML(element.content.value)
	else if (element.content?.type === 'mobystk:icon') content += `<i class="mdi mdi-${escapeHTML(element.content.value)}"></i>`
	else if (element.name) content += escapeHTML(element.name)

	$hiddenItems.innerHTML += `
		<label class="chip"">
			<input type="checkbox" name="hide" data-id="${escapeHTML(element.id)}" value="${escapeHTML(element.id)}">
			<div class="label">${content}</div>
		</label>`
}

// Carregar opções
formEls.code.value = getOpt('code', window.location.hostname + ':5000')
formEls.layout.value = getOpt('layout', Controller.layouts[0]?.id)
formEls.player.value = getOpt('player', '1')
formEls.invertL.checked = getOpt('invertL', false)
formEls.invertR.checked = getOpt('invertR', false)
formEls.disJoyXAxis.checked = getOpt('disJoyXAxis', false)
formEls.disJoyYAxis.checked = getOpt('disJoyYAxis', false)
formEls.dblClickLoadSave.checked = getOpt('dblClickLoadSave', false)
formEls.changeKeyOnDrag.checked = getOpt('changeKeyOnDrag', true)
formEls.vibrate.value = getOpt('vibrate', '15')
formEls.vibrateJoystick.value = getOpt('vibrateJoystick', '5')
formEls.vibrationFromGame.checked = getOpt('vibrationFromGame', true)
formEls.vgamepad.checked = getOpt('vgamepad', false)
formEls.background.value = getOpt('background', 'rgba(0, 0, 0, 1)')
formEls.color.value = getOpt('color', 'rgba(255, 255, 255, 0.53)')
formEls.border.value = getOpt('border', 'rgba(255, 255, 255, 0.53)')
formEls.active.value = getOpt('active', 'rgba(255, 255, 255, 0.2)')
formEls.bgImage.value = getOpt('bgImage', '')
formEls.bgOpacity.value = getOpt('bgOpacity', '0.5')
formEls.bgBlur.value = getOpt('bgBlur', '0')
formEls.customCSS.value = getOpt('customCSS', '')
formEls.customJS.value = getOpt('customJS', '')
formEls.pluginMobile.checked = getOpt('pluginMobile', false)
formEls.driveSensitivity.value = getOpt('driveSensitivity', '2')
formEls.drivePrecision.value = getOpt('drivePrecision', '1')
const locked = getOpt('locked', [])
const hidden = getOpt('hidden', ['mobystk:macro_record', 'mobystk:macro_play', 'mobystk:fast_forward'])
for (const item of locked) {
	const $input = document.querySelector(`[name=lock][data-id="${escapeHTML(item)}"]`)
	if ($input) $input.checked = true
}
for (const item of hidden) {
	const $input = document.querySelector(`[name=hide][data-id="${escapeHTML(item)}"]`)
	if ($input) $input.checked = true
}

function getOpt(name, defaultValue) {
	const value = ls(name)
	return value === null ? defaultValue : value
}

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

	ls('code', elems.code.value)
	ls('layout', elems.layout.value)
	ls('player', Number(elems.player.value))
	ls('debug', elems.debug.checked)
	ls('invertL', elems.invertL.checked)
	ls('invertR', elems.invertR.checked)
	ls('disJoyXAxis', elems.disJoyXAxis.checked)
	ls('disJoyYAxis', elems.disJoyYAxis.checked)
	ls('dblClickLoadSave', elems.dblClickLoadSave.checked)
	ls('changeKeyOnDrag', elems.changeKeyOnDrag.checked)
	ls('vibrate', Number(elems.vibrate.value))
	ls('vibrateJoystick', Number(elems.vibrateJoystick.value))
	ls('vibrationFromGame', elems.vibrationFromGame.checked)
	ls('vgamepad', elems.vgamepad.checked)
	ls('background', elems.background.value)
	ls('color', elems.color.value)
	ls('border', elems.border.value)
	ls('active', elems.active.value)
	ls('bgImage', elems.bgImage.value)
	ls('bgOpacity', Number(elems.bgOpacity.value))
	ls('bgBlur', Number(elems.bgBlur.value))
	ls('customCSS', elems.customCSS.value)
	ls('customJS', elems.customJS.value)
	ls('pluginMobile', elems.pluginMobile.checked)
	ls('driveSensitivity', Number(elems.driveSensitivity.value))
	ls('drivePrecision', Number(elems.drivePrecision.value))
	ls('locked', lockedBtns)
	ls('hidden', hiddenItems)

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
		default: ls(el) || defaultColor,
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
			'btn:save': 'Fechar'
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
			const content = await new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.onload = () => resolve(reader.result)
				reader.onerror = reject
				reader.readAsText(file)
			})
			ls(JSON.parse(content))
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
	const content = JSON.stringify(ls())
	const el = document.createElement('a')
	const blob = new Blob([content], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	el.href = url
	el.download = `mobyStk-settings-${new Date().toISOString()}.json`
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

function escapeHTML(unsafe) {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}