import buttons from '../elements/buttons'
import groups from '../elements/groups'
import joysticks from '../elements/joysticks'
import layouts from '../elements/layouts'

import type { AnyComponent } from '../components'
import type ButtonComponent from '../components/Button'
import type GroupComponent from '../components/Group'
import type JoystickComponent from '../components/Joystick'
import type { IButton, IGroup, IJoystick, ILayout } from '../types'

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

window.Controller = Controller
export default Controller
