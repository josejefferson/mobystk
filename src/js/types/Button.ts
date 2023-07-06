import type { IElement, IElementComponent } from './Element'
import type { ValueAndUnit } from './types'

export interface IButton extends IElement {
	/** Tipo de elemento */
	type: 'mobystk:button'

	/** Tecla do computador que será pressionada ao apertar o botão */
	key?: string

	/**
	 * Exibir ou ocultar bordas
	 * [borderTop, borderRight, borderBottom, borderLeft]
	 */
	border: [boolean, boolean, boolean, boolean]

	/** Tamanho da fonte do botão */
	fontSize?: ValueAndUnit

	/** Conteúdo do botão */
	content?: {
		/** Tipo de conteúdo */
		type: 'mobystk:text' | 'mobystk:icon'

		/** Conteúdo */
		value: string
	}

	/**
	 * Arredondamento da borda do botão
	 * [leftTop, rightTop, rightBottom, leftBottom]
	 */
	radius: [ValueAndUnit, ValueAndUnit, ValueAndUnit, ValueAndUnit]

	/** Botão é travável */
	lockable?: boolean

	/** Botão aumenta ao clicar */
	scalable?: boolean

	/** Botão executa ação personalizada */
	customAction?: string | false

	/** Botão é diagonal */
	diagonal?: boolean

	/** IDs dos botões de destino da diagonal */
	targets?: string[]
}

export interface IButtonComponent extends IButton, IElementComponent {
	/** Tipo de elemento */
	type: 'mobystk:button'

	/** Botão está ativo */
	active: boolean

	/** HTML do botão */
	_html?: string
}
