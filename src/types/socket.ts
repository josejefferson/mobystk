/** Mensagens enviadas e recebidas do WebSocket */
export namespace SocketMessages {
	/** Mensagens recebidas do servidor */
	export namespace Server {
		/** Tipos de mensagens recebidas do servidor */
		export type ServerMessage =
			| ['welcome', Welcome]
			| ['handshakeOK', HandshakeOK]
			| ['handshakeFailed', HandshakeFailed]
			| ['pong', Pong]
			| ['vibrate', Vibrate]

		/** Mensagem de conexão */
		export type Welcome = { needPassword: boolean }

		/** Sucesso no Handshake */
		export type HandshakeOK = {
			useKeyboard: boolean
			vGamepadDisabled: boolean
			vGamepadError: boolean
			otherPlayerConnected: boolean
		}

		/** Falha no Handshake */
		export type HandshakeFailed = { passwordIncorrect: true }

		/** Resposta ao ping */
		export type Pong = { id: number }

		/** Vibração do controle */
		export type Vibrate = { largeMotor: number; smallMotor: number }
	}

	/** Mensagens enviadas pelo cliente */
	export namespace Client {
		/** Tipos de mensagens enviadas pelo cliente */
		export type ClientMessage = ['handshake', Handshake] | ['ping', Ping] | ['key', Key]

		/** Handshake */
		export type Handshake = { player: Player; password: string | null; useKeyboard: boolean }

		/** Ping */
		export type Ping = { id: number }

		/** Tecla pressionada/liberada ou joystick movido */
		export type Key =
			| { key: Joystick; action: Action; x: number; y: number }
			| { key: string; action: Action }
	}
}

export type Key =
	| 'JOYSTICK_1_UP'
	| 'JOYSTICK_1_LEFT'
	| 'JOYSTICK_1_DOWN'
	| 'JOYSTICK_1_RIGHT'
	| 'JOYSTICK_2_UP'
	| 'JOYSTICK_2_LEFT'
	| 'JOYSTICK_2_DOWN'
	| 'JOYSTICK_2_RIGHT'
	| 'PAD_UP'
	| 'PAD_LEFT'
	| 'PAD_DOWN'
	| 'PAD_RIGHT'
	| 'ACTION_Y'
	| 'ACTION_X'
	| 'ACTION_A'
	| 'ACTION_B'
	| 'L1'
	| 'L2'
	| 'L3'
	| 'R1'
	| 'R2'
	| 'R3'
	| 'SELECT'
	| 'START'
	| 'PAUSE'
	| 'LOAD'
	| 'SAVE'
	| 'FAST_FORWARD'
	| 'VOLUME_UP'
	| 'VOLUME_DOWN'

export type Action = 'press' | 'release'

export type Player = 0 | 1 | 2 | 3

export type Joystick = 'JOYSTICK_1' | 'JOYSTICK_2'
