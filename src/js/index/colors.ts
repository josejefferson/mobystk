import Pickr from '@simonwep/pickr'
import { ls } from '../utils/get-option'
import { $resetColors, formEls } from './elements'

const DEFAULT_COLORS = [
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
]

// Cores
const colors = {
	background: createPickr('background', '#000'),
	color: createPickr('color', '#FFF8', '88'),
	border: createPickr('border', '#FFF8', '88'),
	active: createPickr('active', '#FFF3', '33')
}

$resetColors.addEventListener('click', () => {
	colors.background.setColor('#000')
	colors.color.setColor('#FFF8')
	colors.border.setColor('#FFF8')
	colors.active.setColor('#FFF3')
})

function createPickr(el: string, defaultColor: string, opacity = '') {
	const colorPickerOptions: Pickr.Options = {
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
		i18n: { 'btn:save': 'Fechar' },
		swatches: DEFAULT_COLORS.map((e) => e + opacity)
	}

	return Pickr.create(colorPickerOptions)
		.on('change', colorPickerChange(el))
		.on('save', colorPickerSave(el))
}

function colorPickerChange(el: string) {
	return (color: Pickr.HSVaColor) => {
		const colorStr = color.toRGBA().toString()
		const $input = <HTMLInputElement>formEls[el as any]
		$input.value = colorStr
		$input
			.parentElement!.querySelector<HTMLElement>('.pickr button')!
			.style.setProperty('--pcr-color', colorStr)
	}
}

function colorPickerSave(_el: string) {
	return (_color: Pickr.HSVaColor, instance: Pickr) => {
		instance.hide()
	}
}
