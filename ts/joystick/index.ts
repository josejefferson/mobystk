import './element-actions'
import './interactions'
import './joystick'
import './layout'
import './motion-control'
import './user-interface'
// import './layout-editor'

document.addEventListener('contextmenu', (e) => e.preventDefault())
window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

export {}
