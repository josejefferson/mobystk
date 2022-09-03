import { IButton } from './Button'
import { IElement, IImport } from './Element'
import { IJoystick } from './Joystick'

export interface IGroup extends IElement {
	content: (IButton | IGroup | IJoystick | IElement | IImport)[]
}
