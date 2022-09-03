const $debug = document.querySelector<HTMLElement>('.debugLog')
export default function debug(text?: string) {
	$debug.innerText = text === undefined ? '' : text
}
