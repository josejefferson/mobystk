Controller.layouts.push({
	"type": "mobystk:layout",
	"id": "mobystk:psp",
	"name": "PSP",
	"content": [
		{ "import": "mobystk:macro_record" },
		{ "import": "mobystk:macro_play" },
		{ "import": "mobystk:volume_up" },
		{ "import": "mobystk:volume_down" },
		{ "import": "mobystk:left_1" },
		{ "import": "mobystk:right_1" },
		{ "import": "mobystk:load_state", anchorX: 1, x: [128, 'px'] },
		{ "import": "mobystk:save_state" },
		{ "import": "mobystk:select" },
		{ "import": "mobystk:pause" },
		{ "import": "mobystk:start" },
		{ "import": "mobystk:arrows_top" },
		{ "import": "mobystk:ps_actions" },
		{ "import": "mobystk:joystickL" }
	]
})

Controller.layouts.push({
	"type": "mobystk:layout",
	"id": "mobystk:snes",
	"name": "SNES",
	"content": [
		{ "import": "mobystk:macro_record" },
		{ "import": "mobystk:macro_play" },
		{ "import": "mobystk:volume_up" },
		{ "import": "mobystk:volume_down" },
		{ "import": "mobystk:left_1" },
		{ "import": "mobystk:right_1" },
		{ "import": "mobystk:load_state" },
		{ "import": "mobystk:save_state" },
		{ "import": "mobystk:select" },
		{ "import": "mobystk:start" },
		{ "import": "mobystk:arrows" },
		{ "import": "mobystk:xbox_actions" }
	]
})