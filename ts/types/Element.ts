import type GroupComponent from '../components/Group'
import type { ValueAndUnit } from './types'

export interface IElement {
	/** Tipo de elemento */
	type: string

	/** ID do elemento */
	id: string

	/** Nome do elemento */
	name: string

	/** Coordenada X do elemento */
	x: ValueAndUnit

	/** Coordenada Y do elemento */
	y: ValueAndUnit

	/**
	 * Âncora X do elemento:
	 * 0 = Esquerda;
	 * 1 = Direita;
	 * 2 = Centro
	 */
	anchorX: number

	/**
	 * Âncora Y do elemento:
	 * 0 = Cima;
	 * 1 = Baixo;
	 * 2 = Centro
	 */
	anchorY: number

	/** Largura do elemento */
	width?: ValueAndUnit

	/** Altura do elemento */
	height?: ValueAndUnit
}

export interface IElementComponent extends IElement {
	/** Elemento HTML */
	element?: HTMLElement

	/** Editando elemento */
	editing?: boolean

	/** Grupo a que pertence o elemento */
	parent?: GroupComponent
}

export type IElementNode<Instance, NodeElement> = NodeElement & {
	/** Classe do elemento */
	instance: Instance
}
