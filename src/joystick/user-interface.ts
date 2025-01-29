import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'
import chroma from 'chroma-js'
import options from '../shared/options'
import loading from '../utils/loading'
import { toast } from '../utils/toast'
import {
	$bgImage,
	$controllerIndicator,
	$deviceInfo,
	$DIBatteryIcon,
	$DIBatteryLevel,
	$DIClock,
	$DIPlayerNumber,
	$edit,
	$pingChart,
	$root,
	$version
} from './elements'

// ELEMENTOS
if (options.hidden.includes('mobystk:deviceInfo')) {
	$deviceInfo.classList.add('hidden')
}
if (options.hidden.includes('mobystk:version')) {
	$version.classList.add('hidden')
}

// VERSÃO
$version.innerText = `v${VERSION}`

// CARREGAMENTO DAS OPÇÕES
$edit.addEventListener('click', loading)
$edit.addEventListener('contextmenu', () => {
	if (window.layoutEditor.opened) window.layoutEditor.end()
	else window.layoutEditor.start()
})
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
			// eslint-disable-next-line @typescript-eslint/no-implied-eval
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
updateInfo()

// Atualiza as horas do relógio
function updateClock() {
	const hours = new Date().getHours().toString().padStart(2, '0')
	const minutes = new Date().getMinutes().toString().padStart(2, '0')
	$DIClock.innerText = hours + ':' + minutes
}

// INFORMAÇÕES - Nº JOGADOR E NOME DO LAYOUT
export function updateInfo() {
	const controllerIndicatorClass = options.useKeyboard ? 'mdi-keyboard' : 'mdi-google-controller'
	$controllerIndicator.classList.add(controllerIndicatorClass)
	$DIPlayerNumber.innerText =
		(options.useKeyboard ? 'Teclado ' : 'Controle ') + String(options.player + 1)
}

// ATUALIZA O JOGADOR DO CONTROLE NO MODO DEBUG
if (options.debug)
	$deviceInfo.addEventListener('click', () => {
		options.player += 1
		if (options.player > 3) options.player = 0
		updateInfo()
	})

// GRÁFICO DE LATÊNCIA
Chart.register(BarController, CategoryScale, LinearScale, BarElement)

const MAX_PINGS = 30
const hidePingChart = options.hidden.includes('mobystk:ping_chart')
const pings = Array(MAX_PINGS).fill(0)

const chart = hidePingChart
	? null
	: new Chart($pingChart, {
			type: 'bar',
			options: {
				responsive: false,
				animation: {
					duration: 500,
					easing: 'easeOutQuart'
				},
				scales: {
					x: { display: false },
					y: { display: false, min: 0, max: 999 }
				},
				plugins: {
					legend: { display: false },
					tooltip: { enabled: false }
				}
			},
			data: {
				labels: pings.map((_, i) => i + 1),
				datasets: [
					{
						data: pings,
						backgroundColor: pings.map(pingBarColor),
						borderWidth: 0
					}
				]
			}
	  })

/** Adiciona um novo ping ao gráfico */
export function addPing(time: number) {
	if (!chart) return
	if (pings.length >= MAX_PINGS) pings.shift()
	pings.push(time)
	chart.data.labels = pings.map((_, i) => i + 1)
	chart.data.datasets[0].data = pings
	chart.data.datasets[0].backgroundColor = pings.map(pingBarColor)
	chart.update('active')
}

/** Retorna a cor da barra baseado no valor */
export function pingBarColor(time: number) {
	return chroma
		.scale(['#00bcff', '#fdc700', '#fb2c36'])
		.domain([0, 300, 999])
		.mode('lab')(time)
		.hex()
}
