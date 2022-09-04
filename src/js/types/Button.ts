import { IElement } from './Element'

export interface IButton extends IElement {
	key?: string
	border: [boolean, boolean, boolean, boolean]
	fontSize?: [number, string]
	content?: {
		type: string
		value: string
	}
	radius: [[number, string], [number, string], [number, string], [number, string]]
	lockable?: boolean
	scalable?: boolean
	customAction?: string
	diagonal?: boolean
	targets?: string[]
}
