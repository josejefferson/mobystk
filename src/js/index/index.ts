import './colors'
import './import-export'
import './interface'
import './options'
import './types'
import loading from '../utils/loading'
import { scrollToY } from '../utils/scrollToY'

// Eventos
window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

window.addEventListener('load', updateStartButton)
window.addEventListener('scroll', updateStartButton)

function updateStartButton() {
	if (document.scrollingElement.scrollTop > window.innerHeight) {
		document.querySelector<HTMLElement>('.start.floating').classList.remove('hidden')
	} else {
		document.querySelector<HTMLElement>('.start.floating').classList.add('hidden')
	}
}

document.addEventListener('contextmenu', () => false)
document.querySelectorAll('a').forEach((e) => e.addEventListener('click', loading))
document.querySelectorAll('.start').forEach((e) => {
	e.addEventListener('contextmenu', (e) => {
		e.preventDefault()
		document.querySelector<HTMLElement>('.hiddenOptions').style.display = 'flex'
		scrollToY(document.body.scrollHeight, 400)
		return false
	})
})
