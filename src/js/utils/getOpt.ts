import store from 'store2'
export const ls = store.namespace('joystick')

export default function getOpt(name: string, defaultValue?: any): any {
	const value = ls(name)
	return value === null ? defaultValue : value
}
