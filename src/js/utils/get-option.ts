import store from 'store2'
export const ls = store.namespace('joystick')

/**
 * Retorna uma opção do localStorage ou seu valor padrão
 */
export default function getOpt(name: string, defaultValue?: any): any {
	const value = ls(name)
	return value === null ? defaultValue : value
}

window.ls = ls
window.getOpt = getOpt
