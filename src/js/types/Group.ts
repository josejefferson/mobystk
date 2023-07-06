import type { IElementsOrImport } from '.'
import type { AnyComponent } from '../components'
import type { IElement, IElementComponent } from './Element'

export interface IGroup extends IElement {
	/** Tipo de elemento */
	type: 'mobystk:group'

	/** Conteúdo não processado do grupo */
	content: IElementsOrImport[]

	/** Conteúdo do grupo em componentes */
	parsedContent?: AnyComponent[]
}

export interface IGroupComponent extends IGroup, IElementComponent {
	/** Tipo de elemento */
	type: 'mobystk:group'
}
