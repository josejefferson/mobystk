import keymappings from '../shared/keymappings'
import options from '../shared/options'
import { commands, socket } from '../shared/socket'
import vibrate from '../utils/vibrate'
import { lastMacro, recordingMacro } from './element-actions'
import { $controllerIndicator } from './elements'

const controllerIndicatorClass = options.vgamepad ? 'mdi-google-controller' : 'mdi-keyboard'
$controllerIndicator.classList.add(controllerIndicatorClass)

commands.V = (data: string) => {
	const [value] = data.toLowerCase().split(' ')
	if (options.vibrationFromGame) {
		const n = parseInt(value.split('|')[0])
		vibrate(n ? 3000 : 0, true)
		$controllerIndicator.classList[n ? 'remove' : 'add'](controllerIndicatorClass)
		$controllerIndicator.classList[n ? 'add' : 'remove']('mdi-vibrate')
	}
}

/**
 * Envia comandos para o servidor
 * @param keys Tecla(s) que será(ão) pressionada(s) de acordo com o KeyMapping
 * @param release Boolean indicando se a tecla está sendo solta
 * @param custom Comando personalizado para enviar ao servidor
 */
function _sendCmd(keys: string | string[], release = false, custom?: string) {
	if (!keys || !keys.length) return
	if (typeof keys === 'string') keys = [keys]

	// Mapeia as teclas
	if (!custom)
		keys = keys.map((key) => {
			if (options.vgamepad) return keymappings[key]?.[4]!
			else return keymappings[key]?.[options.player]!
		})

	// Salva no macro ao invés de enviar para o servidor
	if (recordingMacro && custom) return lastMacro.push(`${custom} ${keys} ${options.player}`)
	if (recordingMacro) return lastMacro.push(`${release ? 'R' : 'P'} ${keys} ${options.player}`)

	// Se não tiver conectado, não faz nada
	if (!socket || socket.readyState !== 1) return

	// Envia o comando para o servidor
	if (custom) socket.send(`${custom} ${keys} ${options.player}`)
	else socket.send(`${release ? 'R' : 'P'} ${keys} ${options.player}`)
}

window.sendCmd = _sendCmd

export const sendCmd = (...args: Parameters<typeof _sendCmd>): ReturnType<typeof _sendCmd> => {
	return window.sendCmd(...args)
}
