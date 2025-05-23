import gamepads from '../elements/gamepads'
import { escapeHTML } from '../utils/escape-html'
import getOpt, { ls } from '../utils/get-option'
import loading from '../utils/loading'
import { $form, formEls } from './elements'
import { FormElements } from './types'

// Carregar opções
formEls.code.value = getOpt('code', window.location.hostname + ':5000')
formEls.gamepad.value = getOpt('gamepad', gamepads[0].id)
formEls.player.value = getOpt('player', '1')
formEls.invertL.checked = getOpt('invertL', false)
formEls.invertR.checked = getOpt('invertR', false)
formEls.disJoyXAxis.checked = getOpt('disJoyXAxis', false)
formEls.disJoyYAxis.checked = getOpt('disJoyYAxis', false)
formEls.dblClickLoadSave.checked = getOpt('dblClickLoadSave', false)
formEls.changeKeyOnDrag.checked = getOpt('changeKeyOnDrag', true)
formEls.vibrate.value = getOpt('vibrate', '60')
formEls.vibrateJoystick.value = getOpt('vibrateJoystick', '0')
formEls.vibrationFromGame.checked = getOpt('vibrationFromGame', true)
formEls.useKeyboard.checked = getOpt('useKeyboard', false)
formEls.background.value = getOpt('background', 'rgba(0, 0, 0, 1)')
formEls.color.value = getOpt('color', 'rgba(255, 255, 255, 0.53)')
formEls.border.value = getOpt('border', 'rgba(255, 255, 255, 0.53)')
formEls.active.value = getOpt('active', 'rgba(255, 255, 255, 0.2)')
formEls.bgImage.value = getOpt('bgImage', '')
formEls.bgOpacity.value = getOpt('bgOpacity', '0.5')
formEls.bgBlur.value = getOpt('bgBlur', '0')
formEls.customCSS.value = getOpt('customCSS', '')
formEls.customJS.value = getOpt('customJS', '')
formEls.pluginMobile.value = getOpt('pluginMobile', false)
formEls.driveSensitivity.value = getOpt('driveSensitivity', '2')
formEls.drivePrecision.value = getOpt('drivePrecision', '1')
const locked = getOpt('locked', [])
const hidden = getOpt('hidden', [
	'mobystk:macro_record',
	'mobystk:macro_play',
	'mobystk:fast_forward',
	'mobystk:diag_left_up',
	'mobystk:diag_right_up',
	'mobystk:diag_left_down',
	'mobystk:diag_right_down',
	'mobystk:ping_chart'
])
for (const item of locked) {
	const $input = document.querySelector<HTMLInputElement>(
		`[name=lock][data-id="${escapeHTML(item)}"]`
	)
	if ($input) $input.checked = true
}
for (const item of hidden) {
	const $input = document.querySelector<HTMLInputElement>(
		`[name=hide][data-id="${escapeHTML(item)}"]`
	)
	if ($input) $input.checked = true
}

// Salvar opções
$form.addEventListener('submit', function (e) {
	e.preventDefault()
	const elems: FormElements = <FormElements>this.elements
	const lockedBtns: string[] = []
	const hiddenItems: string[] = []
	elems.lock.forEach((e) => {
		const el = e as HTMLInputElement
		if (el.checked) lockedBtns.push(el.value)
	})
	elems.hide.forEach((e) => {
		const el = e as HTMLInputElement
		if (el.checked) hiddenItems.push(el.value)
	})

	ls('code', elems.code.value)
	ls('gamepad', elems.gamepad.value)
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
	ls('useKeyboard', elems.useKeyboard.checked)
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
