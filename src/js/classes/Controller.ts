import buttons from '../layouts/buttons'
import groups from '../layouts/groups'
import joysticks from '../layouts/joysticks'
import layouts from '../layouts/layouts'

const Controller = {
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
