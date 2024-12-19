import options from '../shared/options'
import type { ILayout } from '../types/Layout'

const commonItems = [
	{ import: 'mobystk:fullscreen' },
	{ import: 'mobystk:volume_up' },
	{ import: 'mobystk:volume_down' },
	{ import: 'mobystk:macro_record' },
	{ import: 'mobystk:macro_play' },
	{ import: 'mobystk:save_state' },
	{ import: 'mobystk:drive' },
	{ import: 'mobystk:load_state' },
	{ import: 'mobystk:select' },
	{ import: 'mobystk:pause' },
	{ import: 'mobystk:start' },
	{ import: 'mobystk:fast_forward' },
	{ import: 'mobystk:left_1' },
	{ import: 'mobystk:left_2' },
	{ import: 'mobystk:left_3' },
	{ import: 'mobystk:right_1' },
	{ import: 'mobystk:right_2' },
	{ import: 'mobystk:right_3' },
	{ import: options.invertL ? 'mobystk:arrows_bottom' : 'mobystk:arrows_top' },
	{ import: options.invertL ? 'mobystk:joystick_left_top' : 'mobystk:joystick_left_bottom' },
	{ import: options.invertR ? 'mobystk:joystick_right_bottom' : 'mobystk:joystick_right_top' }
]

const layouts: ILayout[] = [
	{
		type: 'mobystk:layout',
		id: 'mobystk:default',
		name: '(Padrão)',
		subtitle: '',
		content: [
			...commonItems,
			{ import: options.invertR ? 'mobystk:actions_top' : 'mobystk:actions_bottom' }
		]
	}
]

export default layouts
