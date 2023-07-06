import type { JoystickManager } from 'nipplejs'
import type { IElement, IElementComponent } from './Element'
import type { ValueAndUnit } from './types'

export interface IJoystick extends IElement {
	/** Tipo de elemento */
	type: 'mobystk:joystick'

	/** Tamanho do joystick */
	size: ValueAndUnit

	/** Espaçamento do joystick */
	padding: number

	/**
	 * Teclas que serão enviadas ao computador
	 * [Cima, Esquerda, Baixo, Direita]
	 */
	keys: [string, string, string, string]
}

export interface IJoystickComponent extends IJoystick, IElementComponent {
	/** Tipo de elemento */
	type: 'mobystk:joystick'

	/** Posição atual do joystick */
	position: {
		/** Cima */
		up: boolean

		/** Baixo */
		down: boolean

		/** Esquerda */
		left: boolean

		/** Direita */
		right: boolean
	}
	nipple: JoystickManager
}
