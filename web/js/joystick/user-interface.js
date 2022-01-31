// ELEMENTOS
const $root = document.documentElement
const $edit = document.querySelector('.edit')
const $bgImage = document.querySelector('.backgroundImage')
const $deviceInfo = document.querySelector('.deviceInfo')
const $DI_battery = $deviceInfo.querySelector('.battery')
const $DI_batteryIcon = $DI_battery.querySelector('.battery-icon')
const $DI_batteryLevel = $DI_battery.querySelector('.battery-level')
const $DI_clock = $deviceInfo.querySelector('.clock')
const $DI_playerNumber = $deviceInfo.querySelector('.player .player-number')
const $DI_layout = $deviceInfo.querySelector('.layout')
const $DI_status = $deviceInfo.querySelector('.status')

// CARREGAMENTO DAS OPÇÕES
// const $script = document.createElement('script') // temp
// $script.src = 'js/joystick/layout-editor.js' // temp
// $script.addEventListener('load', () => window.layoutEditor.load()) // temp
// document.body.appendChild($script) // temp
// document.body.classList.add('loading-layout-editor') // temp
$edit.addEventListener('click', loading)
$edit.addEventListener('contextmenu', () => {
	if (!window.layoutEditor) {
		const $script = document.createElement('script')
		$script.src = 'js/joystick/layout-editor.js'
		$script.addEventListener('load', () => window.layoutEditor.load())
		document.body.appendChild($script)
		document.body.classList.add('loading-layout-editor')
	} else if (!window.layoutEditor.opened) {
		window.layoutEditor.start()
	} else {
		window.layoutEditor.end()
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
$DI_layout.innerText = Controller.layouts.find(l => l.id === options.layout).name


// ATUALIZA O JOGADOR DO CONTROLE NO MODO DEBUG
if (options.debug) $deviceInfo.addEventListener('click', () => {
	options.player += 1
	if (options.player > 3) options.player = 0
	$DI_playerNumber.innerText = options.player + 1
})