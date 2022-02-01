// ELEMENTOS
const $root = document.documentElement
const $edit = document.querySelector('.edit')
const $bgImage = document.querySelector('.backgroundImage')
const $deviceInfo = document.querySelector('.deviceInfo')
const $DIBattery = $deviceInfo.querySelector('.battery')
const $DIBatteryIcon = $DIBattery.querySelector('.battery-icon')
const $DIBatteryLevel = $DIBattery.querySelector('.battery-level')
const $DIClock = $deviceInfo.querySelector('.clock')
const $DIPlayerNumber = $deviceInfo.querySelector('.player .player-number')
const $DILayout = $deviceInfo.querySelector('.layout')
const $DIStatus = $deviceInfo.querySelector('.status')

// CARREGAMENTO DAS OPÇÕES
$edit.addEventListener('click', loading)
$edit.addEventListener('contextmenu', () => {
	if (!layoutEditor.opened) {
		layoutEditor.start()
	} else {
		layoutEditor.end()
	}
})
if (!options.layout) location.href = 'index.html'
if (options.debug) document.body.classList.add('debug')
if (options.invertL) document.body.classList.add('invertL')
if (options.invertR) document.body.classList.add('invertR')
if (options.bgImage) $bgImage.style.backgroundImage = `url('${options.bgImage}')`
if (options.bgOpacity) $bgImage.style.opacity = options.bgOpacity
if (options.bgBlur) $bgImage.style.filter = `blur(${options.bgBlur}px)`
if (options.colorsBackground) $root.style.setProperty('--background', options.colorsBackground)
if (options.colorsColor) $root.style.setProperty('--color', options.colorsColor)
if (options.colorsBorder) $root.style.setProperty('--border', options.colorsBorder)
if (options.colorsActive) $root.style.setProperty('--active', options.colorsActive)

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
	$DIBatteryIcon.classList.remove(...$DIBatteryIcon.classList)
	$DIBatteryIcon.classList.add('mdi')
	const charging = b.charging
	const level = b.level * 100
	const roundLevel = Math.round(level / 10) * 10
	$DIBatteryLevel.innerText = Math.round(level) + '%'
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
$DIPlayerNumber.innerText = options.player + 1
$DILayout.innerText = Controller.layouts.find(l => l.id === options.layout).name


// ATUALIZA O JOGADOR DO CONTROLE NO MODO DEBUG
if (options.debug) $deviceInfo.addEventListener('click', () => {
	options.player += 1
	if (options.player > 3) options.player = 0
	$DIPlayerNumber.innerText = options.player + 1
})