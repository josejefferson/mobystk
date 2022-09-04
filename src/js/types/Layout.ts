import type ButtonComponent from '../components/Button'
import type GroupComponent from '../components/Group'
import type JoystickComponent from '../components/Joystick'
import type { IButton } from './Button'
import type { IGroup } from './Group'
import type { IImport } from './Import'
import type { IJoystick } from './Joystick'

export interface ILayout {
	/** Tipo de elemento */
	type: 'mobystk:layout'

	/** ID do layout */
	id: string

	/** Nome do layout */
	name: string

	/** Elementos do layout */
	content: (IButton | IGroup | IJoystick | IImport)[]
}

export interface ILayoutComponent extends ILayout {
	/** Elementos processados do layout */
	parsedContent: (GroupComponent | ButtonComponent | JoystickComponent)[]
}
