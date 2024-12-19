import loading from '../utils/loading'
import {
	$bgImage,
	$deviceInfo,
	$DIBatteryIcon,
	$DIBatteryLevel,
	$DIClock,
	$DIPlayerNumber,
	$ping,
	$edit,
	$root
} from './elements'
import options from '../shared/options'
import { toast } from '../utils/toast'

// ELEMENTOS
if (options.hidden.includes('mobystk:deviceInfo')) {
	$deviceInfo.classList.add('hidden')
}
if (options.hidden.includes('mobystk:ping')) {
	$ping.classList.add('hidden')
}

// CARREGAMENTO DAS OPÇÕES
$edit.addEventListener('click', loading)
$edit.addEventListener('contextmenu', () => {
	window.layoutEditor.opened ? window.layoutEditor.end() : window.layoutEditor.start()
})
if (!options.layout) location.href = 'index.html'
if (options.debug) document.body.classList.add('debug')
if (options.invertL) document.body.classList.add('invertL')
if (options.invertR) document.body.classList.add('invertR')
if (options.bgImage) $bgImage.style.backgroundImage = `url('${options.bgImage}')`
if (options.bgOpacity) $bgImage.style.opacity = String(options.bgOpacity)
if (options.bgBlur) $bgImage.style.filter = `blur(${options.bgBlur}px)`
if (options.colorsBackground) $root.style.setProperty('--background', options.colorsBackground)
if (options.colorsColor) $root.style.setProperty('--color', options.colorsColor)
if (options.colorsBorder) $root.style.setProperty('--border', options.colorsBorder)
if (options.colorsActive) $root.style.setProperty('--active', options.colorsActive)

// CSS PERSONALIZADO
const $customCSS = document.createElement('style')
$customCSS.textContent = options.customCSS
document.body.append($customCSS)

// JS PERSONALIZADO
if (options.customJS && options.customJS.trim()) {
	if (confirm('Deseja executar os plugins?')) {
		try {
			new Function(options.customJS.trim())()
		} catch (err: any) {
			alert('Ocorreu um erro ao executar os plugins\n\n' + (err?.message || ''))
		}
	}
}

// PLUGIN MOBYSTK MOBILE
if (options.pluginMobile) {
	const $script = document.createElement('script')
	$script.src = 'lib/plugins/mobile.js'
	$script.onerror = () => toast('Erro ao carregar plugin MobyStk Mobile')
	document.body.appendChild($script)
}

// INFORMAÇÕES - BATERIA
navigator
	.getBattery?.()
	?.then((battery) => {
		updateBattery(battery)
		battery.addEventListener('chargingchange', (e: any) => updateBattery(e.target))
		battery.addEventListener('levelchange', (e: any) => updateBattery(e.target))
	})
	.catch(console.error)

// Atualiza o ícone e porcentagem da bateria
function updateBattery(battery: any) {
	$DIBatteryIcon.classList.remove(...Array.from($DIBatteryIcon.classList))
	$DIBatteryIcon.classList.add('mdi')
	const charging = battery.charging
	const level = battery.level * 100
	const roundLevel = Math.round(level / 10) * 10
	$DIBatteryLevel.innerText = Math.round(level) + '% •'
	if (roundLevel === 0) {
		$DIBatteryIcon.classList.add('mdi-battery-outline')
	} else if (roundLevel === 100) {
		$DIBatteryIcon.classList.add('mdi-battery' + (charging ? '-charging-100' : ''))
	} else {
		$DIBatteryIcon.classList.add('mdi-battery-' + (charging ? 'charging-' : '') + roundLevel)
	}
}

// INFORMAÇÕES - RELÓGIO
window.setInterval(updateClock, 1000)
updateClock()

// Atualiza as horas do relógio
function updateClock() {
	const hours = new Date().getHours().toString().padStart(2, '0')
	const minutes = new Date().getMinutes().toString().padStart(2, '0')
	$DIClock.innerText = hours + ':' + minutes
}

// INFORMAÇÕES - Nº JOGADOR E NOME DO LAYOUT
$DIPlayerNumber.innerText =
	(options.vgamepad ? 'Controle ' : 'Teclado ') + String(options.player + 1)

// ATUALIZA O JOGADOR DO CONTROLE NO MODO DEBUG
if (options.debug)
	$deviceInfo.addEventListener('click', () => {
		options.player += 1
		if (options.player > 3) options.player = 0
		$DIPlayerNumber.innerText = String(options.player + 1)
	})

export {}
