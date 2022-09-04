const $loading = document.querySelector('.loadingScreen')

/**
 * Exibe a tela de loading
 */
export default function loading() {
	$loading.classList.add('visible')
}

window.loading = loading
