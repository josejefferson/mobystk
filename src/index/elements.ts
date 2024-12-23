import { FormElements } from './types'

export const $form = document.forms[0]
export const formEls: FormElements = <FormElements>$form.elements
export const $forgetPassword = document.querySelector('.forgetPassword')!
export const $athPopup = document.querySelector<HTMLDivElement>('.addToHomescreenPopup')!
export const $athPopupClose = $athPopup.querySelector<HTMLButtonElement>('.close-popup')!
export const $athPopupDSA = $athPopup.querySelector<HTMLInputElement>(
	'.dontShowAgainAddToHomescreenPopup'
)!
export const $selectLayout = document.querySelector('.selectLayout')!
export const $lockableKeys = document.querySelector('.lockableKeysList')!
export const $hiddenItems = document.querySelector('.hiddenItemsList')!
export const $inputsRange = document.querySelectorAll<HTMLInputElement>(
	'input[type="range"] + .value'
)
export const $resetColors = document.querySelector('.resetColors')!
export const $import = document.querySelector('.importSettings')!
export const $export = document.querySelector('.exportSettings')!
