export function scrollToY(y: number, duration = 0, element = document.scrollingElement) {
	if (element.scrollTop === y) return
	const cosParameter = (element.scrollTop - y) / 2
	let scrollCount = 0
	let oldTimestamp: number | null = null
	function step(newTimestamp: number) {
		if (oldTimestamp !== null) {
			scrollCount += (Math.PI * (newTimestamp - oldTimestamp)) / duration
			if (scrollCount >= Math.PI) return (element.scrollTop = y)
			element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount)
		}
		oldTimestamp = newTimestamp
		window.requestAnimationFrame(step)
	}
	window.requestAnimationFrame(step)
}
