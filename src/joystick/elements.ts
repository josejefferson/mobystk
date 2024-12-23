export const $root = document.documentElement
export const $edit = document.querySelector<HTMLElement>('.edit')!
export const $bgImage = document.querySelector<HTMLElement>('.backgroundImage')!
export const $deviceInfo = document.querySelector<HTMLElement>('.deviceInfo')!
export const $DIBattery = $deviceInfo.querySelector<HTMLElement>('.battery')!
export const $DIBatteryIcon = $DIBattery.querySelector<HTMLElement>('.battery-icon')!
export const $DIBatteryLevel = $DIBattery.querySelector<HTMLElement>('.battery-level')!
export const $DIClock = $deviceInfo.querySelector<HTMLElement>('.clock')!
export const $DIPlayerNumber = $deviceInfo.querySelector<HTMLElement>('.player .player-number')!
export const $DIStatus = $deviceInfo.querySelector<HTMLElement>('.status')!
export const $ping = document.querySelector<HTMLElement>('.ping')!
export const $controllerIndicator = document.querySelector('.controller-indicator')!
export const $layout = document.querySelector('.controller-layout')!
export const $viewport = document.querySelector('meta[name="viewport"]')!
