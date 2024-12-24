import { lastMacro, recordingMacro } from '../joystick/element-actions'
import { $controllerIndicator } from '../joystick/elements'
import { updateInfo } from '../joystick/user-interface'
import { Joystick, Key, SocketMessages } from '../types/socket'
import { toast } from '../utils/toast'
import vibrate from '../utils/vibrate'
import options from './options'

const $ping = document.querySelector<HTMLElement>('.ping')

class MobyStkSocket {
	instance!: WebSocket
	pingID: number | undefined
	pingTime = Date.now()

	constructor() {
		this.connect()
		setInterval(() => this.sendPing(), 1000)
	}

	connect() {
		try {
			this.instance = new WebSocket('ws://' + options.ip)
		} catch (err) {
			if (options.debug) console.error(err)
			this.onClose()
			return
		}

		this.instance.addEventListener('open', this.onOpen.bind(this))
		this.instance.addEventListener('close', this.onClose.bind(this))
		this.instance.addEventListener('message', this.onMessage.bind(this))
		document.body.classList.remove('connected', 'disconnected')
		document.body.classList.add('connecting')
	}

	onOpen() {
		document.body.classList.remove('connecting', 'disconnected')
		document.body.classList.add('connected')
	}

	onClose() {
		document.body.classList.remove('connecting', 'connected')
		document.body.classList.add('disconnected')
		setTimeout(() => this.connect(), 3000)
	}

	onMessage(e: MessageEvent<any>) {
		const [command, data] = JSON.parse(e.data) as SocketMessages.Server.ServerMessage

		if (command === 'welcome') this.onWelcome(data)
		if (command === 'handshakeOK') this.onHandshakeOK(data)
		if (command === 'handshakeFailed') this.onHandshakeFailed(data)
		if (command === 'pong') this.onPong(data)
		if (command === 'vibrate') this.onVibrate(data)
	}

	sendCommand(
		command: SocketMessages.Client.ClientMessage[0],
		data: SocketMessages.Client.ClientMessage[1]
	) {
		if (recordingMacro) return void lastMacro.push([command, data])
		if (this.instance.readyState !== this.instance.OPEN) return
		const messageJSON = [command, data]
		const message = JSON.stringify(messageJSON)
		this.instance.send(message)
	}

	sendPing() {
		if (this.instance.readyState !== this.instance.OPEN) return
		if (this.pingID && $ping) $ping.innerText = '+999ms'
		this.pingID = Math.floor(Math.random() * 1000000)
		this.pingTime = Date.now()
		this.sendCommand('ping', { id: this.pingID })
	}

	sendKey(key: Key, action: 'press' | 'release') {
		this.sendCommand('key', { key, action })
	}

	sendJoystickPos(key: Joystick, x: number = 0, y: number = 0) {
		this.sendCommand('key', { key, action: 'press', x: x || 0, y: y || 0 })
	}

	onWelcome(data: SocketMessages.Server.Welcome) {
		// Verifica se precisa de senha para conectar e obtém a senha
		let password: string | null = null
		if (data.needPassword) {
			password = options.password || this.askPassword() || null
			if (!password) return
		}

		// Envia o handshake
		this.sendCommand('handshake', {
			player: options.player,
			password,
			useKeyboard: options.useKeyboard
		})
	}

	onHandshakeOK(data: SocketMessages.Server.HandshakeOK) {
		if (data.otherPlayerConnected) {
			toast('Outro jogador já está conectado neste controle')
		}

		if (data.vGamepadDisabled) {
			toast(
				'O controle virtual está desativado, você pode ativá-lo nas opções do MobyStk no computador'
			)
		}

		if (data.vGamepadError) {
			toast('Não foi possível criar um controle virtual. Utilizando o teclado')
		}

		// Atualiza a interface informando se está usando o teclado
		options.useKeyboard = data.useKeyboard
		updateInfo()
	}

	onHandshakeFailed(data: SocketMessages.Server.HandshakeFailed) {
		if (data.passwordIncorrect) {
			alert('Senha incorreta')
			options.password = undefined
			localStorage.removeItem('joystick.password')
			this.onWelcome({ needPassword: true })
		}
	}

	onPong(data: SocketMessages.Server.Pong) {
		if (Number(data.id) === this.pingID) {
			if ($ping) $ping.innerText = String(Date.now() - this.pingTime) + 'ms'
			this.pingID = undefined
		}
	}

	onVibrate(data: SocketMessages.Server.Vibrate) {
		if (!options.vibrationFromGame) return
		vibrate(data.largeMotor ? 1000 : 1, true)
		$controllerIndicator.classList[data.largeMotor ? 'remove' : 'add'](
			options.useKeyboard ? 'mdi-keyboard' : 'mdi-google-controller'
		)
		$controllerIndicator.classList[data.largeMotor ? 'add' : 'remove']('mdi-vibrate')
	}

	askPassword() {
		const password = prompt('O computador requer uma senha para se conectar ao MobyStk')
		if (!password) return void toast('Você precisa informar a senha para se conectar')
		options.password = password
		localStorage.setItem('joystick.password', JSON.stringify(password))
		return password
	}
}

export const socket = new MobyStkSocket()
