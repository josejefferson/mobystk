import type ButtonComponent from '../components/Button'
import type GroupComponent from '../components/Group'
import type JoystickComponent from '../components/Joystick'
import type { IButton } from './Button'
import type { IElement, IElementComponent } from './Element'
import type { IImport } from './Import'
import type { IJoystick } from './Joystick'

export interface IGroup extends IElement {
	/** Tipo de elemento */
	type: 'mobystk:group'

	/** Conteúdo não processado do grupo */
	content: (IButton | IGroup | IJoystick | IElement | IImport)[]

	/** Conteúdo do grupo em componentes */
	parsedContent?: (ButtonComponent | GroupComponent | JoystickComponent)[]
}

export interface IGroupComponent extends IGroup, IElementComponent {
	/** Tipo de elemento */
	type: 'mobystk:group'
}
