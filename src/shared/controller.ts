import type { AnyComponent } from '../components'
import type ButtonComponent from '../components/Button'
import type GroupComponent from '../components/Group'
import type JoystickComponent from '../components/Joystick'
import buttons from '../elements/buttons'
import gamepads from '../elements/gamepads'
import groups from '../elements/groups'
import joysticks from '../elements/joysticks'
import layout from '../elements/layout'
import type { IButton, IGroup, IJoystick, ILayout } from '../types'
import { IGamepad } from '../types/Gamepad'

interface IController {
	buttons: IButton[]
	groups: IGroup[]
	joysticks: IJoystick[]
	gamepads: IGamepad[]
	layout: ILayout
	currentLayout: ILayout | null
	currentTouches: {
		target: HTMLElement
		touch: Touch
		joystick: boolean
	}[]
	elements: {
		all: AnyComponent[]
		buttons: ButtonComponent[]
		groups: GroupComponent[]
		joysticks: JoystickComponent[]
	}
}

const Controller: IController = {
	buttons: buttons,
	groups: groups,
	joysticks: joysticks,
	gamepads: gamepads,
	layout: layout,
	currentLayout: null,
	currentTouches: [],
	elements: {
		all: [],
		buttons: [],
		groups: [],
		joysticks: []
	}
}

window.Controller = Controller
export default Controller
