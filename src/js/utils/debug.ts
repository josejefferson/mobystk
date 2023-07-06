const $debug = document.querySelector<HTMLElement>('.debugLog')

/**
 * Exibe um texto na tela
 */
export default function debug(text?: string) {
	$debug.innerText = text === undefined ? '' : text
}
