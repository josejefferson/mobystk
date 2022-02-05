class Toast {
	/**
	 * Cria um gerenciador de toasts
	 * @param {Element} element - Elemento onde ficará o toast
	 */
	constructor(element) {
		this.element = element
		this.toasts = []
		this.showing = false
	}

	/**
	 * Prepara um novo toast para ser exibido na tela
	 * @param {string} message - Mensagem que será exibida no toast
	 * @param {number} [time=2000] - Tempo que o toast estará visível
	 * @returns {Object} Instância do objeto Toast
	 */
	show(message, time = 2000, html = false) {
		this.toasts.push({ message, time, html })
		if (!this.showing) {
			this.start()
		}
		return this
	}

	/**
	 * Prepara o próximo toast da lista para ser exibido na tela
	 */
	start() {
		this.element.classList.remove('show')
		if (!this.toasts.length) {
			return this.showing = false
		}
		if (!this.showing) {
			this.run()
		} else {
			setTimeout(this.run.bind(this), 1000)
		}
		this.showing = true
	}

	/**
	 * Exibe o toast na tela
	 */
	run() {
		this.element.classList.add('show')
		const toast = this.toasts.shift()
		this.element[toast.html ? 'innerHTML' : 'innerText'] = toast.message
		setTimeout(this.start.bind(this), toast.time || 2000)
	}
}

const $toast = document.createElement('div')
$toast.classList.add('toast')
document.body.appendChild($toast)

const $toastCSS = document.createElement('style')
$toastCSS.innerHTML = `
.toast {
	z-index: 99999999999;
	background-color: rgba(28, 28, 28, 0.67);
	border-radius: 20px;
	bottom: 10%;
	color: rgb(232, 230, 227);
	display: inline-block;
	font-family: Roboto, Arial, sans-serif;
	font-size: 16px;
	left: 50%;
	line-height: 20px;
	margin: 16px;
	max-width: 400px;
	min-height: 16px;
	opacity: 0;
	padding: 10px 16px;
	pointer-events: none;
	position: fixed;
	text-align: left;
	text-shadow: black 0 0 2px;
	transform: translateX(calc(-50% - 16px));
	transition: 1s ease;
	width: -moz-fit-content;
	width: fit-content;
}

.toast.show {
	opacity: 1;
}
`
document.body.appendChild($toastCSS)

const toastObj = new Toast($toast)
const toast = (...args) => toastObj.show(...args)