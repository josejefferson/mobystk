// ELEMENTOS
const $root = document.documentElement
const $edit = document.querySelector('.edit')
const $bgImage = document.querySelector('.backgroundImage')
const $layoutCSS = document.querySelector('.layout')
const $deviceInfo = document.querySelector('.deviceInfo')
const $DI_battery = $deviceInfo.querySelector('.battery')
const $DI_batteryIcon = $DI_battery.querySelector('.battery-icon')
const $DI_batteryLevel = $DI_battery.querySelector('.battery-level')
const $DI_clock = $deviceInfo.querySelector('.clock')
const $DI_playerNumber = $deviceInfo.querySelector('.player .player-number')
const $DI_layout = $deviceInfo.querySelector('.layout')

// CARREGAMENTO DO LAYOUT
$layoutCSS.href = 'layouts/' + options.layout + '.css'

// CARREGAMENTO DAS OPÇÕES
$edit.onclick = loading
if (!options.layout) location.href = 'index.html'
if (options.debug) document.body.classList.add('debug')
if (options.invert) document.body.classList.add('invert')
if (options.bgImage) $bgImage.style.backgroundImage = `url('${options.bgImage}')`
if (options.bgOpacity) $bgImage.style.opacity = options.bgOpacity
if (options.bgBlur) $bgImage.style.filter = `blur(${options.bgBlur}px)`
if (options.colorsBackground) $root.style.setProperty('--background', options.colorsBackground)
if (options.colorsColor) $root.style.setProperty('--color', options.colorsColor)
if (options.colorsBorder) $root.style.setProperty('--border', options.colorsBorder)
if (options.colorsActive) $root.style.setProperty('--active', options.colorsActive)

// BOTÕES BLOQUEÁVEIS
options.locked?.forEach(key => {
	if (key) key.split(' ').forEach(key => {
		document.querySelectorAll('.' + key).forEach(el => {
			el.classList.add('lock')
		})
	})
})

// BOTÕES OCULTOS
options.hidden?.forEach(item => {
	if (item) item.split(' ').forEach(item => {
		document.querySelectorAll('.' + item).forEach(el => {
			el.style.display = 'none'
		})
	})
})

// CSS PERSONALIZADO
const $customCSS = document.createElement('style')
$customCSS.textContent = options.customCSS
document.body.append($customCSS)

// INFORMAÇÕES - BATERIA
navigator.getBattery()?.then(b => {
	updateBattery(b)
	b.addEventListener('chargingchange', e => updateBattery(e.target))
	b.addEventListener('levelchange', e => updateBattery(e.target))
}).catch(console.error)

// Atualiza o ícone e porcentagem da bateria
function updateBattery(b) {
	$DI_batteryIcon.classList.remove(...$DI_batteryIcon.classList)
	$DI_batteryIcon.classList.add('mdi')
	const charging = b.charging
	const level = b.level * 100
	const roundLevel = Math.round(level / 10) * 10
	$DI_batteryLevel.innerText = Math.round(level) + '%'
	if (roundLevel === 0) {
		$DI_batteryIcon.classList.add('mdi-battery-outline')
	} else if (roundLevel === 100) {
		$DI_batteryIcon.classList.add('mdi-battery' + (charging ? '-charging-100' : ''))
	} else {
		$DI_batteryIcon.classList.add('mdi-battery-' + (charging ? 'charging-' : '') + roundLevel)
	}
}

// INFORMAÇÕES - RELÓGIO
window.setInterval(updateClock, 1000)
updateClock()

// Atualiza as horas do relógio
function updateClock() {
	const hours = new Date().getHours().toString().padStart(2, '0')
	const minutes = new Date().getMinutes().toString().padStart(2, '0')
	$DI_clock.innerText = hours + ':' + minutes
}

// INFORMAÇÕES - Nº JOGADOR E NOME DO LAYOUT
$DI_playerNumber.innerText = options.player + 1
$DI_layout.innerText = options.layout.toUpperCase()