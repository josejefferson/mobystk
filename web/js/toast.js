class Toast {
	/**
	 * Cria um gerenciador de toasts
	 * @param {Element} element - Elemento onde ficará o toast
	 */
	constructor(element) {
		this.element = element
		this.content = element.querySelector('.toast-content')
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
		this.content[toast.html ? 'innerHTML' : 'innerText'] = toast.message
		setTimeout(this.start.bind(this), toast.time || 2000)
	}
}

const $toast = document.createElement('div')
$toast.classList.add('toast')
$toast.innerHTML = '<div class="toast-content"></div>'
document.body.appendChild($toast)

const $toastCSS = document.createElement('style')
$toastCSS.innerHTML = `
.toast {
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	background-color: rgba(85, 85, 85, 0.9);
	border-radius: 22px;
	bottom: 48px; 
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	color: #FFFFFF;
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	font-family: Roboto, Arial, sans-serif;
	font-size: 14px;
	left: 50%;
	margin: 16px;
	max-width: 320px;
	min-height: 44px;
	opacity: 0;
	padding: 13.8px 25px;
	pointer-events: none;
	position: absolute;
	text-align: left;
	text-shadow: black 0 0 2px;
	-webkit-transform: translateX(calc(-50% - 16px));
	-ms-transform: translateX(calc(-50% - 16px));
	transform: translateX(calc(-50% - 16px));
	-webkit-transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);
	-o-transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);
	transition: opacity 500ms cubic-bezier(0.5, 1, 0.89, 1);
	width: -webkit-fit-content;
	width: -moz-fit-content;
	width: fit-content;
	z-index: 99999999999;
}

.toast.show {
	opacity: 1;
	-webkit-transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);
	-o-transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);
	transition: opacity 500ms cubic-bezier(0.11, 0, 0.5, 0);
}

.toast .toast-content {
	letter-spacing: -0.03px;
	line-height: 17.6px;
	-webkit-transform: scaleY(1.11);
	-ms-transform: scaleY(1.11);
	transform: scaleY(1.11);
}
`
document.body.appendChild($toastCSS)

const toastObj = new Toast($toast)
const toast = (...args) => toastObj.show(...args)