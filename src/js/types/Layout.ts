import type { IElementsOrImport } from '.'
import type { AnyComponent } from '../components'

export interface ILayout {
	/** Tipo de elemento */
	type: 'mobystk:layout'

	/** ID do layout */
	id: string

	/** Nome do layout */
	name: string

	/** Nome do emulador ou subtítulo */
	subtitle?: string

	/** Aviso que será exibido ao clicar no layout */
	warning?: string

	/** Elementos do layout */
	content: IElementsOrImport[]
}

export interface ILayoutComponent extends ILayout {
	/** Elementos processados do layout */
	parsedContent: AnyComponent[]
}
