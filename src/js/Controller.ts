import buttons from './layouts/buttons'
import groups from './layouts/groups'
import joysticks from './layouts/joysticks'
import layouts from './layouts/layouts'

import type ButtonComponent from './components/Button'
import type GroupComponent from './components/Group'
import type JoystickComponent from './components/Joystick'
import type { IButton, IGroup, IJoystick, ILayout } from './types'

interface IController {
	buttons: IButton[]
	groups: IGroup[]
	joysticks: IJoystick[]
	layouts: ILayout[]
	currentLayout: ILayout | null
	currentTouches: {
		target: HTMLElement
		touch: Touch
		joystick: boolean
	}[]
	elements: {
		all: (ButtonComponent | GroupComponent | JoystickComponent)[]
		buttons: ButtonComponent[]
		groups: GroupComponent[]
		joysticks: JoystickComponent[]
	}
}

const Controller: IController = {
	buttons: buttons,
	groups: groups,
	joysticks: joysticks,
	layouts: layouts,
	currentLayout: null,
	currentTouches: [],
	elements: {
		all: [],
		buttons: [],
		groups: [],
		joysticks: []
	}
}

export default Controller
