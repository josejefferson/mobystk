import { IButton } from './Button'
import { IImport } from './Element'
import { IGroup } from './Group'
import { IJoystick } from './Joystick'

export interface ILayout {
	type: string
	id: string
	name: string
	content: (IButton | IGroup | IJoystick | IImport)[]
}
