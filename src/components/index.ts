import ButtonComponent from './Button'
import ElementComponent from './Element'
import GroupComponent from './Group'
import JoystickComponent from './Joystick'

const Components = {
	Button: ButtonComponent,
	Element: ElementComponent,
	Group: GroupComponent,
	Joystick: JoystickComponent
}

export type AnyComponent = ButtonComponent | GroupComponent | JoystickComponent
export default Components
