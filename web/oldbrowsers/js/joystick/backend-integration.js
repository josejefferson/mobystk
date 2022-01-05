// CONEXÃO DO SOCKET
let socket = socketConnect();

function socketConnect() {
	const ws = new WebSocket('ws://' + options.ip);
	document.body.classList.remove('connected', 'disconnected');
	document.body.classList.add('connecting'); // Socket conectado

	ws.onopen = () => {
		document.body.classList.remove('connecting', 'disconnected');
		document.body.classList.add('connected');
	}; // Socket desconectado


	ws.onclose = () => {
		document.body.classList.remove('connecting', 'connected');
		document.body.classList.add('disconnected');
		setTimeout(() => socket = socketConnect(), 3000);
	};

	return ws;
} // ENVIA COMANDOS PARA O SERVIDOR


function sendCmd(keys, release = false, custom) {
	if (!keys || !keys.length) return;
	if (typeof keys === 'string') keys = [keys]; // Mapeia as teclas

	if (!custom) keys = keys.map(key => {
		var _keymappings$key;

		if (options.vgamepad && key.startsWith('pad')) return getVGamepadDPad(key, !release);
		return (_keymappings$key = keymappings[key]) === null || _keymappings$key === void 0 ? void 0 : _keymappings$key[options.player];
	}); // Salva no macro ao invés de enviar para o servidor

	if (recordingMacro && custom) return lastMacro.push(`${custom} ${keys}`);
	if (recordingMacro) return lastMacro.push(`${release ? 'R' : 'P'} ${keys}`); // Se não tiver conectado, não faz nada

	if (socket.readyState !== 1) return; // Envia o comando para o servidor

	if (custom) socket.send(`${custom} ${keys}`); else socket.send(`${release ? 'R' : 'P'} ${keys}`);
} // RETORNA A DIREÇÃO DO DPAD PARA O VGAMEPAD


const dPad = [false, false, false, false];

function getVGamepadDPad(key, press) {
	// Atualiza o array dPad
	switch (key) {
		case 'padUp':
			dPad[0] = press;
			break;

		case 'padLeft':
			dPad[1] = press;
			break;

		case 'padDown':
			dPad[2] = press;
			break;

		case 'padRight':
			dPad[3] = press;
			break;
	} // Retorna a direção para o qual o DPad está apontando


	if (d(false, false, false, false)) return 'DS4_BUTTON_DPAD_NONE';
	if (d(true, true, false, false)) return 'DS4_BUTTON_DPAD_NORTHWEST';
	if (d(false, true, false, false)) return 'DS4_BUTTON_DPAD_WEST';
	if (d(false, true, true, false)) return 'DS4_BUTTON_DPAD_SOUTHWEST';
	if (d(false, false, true, false)) return 'DS4_BUTTON_DPAD_SOUTH';
	if (d(false, false, true, true)) return 'DS4_BUTTON_DPAD_SOUTHEAST';
	if (d(false, false, false, true)) return 'DS4_BUTTON_DPAD_EAST';
	if (d(true, false, false, true)) return 'DS4_BUTTON_DPAD_NORTHEAST';
	if (d(true, false, false, false)) return 'DS4_BUTTON_DPAD_NORTH'; // Verifica se o array dPad corresponde a sequência

	function d(u, l, d, r) {
		return dPad[0] === u && dPad[1] === l && dPad[2] === d && dPad[3] === r;
	}
}