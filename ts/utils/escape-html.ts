/**
 * Transforma os caracteres especiais do HTML
 */
export function escapeHTML(unsafe: string) {
	if (unsafe === undefined || unsafe === null) return ''
	unsafe = unsafe.toString()
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}
