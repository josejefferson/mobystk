const $drive = document.querySelector('.drive');
const driveHTML = $drive.innerHTML;
$drive.ontouchstart = toggleDriveMode; // Caso não esteja em HTTPS, desativa o ícone de volante

if (!(location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) $drive.style.display = 'none'; // LIGA/DESLIGA O SENSOR

function toggleDriveMode(e) {
	const SENSITIVITY = options.driveSensitivity;
	const PRECISION = options.drivePrecision; // Desliga o sensor e desaperta as teclas

	if (e.target.classList.contains('active')) {
		e.target.classList.remove('active');
		e.target.innerHTML = driveHTML;
		window.ondevicemotion = null;

		if (!options.vgamepad) {
			sendCmd('joyLUp', true);
			sendCmd('joyLLeft', true);
			sendCmd('joyLRight', true);
		} else {
			sendCmd('0|0', false, 'VJL');
		}

		return;
	} // Ativa o sensor


	e.target.classList.add('active');
	e.target.innerHTML = '<i class="driveArrow mdi mdi-arrow-up"></i>';
	let driveY = 0,
		driveAngle = 0,
		lastDirections = []; // Detecta os movimentos

	window.ondevicemotion = e => {
		const land = window.outerWidth > window.outerHeight;
		const inverted = e.accelerationIncludingGravity[land ? 'x' : 'y'] >= 0 ? 1 : -1;
		driveY = parseFloat(e.accelerationIncludingGravity[land ? 'y' : 'x'].toFixed(1));
		driveY *= inverted * (land ? 1 : -1);

		if (!options.vgamepad) {
			// Define a direção (ângulo)
			angle = 0;

			if (driveAngle === -45) {
				if (driveY > SENSITIVITY) angle = 45;
				if (driveY < -SENSITIVITY + PRECISION) angle = -45;
				if (driveY > SENSITIVITY * 2) angle *= 2;
				if (driveY < -SENSITIVITY * 2 - PRECISION) angle *= 2;
			} else if (driveAngle === 45) {
				if (driveY > SENSITIVITY - PRECISION) angle = 45;
				if (driveY < -SENSITIVITY) angle = -45;
				if (driveY > SENSITIVITY * 2 + PRECISION) angle *= 2;
				if (driveY < -SENSITIVITY * 2) angle *= 2;
			} else {
				if (driveY > SENSITIVITY) angle = 45;
				if (driveY < -SENSITIVITY) angle = -45;
				if (driveY > SENSITIVITY * 2) angle *= 2;
				if (driveY < -SENSITIVITY * 2) angle *= 2;
			}

			if (angle === driveAngle) return;
			$drive.children[0].style.transform = `rotate(${angle}deg)`; // Define a direção

			switch (angle) {
				case -90:
					directions = ['joyLLeft'];
					break;

				case -45:
					directions = ['joyLUp', 'joyLLeft'];
					break;

				case 45:
					directions = ['joyLUp', 'joyLRight'];
					break;

				case 90:
					directions = ['joyLRight'];
					break;

				default:
					directions = ['joyLUp'];
			}

			driveAngle = angle;
			navigator.vibrate(options.vibrate * 2); // Pressiona as teclas

			const pressKeys = directions.filter(e => !lastDirections.includes(e));
			const unpressKeys = lastDirections.filter(e => !directions.includes(e));
			sendCmd(pressKeys);
			sendCmd(unpressKeys, true);
			lastDirections = [...directions];
		} else {
			// Usando VGamepad
			let x = Math.round(32767 / SENSITIVITY * driveY);
			if (x < 10923 * PRECISION && x > -10923 * PRECISION) x = 0;
			if (x > 32767) x = 32767;
			if (x < -32767) x = -32767;
			const angle = 90 * x / 32767;
			$drive.children[0].style.transform = `rotate(${angle}deg)`;
			sendCmd(`${x}|0`, false, 'VJL');
		}
	};
}