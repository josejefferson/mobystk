import { IElement } from './Element'

export interface IJoystick extends IElement {
	size: [number, string]
	padding: number
	keys: [string, string, string, string]
}
