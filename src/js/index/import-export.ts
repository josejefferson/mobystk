import { ls } from '../utils/get-option'
import loading from '../utils/loading'
import { toast } from '../utils/toast'
import { $export, $import } from './elements'

$import.addEventListener('click', importOptions)
$export.addEventListener('click', exportOptions)

function importOptions() {
	const $el = document.createElement('input')
	$el.type = 'file'
	$el.style.display = 'none'
	$el.click()
	$el.addEventListener('change', fileChange)

	async function fileChange(this: HTMLInputElement) {
		try {
			const file = this.files[0]
			if (!file) return
			const content: string | ArrayBuffer = await new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.onload = () => resolve(reader.result)
				reader.onerror = reject
				reader.readAsText(file)
			})
			ls(JSON.parse(String(content)))
			loading()
			location.reload()
		} catch (err) {
			console.error(err)
			toast('Ocorreu um erro ao importar as configurações')
		}
	}
}

function exportOptions() {
	const content = JSON.stringify(ls())
	const $el = document.createElement('a')
	const blob = new Blob([content], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	$el.href = url
	$el.download = `mobyStk-settings-${new Date().toISOString()}.json`
	$el.click()
}
