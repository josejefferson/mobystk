import Controller from '../shared/controller'
import type { IElements } from '../types'
import { escapeHTML } from '../utils/escape-html'
import { ls } from '../utils/get-option'
import getPrecision from '../utils/get-precision'
import { toast } from '../utils/toast'
import {
	$athPopup,
	$athPopupClose,
	$athPopupDSA,
	$forgetPassword,
	$hiddenItems,
	$inputsRange,
	$lockableKeys,
	$selectLayout
} from './elements'

// Botão Iniciar
window.addEventListener('load', updateStartButton)
window.addEventListener('scroll', updateStartButton)

function updateStartButton() {
	if (document.scrollingElement!.scrollTop > window.innerHeight) {
		document.querySelector<HTMLElement>('.start.floating')!.classList.remove('hidden')
	} else {
		document.querySelector<HTMLElement>('.start.floating')!.classList.add('hidden')
	}
}

// Contador de visitas
let hits = parseInt(ls('stats.hits.home'))
if (isNaN(hits)) hits = 0
ls('stats.hits.home', ++hits)

// Esquecer senha do MobyStk
if (ls('password') !== null) {
	$forgetPassword.classList.remove('hidden')
}
$forgetPassword.addEventListener('click', () => {
	ls.remove('password')
	$forgetPassword.classList.add('hidden')
	toast('A senha do MobyStk foi esquecida')
})

// Popup "Adicionar à tela inicial"
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
		$athPopup.querySelector('.content')!.appendChild($video)
		$video.play()
		$athPopup.classList.add('show')
	})
}

// Carregar elementos
for (const layout of Controller.layouts) {
	const $button = document.createElement('label')
	$button.classList.add('chip')

	const $input = document.createElement('input')
	$input.type = 'radio'
	$input.name = 'layout'
	$input.value = layout.id

	const $label = document.createElement('div')
	$label.classList.add('label')

	const $labelTitle = document.createElement('div')
	$labelTitle.classList.add('label-title')
	$labelTitle.innerText = layout.name

	const $labelSubtitle = document.createElement('div')
	$labelSubtitle.classList.add('label-subtitle')
	$labelSubtitle.innerText = layout.subtitle || ''

	if (layout.info) {
		$label.addEventListener('click', () => toast(layout.info || ''))
	}

	$label.appendChild($labelTitle)
	$label.appendChild($labelSubtitle)
	$button.appendChild($input)
	$button.appendChild($label)
	$selectLayout.appendChild($button)
}

// Botões para travar
for (const button of Controller.buttons) {
	if (!button.content || button.customAction || button.diagonal) continue
	let content = ''
	if (button.content.type === 'mobystk:text') content += escapeHTML(button.content.value)
	else if (button.content.type === 'mobystk:icon')
		content += `<i class="mdi mdi-${escapeHTML(button.content.value)}"></i>`
	$lockableKeys.innerHTML += `
		<label class="chip">
			<input type="checkbox" name="lock" data-id="${escapeHTML(button.id)}" value="${escapeHTML(
		button.id
	)}">
			<div class="label">${content}</div>
		</label>`
}

// Elementos para ocultar
const elements: IElements[] = [...Controller.buttons, ...Controller.groups, ...Controller.joysticks]
for (const element of elements) {
	let content = ''
	if (element.type === 'mobystk:group') content += '<i class="mdi mdi-group"></i>&nbsp;'
	if (element.type === 'mobystk:joystick') content += '<i class="mdi mdi-gamepad"></i>&nbsp;'
	if ('content' in element && 'type' in element.content! && element.content.type === 'mobystk:text')
		content += escapeHTML(element.content.value)
	else if (
		'content' in element &&
		'type' in element.content! &&
		element.content.type === 'mobystk:icon'
	)
		content += `<i class="mdi mdi-${escapeHTML(element.content.value)}"></i>`
	else if (element.name) content += escapeHTML(element.name)

	$hiddenItems.innerHTML += `
		<label class="chip">
			<input type="checkbox" name="hide" data-id="${escapeHTML(element.id)}" value="${escapeHTML(
		element.id
	)}">
			<div class="label">${content}</div>
		</label>`
}

// Valores dos inputs range
$inputsRange.forEach(($value) => {
	const $range = $value.parentElement!.querySelector<HTMLInputElement>('input[type="range"]')!
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
