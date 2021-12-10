const layoutEditor = {}
window.layoutEditor = layoutEditor

layoutEditor.opened = false
layoutEditor.load = () => {
	$edit.classList.remove('loading-layout-editor')
	layoutEditor.start()
}

layoutEditor.start = () => {
	layoutEditor.opened = true
	$edit.classList.add('layout-editor-opened')
}

layoutEditor.end = () => {
	layoutEditor.opened = false
	$edit.classList.remove('layout-editor-opened')
}

// temp
function convert(str) {
	var n = parseFloat(value);
	var u = value.trim().substring(n.toString().length)
	return {
		value: n,
		unit: u
	}
}