export interface IElement {
	type: string
	id: string
	name: string
	x: [number, string]
	y: [number, string]
	anchorX: number
	anchorY: number
	width?: [number, string]
	height?: [number, string]
	content?: any
}

export type IElementNode<Instance, NodeElement> = NodeElement & {
	instance: Instance
}

export interface IImport {
	import: string
	[key: string]: any
}
