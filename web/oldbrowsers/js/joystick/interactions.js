// INÍCIO DO TOQUE
document.ontouchstart = e => {
	for (const touch of e.changedTouches) {
		var _target, _target$dataset$key;

		let target = document.elementFromPoint(touch.clientX, touch.clientY);
		if (!target.classList.contains('joystick') && (!target.classList.contains('touch') || target.classList.contains('active') || target.classList.contains('lock'))) target = null;
		const joystick = (_target = target) !== null && _target !== void 0 && _target.classList.contains('joystick') ? true : false;
		currentTouches.push({
			target,
			touch,
			joystick
		});
		if (!target) continue;
		navigator.vibrate(options.vibrate);
		if (joystick) continue;
		target.classList.add('active');
		const keys = (_target$dataset$key = target.dataset.key) === null || _target$dataset$key === void 0 ? void 0 : _target$dataset$key.split(' '); // Diagonal

		keys === null || keys === void 0 ? void 0 : keys.forEach(key => {
			if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
				e.classList.add('dActive');
			});
		});
		sendCmd(keys);
	}
}; // MOVIMENTO DO TOQUE


document.ontouchmove = e => {
	for (const touch of e.changedTouches) {
		var _target2, _oldtouch$target, _oldtouch$target2, _oldtouch$target2$dat, _oldtouch$target2$dat2, _keys, _target$dataset$key2, _keys2;

		const i = currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier;
		});
		if (i < 0) continue;
		const oldtouch = currentTouches[i];
		if (oldtouch.joystick) continue;
		oldtouch.touch = touch;
		let target = document.elementFromPoint(touch.clientX, touch.clientY);
		if (!((_target2 = target) !== null && _target2 !== void 0 && _target2.classList.contains('touch')) || target.classList.contains('joystick')) target = null;
		if (oldtouch.target === target) continue;
		(_oldtouch$target = oldtouch.target) === null || _oldtouch$target === void 0 ? void 0 : _oldtouch$target.classList.remove('active');
		let keys = oldtouch === null || oldtouch === void 0 ? void 0 : (_oldtouch$target2 = oldtouch.target) === null || _oldtouch$target2 === void 0 ? void 0 : (_oldtouch$target2$dat = _oldtouch$target2.dataset) === null || _oldtouch$target2$dat === void 0 ? void 0 : (_oldtouch$target2$dat2 = _oldtouch$target2$dat.key) === null || _oldtouch$target2$dat2 === void 0 ? void 0 : _oldtouch$target2$dat2.split(' '); // Diagonal

		(_keys = keys) === null || _keys === void 0 ? void 0 : _keys.forEach(key => {
			if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
				e.classList.remove('dActive');
			});
		});
		sendCmd(keys, true);
		if (target && (!target.classList.contains('touch') || target.classList.contains('active') || target.classList.contains('lock'))) target = null;
		oldtouch.target = target;
		if (!target) continue;
		target.classList.add('active');
		keys = (_target$dataset$key2 = target.dataset.key) === null || _target$dataset$key2 === void 0 ? void 0 : _target$dataset$key2.split(' ');
		(_keys2 = keys) === null || _keys2 === void 0 ? void 0 : _keys2.forEach(key => {
			// Diagonal
			if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
				e.classList.add('dActive');
			});
		});
		sendCmd(keys);
		navigator.vibrate(options.vibrate);
	}
}; // FIM DO TOQUE


document.ontouchend = e => {
	for (const touch of e.changedTouches) {
		const i = currentTouches.findIndex(t => {
			return t.touch.identifier === touch.identifier;
		});
		if (i < 0) continue;

		if (!currentTouches[i].joystick && currentTouches[i].target) {
			var _currentTouches$i$tar;

			currentTouches[i].target.classList.remove('active');
			const keys = (_currentTouches$i$tar = currentTouches[i].target.dataset.key) === null || _currentTouches$i$tar === void 0 ? void 0 : _currentTouches$i$tar.split(' '); // Diagonal

			keys === null || keys === void 0 ? void 0 : keys.forEach(key => {
				if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
					e.classList.remove('dActive');
				});
			});
			sendCmd(keys, true);
		}

		currentTouches.splice(i, 1);
	}
}; // CLIQUE DO MOUSE


document.onmousedown = e => {
	var _target$dataset$key3;

	if ('ontouchstart' in document.documentElement) return;
	let target = e.target;
	if (!target.classList.contains('joystick') && (!target.classList.contains('touch') || target.classList.contains('active') || target.classList.contains('lock'))) target = null;
	if (!target) return;
	target.classList.add('active');
	const keys = (_target$dataset$key3 = target.dataset.key) === null || _target$dataset$key3 === void 0 ? void 0 : _target$dataset$key3.split(' '); // Diagonal

	keys === null || keys === void 0 ? void 0 : keys.forEach(key => {
		if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
			e.classList.add('dActive');
		});
	});
	sendCmd(keys); // Fim do clique

	document.onmouseup = e => {
		var _target$dataset$key4;

		target.classList.remove('active');
		const keys = (_target$dataset$key4 = target.dataset.key) === null || _target$dataset$key4 === void 0 ? void 0 : _target$dataset$key4.split(' '); // Diagonal

		keys === null || keys === void 0 ? void 0 : keys.forEach(key => {
			if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
				e.classList.remove('dActive');
			});
		});
		sendCmd(keys, true);
		document.onmouseup = null;
	};
};